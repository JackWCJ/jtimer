import React, { useContext } from "react";
import EventSelect from "./EventSelect";
import Options from "./Options";
import styles from "../../../styles/components/SolveOptions.module.scss";

import { TimerContext } from "../../contexts/TimerContext/TimerContext";

export default function SolveOptions() {
	const {} = useContext(TimerContext);
	console.log("navbar");

	return (
		<div className={styles.solveOptions}>
			<Options />
			<EventSelect />
		</div>
	);
}
