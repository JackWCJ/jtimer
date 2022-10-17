import React, { useState } from "react";

export default function EventSelect({ items, event, getScramble }) {
	const [isActive, setIsActive] = useState(false);
	const [selected, setSelected] = useState(items[0]);

	const elements = ({ items }) => {
		return (
			<div className="absolute flex flex-col">
				{items.map((item: any, index: number) => {
					return (
						<button
							className={
								(selected == item ? "bg-indigo-500" : "bg-neutral-500") +
								" p-2 rounded-xl text-center"
							}
							key={index}
							onClick={() => {
								setSelected(items[index]);
								setIsActive(false);
								event.current = item.code;
								getScramble(event);
							}}>
							{item.name}
						</button>
					);
				})}
			</div>
		);
	};

	return (
		<div>
			<button
				className="bg-neutral-500 p-2 rounded-xl text-center"
				type="button"
				onClick={() => {
					setIsActive(!isActive);
				}}>
				{selected.name}
			</button>
			{isActive && elements({ items })}
		</div>
	);
}
