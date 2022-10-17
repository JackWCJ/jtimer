import React from "react";
import { v4 as uuidv4 } from "uuid";

export default function SolveHandler(time, scramble, event) {
	let solves = JSON.parse(localStorage.getItem(event) || "[]");

	console.log("solvehandler" + event);
	if (time && scramble) {
		let solve = {
			time: time,
			scramble: scramble,
			key: uuidv4(),
			plus2: false,
			dnf: false,
		};
		solves.unshift(solve);

		localStorage.setItem(event, JSON.stringify(solves));
	}
	return solves;
}

export function SolveRemove(solves, index, event) {
	solves.splice(index, 1);
	localStorage.setItem(event, JSON.stringify(solves));
	console.log("Remove");
}

export function dnf(solves, index, event) {
	solves[index].dnf = !solves[index].dnf;
	localStorage.setItem(event, JSON.stringify(solves));
	console.log("dnf");
}

export function PlusTwo(solves, index, event) {
	if (solves[index].plus2) {
		solves[index].time -= 2000;
		console.log("Minus2");
	} else {
		solves[index].time += 2000;
		console.log("Plus2");
	}
	solves[index].plus2 = !solves[index].plus2;
	localStorage.setItem(event, JSON.stringify(solves));
}
