import ClientCard from "../../../components/cards/ClientCard";
import { useContext, useEffect, useState } from "react";
import { ClientsOfTrainer } from "../../../components/cards/types";
import axios from "axios";
import { API_URL } from "../../../authorization/config";
import { ApplicationContext } from "../../../context/ApplicationContext";
import { Box, Typography } from "@mui/material";


export function ClientsDisplay() {
    const auth = useContext(ApplicationContext);
    const userId = auth?.user?.userId;
    const token = auth?.user?.token;

    const [clients, setClients] = useState<ClientsOfTrainer[]>([]);

    useEffect(() => {
        if (!userId || !token) return;
        axios
            .get(`${API_URL}/trainer/allClients/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            .then(({ data }) => setClients(data))
            .catch((err) => console.error("Failed to fetch CLIENTS:", err));
    }, [userId,token]);

    return (
        <Box
            sx={{
                backgroundColor: "#252223",
                minHeight: "100vh",
                px: 8,
                py: 6,
                fontFamily: "Poppins, sans-serif",
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    color: "#ff5722",
                    mb: 4,
                }}
            >
                Clients
            </Typography>

            <Box
                sx={{
                    maxHeight: "70vh",
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    pr: 1,
                }}
            >
                {clients.map((client, idx) => (
                    <ClientCard
                        key={idx}
                        name={client.name}
                        email={client.email}
                        subscription={client.subscriptionType}
                        isActive={true}
                    />
                ))}
            </Box>
        </Box>
    );
}
