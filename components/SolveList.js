import React, { useState } from "react";
import { dnf, PlusTwo, SolveRemove } from "./SolveHandler";
import TimeRender from "./TimeRender";

export default function SolveList({ solves }) {
	const [update, setUpdate] = useState(0);
	console.log("solvelist");

	return (
		<div className="flex flex-col p-3 min-w-2/5">
			<SolveRender solves={solves} updater={setUpdate} />
		</div>
	);
}

function SolveRender({ solves, updater }) {
	console.log("solverender");

	return solves.map((solve, index, solves) => {
		console.log(solve.time);
		return (
			<div key={solve.key} className="flex justify-between gap-24">
				<div className="flex gap-4">
					<p
						className="hover:text-red-500 cursor-pointer"
						onClick={() => {
							SolveRemove(solves, index);
							updater(Math.random());
						}}>
						{solves.length - index}:
					</p>
					<p
						className={
							solve.dnf ? "text-red-500" : solve.plus2 ? "text-orange-300" : "text-green-500"
						}>
						{solve.dnf ? "DNF" : <TimeRender time={solve.time} />}
						{solve.plus2 && !solve.dnf ? "+" : null}
					</p>
				</div>
				<div className="flex gap-4">
					<p
						className="cursor-pointer"
						onClick={() => {
							PlusTwo(solves, index);
							updater(Math.random());
						}}>
						+2
					</p>
					<p
						className="cursor-pointer"
						onClick={() => {
							dnf(solves, index);
							updater(Math.random());
						}}>
						DNF
					</p>
				</div>
				{/* <p>{averageOf(index, solves, 5)}</p>
				<p>{averageOf(index, solves, 12)}</p> */}
			</div>
		);
	});
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
