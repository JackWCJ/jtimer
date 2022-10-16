import React from "react";

export default function NavBar({ getScramble, event }) {
	return (
		<div className="w-full h-12 flex justify-between items-center text-center px-4">
			<p
				onClick={() => {
					event.current = "333";
					getScramble(event);
				}}>
				3x3
			</p>
			<p
				onClick={() => {
					event.current = "444";
					getScramble(event);
				}}>
				4x4
			</p>
		</div>
	);
}
