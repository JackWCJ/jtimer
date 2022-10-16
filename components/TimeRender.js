import React from "react";

export default function TimeRender({ time }) {
	return (
		<>
			{time >= 60000 ? <span>{Math.floor(time / 60000)}:</span> : null}
			<span>
				{time >= 60000
					? ("0" + Math.floor((time % 60000) / 1000)).slice(-2)
					: Math.floor((time / 1000) % 1000)}
				.
			</span>
			{/* <span>{Math.floor(((time > 60000 ? "0" + (time - 60000) : time) / 1000) % 1000)}.</span> */}
			<span>{("00" + (time % 1000)).slice(-3, -1)}</span>
		</>
	);
}
