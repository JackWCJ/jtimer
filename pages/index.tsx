import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import type { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
import styles from "../styles/pages/Home.module.scss";
import TimerLayout from "../components/layouts/TimerLayout";
import { TimerContext } from "../components/contexts/TimerContext/TimerContext";
import Timer from "../components/elements/Timer";
import SolveList from "../components/elements/SolveList";
import SolveOptions from "../components/elements/SolveOptions/SolveOptions";
import Scramble from "../components/elements/Scramble";
import NavBar from "../components/elements/NavBar";
import { preloadScramble } from "../components/scripts/ScrambleHandler";
import { solvePush } from "../components/scripts/SolveHandler";
import {
	getEvent,
	getInspection,
	setEvent,
	setInspection,
} from "../components/scripts/OptionsHandler";

const Home: NextPageWithLayout = () => {
	const [loaded, setLoaded] = useState(false);
	const { preload, event, solves, inspection } = useContext(TimerContext);

	useEffect(() => {
		const indexPreload = async () => {
			let preloadedEvent = getEvent();
			let preloadedInspection = getInspection();
			preload(await preloadScramble(preloadedEvent), preloadedEvent, preloadedInspection);
			console.log("%c3x3 scramble loaded.", "color: PaleGreen");
			setLoaded(true);
		};
		indexPreload();
	}, []);

	useEffect(() => {
		const indexPushInspection = (inspection) => {
			setInspection(inspection);
		};
		loaded && indexPushInspection(inspection);
	}, [inspection]);

	useEffect(() => {
		const indexPushSolves = (event) => {
			solves.length > 0 && solvePush(event, solves);
			console.log(`%cindexPushSolves Event: ${event}`, "color: orange");
		};
		loaded && indexPushSolves(event);
	}, [solves]);

	useEffect(() => {
		const indexPushEvent = (event) => {
			event != "" && setEvent(event);
			console.log(`%cindexPushEvent Event: ${event}`, "color: orange");
		};
		loaded && indexPushEvent(event);
	}, [event]);

	console.log("index");
	if (loaded) {
		return (
			<div className={styles.home}>
				<NavBar />
				<div className={styles.home__main}>
					<SolveOptions />
					<div className={styles.home__content}>
						<Scramble />
						<Timer />
					</div>
				</div>
				<SolveList />
			</div>
		);
	}
	return (
		<div className={styles.loading}>
			<div className={styles.loading__spinners}>
				<FontAwesomeIcon icon={faGear} className="fa-spin fa-2xl" transform={{ rotate: 90 }} />
				<FontAwesomeIcon
					icon={faGear}
					className={"fa-spin fa-spin-reverse fa-2xl " + styles.loading__spinners__last}
				/>
			</div>
		</div>
	);
};

Home.getLayout = function getLayout(page: ReactElement) {
	return <TimerLayout>{page}</TimerLayout>;
};

export default Home;
