import { v4 as uuidv4 } from "uuid";

export default function getSolves(event) {
	let solves = JSON.parse(localStorage.getItem(event) || "[]");

	console.table("getSolves");

	return solves;
}

export function solvePush(event, solves) {
	localStorage.setItem(event, JSON.stringify(solves));
}

export function newSolve(time, scramble) {
	let solve = {
		time: time,
		scramble: scramble,
		key: uuidv4().slice(0, 8),
		plus2: false,
		dnf: false,
	};

	return solve;
}

export function solveRemove(solves, index, event) {
	let newSolves = [...solves];

	newSolves.splice(index, 1);
	localStorage.setItem(event, JSON.stringify(newSolves));
	console.log("Remove");
	return newSolves;
}

export function dnf(solves, index, event) {
	let newSolves = [...solves];

	newSolves[index].dnf = !newSolves[index].dnf;
	localStorage.setItem(event, JSON.stringify(newSolves));
	console.log("dnf");
	return newSolves;
}

export function plusTwo(solves, index, event) {
	let newSolves = [...solves];

	if (newSolves[index].plus2) {
		newSolves[index].time -= 2000;
	} else {
		newSolves[index].time += 2000;
	}
	newSolves[index].plus2 = !newSolves[index].plus2;
	localStorage.setItem(event, JSON.stringify(newSolves));
	return newSolves;
}
