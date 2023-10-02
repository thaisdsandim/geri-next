import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import axios from "axios";
import URL from "@/utils/apiConfig";
import AlertMessage from "../Alert";
import { AddCircleOutlined as AddIcon } from "@mui/icons-material";

export default function ClientsCreate() {
	const [open, setOpen] = useState(false);
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [formattedPhone, setFormattedPhone] = useState("");
	const unitId = localStorage.getItem("unit_id");
	const authenticationToken = localStorage.getItem("authentication_token");
	const [message, setMessage] = useState("");
	const [severity, setSeverity] = useState("");

	const handleCloseAlert = () => {
		setMessage("");
	};

	const headers = {
		Authorization: `Bearer ${authenticationToken}`
	};

	const handlePhoneChange = (e) => {
		const rawPhone = e.target.value;
		let formatted = rawPhone.replace(/\D/g, "");
		if (formatted.length > 0) {
			formatted = `(${formatted.substring(0, 2)}) ${formatted.substring(2, 7)}-${formatted.substring(7, 11)}`;
		}
		setPhone(rawPhone);
		setFormattedPhone(formatted);
	};

	const handleSave = () => {
		const newCustomer = {
			name: name,
			phone: formattedPhone,
			unit_id: unitId
		};

		if (!name) {
			setMessage("Preencha o nome de cadastro!");
			setSeverity("warning");
			return;
		}

		if (!phone) {
			setMessage("Preencha o telefone de cadastro!");
			setSeverity("warning");
			return;
		}

		if (formattedPhone.length != 15) {
			setMessage("O telefone deve ter 11 dígitos!");
			setSeverity("warning");
			return;
		}

		axios
			.post(`${URL}/units/${unitId}/costumers`, newCustomer, { headers })
			.then(response => {
				console.log(response);
				setMessage("Cadastro efetuado com sucesso!");
				setSeverity("success");
				setOpen(false);
				window.location.reload();
			})
			.catch(error => {
				console.error(error.response.data);
				setMessage("Não foi possivel efetuar o cadastro!");
				setSeverity("error");
			});
	};

	return (
		<div>
			<AlertMessage message={message} severity={severity} onClose={handleCloseAlert} />
			<div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
				<Button variant="text" color="primary" onClick={() => setOpen(true)}>
					<AddIcon style={{ fontSize: 50 }} />
				</Button>
			</div>
			<Dialog open={open} onClose={() => setOpen(false)}>
				<DialogTitle>Cadastrar Cliente</DialogTitle>
				<DialogContent>
					<TextField
						required
						label="Nome"
						onChange={(e) => setName(e.target.value)}
						placeholder="Nome"
						fullWidth
						sx={{ marginTop: "10px" }}
					/>
					<TextField
						required
						label="Telefone"
						value={formattedPhone}
						onChange={handlePhoneChange}
						placeholder="(XX) XXXXX-XXXX"
						fullWidth
						sx={{ marginTop: "20px" }}
					/>
				</DialogContent>
				<DialogActions>
					<Button variant="outlined" onClick={() => setOpen(false)}>Cancelar</Button>
					<Button variant="contained" onClick={handleSave}>
            Salvar
					</Button>
				</DialogActions>
				<AlertMessage message={message} severity={severity} onClose={handleCloseAlert} />
			</Dialog>
		</div>
	);
}
