export default function getEvent() {
	let event = localStorage.getItem("event") || "333";

	console.table("getEvent");

	return event;
}

export function setEvent(event: string) {
	localStorage.setItem("event", event);
}
