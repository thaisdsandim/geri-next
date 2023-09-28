import { React, useState } from "react";
import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText
} from "@mui/material";
import {
	MenuOutlined as MenuIcon,
	HomeOutlined as HomeIcon,
	ReceiptOutlined as ReceiptIcon,
	PeopleOutlined as PeopleIcon,
	ExitToAppOutlined as ExitIcon
} from "@mui/icons-material";
import Link from "next/link";
import Image from "next/image";

export default function MainMenu() {
	const [open, setOpen] = useState(false);

	const toggleDrawer = () => {
		setOpen(!open);
	};

	return (
		<div>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						<Link href="/dashboard">
							<Image src="/geri.png" alt="Logo" width={40} height={40} />
						</Link>
					</Typography>
					<IconButton edge="end" color="primary" onClick={toggleDrawer}>
						<MenuIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
			<Drawer anchor="right" open={open} onClose={toggleDrawer}>
				<List>
					<Link href="/dashboard">
						<ListItem button>
							<ListItemIcon>
								<HomeIcon />
							</ListItemIcon>
							<ListItemText primary="Página Inicial" />
						</ListItem>
					</Link>
					<Link href="/dashboard/pedidos">
						<ListItem button>
							<ListItemIcon>
								<ReceiptIcon />
							</ListItemIcon>
							<ListItemText primary="Pedidos" />
						</ListItem>
					</Link>
					<Link href="/dashboard/clientes">
						<ListItem button>
							<ListItemIcon>
								<PeopleIcon />
							</ListItemIcon>
							<ListItemText primary="Clientes" />
						</ListItem>
					</Link>
					<Link href="/">
						<ListItem
							button
							onClick={() => {
								localStorage.removeItem("authentication_token");
								localStorage.removeItem("email");
								localStorage.removeItem("name");
								localStorage.removeItem("unit_id");
							}}
						>
							<ListItemIcon>
								<ExitIcon />
							</ListItemIcon>
							<ListItemText primary="Sair" />
						</ListItem>
					</Link>
				</List>
			</Drawer>
		</div>
	);
}
