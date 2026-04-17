import { existsSync, readFileSync } from "node:fs";
import { delimiter, dirname, isAbsolute, resolve } from "node:path";
import { pathToFileURL } from "node:url";

export type PiRuntimeOptions = {
	appRoot: string;
	workingDir: string;
	sessionDir: string;
	clawsewitzAgentDir: string;
	clawsewitzHome?: string;
	clawsewitzVersion?: string;
	thinkingLevel?: string;
	model?: string;
	oneShotPrompt?: string;
	initialPrompt?: string;
};

export function getClawsewitzNpmPrefixPath(clawsewitzAgentDir: string): string {
	return resolve(dirname(clawsewitzAgentDir), "npm-global");
}

export function applyClawsewitzPackageManagerEnv(clawsewitzAgentDir: string): string {
	const clawsewitzNpmPrefixPath = getClawsewitzNpmPrefixPath(clawsewitzAgentDir);
	process.env.NPM_CONFIG_PREFIX = clawsewitzNpmPrefixPath;
	process.env.npm_config_prefix = clawsewitzNpmPrefixPath;
	return clawsewitzNpmPrefixPath;
}

export function resolvePiPaths(appRoot: string) {
	return {
		piCliPath: resolve(appRoot, "node_modules", "@mariozechner", "pi-coding-agent", "dist", "cli.js"),
		promisePolyfillPath: resolve(appRoot, "dist", "system", "promise-polyfill.js"),
		promisePolyfillSourcePath: resolve(appRoot, "src", "system", "promise-polyfill.ts"),
		tsxLoaderPath: resolve(appRoot, "node_modules", "tsx", "dist", "loader.mjs"),
		extensionPath: resolve(appRoot, "extensions", "strategy-tools.ts"),
		promptTemplatePath: resolve(appRoot, "prompts"),
		systemPromptPath: resolve(appRoot, ".clawsewitz", "SYSTEM.md"),
		nodeModulesBinPath: resolve(appRoot, "node_modules", ".bin"),
		piWorkspaceNodeModulesPath: resolve(appRoot, ".clawsewitz", "npm", "node_modules"),
	};
}

export function toNodeImportSpecifier(modulePath: string): string {
	return isAbsolute(modulePath) ? pathToFileURL(modulePath).href : modulePath;
}

export function validatePiInstallation(appRoot: string): string[] {
	const paths = resolvePiPaths(appRoot);
	const missing: string[] = [];

	if (!existsSync(paths.piCliPath)) missing.push(paths.piCliPath);
	if (!existsSync(paths.promisePolyfillPath)) {
		// Dev fallback: allow running from source without `dist/` build artifacts.
		const hasDevPolyfill = existsSync(paths.promisePolyfillSourcePath) && existsSync(paths.tsxLoaderPath);
		if (!hasDevPolyfill) missing.push(paths.promisePolyfillPath);
	}
	if (!existsSync(paths.extensionPath)) missing.push(paths.extensionPath);
	if (!existsSync(paths.promptTemplatePath)) missing.push(paths.promptTemplatePath);

	return missing;
}

export function buildPiArgs(options: PiRuntimeOptions): string[] {
	const paths = resolvePiPaths(options.appRoot);
	const args = [
		"--session-dir",
		options.sessionDir,
		"--extension",
		paths.extensionPath,
		"--prompt-template",
		paths.promptTemplatePath,
	];

	if (existsSync(paths.systemPromptPath)) {
		args.push("--system-prompt", readFileSync(paths.systemPromptPath, "utf8"));
	}

	if (options.model) {
		args.push("--model", options.model);
	}
	if (options.thinkingLevel) {
		args.push("--thinking", options.thinkingLevel);
	}
	if (options.oneShotPrompt) {
		args.push("-p", options.oneShotPrompt);
	} else if (options.initialPrompt) {
		args.push(options.initialPrompt);
	}

	return args;
}

export function buildPiEnv(options: PiRuntimeOptions): NodeJS.ProcessEnv {
	const paths = resolvePiPaths(options.appRoot);
	const clawsewitzNpmPrefixPath = getClawsewitzNpmPrefixPath(options.clawsewitzAgentDir);

	const currentPath = process.env.PATH ?? "";
	const binEntries = [paths.nodeModulesBinPath, resolve(paths.piWorkspaceNodeModulesPath, ".bin")];
	const binPath = binEntries.join(delimiter);

	return {
		...process.env,
		PATH: `${binPath}${delimiter}${currentPath}`,
		CLAWSEWITZ_VERSION: options.clawsewitzVersion,
		CLAWSEWITZ_HOME: options.clawsewitzHome,
		CLAWSEWITZ_SESSION_DIR: options.sessionDir,
		// Ensure the Pi child process uses clawsewitz's agent dir for auth/models/settings.
		PI_CODING_AGENT_DIR: options.clawsewitzAgentDir,
		PI_HARDWARE_CURSOR: process.env.PI_HARDWARE_CURSOR ?? "1",
		PI_SKIP_VERSION_CHECK: process.env.PI_SKIP_VERSION_CHECK ?? "1",
		// Always pin npm's global prefix to the clawsewitz workspace.
		NPM_CONFIG_PREFIX: clawsewitzNpmPrefixPath,
		npm_config_prefix: clawsewitzNpmPrefixPath,
	};
}
