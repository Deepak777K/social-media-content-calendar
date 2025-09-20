"use client";
import React from "react";
import { useAppContext } from "../context/AppContext";

export default function StudentList() {
	const { students } = useAppContext();

	if (!students.length) return <p>Loading students...</p>;

	return (
		<div style={{ marginTop: "20px" }}>
			<h2>Student Data</h2>
			<table
				style={{
					width: "100%",
					borderCollapse: "collapse",
					marginTop: "10px",
				}}
			>
				<thead>
					<tr style={{ background: "#f0f0f0" }}>
						<th style={{ border: "1px solid #ccc", padding: "8px" }}>Name</th>
						<th style={{ border: "1px solid #ccc", padding: "8px" }}>Class</th>
						<th style={{ border: "1px solid #ccc", padding: "8px" }}>Age</th>
						<th style={{ border: "1px solid #ccc", padding: "8px" }}>Meetings</th>
						<th style={{ border: "1px solid #ccc", padding: "8px" }}>Instructor</th>
					</tr>
				</thead>
				<tbody>
					{students.map((s, i) => (
						<tr key={i}>
							<td style={{ border: "1px solid #ccc", padding: "8px" }}>{s.student_name}</td>
							<td style={{ border: "1px solid #ccc", padding: "8px" }}>{s.class_name}</td>
							<td style={{ border: "1px solid #ccc", padding: "8px" }}>{s.age}</td>
							<td style={{ border: "1px solid #ccc", padding: "8px" }}>{s.meetings}</td>
							<td style={{ border: "1px solid #ccc", padding: "8px" }}>{s.instructor_name}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}