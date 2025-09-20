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

	// Export to Excel with per-date class breakdown
	const handleExport = () => {
		const wb = XLSX.utils.book_new();

		// Collect all unique class names
		const allClasses = Array.from(
			new Set(Object.values(schedule).flat().map((m) => m.class_name))
		);

		// Build overview data
		const overviewData = [["Date", ...allClasses, "Total Meetings"]];

		const totals = {};
		allClasses.forEach((cls) => (totals[cls] = 0));
		let grandTotal = 0;

		Object.entries(schedule).forEach(([date, meetings]) => {
			const row = [date];
			let rowTotal = 0;

			allClasses.forEach((cls) => {
				const count = meetings.filter((m) => m.class_name === cls).length;
				row.push(count);
				totals[cls] += count;
				rowTotal += count;
			});

			row.push(rowTotal);
			grandTotal += rowTotal;
			overviewData.push(row);
		});

		// Add totals row
		overviewData.push([
			"Total",
			...allClasses.map((cls) => totals[cls]),
			grandTotal,
		]);

		const overviewWS = XLSX.utils.aoa_to_sheet(overviewData);
		XLSX.utils.book_append_sheet(wb, overviewWS, "Overview");

		// Date-wise sheets (unchanged)
		Object.entries(schedule).forEach(([date, meetings]) => {
			const sheetData = [
				["Date", "Student Name", "Class", "Age", "Meeting Link", "Attendance"],
			];
			meetings.forEach((m) => {
				sheetData.push([
					date,
					m.student_name,
					m.class_name,
					m.age,
					m.meeting_link || "https://example.com/meeting",
					m.attendance || "Present",
				]);
			});
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