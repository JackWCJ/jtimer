import { randomScrambleForEvent } from "cubing/scramble";
import React from "react";

export default async function getScramble(event: string) {
	console.log(`getScramble ${event}`);
	return (await randomScrambleForEvent(event)).toString();
}

export async function preloadScramble(event) {
	console.log("%cPreloading 4x4 scramble...", "color: orange;");
	await randomScrambleForEvent("444");
	console.log("%c4x4 scramble loaded.", "color: PaleGreen");
	console.log("%cPreloading 3x3 scramble...", "color: orange;");
	let scramble = (await randomScrambleForEvent(event)).toString();
	return scramble;
}
