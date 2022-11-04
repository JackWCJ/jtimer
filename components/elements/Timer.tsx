import React, { useState, useRef, useEffect, useContext } from "react";
import TimeRender from "./TimeRender";
import { TimerContext } from "../contexts/TimerContext/TimerContext";
import getScramble from "../scripts/ScrambleHandler";
import styles from "../../styles/components/Timer.module.scss";

export default function Timer() {
	const { timerStop, event, inspection } = useContext(TimerContext);
	const [time, setTime] = useState(0);
	const [inspectionTime, setInspectionTime] = useState<any>(15);
	const timerEvent = useRef(event);
	const timerInspection = useRef(inspection);
	const interval = useRef(null);
	const [inspectionActive, setInspectionActive] = useState(false);
	let solveTime: number; //~ Time pushed to the database.
	let inspectionCounter = 15;

	console.log(`%cTimer - Event: ${event}`, "color: orange");

	const handleInspection = ({ key }: any) => {
		if (key === " " || !key) {
			solveTime = 0;
			inspectionCounter = 15;
			setInspectionTime(15);
			setTime(0);
			// setInterval() is not accurate: instead, the difference in time
			// from start => stop of the timer is measured.
			clearInterval(interval.current);
			window.removeEventListener("keyup", handleSpam, true);
			window.removeEventListener("touchend", handleSpam, true);
			window.removeEventListener("keyup", handleInspection, true);
			window.removeEventListener("touchend", handleInspection, true);
			if (timerInspection.current) {
				setInspectionActive(true);
				window.addEventListener("keyup", handleStart, true);
				window.addEventListener("touchend", handleStart, true);
				interval.current = setInterval(() => {
					inspectionCounter--;
					if (inspectionCounter > 0) {
						setInspectionTime(inspectionCounter);
					} else if (inspectionCounter > -2) {
						setInspectionTime("+2");
					} else {
						setInspectionTime("DNF");
						clearInterval(interval.current);
					}
				}, 1000);
			} else {
				handleStart(" ");
			}
		}
	};

	const handleStart = ({ key }: any) => {
		if (key === " " || !key) {
			clearInterval(interval.current);
			inspection && setInspectionActive(false);
			window.removeEventListener("keyup", handleStart, true);
			window.removeEventListener("touchend", handleStart, true);
			window.addEventListener("keydown", handleStop, true);
			window.addEventListener("touchstart", handleStop, true);
			let startTime = Date.now();
			interval.current = setInterval(() => {
				solveTime = Math.floor((Date.now() - startTime) / 10); //~ <-- rounds down to 10ms
				setTime(solveTime);
			}, 10);
		}
	};

	const handleStop = async ({ key }: any) => {
		if (key === " " || !key) {
			clearInterval(interval.current);
			timerStop(solveTime, await getScramble(timerEvent.current));
			window.removeEventListener("keydown", handleStop, true);
			window.removeEventListener("touchstart", handleStop, true);
			window.addEventListener("keyup", handleSpam, true);
			window.addEventListener("touchend", handleSpam, true);
		}
	};

	// Only enables the handleStart EventListener when space is lifted after
	// the timer has finished. Otherwise, the timer will start instantly after stopping.
	const handleSpam = () => {
		window.addEventListener("keyup", handleInspection, true);
		window.addEventListener("touchend", handleInspection, true);
	};

	// TODO: There's probably a better way to do this.
	//~ The handlers don't perceive the updated state of event and inspection.
	//~ This doesn't happen if the timer remounts - useRef is a botched fix.
	useEffect(() => {
		timerEvent.current = event;
	}, [event]);
	useEffect(() => {
		timerInspection.current = inspection;
	}, [inspection]);

	useEffect(() => {
		window.addEventListener("keyup", handleInspection, true);
		window.addEventListener("touchend", handleInspection, true);
	}, []);

	return (
		<div className={styles.time}>
			{!inspectionActive ? <TimeRender time={time} /> : <span>{inspectionTime}</span>}
		</div>
	);
}
