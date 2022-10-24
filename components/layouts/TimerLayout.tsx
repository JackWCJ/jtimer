import { TimerContextProvider } from "../contexts/TimerContext/TimerContext";

export default function TimerLayout({ children }) {
	return (
		<>
			<TimerContextProvider>{children}</TimerContextProvider>
		</>
	);
}
