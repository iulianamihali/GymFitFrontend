import { Card, CardContent, Typography, Box } from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {NextTrainingInfoResponse} from "./types";
import axios from "axios";
import {ClientCourses} from "../activeCoursesList/types";
import {API_URL} from "../../authorization/config";
import {ApplicationContext} from "../../context/ApplicationContext";


export default function NextTrainingInfoCard() {
    const [nextSession, setNextSession] = useState<NextTrainingInfoResponse>();
    const auth = useContext(ApplicationContext);
    const userId = auth?.user?.userId;

    useEffect(() => {
        axios
            .get<NextTrainingInfoResponse>(`${API_URL}/client/nextSession/${userId}`)
            .then(({ data }) => {
                console.log("Next training data:", data);
                setNextSession(data);
            })
            .catch((err) => console.error("Failed to fetch next training:", err));
    }, []);

    const dateTimeFormat = (dateTime: string) => {
        const date = new Date(dateTime);

        const dayName = date.toLocaleDateString("en-US", {
            weekday: "long"
        });

        const time = date.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit"
        });

        return `${dayName} · ${time}`;
    };


    return (
        <Card
            sx={{
                background: "linear-gradient(135deg, #ff5e2d, #ff774c)",
                color: "white",
                borderRadius: "16px",
                boxShadow: 4,
                width: 280,
                height: 150,
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
                }}>Your Next Session</Typography>
                <Typography
                    sx={{
                        fontSize: 14,
                        fontWeight: 400,
                        fontFamily: "Poppins, sans-serif",
                        opacity: 0.95,
                    }}
                >
                    {nextSession?.title}
                </Typography>

                <Typography
                    sx={{
                        fontSize: 24,
                        fontWeight: 600,
                        fontFamily: "Poppins, sans-serif",
                        lineHeight: 1.2,
                        mt: 0.5,
                    }}
                >
                    {nextSession?.trainerName}
                </Typography>

                <Typography
                    sx={{
                        fontSize: 13,
                        opacity: 0.8,
                        fontFamily: "Poppins, sans-serif",
                        mt: 0.5,
                    }}
                >
                    { nextSession?.startDateTime != null ? dateTimeFormat(nextSession?.startDateTime) : ""}
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
    );
}
