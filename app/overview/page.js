"use client";
import { useAppContext } from "../context/AppContext";

export default function OverviewPage() {
	const { schedule } = useAppContext();

	if (!Object.keys(schedule).length) {
		return <p style={{ padding: "20px" }}>No schedule generated yet. Go back and create one first.</p>;
	}

	const classSummary = {};
	Object.values(schedule).forEach((meetings) => {
		meetings.forEach((m) => {
			if (!classSummary[m.class_name]) classSummary[m.class_name] = 0;
			classSummary[m.class_name]++;
		});
	});

	return (
		<div style={{ padding: "20px" }}>
			<h1>Overview</h1>

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