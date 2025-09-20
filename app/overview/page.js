"use client";
import { useAppContext } from "../context/AppContext";
import * as XLSX from "xlsx";
import { useState } from "react";

export default function OverviewPage() {
	const { schedule, setSchedule } = useAppContext();
	const [editing, setEditing] = useState(null);

	if (!Object.keys(schedule).length) {
		return <p style={{ padding: "20px" }}>No schedule generated yet. Go back and create one first.</p>;
	}

	// Remove a meeting
	const handleRemove = (date, index) => {
		const updated = { ...schedule };
		updated[date].splice(index, 1);
		setSchedule(updated);
	};

	// Edit a meeting (change class name for demo)
	const handleEdit = (date, index, newClass) => {
		const updated = { ...schedule };
		updated[date][index].class_name = newClass;
		setSchedule(updated);
		setEditing(null);
	};

	// Export to Excel (same as Day 7)
	const handleExport = () => {
		const wb = XLSX.utils.book_new();
		const overviewData = [["Class", "Total Meetings"]];
		const classSummary = {};
		Object.values(schedule).forEach((meetings) => {
			meetings.forEach((m) => {
				if (!classSummary[m.class_name]) classSummary[m.class_name] = 0;
				classSummary[m.class_name]++;
			});
		});
		Object.entries(classSummary).forEach(([cls, count]) => overviewData.push([cls, count]));
		const overviewWS = XLSX.utils.aoa_to_sheet(overviewData);
		XLSX.utils.book_append_sheet(wb, overviewWS, "Overview");

		Object.entries(schedule).forEach(([date, meetings]) => {
			const sheetData = [["Student", "Class", "Age", "Instructor"]];
			meetings.forEach((m) => sheetData.push([m.student_name, m.class_name, m.age, m.instructor_name]));
			const ws = XLSX.utils.aoa_to_sheet(sheetData);
			XLSX.utils.book_append_sheet(wb, ws, date);
		});

		XLSX.writeFile(wb, "Meeting_Schedule.xlsx");
	};

	return (
		<div style={{ padding: "20px" }}>
			<h1>Overview</h1>
			<button onClick={handleExport} style={{ marginBottom: "20px", padding: "10px 15px" }}>
				Export to Excel
			</button>

			{Object.entries(schedule).map(([date, meetings]) => (
				<div key={date} style={{ marginBottom: "20px" }}>
					<h3>{date}</h3>
					<table style={{ width: "100%", borderCollapse: "collapse" }}>
						<thead>
							<tr style={{ background: "#f0f0f0" }}>
								<th>Student</th>
								<th>Class</th>
								<th>Age</th>
								<th>Instructor</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{meetings.map((m, i) => (
								<tr key={i}>
									<td>{m.student_name}</td>
									<td>
										{editing === `${date}-${i}` ? (
											<input
												defaultValue={m.class_name}
												onBlur={(e) => handleEdit(date, i, e.target.value)}
											/>
										) : (
											m.class_name
										)}
									</td>
									<td>{m.age}</td>
									<td>{m.instructor_name}</td>
									<td>
										<button onClick={() => setEditing(`${date}-${i}`)}>Edit</button>
										<button onClick={() => handleRemove(date, i)}>Remove</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			))}
		</div>
	);
}