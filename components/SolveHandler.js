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
			plus2: false,
			dnf: false,
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

export function dnf(solves, index) {
	solves[index].dnf = !solves[index].dnf;
	localStorage.setItem("solves", JSON.stringify(solves));
	console.log("dnf");
}

export function PlusTwo(solves, index) {
	if (solves[index].plus2) {
		solves[index].time -= 2000;
		console.log("Minus2");
	} else {
		solves[index].time += 2000;
		console.log("Plus2");
	}
	solves[index].plus2 = !solves[index].plus2;
	localStorage.setItem("solves", JSON.stringify(solves));
}
