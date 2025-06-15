import {
    Card, Box, Typography, Modal, Button, TextField, Autocomplete
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ApplicationContext } from "../../context/ApplicationContext";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
import { TrainerIntervalResponse } from "./types";
import { API_URL } from "../../authorization/config";

const AddSessionCard = () => {
    const auth = useContext(ApplicationContext);
    const userId = auth?.user?.userId;
    const token = auth?.user?.token;

    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
    const [trainerIntervals, setTrainerIntervals] = useState<TrainerIntervalResponse[]>([]);
    const [selectedTrainer, setSelectedTrainer] = useState<TrainerIntervalResponse | null>(null);
    const [selectedInterval, setSelectedInterval] = useState<string | null>(null);

    const [sessionTitle, setSessionTitle] = useState<string>("");
    const [notes, setNotes] = useState<string>("");

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setSelectedTrainer(null);
        setSelectedInterval(null);
        setSessionTitle("");
        setNotes("");
    };

    useEffect(() => {
        if (!userId || !selectedDate) return;

        axios
            .post<TrainerIntervalResponse[]>(`${API_URL}/client/trainerIntervals`, {
                clientId: userId,
                selectedDate: selectedDate
            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(({ data }) => setTrainerIntervals(data))
            .catch((err) => console.error("Failed to fetch intervals:", err));
    }, [selectedDate,userId, token]);

    const handleAddSession = () => {
        if (!userId || !selectedDate || !sessionTitle || !selectedInterval) return;

        const [startHour, endHour] = selectedInterval.split(" - ");
        const startDateTime = dayjs(selectedDate.format("YYYY-MM-DD") + "T" + startHour);
        const endDateTime = dayjs(selectedDate.format("YYYY-MM-DD") + "T" + endHour);
        const duration = endDateTime.diff(startDateTime, "minute");

        const payload = {
            clientId: userId,
            trainerId: selectedTrainer?.trainerId || null,
            startDateTime: startDateTime.toISOString(),
            durationInMinutes: duration,
            title: sessionTitle,
            notes: notes
        };

        axios.post(`${API_URL}/client/addSession`, payload,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => handleClose())
            .catch(err => console.error("Failed to add session:", err));

        handleClose()
    };


    return (
        <>
            <Card
                onClick={handleOpen}
                sx={{
                    width: 280,
                    height: 150,
                    borderRadius: "16px",
                    bgcolor: "rgba(255,255,255,0.05)",
                    border: "2px dashed rgba(255,255,255,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all .25s",
                    "&:hover": {
                        boxShadow: 6,
                        borderColor: "#ff774c",
                        transform: "translateY(-2px)",
                    },
                }}
            >
                <Box textAlign="center">
                    <Typography sx={{ fontSize: 48, color: "#ff774c", userSelect: "none" }}>+</Typography>
                    <Typography sx={{
                        fontSize: 14, color: "rgba(255,255,255,0.8)",
                        fontFamily: "Poppins, sans-serif"
                    }}>
                        Add New Session
                    </Typography>
                </Box>
            </Card>

            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "white",
                        borderRadius: 2,
                        boxShadow: 24,
                        p: 4,
                        width: 420,
                        maxWidth: "95vw",
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        fontFamily: "Poppins, sans-serif",
                    }}
                >
                    <Typography variant="h5" fontWeight={700} textAlign="center" mb={1}>
                        Add Training Session
                    </Typography>

                    {/* Titlu */}
                    <TextField
                        label="Session Title"
                        fullWidth
                        value={sessionTitle}
                        onChange={(e) => setSessionTitle(e.target.value)}
                    />

                    {/* Notițe */}
                    <TextField
                        label="Notes"
                        fullWidth
                        multiline
                        minRows={2}
                        maxRows={4}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />

                    {/* Calendar + Trainer + Interval */}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Session Date"
                            value={selectedDate}
                            onChange={(newValue: Dayjs | null) => setSelectedDate(newValue)}
                            renderInput={(params) => <TextField fullWidth {...params} />}
                        />

                        <Autocomplete
                            options={trainerIntervals}
                            getOptionLabel={(option) => option.trainerName}
                            onChange={(event, newValue) => {
                                setSelectedTrainer(newValue);
                                setSelectedInterval(null);
                            }}
                            renderInput={(params) => (
                                <TextField {...params} label="Select Trainer" fullWidth />
                            )}
                        />

                        {/* INTERVALE */}
                        {selectedTrainer && selectedTrainer.intervals.length > 0 && (
                            <Box>
                                <Typography variant="subtitle2" fontWeight={500}>
                                    Available Time Slots:
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 1,
                                        maxHeight: "150px",
                                        overflowY: "auto",
                                        pr: 1,
                                    }}
                                >
                                    {selectedTrainer.intervals.map((interval, index) => (
                                        <Box
                                            key={index}
                                            onClick={() => setSelectedInterval(interval)}
                                            sx={{
                                                padding: "8px 12px",
                                                background: selectedInterval === interval ? "#ff774c" : "#f2f2f2",
                                                color: selectedInterval === interval ? "white" : "#333",
                                                borderRadius: "8px",
                                                fontSize: 14,
                                                cursor: "pointer",
                                                transition: "0.2s",
                                                "&:hover": {
                                                    background: selectedInterval === interval ? "#ff774c" : "#ddd",
                                                },
                                            }}
                                        >
                                            {interval}
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        )}
                    </LocalizationProvider>

                    <Button
                        variant="contained"
                        onClick={handleAddSession}
                        disabled={!sessionTitle || !selectedDate || !selectedTrainer}
                        sx={{
                            background: !sessionTitle || !selectedDate
                                ? "#ccc"
                                : "linear-gradient(135deg,#ff5e2d,#ff774c)",
                            color: !sessionTitle || !selectedDate || !selectedTrainer? "#666" : "white",
                            fontWeight: 600,
                            borderRadius: 3,
                            cursor: !sessionTitle || !selectedDate || !selectedTrainer ? "not-allowed" : "pointer",
                            "&:hover": {
                                background:
                                    !sessionTitle || !selectedDate || !selectedTrainer
                                        ? "#ccc"
                                        : "linear-gradient(135deg,#e84c1a,#ff6a3c)",
                            },
                        }}
                    >
                        Add
                    </Button>

                </Box>
            </Modal>
        </>
    );
};

export default AddSessionCard;
