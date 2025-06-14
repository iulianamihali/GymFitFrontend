import { Card, CardContent, Typography, Box, Button, Modal } from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {ActiveSubscriptionInfoResponse, SummaryTrainerActivity} from "./types";
import axios from "axios";
import {API_URL} from "../../authorization/config";
import {ApplicationContext} from "../../context/ApplicationContext";


export default function SummaryTrainerCard() {
    const auth = useContext(ApplicationContext);
    const userId = auth?.user?.userId;
    const[summaryTrainerActivity, setSummaryTrainerActivity] = useState<SummaryTrainerActivity|null>(null);


    useEffect(() => {
        axios
            .get<SummaryTrainerActivity>(`${API_URL}/trainer/summaryTrainerActivity/${userId}`)
            .then(({ data }) => {
                setSummaryTrainerActivity(data);
            })
            .catch((err) => console.error("Failed to fetch next subscription:", err));
    }, []);

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
        background: "linear-gradient(135deg, #ff5e2d, #ff774c)",
            color: "white",
            borderRadius: "16px",
            boxShadow: 4,
            width: 280,
            height: 160,
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
    }}>Summary Activiy</Typography>
    <Typography
    sx={{
        fontSize: 14,
            fontWeight: 400,
            fontFamily: "Poppins, sans-serif",
            opacity: 0.95,
    }}
>
    Clients Enrolled: {summaryTrainerActivity?.totalClientsEnrolled}
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
        Courses Active: {summaryTrainerActivity?.totalCoursesActive }

    </span>
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
        Next Sessions: {summaryTrainerActivity?.totalNextTrainingSessions }

    </span>
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


    </>

);
}
