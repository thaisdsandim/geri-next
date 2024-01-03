"use client";

import { React, useEffect } from "react";
import MainMenu from "@/components/MainMenu";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CatalogList from "@/components/catalog/CatalogList";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: "#6A2BC3"
		},
		secondary: {
			main: "#E0C2FF",
			light: "#F5EBFF",
			contrastText: "#47008F",
		},
	},
});

export default function Catalog() {
	// useEffect(() => {
	// 	const authenticationToken = localStorage.getItem("authentication_token");
	// 	const unitId = localStorage.getItem("unit_id");
	
	// 	if (!authenticationToken || !unitId) {
	// 		window.location.href = "/";
	// 	}
	// }, []);

	return (
		<ThemeProvider theme={darkTheme}>
			<main className="min-h-screen">
				<MainMenu />
				<CatalogList />
			</main>
		</ThemeProvider>
	);
}
