import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const appRoot = resolve(here, "..");
const appRequire = createRequire(resolve(appRoot, "package.json"));

function findPackageRoot(packageName) {
  const segments = packageName.split("/");
  let current = appRoot;
  while (current !== dirname(current)) {
    for (const candidate of [resolve(current, "node_modules", ...segments), resolve(current, ...segments)]) {
      if (existsSync(resolve(candidate, "package.json"))) {
        return candidate;
      }
    }
    current = dirname(current);
  }

  for (const spec of [`${packageName}/dist/index.js`, `${packageName}/dist/cli.js`, packageName]) {
    try {
      let current = dirname(appRequire.resolve(spec));
      while (current !== dirname(current)) {
        if (existsSync(resolve(current, "package.json"))) {
          return current;
        }
        current = dirname(current);
      }
    } catch {
      continue;
    }
  }
  return null;
}

const piPackageRoot = findPackageRoot("@mariozechner/pi-coding-agent");
const piTuiRoot = findPackageRoot("@mariozechner/pi-tui");

if (!piPackageRoot) {
  console.warn("[clawsewitz] pi-coding-agent not found, skipping Pi patches");
}

// 1. Patch piConfig name + configDir
const packageJsonPath = piPackageRoot ? resolve(piPackageRoot, "package.json") : null;
if (packageJsonPath && existsSync(packageJsonPath)) {
  const pkg = JSON.parse(readFileSync(packageJsonPath, "utf8"));
  if (pkg.piConfig?.name !== "clawsewitz" || pkg.piConfig?.configDir !== ".clawsewitz") {
    pkg.piConfig = {
      ...(pkg.piConfig || {}),
      name: "clawsewitz",
      configDir: ".clawsewitz",
    };
    writeFileSync(packageJsonPath, JSON.stringify(pkg, null, "\t") + "\n", "utf8");
  }
}

// 2. Patch process.title + stdin error guard
const cliPath = piPackageRoot ? resolve(piPackageRoot, "dist", "cli.js") : null;
const bunCliPath = piPackageRoot ? resolve(piPackageRoot, "dist", "bun", "cli.js") : null;

for (const entryPath of [cliPath, bunCliPath].filter(Boolean)) {
  if (!existsSync(entryPath)) continue;

  let cliSource = readFileSync(entryPath, "utf8");
  if (cliSource.includes('process.title = "pi";')) {
    cliSource = cliSource.replace('process.title = "pi";', 'process.title = "clawsewitz";');
  }
  const stdinErrorGuard = [
    "const cwHandleStdinError = (error) => {",
    '    if (error && typeof error === "object") {',
    '        const code = "code" in error ? error.code : undefined;',
    '        const syscall = "syscall" in error ? error.syscall : undefined;',
    '        if ((code === "EIO" || code === "EBADF") && syscall === "read") {',
    "            return;",
    "        }",
    "    }",
    "};",
    'process.stdin?.on?.("error", cwHandleStdinError);',
  ].join("\n");
  if (!cliSource.includes('process.stdin?.on?.("error", cwHandleStdinError);')) {
    cliSource = cliSource.replace(
      'process.emitWarning = (() => { });',
      `process.emitWarning = (() => { });\n${stdinErrorGuard}`,
    );
  }
  writeFileSync(entryPath, cliSource, "utf8");
}

// 3. Patch window title
const interactiveModePath = piPackageRoot ? resolve(piPackageRoot, "dist", "modes", "interactive", "interactive-mode.js") : null;
if (interactiveModePath && existsSync(interactiveModePath)) {
  const source = readFileSync(interactiveModePath, "utf8");
  if (source.includes("`\u03C0 - ${sessionName} - ${cwdBasename}`")) {
    writeFileSync(
      interactiveModePath,
      source
        .replace("`\u03C0 - ${sessionName} - ${cwdBasename}`", "`clawsewitz - ${sessionName} - ${cwdBasename}`")
        .replace("`\u03C0 - ${cwdBasename}`", "`clawsewitz - ${cwdBasename}`"),
      "utf8",
    );
  }
}

// 4. Patch terminal stdin error handling
const terminalPath = piTuiRoot ? resolve(piTuiRoot, "dist", "terminal.js") : null;
if (terminalPath && existsSync(terminalPath)) {
  let terminalSource = readFileSync(terminalPath, "utf8");
  if (!terminalSource.includes("stdinErrorHandler;")) {
    terminalSource = terminalSource.replace(
      "    stdinBuffer;\n    stdinDataHandler;\n",
      [
        "    stdinBuffer;",
        "    stdinDataHandler;",
        "    stdinErrorHandler = (error) => {",
        '        if ((error?.code === "EIO" || error?.code === "EBADF") && error?.syscall === "read") {',
        "            return;",
        "        }",
        "    };",
      ].join("\n") + "\n",
    );
  }
  if (!terminalSource.includes('process.stdin.on("error", this.stdinErrorHandler);')) {
    terminalSource = terminalSource.replace(
      '        process.stdin.resume();\n',
      '        process.stdin.resume();\n        process.stdin.on("error", this.stdinErrorHandler);\n',
    );
  }
  if (!terminalSource.includes('            process.stdin.removeListener("error", this.stdinErrorHandler);')) {
    terminalSource = terminalSource.replace(
      '            process.stdin.removeListener("data", onData);\n            this.inputHandler = previousHandler;\n',
      [
        '            process.stdin.removeListener("data", onData);',
        '            process.stdin.removeListener("error", this.stdinErrorHandler);',
        '            this.inputHandler = previousHandler;',
      ].join("\n"),
    );
    terminalSource = terminalSource.replace(
      '        process.stdin.pause();\n',
      '        process.stdin.removeListener("error", this.stdinErrorHandler);\n        process.stdin.pause();\n',
    );
  }
  writeFileSync(terminalPath, terminalSource, "utf8");
}
