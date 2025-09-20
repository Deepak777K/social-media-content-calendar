"use client";
import { useAppContext } from "../context/AppContext";
import * as XLSX from "xlsx";

export default function OverviewPage() {
	const { schedule } = useAppContext();

	if (!Object.keys(schedule).length) {
		return <p style={{ padding: "20px" }}>No schedule generated yet. Go back and create one first.</p>;
	}

	// Build class-wise summary
	const classSummary = {};
	Object.values(schedule).forEach((meetings) => {
		meetings.forEach((m) => {
			if (!classSummary[m.class_name]) classSummary[m.class_name] = 0;
			classSummary[m.class_name]++;
		});
	});

	// Export to Excel
	const handleExport = () => {
		const wb = XLSX.utils.book_new();

		// 1. Overview Sheet
		const overviewData = [["Class", "Total Meetings"]];
		Object.entries(classSummary).forEach(([cls, count]) => {
			overviewData.push([cls, count]);
		});
		const overviewWS = XLSX.utils.aoa_to_sheet(overviewData);
		XLSX.utils.book_append_sheet(wb, overviewWS, "Overview");

		// 2. Date-wise Sheets
		Object.entries(schedule).forEach(([date, meetings]) => {
			const sheetData = [["Student", "Class", "Age", "Instructor"]];
			meetings.forEach((m) => {
				sheetData.push([m.student_name, m.class_name, m.age, m.instructor_name]);
			});
			const ws = XLSX.utils.aoa_to_sheet(sheetData);
			XLSX.utils.book_append_sheet(wb, ws, date);
		});

		// Download file
		XLSX.writeFile(wb, "Meeting_Schedule.xlsx");
	};

	return (
		<div style={{ padding: "20px" }}>
			<h1>Overview</h1>

			<button
				onClick={handleExport}
				style={{
					marginBottom: "20px",
					padding: "10px 15px",
					background: "#4cafef",
					color: "white",
					border: "none",
					borderRadius: "4px",
					cursor: "pointer",
				}}
			>
				Export to Excel
			</button>

			{/* Daily Breakdown */}
			<h2>Daily Schedule</h2>
			{Object.entries(schedule).map(([date, meetings]) => (
				<div key={date} style={{ marginBottom: "20px" }}>
					<h3>{date}</h3>
					<table style={{ width: "100%", borderCollapse: "collapse" }}>
						<thead>
							<tr style={{ background: "#f0f0f0" }}>
								<th style={{ border: "1px solid #ccc", padding: "8px" }}>Student</th>
								<th style={{ border: "1px solid #ccc", padding: "8px" }}>Class</th>
								<th style={{ border: "1px solid #ccc", padding: "8px" }}>Age</th>
								<th style={{ border: "1px solid #ccc", padding: "8px" }}>Instructor</th>
							</tr>
						</thead>
						<tbody>
							{meetings.map((m, i) => (
								<tr key={i}>
									<td style={{ border: "1px solid #ccc", padding: "8px" }}>{m.student_name}</td>
									<td style={{ border: "1px solid #ccc", padding: "8px" }}>{m.class_name}</td>
									<td style={{ border: "1px solid #ccc", padding: "8px" }}>{m.age}</td>
									<td style={{ border: "1px solid #ccc", padding: "8px" }}>{m.instructor_name}</td>
								</tr>
							))}
						</tbody>
					</table>
					<p><strong>Total Meetings:</strong> {meetings.length}</p>
				</div>
			))}

			{/* Class Summary */}
			<h2>Class-wise Summary</h2>
			<table style={{ width: "50%", borderCollapse: "collapse" }}>
				<thead>
					<tr style={{ background: "#f0f0f0" }}>
						<th style={{ border: "1px solid #ccc", padding: "8px" }}>Class</th>
						<th style={{ border: "1px solid #ccc", padding: "8px" }}>Total Meetings</th>
					</tr>
				</thead>
				<tbody>
					{Object.entries(classSummary).map(([className, count]) => (
						<tr key={className}>
							<td style={{ border: "1px solid #ccc", padding: "8px" }}>{className}</td>
							<td style={{ border: "1px solid #ccc", padding: "8px" }}>{count}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}