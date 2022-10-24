import React, { useContext } from "react";
import { TimerContext } from "../contexts/TimerContext/TimerContext";
import ScrambleOptions from "./ScrambleOptions";
import styles from "../../styles/components/Scramble.module.scss";

export default function Scramble() {
	const { scramble } = useContext(TimerContext);

	console.log(`Scramble ${scramble}`);
	return (
		<div className={styles.scramble}>
			<p className={styles.scramble__text}>{scramble}</p>
			<ScrambleOptions />
		</div>
	);
}
