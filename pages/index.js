import react from "react";
import Timer from "../components/Timer";

export default function Home() {
	return (
		<div className="h-screen bg-black text-white flex flex-col justify-center items-center">
			<Timer />
		</div>
	);
}
