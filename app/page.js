"use client";
import CalendarGrid from "./components/CalendarGrid";
import StudentList from "./components/StudentList";
import { useAppContext } from "./context/AppContext";
import { generateSchedule } from "./utils/scheduler";

export default function HomePage() {
	const { students, selectedDates, schedule, setSchedule } = useAppContext();

	const handleGenerate = () => {
		const newSchedule = generateSchedule(students, selectedDates);
		console.log("newSchedule")
		console.log(newSchedule)
		setSchedule(newSchedule);
	};

	return (
		<div style={{ padding: "20px" }}>
			<h1>Meeting Scheduler</h1>
			<CalendarGrid />

			<button
				onClick={handleGenerate}
				style={{
					marginTop: "20px",
					padding: "10px 15px",
					background: "#4cafef",
					color: "white",
					border: "none",
					borderRadius: "4px",
					cursor: "pointer",
				}}
			>
				Generate Schedule
			</button>

			<StudentList />

		</div>
	);
}