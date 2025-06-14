import {
    Avatar,
    Card,
    CardContent,
    Typography,
    Button,
    Box, Divider, Modal, TextField,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { deepOrange, deepPurple, blue, green } from "@mui/material/colors";
import {TrainerCardResponse, TrainerIntervalResponse} from "./types";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import Grid from "@mui/material/Grid";
import {useContext, useState} from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import {API_URL} from "../../authorization/config";
import {ApplicationContext} from "../../context/ApplicationContext";


type Props = {
    trainer: TrainerCardResponse;
};

const colors = [deepOrange[500], deepPurple[500], blue[500], green[500]];

function getInitials(name: string) {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
}

export default function TrainerCard({ trainer }: Props) {
    const auth = useContext(ApplicationContext);
    const userId = auth?.user?.userId;

    const colorIndex = trainer.name.length % colors.length;
    const initials = getInitials(trainer.name);

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const canAddTrainer = startDate && endDate;

    const [openModal, setOpenModal] = useState<boolean>(false);
    function InfoLine({ label, value }: { label: string; value: string }) {
        return (
            <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                    variant="caption"
                    sx={{ fontWeight: 500, color: "#888", fontSize: "0.75rem" }}
                >
                    {label.toUpperCase()}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {value}
                </Typography>
            </Box>
        );
    }

    const addEnrollemnt = () => {
        axios
            .post<boolean>(`${API_URL}/client/addEnrollmentClientTrainer`, {
                clientId: userId,
                trainerId: trainer.id,
                startDate: startDate,
                endDate: endDate
            })
            .then(({ data }) => alert(`You successfully enrolled with ${trainer.name}!`))
            .catch((err) => console.error("Failed to add enrollment:", err));
    }

    return (
        <>
        <Card
            sx={{
                display: "flex",
                alignItems: "center",
                p: 2,
                bgcolor: "#362f2f",
                borderRadius: 3,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: 6,
                },
            }}
        >
            <Avatar
                sx={{
                    bgcolor: colors[colorIndex],
                    width: 56,
                    height: 56,
                    mr: 2,
                    fontSize: "1.1rem",
                    fontWeight: 600,
                }}
            >
                {initials}
            </Avatar>

            <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ color: "white" }}>
                    {trainer.name}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{ color: "#bbb", fontStyle: "italic", mb: 1 }}
                >
                    Specializare: {trainer.specialization}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    {[...Array(5)].map((_, i) => (
                        <StarIcon
                            key={i}
                            fontSize="small"
                            sx={{
                                color: i < trainer.rating ? "#ffc107" : "#555",
                            }}
                        />
                    ))}
                </Box>

                <Button
                    onClick={() => setOpenModal(true)}
                    variant="outlined"
                    size="small"
                    startIcon={<VisibilityIcon />}
                    sx={{
                        color: "white",
                        borderColor: "white",
                        "&:hover": {
                            backgroundColor: "white",
                            color: "#362f2f",
                        },
                    }}
                >
                    View Profile
                </Button>
            </CardContent>
        </Card>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Modal open={openModal} onClose={() => setOpenModal(false)}>
                    <Box
                        sx={{
                            bgcolor: "#fff",
                            color: "#111",
                            p: 4,
                            borderRadius: 3,
                            width: "100%",
                            maxWidth: 520,
                            mx: "auto",
                            my: "10vh",
                            boxShadow: 10,
                            fontFamily: "Poppins, sans-serif",
                        }}
                    >
                        <Typography variant="h5" fontWeight={700} gutterBottom>
                            {trainer.name}
                        </Typography>

                        <Divider sx={{ mb: 3 }} />

                        {/* Info Section */}
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: 2,
                                mb: 4,
                            }}
                        >
                            <InfoLine label="Specialization" value={trainer.specialization} />
                            <InfoLine label="Rating" value={`${trainer.rating} ★`} />
                            <InfoLine label="Certification" value={trainer.certification} />
                            <InfoLine label="Experience" value={`${trainer.yearsOfExperience} years`} />
                            <InfoLine label="Price/hour" value={`$${trainer.pricePerHour}`} />
                            <InfoLine label="Available" value={`${trainer.startInterval} - ${trainer.endInterval}`} />
                        </Box>

                        {/* Pickers */}
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <DatePicker
                                    label="Start Date"
                                    value={startDate}
                                    onChange={setStartDate}
                                    renderInput={(params) => (
                                        <TextField {...params} fullWidth sx={{ fontFamily: "Poppins, sans-serif" }} />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <DatePicker
                                    label="End Date"
                                    value={endDate}
                                    onChange={setEndDate}
                                    renderInput={(params) => (
                                        <TextField {...params} fullWidth sx={{ fontFamily: "Poppins, sans-serif" }} />
                                    )}
                                />
                            </Grid>
                        </Grid>

                        {/* Button */}
                        <Button
                            fullWidth
                            variant="contained"
                            disabled={!startDate || !endDate}
                            sx={{
                                mt: 4,
                                fontWeight: 600,
                                fontFamily: "Poppins, sans-serif",
                                backgroundColor: !startDate || !endDate ? "#ccc" : "#ff5722",
                                ":hover": {
                                    backgroundColor: !startDate || !endDate ? "#ccc" : "#e64a19",
                                },
                            }}
                            onClick={() => {

                                addEnrollemnt();
                                setOpenModal(false);
                            }}
                        >
                            Enroll
                        </Button>
                    </Box>
                </Modal>
            </LocalizationProvider>


        </>
    );
}
