/* eslint-disable react/prop-types */
import { React, useEffect } from "react";
import Alert from "@mui/material/Alert";

export default function AlertMessage({ message, severity, onClose }) {
	useEffect(() => {
		let timer;
		if (message) {
			timer = setTimeout(() => {
				onClose();
			}, 3000);
		}
		return () => clearTimeout(timer);
	}, [message, onClose]);

	if (!message) {
		return null;
	}

	return (
		<Alert variant="filled" severity={severity} style={{ position: "fixed", top: 0, left: 0, width: "100vw", display: "flex", alignItems: "center", justifyContent: "center" }}>
			{message}
		</Alert>
	);
}
