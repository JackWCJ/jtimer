import React, { useContext } from "react";
import styles from "../../styles/components/SolveList.module.scss";

import { TimerContext } from "../contexts/TimerContext/TimerContext";
import SolveRender from "./SolveRender";

export default function SolveList() {
	const { solves } = useContext(TimerContext);

	console.log("solvelist");

	return (
		<div className={styles.solveList}>
			<div className={styles.solveList__solves}>
				{solves.map((solve, index, solves) => {
					return <SolveRender key={solve.key} solve={solve} index={index} solves={solves} />;
				})}
			</div>
		</div>
	);
}
