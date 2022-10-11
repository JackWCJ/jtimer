import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { randomScrambleForEvent } from "cubing/scramble";

export default function Timer() {
	const [isActive, setIsActive] = useState(false);
	const [time, setTime] = useState(0);
	const [scramble, setScramble] = useState();
	const interval = useRef(null);

	const getScramble = async () => {
		setScramble((await randomScrambleForEvent("333")).toString());
	};

	const handleStart = ({ key }) => {
		if (key === " ") {
			window.removeEventListener("keyup", handleStart, true);
			window.addEventListener("keydown", handleStop, true);
			clearInterval(interval.current);
			let startTime = Date.now() - time;
			interval.current = setInterval(() => {
				setTime(Date.now() - startTime);
			}, 10);
			setIsActive(true);
		}
	};

	const handleStop = ({ key }) => {
		if (key === " ") {
			window.removeEventListener("keydown", handleStop, true);
			setTimeout(() => {
				window.addEventListener("keyup", handleStart, true);
			}, 2000);
			clearInterval(interval.current);
			setIsActive(false);
			getScramble();
		}
	};

	useEffect(() => {
		window.addEventListener("keyup", handleStart, true);
		getScramble();
	}, []);

	// const handleReset = () => {
	// 	clearInterval(interval.current);
	// 	setIsActive(false);
	// 	setTime(0);
	// };

	return (
		<>
			{scramble}
			<div className="text-7xl">
				<span>{("0" + Math.floor((time / 60000) % 1000)).slice(-2)}:</span>
				<span>{("0" + Math.floor((time / 1000) % 1000)).slice(-2)}.</span>
				<span>{("00" + (time % 1000)).slice(-3, -1)}</span>
			</div>
		</>
	);
}
