import React, { useContext } from "react";
import TimeRender from "./TimeRender";
import styles from "../../styles/components/SolveList.module.scss";
import { TimerContext } from "../contexts/TimerContext/TimerContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus } from "@fortawesome/free-solid-svg-icons";

export default function SolveRender({ solve, index, solves }) {
	const { removeSolve, changePlus2, changeDNF } = useContext(TimerContext);

	console.log("solverender");

	return (
		<div className={styles.solve}>
			<div className={styles.solve__info}>
				<span>{solves.length - index}:</span>
				<span
					className={
						styles.solve__time +
						" " +
						(solve.dnf
							? styles["solve__time--dnf"]
							: solve.plus2
							? styles["solve__time--plus2"]
							: "")
					}>
					{solve.dnf ? "DNF" : <TimeRender time={solve.time} />}
				</span>
			</div>
			<div className={styles.solve__buttons}>
				<span
					title="Toggle +2"
					className={
						solve.plus2 ? styles["solve__buttonsPlus2--active"] : styles.solve__buttonsPlus2
					}
					onClick={() => {
						changePlus2(index);
					}}>
					+2
				</span>
				<span
					title="Toggle DNF"
					className={solve.dnf ? styles["solve__buttonsDNF--active"] : styles.solve__buttonsDNF}
					onClick={() => {
						changeDNF(index);
					}}>
					DNF
				</span>
				<FontAwesomeIcon
					title="Delete Solve"
					icon={faCircleMinus}
					className={styles.solve__buttonsDelete}
					onClick={() => {
						removeSolve(index);
					}}
				/>
			</div>
			{/* <p>{averageOf(index, solves, 5)}</p>
				<p>{averageOf(index, solves, 12)}</p> */}
		</div>
	);
}