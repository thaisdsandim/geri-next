/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import "./globals.css";
import { Lato } from "next/font/google";

const lato = Lato({
	weight: ["400"],
	subsets: ["latin"]
});

export const metadata = {
	title: "Geri",
	description: "Gerenciamento de pedidos",
};

export default function RootLayout({ children }) {
	return (
		<html lang="pt-BR">
			<body className={lato.className}>{children}</body>
		</html>
	);
}
