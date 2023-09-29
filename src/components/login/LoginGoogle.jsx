import { React, useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import AlertMessage from "../Alert";
import URL from "../../utils/apiConfig";

export default function LoginGoogle() {
	const [message, setMessage] = useState("");
	const [severity, setSeverity] = useState("");

	const handleCloseAlert = () => {
		setMessage("");
	};

	const handleSuccessfulLogin = () => {
		setMessage("Login feito com sucesso! Redirecionando...");
		setSeverity("success");
		setTimeout(() => {
			window.location.href = "/dashboard";
		}, 2000);
	};

	return (
		<div>
			<AlertMessage message={message} severity={severity} onClose={handleCloseAlert} />
			<GoogleOAuthProvider clientId="1033725976196-e7dvq1747ipd9ih09ck807mdjo1as5jm.apps.googleusercontent.com">
				<GoogleLogin
					theme="filled_black"
					text="signin"
					locale="pt-BR"
					onSuccess={credentialResponse => {
						setMessage("Login feito com sucesso!");
						setSeverity("success");
        
						axios.post(`${URL}/users/sign_in`, { token: credentialResponse.credential }, {
							headers: {
								"Content-Type": "application/json"
							}
						})
							.then(response => response.data)
							.then(data => {
								if (data.error) {
									setMessage(data.error);
									setSeverity("error");
								} else {
									localStorage.setItem("authentication_token", data.authentication_token);
									localStorage.setItem("email", data.email);
									localStorage.setItem("name", data.name);
									localStorage.setItem("unit_id", data.unit_id);
									handleSuccessfulLogin();
								}
							})
							.catch(error => {
								console.error(error);
								setMessage("Falha ao fazer o login!");
								setSeverity("error");
							});
					}}
					onError={() => {
						setMessage("Falha ao fazer o login!");
						setSeverity("error");
					}}
				/>
			</GoogleOAuthProvider>
		</div>
	);
}
