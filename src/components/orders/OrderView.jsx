import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import axios from "axios";
import URL from "@/utils/apiConfig";
import AlertMessage from "../Alert";

export default function OrderDetailsDialog({ orderId }) {
	const [open, setOpen] = useState(false);
	const [orderData, setOrderData] = useState(null);
	// const unitId = localStorage.getItem("unit_id");
	// const authenticationToken = localStorage.getItem("authentication_token");
	const [message, setMessage] = useState("");
	const [severity, setSeverity] = useState("");

	const handleCloseAlert = () => {
		setMessage("");
	};

	// const headers = {
	// 	Authorization: `Bearer ${authenticationToken}`
	// };

	useEffect(() => {
		if (open) {
			axios
				.get(`${URL}/units/1/orders/${orderId}`)
				.then((response) => {
					setOrderData(response.data);
				})
				.catch((error) => {
					console.log(error);
					setMessage("Erro ao carregar o pedido!");
					setSeverity("error");
				});
		}
	}, [open, orderId]);

	return (
		<div>
			<AlertMessage message={message} severity={severity} onClose={handleCloseAlert} />
			<Button variant="outlined" onClick={() => setOpen(true)} sx={{ marginRight: 2 }}>
        Ver
			</Button>
			<Dialog open={open} onClose={() => setOpen(false)}>
				<DialogTitle>{orderData && orderData.costumer.name} - {orderData && orderData.costumer.phone}</DialogTitle>
				<DialogContent>
					{orderData && (
						<div>
							<TextField
								label="Total do Pedido"
								value={orderData.amount.toLocaleString("pt-BR", {
									style: "currency",
									currency: "BRL"
								})}
								fullWidth
								sx={{ marginBottom: 2, marginTop: 1 }}
								disabled
							/>
							<TextField
								label="Data de Entrega"
								value={new Date(orderData.delivery_date).toLocaleDateString("pt-BR", {
									day: "numeric",
									month: "numeric",
									year: "numeric",
									timeZone: "UTC"
								})}
								sx={{ marginBottom: 2, marginRight: 2 }}
								disabled
							/>
							<TextField
								label="Hora de Entrega"
								value={new Date(orderData.delivery_hour).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" })}
								sx={{ marginBottom: 2}}
								disabled
							/>
							<TextField
								label="Local de Entrega"
								value={orderData.delivery_place}
								fullWidth
								disabled
							/>
							<div >
								{orderData.items.map((item) => (
									<div key={item.id} className="mt-4">
										<hr />
										<p className="font-bold">{item.quantity} {item.category === "Bolo" ? "kg" : "un"} de {item.category} sabor {item.flavour}</p>
										<p>{item.comments}</p>
										<p>Total do produto: {item.amount.toLocaleString("pt-BR", {
											style: "currency",
											currency: "BRL",
										})}</p>
										<hr />
									</div>
								))}
							</div>
						</div>
					)}
				</DialogContent>
				<DialogActions>
					<Button variant="contained" onClick={() => setOpen(false)}>Sair</Button>
				</DialogActions>
				<AlertMessage message={message} severity={severity} onClose={handleCloseAlert} />
			</Dialog>
		</div>
	);
}
