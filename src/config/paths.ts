import { mkdirSync } from "node:fs";
import { homedir } from "node:os";
import { resolve } from "node:path";

export function getClawsewitzHome(): string {
	return resolve(process.env.CLAWSEWITZ_HOME ?? homedir(), ".clawsewitz");
}

export function getClawsewitzAgentDir(home = getClawsewitzHome()): string {
	return resolve(home, "agent");
}

export function getClawsewitzMemoryDir(home = getClawsewitzHome()): string {
	return resolve(home, "memory");
}

export function getClawsewitzStateDir(home = getClawsewitzHome()): string {
	return resolve(home, ".state");
}

export function getDefaultSessionDir(home = getClawsewitzHome()): string {
	return resolve(home, "sessions");
}

export function getBootstrapStatePath(home = getClawsewitzHome()): string {
	return resolve(getClawsewitzStateDir(home), "bootstrap.json");
}

export function ensureClawsewitzHome(home = getClawsewitzHome()): void {
	for (const dir of [
		home,
		getClawsewitzAgentDir(home),
		getClawsewitzMemoryDir(home),
		getClawsewitzStateDir(home),
		getDefaultSessionDir(home),
	]) {
		mkdirSync(dir, { recursive: true });
	}
}
