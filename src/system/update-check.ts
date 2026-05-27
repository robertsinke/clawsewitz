import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

import { getClawsewitzStateDir } from "../config/paths.js";

const REGISTRY_URL = "https://registry.npmjs.org/clawsewitz/latest";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24h
const FETCH_TIMEOUT_MS = 1500;

type UpdateCheckCache = {
	checkedAt: number;
	latest: string;
};

function getCachePath(): string {
	return resolve(getClawsewitzStateDir(), "update-check.json");
}

function readCache(path: string): UpdateCheckCache | undefined {
	try {
		if (!existsSync(path)) return undefined;
		const parsed = JSON.parse(readFileSync(path, "utf8")) as UpdateCheckCache;
		if (typeof parsed.checkedAt !== "number" || typeof parsed.latest !== "string") return undefined;
		return parsed;
	} catch {
		return undefined;
	}
}

function writeCache(path: string, cache: UpdateCheckCache): void {
	try {
		mkdirSync(dirname(path), { recursive: true });
		writeFileSync(path, JSON.stringify(cache), "utf8");
	} catch {
		// Best-effort cache write; silent on failure.
	}
}

function parseSemver(version: string): [number, number, number] | undefined {
	const match = version.match(/^(\d+)\.(\d+)\.(\d+)/);
	if (!match) return undefined;
	return [Number(match[1]), Number(match[2]), Number(match[3])];
}

export function isNewerVersion(latest: string, current: string): boolean {
	const a = parseSemver(latest);
	const b = parseSemver(current);
	if (!a || !b) return false;
	for (let i = 0; i < 3; i++) {
		if (a[i] > b[i]) return true;
		if (a[i] < b[i]) return false;
	}
	return false;
}

export type FetchVersionResult =
	| { ok: true; version: string }
	| { ok: false; reason: "not-found" | "network" };

export async function fetchLatestVersion(): Promise<FetchVersionResult> {
	try {
		const controller = new AbortController();
		const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
		const response = await fetch(REGISTRY_URL, {
			signal: controller.signal,
			headers: { accept: "application/json" },
		});
		clearTimeout(timeout);
		if (response.status === 404) return { ok: false, reason: "not-found" };
		if (!response.ok) return { ok: false, reason: "network" };
		const body = (await response.json()) as { version?: string };
		const version = typeof body.version === "string" ? body.version : undefined;
		if (!version) return { ok: false, reason: "network" };
		return { ok: true, version };
	} catch {
		return { ok: false, reason: "network" };
	}
}

export async function getLatestVersion(options: { force?: boolean } = {}): Promise<FetchVersionResult | { ok: true; version: string; cached: true }> {
	const cachePath = getCachePath();
	const cached = readCache(cachePath);
	const now = Date.now();
	if (!options.force && cached && now - cached.checkedAt < CACHE_TTL_MS) {
		return { ok: true, version: cached.latest, cached: true };
	}
	const result = await fetchLatestVersion();
	if (result.ok) {
		writeCache(cachePath, { checkedAt: now, latest: result.version });
		return result;
	}
	// Network failure: fall back to stale cache (but not for not-found — that's definitive)
	if (result.reason === "network" && cached) {
		return { ok: true, version: cached.latest, cached: true };
	}
	return result;
}

/**
 * Non-blocking update check. Prints a banner to stderr if a newer version exists.
 * Uses the cached registry response when fresh; otherwise refreshes in the background
 * without blocking the caller. Disabled via CLAWSEWITZ_NO_UPDATE_CHECK=1.
 */
export function checkForUpdatesInBackground(currentVersion: string | undefined): void {
	if (!currentVersion) return;
	if (process.env.CLAWSEWITZ_NO_UPDATE_CHECK === "1") return;

	const cachePath = getCachePath();
	const cached = readCache(cachePath);
	const now = Date.now();
	const fresh = cached && now - cached.checkedAt < CACHE_TTL_MS;

	if (cached && isNewerVersion(cached.latest, currentVersion)) {
		printUpdateBanner(currentVersion, cached.latest);
	}

	if (fresh) return;

	void fetchLatestVersion().then((result) => {
		if (!result.ok) return;
		writeCache(cachePath, { checkedAt: Date.now(), latest: result.version });
		if (!cached && isNewerVersion(result.version, currentVersion)) {
			printUpdateBanner(currentVersion, result.version);
		}
	});
}

function printUpdateBanner(current: string, latest: string): void {
	const dim = "\x1b[2m";
	const reset = "\x1b[0m";
	process.stderr.write(
		`${dim}Update available: ${current} → ${latest}. Run 'clawsewitz update'.${reset}\n`,
	);
}
