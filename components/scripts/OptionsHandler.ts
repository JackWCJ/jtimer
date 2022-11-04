export function getEvent() {
	let event = localStorage.getItem("event") || "333";
	console.table("getEvent");
	return event;
}

export function setEvent(event: string) {
	localStorage.setItem("event", event);
}

export function getInspection() {
	let inspection = JSON.parse(localStorage.getItem("inspection") || "false");
	return inspection;
}

export function setInspection(inspection: boolean) {
	localStorage.setItem("inspection", JSON.stringify(inspection));
}
