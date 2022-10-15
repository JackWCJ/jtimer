import React, { useState } from "react";
import { SolveRemove } from "./SolveHandler";

export default function SolveList({ solves }) {
	const [update, setUpdate] = useState(0);
	console.log("solvelist");

	return (
		<div className="flex flex-col p-3">
			<SolveRender solves={solves} updater={setUpdate} />
		</div>
	);
}

function SolveRender({ solves, updater }) {
	console.log("solverender");

	return solves.map((solve, index, solves) => {
		return (
			<div key={solve.key} className="flex">
				<p
					className="w-8 hover:text-red-500 cursor-pointer"
					onClick={() => {
						SolveRemove(solves, index);
						updater(Math.random());
					}}>
					{solves.length - index}:
				</p>
				<p>{timeRender(solve.time)}</p>
				{/* <p>{averageOf(index, solves, 5)}</p>
				<p>{averageOf(index, solves, 12)}</p> */}
			</div>
		);
	});
}

function timeRender(time) {
	return (
		("0" + Math.floor((time / 60000) % 1000)).slice(-2) +
		":" +
		("0" + Math.floor((time / 1000) % 1000)).slice(-2) +
		"." +
		("00" + (time % 1000)).slice(-3, -1)
	);
}

// function averageOf(index, solves, averageOfNum) {
// 	if (solves[index + (averageOfNum - 1)]) {
// 		let totalTime = 0;
// 		let solveArr = solves.slice(index, index + averageOfNum).map((item) => item.time);
// 		let max = Math.max(...solveArr);
// 		let min = Math.min(...solveArr);
// 		for (let i = 0; i < solveArr.length; i++) {
// 			solveArr[i] !== min && solveArr[i] !== max ? (totalTime += solveArr[i]) : null;
// 		}
// 		let totalTimeDiv = Math.round(totalTime / (averageOfNum - 2));
// 		return timeRender(totalTimeDiv);
// 	}
// }
