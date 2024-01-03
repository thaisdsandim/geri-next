import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import axios from "axios";
import URL from "@/utils/apiConfig";
import ClientsEdit from "./ClientesEdit";
import AlertMessage from "../Alert";
import ClientsCreate from "./ClientsCreate";

export default function ClientsList() {
	const [customers, setCustomers] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
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
		axios
			.get(`${URL}/units/1/costumers`)
			.then((response) => {
				setCustomers(response.data);
			})
			.catch((error) => {
				console.error(error);
				setMessage("Falha buscar os clientes!");
				setSeverity("error");
			});
	}, []);

	const filteredCustomers = customers.filter((customer) => {
		const formattedPhone = customer.phone.replace(/\D/g, "");
		const searchTermFormatted = searchTerm;
	
		if (searchTermFormatted === "") {
			return true;
		} else {
			return (
				customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				formattedPhone.includes(searchTermFormatted)
			);
		}
	});

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const sortedCustomers = filteredCustomers.sort((a, b) => {
		return a.name.localeCompare(b.name);
	});

	return (
		<div className="gap-4 mt-4 ml-4 mr-2">
			<TextField
				id="search"
				label="Pesquisar cliente"
				variant="outlined"
				value={searchTerm}
				onChange={handleSearchChange}
				className="w-full mb-4"
				placeholder="Digite o nome ou o telefone do cliente..."
			/>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				<AlertMessage message={message} severity={severity} onClose={handleCloseAlert} />
				{sortedCustomers.map((customer) => (
					<Card key={customer.id} sx={{ minWidth: 200 }} className="mx-2 mb-2 mt-4">
						<CardContent>
							<Typography variant="h5">{customer.name}</Typography>
							<Typography color="text.secondary">{customer.phone}</Typography>
						</CardContent>
						<CardActions>
							<ClientsEdit
								customerId={customer.id}
								customerName={customer.name}
								customerPhone={customer.phone}
							/>
						</CardActions>
					</Card>
				))}
				<ClientsCreate />
			</div>
		</div>
	);
}
