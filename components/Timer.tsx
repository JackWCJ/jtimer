import React, { useState, useRef, useEffect } from "react";
import TimeRender from "./TimeRender";

export default function Timer({ getScramble, solvePusher, event }) {
	const [time, setTime] = useState(0);
	const interval = useRef(null);
	const ref = useRef(null);
	let solveTime = 0; // Time pushed to the database.

	const handleStart = ({ key }: KeyboardEvent) => {
		if (key === " " || !key) {
			solveTime = 0;
			window.removeEventListener("keyup", handleStart, true);
			ref.current.removeEventListener("touchend", handleStart, true);
			window.addEventListener("keydown", handleStop, true);
			ref.current.addEventListener("touchstart", handleStop, true);
			// setInterval() is not accurate: instead, the difference in time
			// from start => stop of the timer is measured.
			clearInterval(interval.current);
			let startTime = Date.now() - time;
			interval.current = setInterval(() => {
				// TODO: Make this a bit more pretty.
				solveTime = Math.floor((Date.now() - startTime) / 10) * 10; //~ <-- rounds down to 10ms
				setTime(solveTime);
			}, 10);
		}
	};

	const handleStop = ({ key }: KeyboardEvent) => {
		if (key === " " || !key) {
			solvePusher(solveTime);
			window.removeEventListener("keydown", handleStop, true);
			ref.current.removeEventListener("touchstart", handleStop, true);
			// A delay of 2s is introduced before the event listener for starting the timer is added again.
			// If there is not a sufficient delay, the timer will end and instantly restart.
			setTimeout(() => {
				window.addEventListener("keyup", handleStart, true);
				ref.current.addEventListener("touchend", handleStart, true);
			}, 2000); //~ <-- handleStart delay.
			clearInterval(interval.current);
			getScramble(event);
		}
	};

	useEffect(() => {
		window.addEventListener("keyup", handleStart, true);
		ref.current.addEventListener("touchend", handleStart, true);
	}, []);

	console.log("timer");
	return (
		<div className="text-7xl text-center select-none" ref={ref}>
			<TimeRender time={time} />
		</div>
	);
}
