import React from "react";
import { v4 as uuidv4 } from "uuid";

export default function SolveHandler(time, scramble) {
	let solves = JSON.parse(localStorage.getItem("solves") || "[]");

	console.log("solvehandler");
	if (time && scramble) {
		let solve = {
			time: time,
			scramble: scramble,
			key: uuidv4(),
		};
		solves.unshift(solve);

		localStorage.setItem("solves", JSON.stringify(solves));
	}
	return solves;
}

export function SolveRemove(solves, index) {
	solves.splice(index, 1);
	localStorage.setItem("solves", JSON.stringify(solves));
	console.log("Remove");
}
