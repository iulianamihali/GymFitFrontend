import {
    Box,
    Typography,
    Modal,
    Avatar,
    Divider,
    List,
    Rating,
} from "@mui/material";
import { deepOrange, deepPurple, blue, green } from "@mui/material/colors";
import { TrainerCardResponse } from "./types";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {API_URL} from "../../authorization/config";
import {ApplicationContext} from "../../context/ApplicationContext";
import dayjs from "dayjs"; // ajustează calea

type Props = {
    open: boolean;
    onClose: () => void;
};

const colors = [deepOrange[500], deepPurple[500], blue[500], green[500]];

function getInitials(name: string) {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
}

export default function MyTrainers({ open, onClose}: Props) {
    const auth = useContext(ApplicationContext);
    const userId = auth?.user?.userId;
    const today = dayjs();
    const[trainers, setTrainers] = useState<TrainerCardResponse[]>([]);

    useEffect(() => {
        axios
            .get<TrainerCardResponse[]>(`${API_URL}/client/myTrainers/${userId}`)
            .then(({ data }) => {
                const temp =  [...data].sort((a, b) => {
                    const aDate = dayjs(a.endInterval);
                    const bDate = dayjs(b.endInterval);

                    const aActive = aDate.isAfter(today);
                    const bActive = bDate.isAfter(today);

                    if (aActive !== bActive) {
                        return bActive ? 1 : -1;
                    }

                    return bDate.diff(aDate);
                });
                setTrainers(data);
            })
            .catch((err) => console.error(err));
    }, [open]);

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    bgcolor: "#fff",
                    color: "#111",
                    p: 4,
                    borderRadius: 3,
                    width: "100%",
                    maxWidth: 500,
                    height: 500,
                    mx: "auto",
                    my: "10vh",
                    boxShadow: 10,
                    fontFamily: "Poppins, sans-serif",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Typography variant="h6" fontWeight={700} gutterBottom>
                    Trainer List
                </Typography>

                <Divider sx={{ mb: 2 }} />

                {/* scroll pe listă */}
                <List
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        overflowY: "auto",
                        flexGrow: 1,
                        pr: 1,
                    }}
                >
                    {trainers.map((trainer, index) => {
                        const endDate = dayjs(trainer.endInterval).startOf('day');
                        const isActive = !endDate.isBefore(today);

                            return (
                                <Box
                                    key={trainer.id}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        bgcolor: "#f5f5f5",
                                        borderRadius: 2,
                                        p: 2,
                                    }}
                                >
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <Avatar
                                            sx={{
                                                bgcolor: colors[index % colors.length],
                                                width: 48,
                                                height: 48,
                                                fontWeight: 600,
                                                fontSize: "1rem",
                                                mr: 2,
                                            }}
                                        >
                                            {getInitials(trainer.name)}
                                        </Avatar>

                                        <Box>
                                            <Typography variant="subtitle1" fontWeight={600}>
                                                {trainer.name}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: "#666" }}>
                                                {trainer.specialization}
                                            </Typography>
                                            <Rating
                                                name="rating"
                                                value={trainer.rating}
                                                readOnly
                                                size="small"
                                                sx={{ mt: 0.5 }}
                                            />
                                        </Box>
                                    </Box>

                                    <Box
                                        sx={{
                                            bgcolor: isActive ? "#4caf50" : "#f44336",
                                            color: "white",
                                            px: 1.5,
                                            py: 0.5,
                                            borderRadius: 1.5,
                                            fontSize: "0.75rem",
                                            fontWeight: 600,
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {isActive ? "Active" : "Inactive"}
                                    </Box>
                                </Box>
                            );
                        })}


                </List>
            </Box>
        </Modal>

    );
}
