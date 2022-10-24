import React, { useContext } from "react";
import EventSelect from "./EventSelect";
import styles from "../../styles/components/SolveOptions.module.scss";

import { TimerContext } from "../contexts/TimerContext/TimerContext";

export default function SolveOptions() {
	const {} = useContext(TimerContext);
	console.log("navbar");

	return (
		<div className={styles.options}>
			<span>jTimer</span>
			<EventSelect />
		</div>
	);
}
