import { spawn } from "node:child_process";

import { getLatestVersion, isNewerVersion } from "./update-check.js";

export async function runUpdate(currentVersion: string | undefined): Promise<number> {
	console.log("Checking for updates...");
	const result = await getLatestVersion({ force: true });

	if (!result.ok) {
		if (result.reason === "not-found") {
			console.error("clawsewitz is not published on the npm registry yet.");
		} else {
			console.error("Could not reach the npm registry. Check your network and try again.");
		}
		return 1;
	}

	const latest = result.version;

	if (currentVersion && !isNewerVersion(latest, currentVersion)) {
		console.log(`Already on the latest version (${currentVersion}).`);
		return 0;
	}

	console.log(`Updating clawsewitz${currentVersion ? ` ${currentVersion}` : ""} → ${latest}...`);

	return new Promise((resolvePromise) => {
		const npm = process.platform === "win32" ? "npm.cmd" : "npm";
		const child = spawn(npm, ["install", "-g", `clawsewitz@${latest}`], {
			stdio: "inherit",
		});

		child.on("error", (err) => {
			console.error(`Failed to launch npm: ${err.message}`);
			console.error("If you installed clawsewitz via another route, update it using that method instead.");
			resolvePromise(1);
		});

		child.on("exit", (code) => {
			if (code === 0) {
				console.log(`\n✓ clawsewitz updated to ${latest}.`);
				resolvePromise(0);
			} else {
				resolvePromise(code ?? 1);
			}
		});
	});
}
