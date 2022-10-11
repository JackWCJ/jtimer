import { randomScrambleForEvent } from "cubing/scramble";
import { useEffect, useRef, useState } from "react";

export default async function Scrambler() {
	const [scramble, setScramble] = useState("");
	const getScramble = async () => {
		const response = (await randomScrambleForEvent("333")).toString();
		setScramble(response);
	};

	useEffect(() => {
		getScramble();
	}, []);

	return scramble;
}
