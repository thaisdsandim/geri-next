import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Tooltip from "@mui/material/Tooltip";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { AddCircleOutlined as AddIcon } from "@mui/icons-material";
import axios from "axios";
import URL from "@/utils/apiConfig";
import AddItemDialog from "./AddItemDialog";

export default function OrdersCreate() {
	const [open, setOpen] = useState(false);
	const [customers, setCustomers] = useState([]);
	const [selectedCustomer, setSelectedCustomer] = useState(null);
	const [deliveryPlace, setDeliveryPlace] = useState("");
	const [selectedDate, setSelectedDate] = useState(null);
	const [selectedTime, setSelectedTime] = useState("");
	const [orderAmount, setOrderAmount] = useState(0);
	const [addItemDialogOpen, setAddItemDialogOpen] = useState(false);
	const [orderItems, setOrderItems] = useState([]);
	const unitId = localStorage.getItem("unit_id");
	const authenticationToken = localStorage.getItem("authentication_token");

	const headers = {
		Authorization: `Bearer ${authenticationToken}`,
	};

	const resetForm = () => {
		setSelectedCustomer(null);
		setDeliveryPlace("");
		setSelectedDate(null);
		setSelectedTime("");
		setOrderAmount(0);
		setOrderItems([]);
	};

	const handleClose = () => {
		resetForm();
		setOpen(false);
	};

	const handleOpenAddItemDialog = () => {
		setAddItemDialogOpen(true);
	};

	const handleCloseAddItemDialog = () => {
		setAddItemDialogOpen(false);
	};

	const formatCurrency = (value) => {
		return parseFloat(value).toLocaleString("pt-BR", {
			style: "currency",
			currency: "BRL",
		});
	};

	const handleAddItem = (item) => {
		setOrderItems((prevItems) => [...prevItems, item]);

		const itemTotal = item.category.category === "Docinhos"
			? (item.quantity / 100) * item.category.value
			: item.quantity * item.category.value;

		setOrderAmount((prevAmount) => prevAmount + parseFloat(itemTotal));

		handleCloseAddItemDialog();
	};

	useEffect(() => {
		axios
			.get(`${URL}/units/${unitId}/costumers`, { headers })
			.then((response) => {
				setCustomers(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	const handleSave = () => {
		resetForm();
		setOpen(false);
	};

	return (
		<div>
			<div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
				<Tooltip title="Cadastrar">
					<Button variant="text" color="primary" onClick={() => setOpen(true)}>
						<AddIcon style={{ fontSize: 50 }} />
					</Button>
				</Tooltip>
			</div>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Cadastrar Pedido</DialogTitle>
				<DialogContent>
					<Autocomplete
						id="customer-autocomplete"
						sx={{ marginTop: "10px" }}
						options={customers}
						getOptionLabel={(option) => option.name}
						value={selectedCustomer}
						onChange={(event, newValue) => {
							setSelectedCustomer(newValue);
						}}
						isOptionEqualToValue={(option, value) => option.id === value.id}
						renderInput={(params) => <TextField {...params} label="Cliente" placeholder="Selecione um cliente" fullWidth/>}
					/>
					<TextField
						label="Endereço de Entrega"
						onChange={(e) => setDeliveryPlace(e.target.value)}
						placeholder="Digite o endereço de entrega..."
						fullWidth
						sx={{ marginTop: "19px", marginBottom: "10px" }}
					/>
					<TextField
						label="Data de Entrega"
						type="date"
						InputLabelProps={{
							shrink: true,
						}}
						sx={{ marginTop: "10px", marginRight: 2 }}
						value={selectedDate}
						onChange={(e) => setSelectedDate(e.target.value)}
					/>
					<TextField
						label="Hora"
						type="time"
						InputLabelProps={{
							shrink: true,
						}}
						sx={{ marginTop: "10px", marginRight: 2 }}
						value={selectedTime}
						onChange={(e) => setSelectedTime(e.target.value)}
					/>
					<TextField
						disabled
						InputLabelProps={{
							shrink: true,
						}}
						label="Total do Pedido"
						value={formatCurrency(orderAmount)}
						onChange={(e) => setOrderAmount(e.target.value)}
						placeholder="R$ 0,00"
						sx={{ marginTop: "10px" }}
					/>
					<List>
						{orderItems.map((item, index) => (
							<ListItem key={index}>
								<ListItemText 
									primary={`• ${item.quantity} ${item.category.category === "Bolo" ? "kg" : "un"} de 
										${item.category.category} sabor ${item.category.flavour} - Valor total: 
										${formatCurrency(item.category.category === "Docinhos" ? (item.quantity / 100) * item.category.value : item.quantity * item.category.value)}
									`}
									secondary={`${item.comments}`}
								/>
							</ListItem>
						))}
					</List>
					<Button variant="contained" onClick={handleOpenAddItemDialog}>
						Adicionar Item
					</Button>
					<AddItemDialog
						open={addItemDialogOpen}
						onClose={handleCloseAddItemDialog}
						onAddItem={handleAddItem}
					/>
				</DialogContent>
				<DialogActions>
					<Button variant="outlined" onClick={handleClose}>
            Cancelar
					</Button>
					<Button variant="contained" onClick={handleSave}>
            Salvar
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
