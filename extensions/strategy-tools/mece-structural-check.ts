import { Type } from "@sinclair/typebox";
import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";

export function registerMeceStructuralCheck(pi: ExtensionAPI): void {
	pi.registerTool({
		name: "mece_structural_check",
		label: "MECE Structural Check",
		description:
			"Structural validation of a decomposition tree — checks consistent dimensions, obvious duplicates, level counts, and missing sections. For semantic MECE judgment (is this truly ME? truly CE?), invoke the analyst agent instead.",
		parameters: Type.Object({
			tree: Type.String({
				description: "The decomposition tree as markdown (headings or bullet list)",
			}),
		}),
		async execute(_id, params) {
			const tree = params.tree;
			const issues: string[] = [];

			// Parse tree into levels by heading depth or indent
			const lines = tree.split("\n").filter((l) => l.trim());

			// Check 1: Count top-level branches
			const topLevel = lines.filter(
				(l) => l.match(/^##?\s/) || l.match(/^-\s/) || l.match(/^\d+\.\s/),
			);
			if (topLevel.length < 2) {
				issues.push("Too few top-level branches (found " + topLevel.length + "). A decomposition needs at least 2.");
			}
			if (topLevel.length > 9) {
				issues.push("Too many top-level branches (" + topLevel.length + "). Consider grouping — 3-7 is the sweet spot.");
			}

			// Check 2: Detect obvious duplicates (case-insensitive)
			const normalized = topLevel.map((l) =>
				l.replace(/^[#\-\d.]+\s*/, "").trim().toLowerCase(),
			);
			const seen = new Set<string>();
			for (const item of normalized) {
				if (seen.has(item)) {
					issues.push(`Duplicate branch detected: "${item}"`);
				}
				seen.add(item);
			}

			// Check 3: Check for near-duplicates (shared first 3 words)
			const firstWords = normalized.map((n) => n.split(/\s+/).slice(0, 3).join(" "));
			const wordsSeen = new Map<string, number>();
			for (const words of firstWords) {
				wordsSeen.set(words, (wordsSeen.get(words) ?? 0) + 1);
			}
			for (const [words, count] of wordsSeen) {
				if (count > 1 && words.length > 5) {
					issues.push(`Possible overlap: ${count} branches start with "${words}"`);
				}
			}

			// Check 4: Consistent sub-level depth
			const depths = lines.map((l) => {
				const headingMatch = l.match(/^(#{1,6})\s/);
				if (headingMatch) return headingMatch[1].length;
				const indentMatch = l.match(/^(\s*)/);
				if (indentMatch) return Math.floor(indentMatch[1].length / 2);
				return 0;
			});
			const maxDepth = Math.max(...depths);
			if (maxDepth > 5) {
				issues.push(`Tree is ${maxDepth} levels deep — consider flattening. Deep trees are hard to validate for exhaustiveness.`);
			}

			// Check 5: Empty content detection
			if (lines.length < 3) {
				issues.push("Tree appears incomplete — only " + lines.length + " line(s).");
			}

			// Build result
			if (issues.length === 0) {
				return {
					content: [
						{
							type: "text" as const,
							text: "Structural check passed. No obvious structural issues detected.\n\nNote: This is a structural check only. For semantic MECE validation (are branches truly mutually exclusive? truly collectively exhaustive?), invoke the analyst agent.",
						},
					],
					details: undefined,
				};
			}

			return {
				content: [
					{
						type: "text" as const,
						text: `Structural issues found (${issues.length}):\n\n${issues.map((i) => `- ${i}`).join("\n")}\n\nFix these structural issues, then invoke the analyst agent for semantic MECE validation.`,
					},
				],
				details: undefined,
			};
		},
	});
}
