import { useEffect } from "react";

export default function Scrambler() {
	const moves = [
		"F",
		"F2",
		"F'",
		"U",
		"U2",
		"U'",
		"D",
		"D2",
		"D'",
		"B",
		"B2",
		"B'",
		"L",
		"L2",
		"L'",
		"R",
		"R2",
		"R'",
	];
	let scramble = [];
	for (let i = 0; i <= 20; i++) {
		scramble.push(moves[Math.floor(Math.random() * 18)] + " ");
	}
	return scramble;
}
