import React, { useContext } from "react";
import getScramble from "../scripts/ScrambleHandler";
import { TimerContext } from "../contexts/TimerContext/TimerContext";
import styles from "../../styles/components/Scramble.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate, faCopy } from "@fortawesome/free-solid-svg-icons";

export default function ScrambleOptions() {
	const { newScramble, event, scramble } = useContext(TimerContext);
	return (
		<div className={styles.options}>
			<FontAwesomeIcon
				title="New Scramble"
				icon={faRotate}
				className={styles.options__icon}
				onClick={async () => {
					newScramble(await getScramble(event));
				}}
				tabIndex={0}
			/>
			<FontAwesomeIcon
				title="Copy Scramble"
				icon={faCopy}
				className={styles.options__icon}
				onClick={() => {
					navigator.clipboard.writeText(scramble);
				}}
			/>
		</div>
	);
}
