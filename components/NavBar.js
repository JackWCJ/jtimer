import React from "react";

export default function NavBar({ setEvent, getScramble }) {
	return (
		<div className="w-full h-12 flex justify-between items-center text-center px-4">
			<p
				onClick={() => {
					setEvent("333");
					getScramble("333");
				}}>
				3x3
			</p>
			<p
				onClick={() => {
					setEvent("444");
					getScramble("444");
				}}>
				4x4
			</p>
		</div>
	);
}
