"use client";
import CalendarGrid from "./components/CalendarGrid";
import StudentList from "./components/StudentList";

export default function HomePage() {
	return (
		<div style={{ padding: "20px" }}>
			<h1>Meeting Scheduler</h1>
			<CalendarGrid />
			<StudentList />
		</div>
	);
}