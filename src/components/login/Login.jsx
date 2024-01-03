import { React, useEffect } from "react";
import Button from "@mui/material/Button";
import FormRegister from "./FormRegister";
import LoginGoogle from "./LoginGoogle";

export default function Login() {
	// useEffect(() => {
	// 	const authenticationToken = localStorage.getItem("authentication_token");
	// 	const unitId = localStorage.getItem("unit_id");

	// 	if (authenticationToken && unitId) {
	// 		window.location.href = "/dashboard";
	// 	}
	// }, []);

	const handleClickOpen = () => {
		window.location.href = "/dashboard";
	};

	return (
		<div className="flex flex-col items-center">
			<div className="mb-4">
				{/* <LoginGoogle /> */}
				<Button variant="outlined" onClick={handleClickOpen}>
        	ENTRAR
				</Button>
			</div>
			<FormRegister />
		</div>
	);
}
