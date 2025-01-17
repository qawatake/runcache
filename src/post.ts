// some modifications were made to https://github.com/actions/setup-go/tree/v5.0.2/src
import * as core from "@actions/core";
import { cachePackages } from "./cache-save";
import * as utils from "./utils/action";

// Catch and log any unhandled exceptions.  These exceptions can leak out of the uploadChunk method in
// @actions/toolkit when a failed upload closes the file descriptor causing any in-process reads to
// throw an uncaught exception.  Instead of failing this action, just warn.
process.on("uncaughtException", (e) => {
	const warningPrefix = "[warning]";
	core.info(`${warningPrefix}${e.message}`);
});

// Added early exit to resolve issue with slow post action step:
// - https://github.com/actions/setup-node/issues/878
// https://github.com/actions/cache/pull/1217
async function run(earlyExit?: boolean): Promise<void> {
	try {
		await cachePackages(
			utils.getInputAsArray("path"),
			core.getInput("github-token"),
		);

		if (earlyExit) {
			process.exit(0);
		}
	} catch (error) {
		let message = "Unknown error!";
		if (error instanceof Error) {
			message = error.message;
		}
		if (typeof error === "string") {
			message = error;
		}
		core.warning(message);
	}
}

run(true);
