# Releasing

`clawsewitz` ships to npm via a tag-triggered GitHub Actions workflow (`.github/workflows/publish.yml`). Local `npm publish` works too, but CI is the canonical path.

## Cutting a release

1. Bump `"version"` in `package.json` (semver).
2. Add a `## X.Y.Z — YYYY-MM-DD` entry at the top of `CHANGELOG.md` describing what changed.
3. Commit: `git commit -am "release: vX.Y.Z"`.
4. Tag and push:
   ```
   git tag vX.Y.Z
   git push origin main vX.Y.Z
   ```
5. The `Publish to npm` workflow runs on the tag push: it typechecks, builds, tests, and publishes with provenance using the `NPM_TOKEN` secret.
6. Verify: `npm view clawsewitz version` should show the new version within a minute.
7. Create a GitHub Release pointing at the tag, with the CHANGELOG entry as the body.

## One-time setup

- **`NPM_TOKEN` secret** (`Settings → Secrets and variables → Actions`): an npm "Automation" token from npmjs.com that bypasses 2FA on publish.
- **Maintainer access** on the `clawsewitz` npm package.

## Publishing manually (fallback)

If CI is broken or you need to publish from a clean checkout:

```
npm login
npm run typecheck && npm run build && npm test
npm publish --access public
```

`prepublishOnly` in `package.json` runs the same gates automatically, so a bare `npm publish` is also safe — the script will refuse to ship if any check fails.

## Safety nets

- `files` in `package.json` is an allowlist — anything not listed is excluded from the tarball. Verify with `npm pack --dry-run`.
- `dist/` is gitignored; `prepack` and `prepublishOnly` rebuild it before any tarball is created.
- The CI workflow requires `id-token: write` so npm provenance attestations are generated. This proves the tarball came from this repo at this commit.
