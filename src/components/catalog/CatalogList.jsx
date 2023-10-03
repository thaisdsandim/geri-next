import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from "@mui/material";
import axios from "axios";
import URL from "@/utils/apiConfig";
import AlertMessage from "../Alert";
import CatalogEdit from "./CatalogEdit";
import CatalogCreate from "./CatalogCreate";

export default function CatalogList() {
	const [data, setData] = useState([]);
	const unitId = localStorage.getItem("unit_id");
	const authenticationToken = localStorage.getItem("authentication_token");
	const [message, setMessage] = useState("");
	const [severity, setSeverity] = useState("");
	const [searchTerm, setSearchTerm] = useState("");

	const handleCloseAlert = () => {
		setMessage("");
	};

	const headers = {
		Authorization: `Bearer ${authenticationToken}`
	};

	useEffect(() => {
		axios
			.get(`${URL}/units/${unitId}/products`, { headers })
			.then(response => {
				setData(response.data);
			})
			.catch(error => {
				console.log(error);
				setMessage("Erro ao carregar os produtos do catálogo!");
				setSeverity("error");
			});
	}, []);

	const filteredData = data
		.filter(item => {
			const searchString = `${item.category} ${item.flavour} ${item.value.toLocaleString("pt-BR", {
				style: "currency",
				currency: "BRL"
			})}`;
			return searchString.toLowerCase().includes(searchTerm.toLowerCase());
		})
		.sort((a, b) => {
			const categoryComparison = a.category.localeCompare(b.category);
			if (categoryComparison !== 0) {
				return categoryComparison;
			}
			const valueComparison = b.value - a.value;
			if (valueComparison !== 0) {
				return valueComparison;
			}
			return a.flavour.localeCompare(b.flavour);
		});

	return (
		<div className="m-4">
			<AlertMessage message={message} severity={severity} onClose={handleCloseAlert} />
			<TextField
				label="Pesquisar produto"
				variant="outlined"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				fullWidth
				style={{ marginBottom: "14px" }}
				placeholder="Digite a categoria, sabor ou valor do produto..."
			/>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Categoria</TableCell>
							<TableCell>Sabor</TableCell>
							<TableCell>Valor</TableCell>
							<TableCell>Ações</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{filteredData.map(item => (
							<TableRow key={item.id}>
								<TableCell>{item.category}</TableCell>
								<TableCell>{item.flavour}</TableCell>
								<TableCell>
									{item.value.toLocaleString("pt-BR", {
										style: "currency",
										currency: "BRL"
									})}
								</TableCell>
								<TableCell>
									<CatalogEdit
										itemId={item.id}
										itemCategory={item.category}
										itemFlavour={item.flavour}
										itemValue={item.value}
									/>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<CatalogCreate />
		</div>
	);
}
