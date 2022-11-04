import React, { useContext, useRef } from "react";
import TimeRender from "./TimeRender";
import styles from "../../styles/components/SolveList.module.scss";
import { TimerContext } from "../contexts/TimerContext/TimerContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import { ViewportList } from "react-viewport-list";

export default function SolveRender() {
	const { removeSolve, changePlus2, changeDNF, solves } = useContext(TimerContext);
	const ref = useRef(null);

	console.log("SolveRender");

	type Solve = {
		time: number;
		scramble: string;
		key: string;
		plus2: boolean;
		dnf: boolean;
	};

	return (
		<div className={styles.solveList__solves} ref={ref}>
			<ViewportList viewportRef={ref} items={solves}>
				{(solve: Solve) => (
					<div className={styles.solve} key={solve.key}>
						<div className={styles.solve__info}>
							<span>{solves.length - solves.indexOf(solve)}:</span>
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
									changePlus2(solves.indexOf(solve));
								}}>
								+2
							</span>
							<span
								title="Toggle DNF"
								className={
									solve.dnf ? styles["solve__buttonsDNF--active"] : styles.solve__buttonsDNF
								}
								onClick={() => {
									changeDNF(solves.indexOf(solve));
								}}>
								DNF
							</span>
							<FontAwesomeIcon
								title="Delete Solve"
								icon={faCircleMinus}
								className={styles.solve__buttonsDelete}
								onClick={() => {
									removeSolve(solves.indexOf(solve));
								}}
							/>
						</div>
					</div>
				)}
			</ViewportList>
		</div>
	);
}
