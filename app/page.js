"use client";
import { useAppContext } from "./context/AppContext";

export default function HomePage() {
	const { students, selectedDates, setSelectedDates } = useAppContext();

	return (
		<div>
			<h1>Meeting Scheduler</h1>
			<h2>Students Loaded: {students.length}</h2>
			<ul>
				{students.map((s, i) => (
					<li key={i}>
						{s.student_name} ({s.class_name}, Age {s.age})
					</li>
				))}
			</ul>

			<button onClick={() => setSelectedDates([...selectedDates, "2025-09-20"])}>
				Add Today’s Date
			</button>

			<p>Selected Dates: {selectedDates.join(", ")}</p>
		</div>
	);
}