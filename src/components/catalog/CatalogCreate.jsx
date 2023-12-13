import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import URL from "@/utils/apiConfig";
import AlertMessage from "../Alert";
import { AddCircleOutlined as AddIcon } from "@mui/icons-material";

const categoryOptions = ["Bolo", "Docinhos", "Outros"];

export default function CatalogCreate() {
	const [open, setOpen] = useState(false);
	const [category, setCategory] = useState("");
	const [flavour, setFlavour] = useState("");
	const [formattedValue, setFormattedValue] = useState("");
	const [realValue, setRealValue] = useState("");
	const unitId = localStorage.getItem("unit_id");
	const authenticationToken = localStorage.getItem("authentication_token");
	const [message, setMessage] = useState("");
	const [severity, setSeverity] = useState("");

	const handleCloseAlert = () => {
		setMessage("");
	};

	const headers = {
		Authorization: `Bearer ${authenticationToken}`,
	};

	const handleSave = () => {
		const newProduct = {
			category: category,
			flavour: flavour,
			value: realValue,
			unit_id: unitId,
		};

		if (!category) {
			setMessage("Preencha a categoria do produto!");
			setSeverity("warning");
			return;
		}

		if (!flavour) {
			setMessage("Preencha o sabor do produto!");
			setSeverity("warning");
			return;
		}

		if (!realValue) {
			setMessage("Preencha o valor do produto!");
			setSeverity("warning");
			return;
		}

		axios
			.post(`${URL}/units/${unitId}/products`, newProduct, { headers })
			.then((response) => {
				console.log(response);
				setMessage("Cadastro efetuado com sucesso!");
				setSeverity("success");
				setOpen(false);
				window.location.reload();
			})
			.catch((error) => {
				console.error(error.response.data);
				setMessage("Não foi possível efetuar o cadastro!");
				setSeverity("error");
			});
	};

	const handleValueChange = (e) => {
		const inputValue = e.target.value;
		const numericValue = parseFloat(inputValue.replace(/\D/g, "")) / 100;
		setFormattedValue(`R$ ${numericValue.toFixed(2).replace(".", ",")}`);
		setRealValue(numericValue);
	};

	let valueLabel = "Valor do produto";
	let valuePlaceholder = "Digite o valor do produto...";

	if (category === "Bolo") {
		valueLabel = "Valor por kg";
		valuePlaceholder = "Digite o valor por kg...";
	} else if (category === "Docinhos") {
		valueLabel = "Valor do cento";
		valuePlaceholder = "Digite o valor do cento...";
	}

	return (
		<div>
			<AlertMessage message={message} severity={severity} onClose={handleCloseAlert} />
			<div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
				<Tooltip title="Cadastrar">
					<Button variant="text" color="primary" onClick={() => setOpen(true)}>
						<AddIcon style={{ fontSize: 50 }} />
					</Button>
				</Tooltip>
			</div>
			<Dialog open={open} onClose={() => setOpen(false)}>
				<DialogTitle>Cadastrar Produto</DialogTitle>
				<DialogContent>
					<FormControl fullWidth sx={{ marginTop: "10px" }}>
						<InputLabel id="category-label">Categoria</InputLabel>
						<Select
							labelId="category-label"
							id="category"
							value={category}
							label="Categoria"
							onChange={(e) => setCategory(e.target.value)}
						>
							{categoryOptions.map((option) => (
								<MenuItem key={option} value={option}>
									{option}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<TextField
						required
						label="Tipo"
						onChange={(e) => setFlavour(e.target.value)}
						placeholder="Digite o tipo do produto..."
						fullWidth
						sx={{ marginTop: "10px" }}
					/>
					<TextField
						required
						label={valueLabel}
						value={formattedValue}
						onChange={handleValueChange}
						placeholder={valuePlaceholder}
						fullWidth
						sx={{ marginTop: "10px" }}
					/>
				</DialogContent>
				<DialogActions>
					<Button variant="outlined" onClick={() => setOpen(false)}>
						Cancelar
					</Button>
					<Button variant="contained" onClick={handleSave}>
						Salvar
					</Button>
				</DialogActions>
				<AlertMessage message={message} severity={severity} onClose={handleCloseAlert} />
			</Dialog>
		</div>
	);
}
