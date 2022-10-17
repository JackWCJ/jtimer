import React, { useState, useRef, useEffect } from "react";
import SolveHandler, { dnf, PlusTwo, SolveRemove } from "./SolveHandler";
import TimeRender from "./TimeRender";

export default function SolveList({ event }) {
	const [update, setUpdate] = useState(0);
	const [solves, setSolves] = useState(SolveHandler(false, false, event.current));
	// const solves = useRef(SolveHandler(false, false, event.current));

	// useEffect(() => {
	// 	solves.current = SolveHandler(false, false, event.current);
	// }, []);

	console.log(solves);

	return (
		<div className="flex flex-col p-3 min-w-2/5">
			<p className="font-bold text-center">{event.current}</p>
			<SolveRender solves={solves} updater={setUpdate} event={event} />
		</div>
	);
}

function SolveRender({ solves, updater, event }) {
	console.log("solverender");

	return solves.map((solve, index, solves) => {
		return (
			<div key={solve.key} className="flex justify-between gap-24">
				<div className="flex gap-4">
					<p
						className="hover:text-red-500 cursor-pointer"
						onClick={() => {
							SolveRemove(solves, index, event.current);
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
							PlusTwo(solves, index, event.current);
							updater(Math.random());
						}}>
						+2
					</p>
					<p
						className="cursor-pointer"
						onClick={() => {
							dnf(solves, index, event.current);
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
