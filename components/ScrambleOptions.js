import React from "react";

export default function ScrambleOptions({ getScramble, event }) {
	return (
		<div className="flex gap-4">
			<p
				className="cursor-pointer"
				onClick={() => {
					getScramble(event);
				}}>
				New
			</p>
			<p>Lock</p>
		</div>
	);
}
