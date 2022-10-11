import React from "react";

export default function ScramblerSkeleton() {
	return (
		<span className="flex items-center w-full space-x-2 max-w-[360px] animate-pulse">
			<div className="h-3 bg-gray-300 rounded-full dark:bg-gray-600 w-80"></div>
			<div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-40"></div>
			<div className="h-3 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
			<div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-60"></div>
		</span>
	);
}
