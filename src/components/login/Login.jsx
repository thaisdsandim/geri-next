import { React, useEffect } from "react";
import FormRegister from "./FormRegister";
import LoginGoogle from "./LoginGoogle";

export default function Login() {
	useEffect(() => {
		const authenticationToken = localStorage.getItem("authentication_token");
		const unitId = localStorage.getItem("unit_id");

		if (authenticationToken && unitId) {
			window.location.href = "/dashboard";
		}
	}, []);

	return (
		<div className="flex flex-col items-center">
			<div className="mb-4">
				<LoginGoogle />
			</div>
			<FormRegister />
		</div>
	);
}
