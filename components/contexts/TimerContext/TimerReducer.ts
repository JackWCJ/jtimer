import getSolves, { newSolve, solvePush } from "../../scripts/SolveHandler";

export const ACTIONS = {
	CHANGE_EVENT: "change-event",
	DNF: "dnf",
	NEW_SCRAMBLE: "new-scramble",
	PLUS2: "plus2",
	PRELOAD: "preload",
	REMOVE_SOLVE: "remove-solve",
	TIMER_STOP: "timer-stop",
	TOGGLE_INSPECTION: "toggle-inspection",
};

export const reducer = (state, action) => {
	switch (action.type) {
		case ACTIONS.CHANGE_EVENT:
			console.log(`%cevent: ${action.payload.event}`, "color: orange");
			console.log(`%cscramble: ${action.payload.scramble}`, "color: orange");
			return {
				...state,
				event: action.payload.event,
				solves: getSolves(action.payload.event),
				scramble: action.payload.scramble,
			};

		case ACTIONS.DNF:
			let dnfSolves = [...state.solves];
			dnfSolves[action.payload].dnf = !dnfSolves[action.payload].dnf;
			return {
				...state,
				solves: dnfSolves,
			};

		case ACTIONS.NEW_SCRAMBLE:
			return {
				...state,
				scramble: action.payload,
			};

		case ACTIONS.PLUS2:
			let plus2Solves = [...state.solves];
			if (plus2Solves[action.payload].plus2) {
				plus2Solves[action.payload].time -= 200;
			} else {
				plus2Solves[action.payload].time += 200;
			}
			plus2Solves[action.payload].plus2 = !plus2Solves[action.payload].plus2;
			return {
				...state,
				solves: plus2Solves,
			};

		case ACTIONS.PRELOAD:
			return {
				...state,
				event: action.payload.event,
				solves: getSolves(action.payload.event),
				scramble: action.payload.scramble,
				inspection: action.payload.inspection,
			};

		case ACTIONS.REMOVE_SOLVE:
			let removeSolves = [...state.solves];
			removeSolves.splice(action.payload, 1);
			solvePush(state.event, removeSolves);
			return {
				...state,
				solves: removeSolves,
			};

		case ACTIONS.TIMER_STOP:
			return {
				...state,
				solves: [newSolve(action.payload.time, state.scramble), ...state.solves],
				scramble: action.payload.scramble,
			};

		case ACTIONS.TOGGLE_INSPECTION:
			console.log(!state.inspection);
			return {
				...state,
				inspection: !state.inspection,
			};

		default:
			return state;
	}
};
