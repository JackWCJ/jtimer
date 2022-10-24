import React from "react";
import styles from "../../styles/components/NavBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHardDrive, faCircleQuestion, faCircle, faGear } from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
	return (
		<div className={styles.navBar}>
			<svg
				className={styles.navBar__logo}
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 1000 1000">
				<rect x="153.85" y="538.46" width="307.69" height="307.69" rx="153.85" />
				<rect x="538.46" y="153.85" width="307.69" height="692.31" rx="153.85" />
				<path d="M975.79,187.9A307.49,307.49,0,0,0,692.31,0H307.69A307.49,307.49,0,0,0,0,307.69V692.31A307.49,307.49,0,0,0,307.69,1000H692.31A307.49,307.49,0,0,0,1000,692.31V307.69A305.93,305.93,0,0,0,975.79,187.9ZM923.08,692.31c0,127.45-103.32,230.77-230.77,230.77H307.69c-127.45,0-230.77-103.32-230.77-230.77V307.69c0-127.45,103.32-230.77,230.77-230.77H692.31c127.45,0,230.77,103.32,230.77,230.77Z" />
			</svg>
			<FontAwesomeIcon icon={faHardDrive} className={styles.navBar__icon} />
			<FontAwesomeIcon icon={faCircleQuestion} className={styles.navBar__icon} />
			<div className={styles.navBar__settings}>
				<FontAwesomeIcon icon={faCircle} className={styles.navBar__settingsCircle} />
				<FontAwesomeIcon icon={faGear} className={styles.navBar__settingsGear} />
			</div>
		</div>
	);
}
