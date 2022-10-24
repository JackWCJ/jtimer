import React from "react";

export default function TimeRender({ time }) {
	return (
		<>
			{time >= 6000 ? <span>{Math.floor(time / 6000)}:</span> : null}
			<span>
				{time >= 6000
					? ("0" + Math.floor((time % 6000) / 100)).slice(-2)
					: Math.floor((time / 100) % 100)}
				.
			</span>
			<span>{("00" + (time % 100)).slice(-2)}</span>
		</>
	);
}
