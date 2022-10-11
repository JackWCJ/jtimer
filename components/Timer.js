import React, { useState, useRef, useEffect } from "react";
import { randomScrambleForEvent } from "cubing/scramble"; //? This project uses cubing.js - https://github.com/cubing/cubing.js
import ScramblerSkeleton from "./ScramblerSkeleton";

export default function Timer() {
	const [isActive, setIsActive] = useState(false); //! Deprecated. Previously used to determine whether start/stop button should show.
	const [time, setTime] = useState(0);
	const [scramble, setScramble] = useState("");
	const [loading, setLoading] = useState(true);
	const interval = useRef(null);

	const getScramble = async () => {
		setScramble((await randomScrambleForEvent("333")).toString());
		// A 200ms delay is introduced before the scramble is shown, to prevent
		// the skeleton from hiding before the scramble is actually ready to mount.
		setTimeout(() => {
			setLoading(false);
		}, 200); //~ <-- SKELETON DELAY.
	};

	const handleStart = ({ key }) => {
		if (key === " ") {
			window.removeEventListener("keyup", handleStart, true);
			window.addEventListener("keydown", handleStop, true);
			// setInterval() is not accurate: instead, the difference in time
			// from start => stop of the timer is measured.
			clearInterval(interval.current); // Removes any existing interval
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
			// A delay of 2s is introduced before the event listener for starting the timer is added again.
			// If there is not a sufficient delay, the timer will end and instantly restart.
			setTimeout(() => {
				window.addEventListener("keyup", handleStart, true);
			}, 2000); //~ <-- KEYUP DELAY.
			clearInterval(interval.current);
			setIsActive(false);
			getScramble();
		}
	};

	useEffect(() => {
		getScramble();
		window.addEventListener("keyup", handleStart, true);
	}, []);

	return (
		<div>
			<div className="h-[21px] flex items-center">
				{loading ? <ScramblerSkeleton /> : <span className="text-center">{scramble}</span>}
			</div>
			<div className="text-7xl text-center mt-2">
				<span>{("0" + Math.floor((time / 60000) % 1000)).slice(-2)}:</span>
				<span>{("0" + Math.floor((time / 1000) % 1000)).slice(-2)}.</span>
				<span>{("00" + (time % 1000)).slice(-3, -1)}</span>
			</div>
		</div>
	);
}
