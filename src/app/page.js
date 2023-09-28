/* eslint-disable react/react-in-jsx-scope */
"use client";

import Login from "@/components/login/Login";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Image from "next/image";

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

export default function Home() {
	return (
		<ThemeProvider theme={darkTheme}>
			<main className="flex min-h-screen flex-col items-center">
				<div className="flex flex-col items-center">
					<Image src="/geri.png" alt="Logo Geri" width={310} height={310} />
					<p className="text-sm">Bem-vindo ao</p>
					<h1 className="text-6xl font-bold pb-6">Geri</h1>
				</div>
				<Login />
			</main>
		</ThemeProvider>
	);
}
