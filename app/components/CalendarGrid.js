"use client";
import React from "react";
import { useAppContext } from "../context/AppContext";

const generateCalendarDays = (year, month) => {
	const days = [];
	const date = new Date(year, month, 1);
	while (date.getMonth() === month) {
		days.push(new Date(date));
		date.setDate(date.getDate() + 1);
	}
	return days;
};

export default function CalendarGrid() {
	const { selectedDates, setSelectedDates, schedule } = useAppContext();

	const today = new Date();
	const year = today.getFullYear();
	const month = today.getMonth();
	const days = generateCalendarDays(year, month);

	const toggleDate = (date) => {
		const dateStr = date.toISOString().split("T")[0];
		if (selectedDates.includes(dateStr)) {
			setSelectedDates(selectedDates.filter((d) => d !== dateStr));
		} else {
			setSelectedDates([...selectedDates, dateStr]);
		}
	};

	return (
		<div>
			<h2>
				{today.toLocaleString("default", { month: "long" })} {year}
			</h2>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(7, 1fr)",
					gap: "8px",
					marginTop: "10px",
				}}
			>
				{days.map((day) => {
					const dateStr = day.toISOString().split("T")[0];
					const isSelected = selectedDates.includes(dateStr);
					const meetings = schedule[dateStr] || [];

					return (
						<div
							key={dateStr}
							onClick={() => toggleDate(day)}
							style={{
								padding: "10px",
								textAlign: "center",
								border: "1px solid #ccc",
								borderRadius: "4px",
								cursor: "pointer",
								backgroundColor: isSelected ? "#4cafef" : "#f9f9f9",
								color: isSelected ? "white" : "black",
							}}
						>
							<div>{day.getDate()}</div>
							{meetings.length > 0 && (
								<div
									style={{
										marginTop: "5px",
										fontSize: "0.75rem",
										background: "white",
										color: "black",
										borderRadius: "3px",
										padding: "2px",
									}}
								>
									{meetings.length} meeting{meetings.length > 1 ? "s" : ""}
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}