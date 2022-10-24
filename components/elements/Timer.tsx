import React, { useState, useRef, useEffect, useContext } from "react";
import TimeRender from "./TimeRender";
import { TimerContext } from "../contexts/TimerContext/TimerContext";
import getScramble from "../scripts/ScrambleHandler";
import styles from "../../styles/components/Timer.module.scss";

export default function Timer() {
	const { timerStop, event } = useContext(TimerContext);
	const [time, setTime] = useState(0);
	const interval = useRef(null);
	const currentEvent = useRef(event);
	let solveTime = 0; //~ Time pushed to the database.

	console.log(`%cTimer - Event: ${event}`, "color: orange");

	const handleStart = ({ key }: KeyboardEvent) => {
		if (key === " " || !key) {
			solveTime = 0;
			window.removeEventListener("keyup", handleSpam, true);
			window.removeEventListener("touchend", handleSpam, true);
			window.removeEventListener("keyup", handleStart, true);
			window.removeEventListener("touchend", handleStart, true);
			window.addEventListener("keydown", handleStop, true);
			window.addEventListener("touchstart", handleStop, true);
			// setInterval() is not accurate: instead, the difference in time
			// from start => stop of the timer is measured.
			clearInterval(interval.current);
			let startTime = Date.now() - time;
			interval.current = setInterval(() => {
				solveTime = Math.floor((Date.now() - startTime) / 10); //~ <-- rounds down to 10ms
				setTime(solveTime);
			}, 10);
		}
	};

	const handleStop = async ({ key }: KeyboardEvent) => {
		if (key === " " || !key) {
			clearInterval(interval.current);
			timerStop(solveTime, await getScramble(currentEvent.current));
			window.removeEventListener("keydown", handleStop, true);
			window.removeEventListener("touchstart", handleStop, true);
			window.addEventListener("keyup", handleSpam, true);
			window.addEventListener("touchend", handleSpam, true);
		}
	};

	// Only enables the handleStart EventListener when space is lifted after
	// the timer has finished. Otherwise, the timer will start instantly after stopping.
	const handleSpam = () => {
		window.addEventListener("keyup", handleStart, true);
		window.addEventListener("touchend", handleStart, true);
	};

	// TODO: There's probably a better way to do this.
	//~ handleStop and handleStart don't have the updated event state.
	//~ This is doesn't happen when the timer is unmounted and
	//~ remounted after the event changes. useRef is a quick fix.
	useEffect(() => {
		currentEvent.current = event;
	}, [event]);

	useEffect(() => {
		window.addEventListener("keyup", handleStart, true);
		window.addEventListener("touchend", handleStart, true);
	}, []);

	return (
		<div className={styles.time}>
			<TimeRender time={time} />
		</div>
	);
}
