import React, { useContext, useState } from "react";
import getScramble from "../../scripts/ScrambleHandler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { TimerContext } from "../../contexts/TimerContext/TimerContext";
import styles from "../../../styles/components/SolveOptions.module.scss";

const events = [
	{ name: "2x2", code: "222" },
	{ name: "3x3", code: "333" },
	{ name: "4x4", code: "444" },
	{ name: "5x5", code: "555" },
	{ name: "6x6", code: "666" },
	{ name: "7x7", code: "777" },
	{ name: "3x3 OH", code: "333oh" },
	{ name: "Pyraminx", code: "pyram" },
	{ name: "Megaminx", code: "minx" },
	{ name: "Skewb", code: "skewb" },
	{ name: "Square-1", code: "sq1" },
	{ name: "Clock", code: "clock" },
];

export default function EventSelect() {
	const { changeEvent, event } = useContext(TimerContext);
	const [isActive, setIsActive] = useState(false);
	const [selected, setSelected] = useState(events.find(({ code }) => code === event));

	console.log(`EventSelect ${event}`);

	const elements = () => {
		return (
			<div
				className={
					styles.eventSelect__elements + " " + (!isActive && styles["eventSelect__elements--hide"])
				}>
				{events.map((item, index) => {
					return (
						<button
							className={
								styles.eventSelect__element +
								" " +
								(events[index] == selected ? styles["eventSelect__element--selected"] : "")
							}
							key={index}
							onClick={async () => {
								setIsActive(false);
								if (events[index] != selected) {
									setSelected(events[index]);
									changeEvent(item.code, await getScramble(item.code));
								}
							}}>
							{item.name}
						</button>
					);
				})}
			</div>
		);
	};

	return (
		<div className={styles.eventSelect}>
			<button
				title="Change Event"
				className={styles.eventSelect__button}
				type="button"
				onClick={() => {
					setIsActive(!isActive);
				}}>
				{selected.name}
				<FontAwesomeIcon icon={faCaretDown} />
			</button>
			{elements()}
		</div>
	);
}
