import React, { useContext, useState } from "react";
import getScramble from "../../scripts/ScrambleHandler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { TimerContext } from "../../contexts/TimerContext/TimerContext";
import styles from "../../../styles/components/SolveOptions.module.scss";

export default function Options() {
	const { inspection, toggleInspection } = useContext(TimerContext);
	const [isActive, setIsActive] = useState(false);

	console.log("Options");

	const elements = () => {
		return (
			<div
				className={
					styles.eventSelect__elements + " " + (!isActive && styles["eventSelect__elements--hide"])
				}>
				<button
					className={styles.eventSelect__element}
					onClick={() => {
						setIsActive(false);
						toggleInspection();
					}}>
					{inspection ? "INSPECTION!" : "inspection"}
				</button>
			</div>
		);
	};

	return (
		<div className={styles.eventSelect}>
			<button
				title="Options"
				className={styles.eventSelect__button}
				type="button"
				onClick={() => {
					setIsActive(!isActive);
				}}>
				Options
				<FontAwesomeIcon icon={faCaretDown} />
			</button>
			{elements()}
		</div>
	);
}
