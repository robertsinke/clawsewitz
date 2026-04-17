export interface PromptSpec {
  name: string;
  description: string;
  args: string;
  section: string;
  topLevelCli: boolean;
}

export interface CliCommand {
  usage: string;
  description: string;
}

export interface CliCommandSection {
  title: string;
  commands: CliCommand[];
}

export function readPromptSpecs(appRoot: string): PromptSpec[];
export const cliCommandSections: CliCommandSection[];
export const topLevelCommandNames: string[];
export function formatCliWorkflowUsage(command: PromptSpec): string;
