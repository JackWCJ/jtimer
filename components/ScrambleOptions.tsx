import React from "react";

export default function ScrambleOptions({ getScramble, event, scramble }) {
	return (
		<div id="scrambleOptions" className="flex flex-col justify-center items-center">
			<span id="scramble" className="text-2xl max-w-4xl text-center">
				{scramble}
			</span>
			<div id="scrambleOptionsBtns" className="flex justify-center items-center gap-4">
				<p
					id="newScramble"
					className="cursor-pointer"
					onClick={() => {
						getScramble(event);
					}}>
					New
				</p>
				<p id="lockScramble" className="line-through">
					Lock
				</p>
			</div>
		</div>
	);
}
