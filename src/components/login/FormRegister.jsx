import { React, useState, useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import emailjs from "@emailjs/browser";
import AlertMessage from "../Alert";

export default function FormDialog() {
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState("");
	const [severity, setSeverity] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [messageText, setMessageText] = useState("");

	const serviceId = "service_866m4dz";
	const templateId = "template_guxh768";
	const userId = "IPjhIUVeygJvsyWBU";
	const form = useRef();

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleCloseAlert = () => {
		setMessage("");
	};

	const sendEmail = (e) => {
		e.preventDefault();

		if (name.trim() === "" || email.trim() === "" || messageText.trim() === "") {
			setMessage("Preencha todos os campos!");
			setSeverity("warning");
			return;
		}

		if (name.split(" ").length < 2) {
			setMessage("Digite o Nome Completo!");
			setSeverity("warning");
			return;
		}

		if (!email.match(/^\S+@\S+\.\S+$/)) {
			setMessage("Digite um email válido!");
			setSeverity("warning");
			return;
		}

		const emailParams = {
			from_name: name,
			from_email: email,
			message: messageText,
		};

		emailjs
			.send(serviceId, templateId, emailParams, userId)
			.then((result) => {
				console.log(result);
				setMessage("Cadastro enviado com sucesso!");
				setSeverity("success");
				setOpen(false);
			})
			.catch((error) => {
				console.log(error);
				setMessage("Erro ao enviar o e-mail!");
				setSeverity("error");
			});
	};

	return (
		<div>
			<AlertMessage message={message} severity={severity} onClose={handleCloseAlert} />
			<Button variant="outlined" onClick={handleClickOpen}>
        CADASTRAR
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<AlertMessage message={message} severity={severity} onClose={handleCloseAlert} />
				<DialogTitle>Cadastre-se no Geri</DialogTitle>
				<DialogContent>
					<DialogContentText>
            Deixe seu contato que retornaremos com informações sobre planos e valores:
					</DialogContentText>
					<form ref={form}>
						<TextField
							required
							name="from_name"
							label="Nome Completo"
							type="name"
							placeholder="Nome Completo"
							fullWidth
							sx={{ marginTop: "20px" }}
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<TextField
							required
							name="from_email"
							label="Email"
							type="email"
							placeholder="seu@email.com"
							fullWidth
							sx={{ marginTop: "20px" }}
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<TextField
							required
							name="message"
							label="Mensagem"
							type="message"
							placeholder="Digite sua mensagem aqui..."
							fullWidth
							sx={{ marginTop: "20px" }}
							value={messageText}
							onChange={(e) => setMessageText(e.target.value)}
						/>
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>CANCELAR</Button>
					<Button variant="outlined" onClick={sendEmail}>
            ENVIAR
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
