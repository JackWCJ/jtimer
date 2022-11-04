import React from "react";
import styles from "../../styles/components/SolveList.module.scss";

import SolveRender from "./SolveRender";

export default function SolveList() {
	console.log("solvelist");

	return (
		<div className={styles.solveList}>
			<SolveRender />
		</div>
	);
}
