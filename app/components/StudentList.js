import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";

export default function StudentList() {
	const { students } = useAppContext();
	const [filter, setFilter] = useState("");

	const filtered = students.filter(
		(s) =>
			s.student_name.toLowerCase().includes(filter.toLowerCase()) ||
			s.class_name.toLowerCase().includes(filter.toLowerCase())
	);

	return (
		<div style={{ marginTop: "20px" }}>
			<h2>Student Data</h2>
			<input
				type="text"
				placeholder="Filter by name or class"
				value={filter}
				onChange={(e) => setFilter(e.target.value)}
				style={{ marginBottom: "10px", padding: "5px" }}
			/>
			<table style={{ width: "100%", borderCollapse: "collapse" }}>
				<thead>
					<tr style={{ background: "#f0f0f0" }}>
						<th>Name</th>
						<th>Class</th>
						<th>Age</th>
						<th>Meetings</th>
						<th>Instructor</th>
					</tr>
				</thead>
				<tbody>
					{filtered.map((s, i) => (
						<tr key={i}>
							<td>{s.student_name}</td>
							<td>{s.class_name}</td>
							<td>{s.age}</td>
							<td>{s.meetings}</td>
							<td>{s.instructor_name}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}