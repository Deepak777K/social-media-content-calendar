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
	const { selectedDates, setSelectedDates } = useAppContext();

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
							{day.getDate()}
						</div>
					);
				})}
			</div>

			<p style={{ marginTop: "15px" }}>
				Selected Dates: {selectedDates.join(", ")}
			</p>
		</div>
	);
}