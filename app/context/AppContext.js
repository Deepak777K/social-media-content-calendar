"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const [students, setStudents] = useState([]);
	const [selectedDates, setSelectedDates] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch("/dummy-data.json");
			const data = await res.json();
			setStudents(data);
		};
		fetchData();
	}, []);

	return (
		<AppContext.Provider value={{ students, setStudents, selectedDates, setSelectedDates }}>
			{children}
		</AppContext.Provider>
	);
};
export const useAppContext = () => {
	const context = useContext(AppContext);
	if (!context) throw new Error("useAppContext must be used within AppProvider");
	return context;
};