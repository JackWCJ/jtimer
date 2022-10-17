import React, { useState, Fragment } from "react";
import DropdownSelect from "./EventSelect";

const events = [
	{ name: "2x2", code: "222" },
	{ name: "3x3", code: "333" },
	{ name: "4x4", code: "444" },
	{ name: "5x5", code: "555" },
	{ name: "6x6", code: "666" },
	{ name: "7x7", code: "777" },
];

export default function NavBar({ getScramble, event }) {
	return (
		<div className="flex justify-between items-center text-center px-4">
			<span>jTimer</span>
			<DropdownSelect items={events} getScramble={getScramble} event={event} />
		</div>
	);
}
