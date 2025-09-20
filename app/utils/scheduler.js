
export function generateSchedule(students, selectedDates) {
	if (!selectedDates.length) return {};

	const sorted = [...students].sort((a, b) => b.age - a.age);

	const schedule = {};
	selectedDates.forEach((d) => (schedule[d] = []));

	let dateIndex = 0;

	for (let student of sorted) {
		for (let i = 0; i < student.meetings; i++) {
			const date = selectedDates[dateIndex % selectedDates.length];
			schedule[date].push({
				student_name: student.student_name,
				class_name: student.class_name,
				age: student.age,
				instructor_name: student.instructor_name,
				meeting_number: i + 1,
			});
			dateIndex++;
		}
	}

	console.log(schedule)
	return schedule;
}