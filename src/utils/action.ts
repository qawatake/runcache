import * as core from "@actions/core";

// reference: https://github.com/actions/cache/blob/0c45773b623bea8c8e75f6c82b208c3cf94ea4f9/src/utils/actionUtils.ts#L33C1-L42C2
export function getInputAsArray(
	name: string,
	options?: core.InputOptions,
): string[] {
	return core
		.getInput(name, options)
		.split("\n")
		.map((s) => s.replace(/^!\s+/, "!").trim())
		.filter((x) => x !== "");
}
