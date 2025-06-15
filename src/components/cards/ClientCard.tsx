import { Avatar, Box, Card, CardContent, Typography, Chip } from "@mui/material";
import React from "react";

type Props = {
    name: string;
    email: string;
    subscription: string;
    isActive: boolean;
};

function getInitials(name: string) {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
}

export default function ClientCard({ name, email, subscription, isActive }: Props) {
    return (
        <Card
            sx={{
                background: "#2e2b2c",
                color: "white",
                borderRadius: "20px",
                boxShadow: 6,
                px: 3,
                py: 2,
                fontFamily: "Poppins, sans-serif",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                transition: "0.3s",
               
            }}
        >
            <Box display="flex" alignItems="center" gap={2}>
                <Avatar
                    sx={{
                        bgcolor: "#ff5722",
                        width: 56,
                        height: 56,
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                    }}
                >
                    {getInitials(name)}
                </Avatar>

                <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#ff5722" }}>
                        {name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#ccc" }}>
                        {email}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#aaa" }}>
                        {subscription}
                    </Typography>
                </Box>
            </Box>

            <Chip
                label={isActive ? "Active" : "Inactive"}
                sx={{
                    backgroundColor: isActive ? "#4caf50" : "#9e9e9e",
                    color: "white",
                    fontWeight: 600,
                    px: 1.5,
                }}
            />
        </Card>
    );
}
