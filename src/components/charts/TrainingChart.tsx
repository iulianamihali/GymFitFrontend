import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, {useContext} from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,Cell } from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";
import { MonthlyProgress } from "./types";
import {API_URL} from "../../authorization/config";
import {ApplicationContext} from "../../context/ApplicationContext";

const currentMonthIndex = new Date().getMonth();

function TrainingChart() {
    const [chartData, setChartData] = useState<MonthlyProgress[]>([]);
    const auth = useContext(ApplicationContext);
    const userId = auth?.user?.userId;
    useEffect(() => {
        if (!userId) return;
        axios.get<MonthlyProgress[]>(`${API_URL}/client/monthly/${userId}`)
            .then(({ data }) => {
                console.log(data);
                setChartData(data);
            })
            .catch((err) => {
                console.error("Failed to fetch chart data:", err);
            });
    }, []);
    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: "800px",
                height: 300,
                margin: "0 auto",
                padding: 2,
                background: "#362f2f",
                borderRadius: "12px",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
            }}
        >
            <Box sx={{ padding: "0.75rem 1rem 0.4rem 1rem" }}>
                <Typography
                    sx={{
                        color: "white",
                        fontWeight: 600,
                        fontSize: "1rem",
                        fontFamily: "Poppins, sans-serif",
                    }}
                >
                    Training Progress
                </Typography>
            </Box>


            <Box
                sx={{
                    backgroundColor: "#252223",
                    height: "3px",
                    width: "calc(100% + 2rem)",
                    marginLeft: "-1rem",
                    marginRight: "-1rem",
                }}
            />


            <Box sx={{flex: 1, px: "1rem" }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        barCategoryGap="15%"
                        margin={{ top: 40, right: 0, left: 0, bottom: 0 }}
                    >
                        <Tooltip
                            cursor={{ fill: "rgba(255,255,255,0.03)" }}
                            contentStyle={{
                                background: "#2b2b2b",
                                border: "none",
                                borderRadius: 8,
                                padding: "6px 12px",
                            }}
                            labelStyle={{
                                color: "#ff5722",
                                fontWeight: 600,
                                marginBottom: 4,
                            }}
                            itemStyle={{
                                color: "#ffffff",
                            }}
                        />
                        <XAxis dataKey="month" stroke="#ccc" axisLine={false} tickLine={false} />
                        <YAxis stroke="#ccc" axisLine={false} tickLine={false} />
                        <Tooltip />
                        <Bar dataKey="sessions" radius={[8, 8, 0, 0]} barSize={32}>
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={index === currentMonthIndex ? "#ff5722" : "#4e4543"}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </Box>

        </Box>
    );
}

export default TrainingChart;