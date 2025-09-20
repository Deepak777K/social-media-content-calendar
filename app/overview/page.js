"use client";
import { useAppContext } from "../context/AppContext";
import * as XLSX from "xlsx";
import { useState } from "react";

// Shared cell style
const cellStyle = { border: "1px solid #ccc", padding: "8px" };

export default function OverviewPage() {
	const { schedule, setSchedule } = useAppContext();
	const [editing, setEditing] = useState(null);

	if (!Object.keys(schedule).length) {
		return <p style={{ padding: "20px" }}>No schedule generated yet. Go back and create one first.</p>;
	}

	// Collect all unique class names
	const allClasses = Array.from(
		new Set(Object.values(schedule).flat().map((m) => m.class_name))
	);

	// Build overviewData
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

	overviewData.push(["Total", ...allClasses.map((cls) => totals[cls]), grandTotal]);

	// Export to Excel
	const handleExport = () => {
		const wb = XLSX.utils.book_new();
		const overviewWS = XLSX.utils.aoa_to_sheet(overviewData);
		XLSX.utils.book_append_sheet(wb, overviewWS, "Overview");

		Object.entries(schedule).forEach(([date, meetings]) => {
			const sheetData = [["Date", "Student Name", "Class", "Age", "Meeting Link", "Attendance"]];
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
			<button onClick={handleExport} style={{
				margin: "20px 0",
				padding: "10px 15px",
				background: "#4cafef",
				color: "white",
				border: "none",
				borderRadius: "4px",
				cursor: "pointer",
			}}>
				Export to Excel
			</button>

			{/* Overview Table */}
			<h2>Class-wise Overview</h2>
			<table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
				<thead>
					<tr style={{ background: "#f0f0f0" }}>
						{overviewData[0].map((header, i) => (
							<th key={i} style={cellStyle}>{header}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{overviewData.slice(1).map((row, i) => (
						<tr key={i}>
							{row.map((cell, j) => (
								<td key={j} style={cellStyle}>{cell}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>

			{/* Per-date breakdown */}
			{Object.entries(schedule).map(([date, meetings]) => (
				<div key={date} style={{ marginBottom: "20px" }}>
					<h3>{date}</h3>
					<table style={{ width: "100%", borderCollapse: "collapse" }}>
						<thead>
							<tr style={{ background: "#f0f0f0" }}>
								<th style={cellStyle}>Student</th>
								<th style={cellStyle}>Class</th>
								<th style={cellStyle}>Age</th>
								<th style={cellStyle}>Instructor</th>
								<th style={cellStyle}>Actions</th>
							</tr>
						</thead>
						<tbody>
							{meetings.map((m, i) => (
								<tr key={i}>
									<td style={cellStyle}>{m.student_name}</td>
									<td style={cellStyle}>
										{editing === `${date}-${i}` ? (
											<input
												defaultValue={m.class_name}
												onBlur={(e) => {
													const updated = { ...schedule };
													updated[date][i].class_name = e.target.value;
													setSchedule(updated);
													setEditing(null);
												}}
											/>
										) : (
											m.class_name
										)}
									</td>
									<td style={cellStyle}>{m.age}</td>
									<td style={cellStyle}>{m.instructor_name}</td>
									<td style={cellStyle}>
										<button onClick={() => setEditing(`${date}-${i}`)}>Edit</button>
										<button
											onClick={() => {
												const updated = { ...schedule };
												updated[date].splice(i, 1);
												setSchedule(updated);
											}}
										>
											Remove
										</button>
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