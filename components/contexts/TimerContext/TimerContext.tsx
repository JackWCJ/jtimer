import { createContext, useReducer } from "react";
import { ACTIONS, reducer } from "./TimerReducer";

export const TimerContext = createContext(null);

export const TimerContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, {
		event: "",
		scramble: "",
		inspection: false,
		solves: [],
	});

	const changeEvent = (event: string, scramble: string) => {
		dispatch({
			type: ACTIONS.CHANGE_EVENT,
			payload: { event, scramble },
		});
	};

	const changeDNF = (index: number) => {
		dispatch({
			type: ACTIONS.DNF,
			payload: index,
		});
	};

	const changePlus2 = (index: number) => {
		dispatch({
			type: ACTIONS.PLUS2,
			payload: index,
		});
	};

	const newScramble = (scramble: string) => {
		dispatch({
			type: ACTIONS.NEW_SCRAMBLE,
			payload: scramble,
		});
	};

	const preload = (preloadedScramble: string, event: string, inspection: boolean) => {
		dispatch({
			type: ACTIONS.PRELOAD,
			payload: { scramble: preloadedScramble, event: event, inspection: inspection },
		});
	};

	const removeSolve = (index: number) => {
		dispatch({
			type: ACTIONS.REMOVE_SOLVE,
			payload: index,
		});
	};

	const timerStop = (time: number, scramble: string) => {
		dispatch({
			type: ACTIONS.TIMER_STOP,
			payload: { time: time, scramble: scramble },
		});
	};

	const toggleInspection = () => {
		dispatch({
			type: ACTIONS.TOGGLE_INSPECTION,
		});
	};

	const values = {
		event: state.event,
		scramble: state.scramble,
		inspection: state.inspection,
		solves: state.solves,
		changeEvent,
		changeDNF,
		changePlus2,
		newScramble,
		preload,
		removeSolve,
		timerStop,
		toggleInspection,
	};

	return <TimerContext.Provider value={values}>{children}</TimerContext.Provider>;
};
