/* eslint-disable react/react-in-jsx-scope */
"use client";

import MainMenu from "@/components/MainMenu";
import UnderDevelopment from "@/components/UnderDevelopment";
import { ThemeProvider, createTheme } from "@mui/material/styles";

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

export default function Orders() {
	return (
		<ThemeProvider theme={darkTheme}>
			<main className="min-h-screen">
				<MainMenu />
				<UnderDevelopment />
			</main>
		</ThemeProvider>
	);
}
