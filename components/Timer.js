import React, { useState, useRef, useEffect } from "react";
import SolveList from "./SolveList";

export default function Timer({ getScramble, solvePusher }) {
	const [time, setTime] = useState(0);
	const interval = useRef(null);
	let solveTime = 0; // Time pushed to the database.

	const handleStart = ({ key }) => {
		if (key === " " || !key) {
			solveTime = 0;
			window.removeEventListener("keyup", handleStart, true);
			window.removeEventListener("touchend", handleStart, true);
			window.addEventListener("keydown", handleStop, true);
			window.addEventListener("touchstart", handleStop, true);
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

	const handleStop = ({ key }) => {
		if (key === " " || !key) {
			solvePusher(solveTime);
			window.removeEventListener("keydown", handleStop, true);
			window.removeEventListener("touchstart", handleStop, true);
			// A delay of 2s is introduced before the event listener for starting the timer is added again.
			// If there is not a sufficient delay, the timer will end and instantly restart.
			setTimeout(() => {
				window.addEventListener("keyup", handleStart, true);
				window.addEventListener("touchend", handleStart, true);
			}, 2000); //~ <-- handleStart delay.
			clearInterval(interval.current);
			getScramble();
		}
	};

	useEffect(() => {
		window.addEventListener("keyup", handleStart, true);
		window.addEventListener("touchend", handleStart, true);
	}, []);

	console.log("timer");
	return (
		<div className="text-7xl text-center mt-2">
			<span>{("0" + Math.floor((time / 60000) % 1000)).slice(-2)}:</span>
			<span>{("0" + Math.floor((time / 1000) % 1000)).slice(-2)}.</span>
			<span>{("00" + (time % 1000)).slice(-3, -1)}</span>
		</div>
	);
}
