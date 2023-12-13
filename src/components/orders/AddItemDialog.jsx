import React, { useState, useEffect } from "react";
import axios from "axios";
import URL from "@/utils/apiConfig";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function AddItemDialog({ open, onClose, onAddItem }) {
	const unitId = localStorage.getItem("unit_id");
	const authenticationToken = localStorage.getItem("authentication_token");
	const [catalog, setCatalog] = useState([]);
	const [itemCategory, setItemCategory] = useState(null);
	const [itemType, setItemType] = useState(null);
	const [itemQuantity, setItemQuantity] = useState(null);
	const [itemComments, setItemComments] = useState("");

	const headers = {
		Authorization: `Bearer ${authenticationToken}`
	};

	const handleAddItem = () => {
		if (itemCategory && itemType && itemQuantity && itemComments) {
			const formattedQuantity = parseFloat(itemQuantity).toFixed(3);

			const newItem = {
				category: itemCategory,
				type: itemType,
				quantity: parseFloat(formattedQuantity),
				comments: itemComments,
			};

			onAddItem(newItem);

			setItemCategory(null);
			setItemType(null);
			setItemQuantity("");
			setItemComments("");
		}
	};

	useEffect(() => {
		axios
			.get(`${URL}/units/${unitId}/products`, { headers })
			.then((response) => {
				setCatalog(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	function removeDuplicates(array, key) {
		return array.filter((item, index, self) =>
			index === self.findIndex((t) => (
				t[key] === item[key]
			))
		);
	}

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Adicionar Item</DialogTitle>
			<DialogContent>
				<Autocomplete
					id="category-autocomplete"
					sx={{ marginTop: "10px" }}
					options={removeDuplicates(catalog, "category")}
					getOptionLabel={(option) => option.category}
					value={itemCategory}
					onChange={(event, newValue) => {
						setItemCategory(newValue);
						setItemType(null);
					}}
					isOptionEqualToValue={(option, value) => option.id === value.id}
					renderInput={(params) => <TextField {...params} label="Categoria" placeholder="Selecione uma categoria" fullWidth/>}
				/>
				<Autocomplete
					id="type-autocomplete"
					sx={{ marginTop: "18px" }}
					options={catalog.filter((item) => item.category === itemCategory?.category)}
					getOptionLabel={(option) => option.flavour}
					value={itemType}
					onChange={(event, newValue) => {
						setItemType(newValue);
					}}
					isOptionEqualToValue={(option, value) => option.id === value.id}
					renderInput={(params) => <TextField {...params} label="Tipo" placeholder="Selecione um tipo" fullWidth/>}
				/>
				<TextField
					label="Quantidade"
					placeholder="Digite a quantidade unitária do item..."
					value={itemQuantity}
					onChange={(e) => setItemQuantity(e.target.value)}
					type="number"
					fullWidth
					margin="normal"
				/>
				<TextField
					label="Observações"
					placeholder="Digite suas observações sobre o item..."
					value={itemComments}
					onChange={(e) => setItemComments(e.target.value)}
					fullWidth
					multiline
					margin="normal"
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} variant="outlined">Cancelar</Button>
				<Button onClick={handleAddItem} variant="contained">Salvar Item</Button>
			</DialogActions>
		</Dialog>
	);
}