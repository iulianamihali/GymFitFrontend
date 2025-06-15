import { Card, CardContent, Typography, Box, Button, Modal } from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {ActiveSubscriptionInfoResponse} from "./types";
import axios from "axios";
import {API_URL} from "../../authorization/config";
import {ApplicationContext} from "../../context/ApplicationContext";


export default function ActiveSubscriptionInfoCard() {
    const auth = useContext(ApplicationContext);
    const userId = auth?.user?.userId;
    const token = auth?.user?.token;

    const [open, setOpen] = useState<boolean>(false);
    const [activeSubscription, setActiveSubscription] = useState<ActiveSubscriptionInfoResponse>();


    useEffect(() => {
        axios
            .get<ActiveSubscriptionInfoResponse>(`${API_URL}/client/activeSubscription/${userId}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(({ data }) => {
                setActiveSubscription(data);
                console.log("DATEDATEDATAE");
                console.log(data);
            })
            .catch((err) => console.error("Failed to fetch next subscription:", err));
    }, [token, userId]);

    const dateTimeFormat = (dateTime: string) => {
        const date = new Date(dateTime);
        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        };
        return date.toLocaleDateString('en-US', options);
    };


    return (
        <>
        <Card
            sx={{
                background: activeSubscription?.isActive ? "linear-gradient(135deg, #00c96b, #1cd67b)" : "linear-gradient(135deg, #ff4e50, #f44336)",
                color: "white",
                borderRadius: "16px",
                boxShadow: 4,
                width: { xs: "100%", sm: 280 }, // full width pe mobile
                height: { xs: "auto", sm: 150 },
                p: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
        >
            <CardContent sx={{ p: 0 }}>
                <Typography  sx={{
                    fontSize: 24,
                    fontWeight: 600,
                    fontFamily: "Poppins, sans-serif",
                    lineHeight: 1.2,
                    mt: 0.5,
                }}>Current Subscription</Typography>
                <Typography
                    sx={{
                        fontSize: 14,
                        fontWeight: 400,
                        fontFamily: "Poppins, sans-serif",
                        opacity: 0.95,
                    }}
                >
                    {activeSubscription?.subscriptionName}
                </Typography>

                <Typography
                    sx={{
                        fontSize: 13,
                        opacity: 0.8,
                        fontFamily: "Poppins, sans-serif",
                        mt: 0.5,
                    }}
                >
                    <span>
                        {activeSubscription?.activationDate != null ? dateTimeFormat(activeSubscription?.activationDate) : ""} - {activeSubscription?.expirationDate != null ? dateTimeFormat(activeSubscription?.expirationDate) : ""}

                    </span>
                </Typography>

                <Typography
                    sx={{
                        fontSize: 12,
                        textDecoration: "underline",
                        cursor: "pointer",
                        mt: 0.5,
                        fontFamily: "Poppins, sans-serif",
                        opacity: 0.85,
                        width: "fit-content"
                    }}
                    onClick={() => setOpen(true)}
                >
                    View Details
                </Typography>
            </CardContent>

            <Box sx={{ width: "100%", height: 40 }}>
                <svg
                    viewBox="0 0 300 60"
                    preserveAspectRatio="none"
                    style={{ width: "100%", height: "100%" }}
                >
                    <path
                        d="M0,40 C75,10 225,90 300,30 L300,60 L0,60 Z"
                        fill="rgba(255,255,255,0.2)"
                    />
                </svg>
            </Box>
        </Card>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        boxShadow: 24,
                        p: 4,
                        maxWidth: 400,
                        width: "90%",
                        textAlign: "center",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: 18,
                            fontWeight: 500,
                            fontFamily: "Poppins, sans-serif",
                            mb: 2
                        }}
                    >
                        {activeSubscription?.description}
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => setOpen(false)}
                        sx={{
                            mt: 2,
                            background: "linear-gradient(135deg, #ff5e2d, #ff774c)",
                            color: "white",
                            fontWeight: 600,
                            fontFamily: "Poppins, sans-serif",
                            '&:hover': {
                                background: "linear-gradient(135deg, #e84c1a, #ff6a3c)",
                            },
                        }}
                    >
                        OK
                    </Button>

                </Box>
            </Modal>

        </>

    );
}
