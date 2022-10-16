import React from "react";

export default function ScrambleOptions({ getScramble }) {
	return (
		<div className="flex gap-4">
			<p
				className="cursor-pointer"
				onClick={() => {
					getScramble();
				}}>
				New
			</p>
			<p>Lock</p>
		</div>
	);
}
