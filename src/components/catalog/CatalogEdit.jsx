/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import URL from "@/utils/apiConfig";
import AlertMessage from "../Alert";

const categoryOptions = ["Bolo", "Docinhos", "Outros"];

export default function CatalogEdit({ itemId, itemCategory, itemFlavour, itemValue }) {
	const [open, setOpen] = useState(false);
	const [category, setCategory] = useState(itemCategory);
	const [flavour, setFlavour] = useState(itemFlavour);
	const [formattedValue, setFormattedValue] = useState(`R$ ${itemValue.toFixed(2)}`);
	const [realValue, setRealValue] = useState(itemValue);
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
		const updatedProduct = {};

		if (category) {
			updatedProduct.category = category;
		}

		if (flavour) {
			updatedProduct.flavour = flavour;
		}

		if (realValue) {
			updatedProduct.value = realValue;
		}

		axios
			.put(`${URL}/units/${unitId}/products/${itemId}`, updatedProduct, { headers })
			.then((response) => {
				console.log(response);
				setOpen(false);
				setMessage("Produto editado com sucesso!");
				setSeverity("success");
				window.location.reload();
			})
			.catch((error) => {
				console.log(error);
				setMessage("Erro ao editar produto do catálogo!");
				setSeverity("error");
			});
	};

	const handleValueChange = (e) => {
		const inputValue = e.target.value;
		const numericValue = parseFloat(inputValue.replace(/\D/g, "")) / 100;
		setFormattedValue(`R$ ${numericValue.toFixed(2).replace(".", ",")}`);
		setRealValue(numericValue);
	};

	return (
		<div>
			<AlertMessage message={message} severity={severity} onClose={handleCloseAlert} />
			<Tooltip title="Editar">
				<IconButton onClick={() => setOpen(true)}>
					<EditIcon />
				</IconButton>
			</Tooltip>
			<Dialog open={open} onClose={() => setOpen(false)}>
				<DialogTitle>Editar Produto</DialogTitle>
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
						label="Sabor"
						value={flavour}
						onChange={(e) => setFlavour(e.target.value)}
						placeholder="Sabor"
						fullWidth
						sx={{ marginTop: "20px" }}
					/>
					<TextField
						label="Valor"
						value={formattedValue}
						onChange={handleValueChange}
						placeholder="Valor"
						fullWidth
						sx={{ marginTop: "20px" }}
					/>
				</DialogContent>
				<DialogActions>
					<Button variant="outlined" onClick={() => setOpen(false)}>
            Cancelar
					</Button>
					<Button variant="contained" onClick={handleSave} color="primary">
            Salvar
					</Button>
				</DialogActions>
				<AlertMessage message={message} severity={severity} onClose={handleCloseAlert} />
			</Dialog>
		</div>
	);
}
