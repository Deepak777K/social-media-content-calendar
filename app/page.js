"use client";
import CalendarGrid from "./components/CalendarGrid";
import { useAppContext } from "./context/AppContext";

export default function HomePage() {
	const { students } = useAppContext();

	return (
		<div style={{ padding: "20px" }}>
			<h1>Meeting Scheduler</h1>
			<h2>Students Loaded: {students.length}</h2>

			<CalendarGrid />
		</div>
	);
}