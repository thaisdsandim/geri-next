import { React, useEffect, useState } from "react";
import { Card, CardContent, CardActions, Typography, Button } from "@mui/material/";
import axios from "axios";
import URL from "@/utils/apiConfig";
import OrderView from "./OrderView";
import AlertMessage from "../Alert";
import OrdersCreate from "./OrdersCreate";

export default function OrdersList() {
	const [data, setData] = useState([]);
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
	
	const sortedData = data.slice().sort((a, b) => {
		const dateA = new Date(a.delivery_date);
		const dateB = new Date(b.delivery_date);

		if (dateA.getTime() === dateB.getTime()) {
			const timeA = new Date(a.delivery_hour).getTime();
			const timeB = new Date(b.delivery_hour).getTime();
			return timeA - timeB;
		} else {
			return dateB - dateA;
		}
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`${URL}/units/${unitId}/orders/list_orders`, { headers });
				setData(response.data);
			} catch (error) {
				console.log(error);
				setMessage("Erro ao carregar os pedidos!");
				setSeverity("error");
			}
		};

		fetchData();
	}, [unitId]);
  
	return (
		<div className="gap-4 mx-4 mt-2">
			<AlertMessage message={message} severity={severity} onClose={handleCloseAlert} />
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{sortedData.map((item) => (
					<Card key={item.id} sx={{ minWidth: 200 }} className="mx-2 my-2">
						<CardContent>
							<Typography variant="h6" color="primary">
								{item.costumer.name.split(" ")[0]} {item.costumer.name.split(" ")[1]}
							</Typography>
							<Typography color="textSecondary">
								{new Date(item.delivery_date).toLocaleDateString("pt-BR", {
									day: "numeric",
									month: "numeric",
									year: "numeric",
									timeZone: "UTC"
								})} - {new Date(item.delivery_hour).toLocaleTimeString("pt-BR", {
									hour: "2-digit",
									minute: "2-digit",
									timeZone: "UTC"
								})}
							</Typography>
							<Typography color="textSecondary">
								{item.amount.toLocaleString("pt-BR", {
									style: "currency",
									currency: "BRL"
								})}
							</Typography>
							<Typography variant="h7" color="primary">
                Produtos:
							</Typography>
							{item.items.map((item) => (
								<div key={item.id}>
									<Typography color="textSecondary">
										• {item.quantity} {item.category === "Bolo" ? "kg" : "un"} de {item.category} sabor {item.flavour}
									</Typography>
								</div>
							))}
							<CardActions className="mt-2">
								<OrderView orderId={item.id} />
								<Button variant="outlined" disabled>EDITAR</Button>
							</CardActions>
						</CardContent>
					</Card>
				))}
			</div>
			<OrdersCreate />
		</div>
	);
}
