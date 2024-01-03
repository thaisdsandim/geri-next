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

export default function CustomerEdit({ customerId, customerName, customerPhone }) {
	const [open, setOpen] = useState(false);
	const [name, setName] = useState(customerName);
	const [phone, setPhone] = useState(customerPhone);
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
		setPhone(formatted);
	};

	const handleSave = () => {
		const updatedCustomer = {};
  
		if (name) {
			updatedCustomer.name = name;
		}
  
		if (phone) {
			updatedCustomer.phone = phone;
		}

		if (phone.length != 15) {
			setMessage("O telefone deve ter 11 dígitos!");
			setSeverity("warning");
			return;
		}
  
		axios
			.put(`${URL}/units/1/costumers/${customerId}`, updatedCustomer)
			.then(response => {
				console.log(response);
				setMessage("Cliente editado com sucesso!");
				setSeverity("sucess");
				setOpen(false);
				window.location.reload();
			})
			.catch(error => {
				console.log(error);
				setMessage("Erro ao editar cliente!");
				setSeverity("error");
			});
	};

	return (
		<div>
			<AlertMessage message={message} severity={severity} onClose={handleCloseAlert} />
			<Button variant="outlined" onClick={() => setOpen(true)}>
        Editar
			</Button>
			<Dialog open={open} onClose={() => setOpen(false)}>
				<DialogTitle>Editar Cliente</DialogTitle>
				<DialogContent>
					<TextField
						label="Nome"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Nome"
						fullWidth
						sx={{ marginTop: "10px" }}
					/>
					<TextField
						label="Telefone"
						value={phone}
						onChange={handlePhoneChange}
						placeholder="(XX) XXXXX-XXXX"
						fullWidth
						sx={{ marginTop: "20px" }}
					/>
				</DialogContent>
				<DialogActions>
					<Button variant="outlined" onClick={() => setOpen(false)}>Cancelar</Button>
					<Button variant="contained" onClick={handleSave} color="primary">
            Salvar
					</Button>
				</DialogActions>
				<AlertMessage message={message} severity={severity} onClose={handleCloseAlert} />
			</Dialog>
		</div>
	);
}
