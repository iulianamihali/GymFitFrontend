import React, { useEffect, useState, useContext } from "react";
import {
    Grid,
    TextField,
    Typography,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Box
} from "@mui/material";
import axios from "axios";
import { ApplicationContext } from "../../../context/ApplicationContext";
import { API_URL } from "../../../authorization/config";
import { TrainerProfileSettings } from "../../../components/cards/types";
import Cookies from "js-cookie";


const TrainerProfileSettingsComponent = () => {
    const context = useContext(ApplicationContext);
    const userId = context?.user?.userId;
    const token = context?.user?.token;

    const [formData, setFormData] = useState<TrainerProfileSettings | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (!userId || !token) return;
        axios
            .get<TrainerProfileSettings>(`${API_URL}/trainer/profileTrainer/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            .then(({ data }) => {
                setFormData(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [userId,token]);

    const handleChange = (field: keyof TrainerProfileSettings, value: string | number) => {
        if (!formData) return;
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = () => {
        if (!formData || !userId || !token) return;


        axios
            .put(`${API_URL}/trainer/editTrainerProfile`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(() => alert("Saved successfully"))
            .catch((error) => console.error("Failed to save settings", error));
    };

    if (loading || !formData) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress sx={{ color: "#ff5722" }} />
            </Box>
        );
    }

    return (
        <Box display="flex" justifyContent="center" mt={5}>
            <Card
                sx={{
                    backgroundColor: "#362f2f",
                    color: "white",
                    p: 4,
                    borderRadius: 3,
                    maxWidth: 900,
                    width: "100%",
                    boxShadow: 5,
                }}
            >
                <CardContent>
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", color: "#ff5722" }}>
                        Trainer Profile Settings
                    </Typography>

                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Name"
                                value={formData.firstName}
                                fullWidth
                                variant="outlined"
                                InputProps={{ readOnly: true, sx: { color: "#bbbbbb" } }}
                                InputLabelProps={{ sx: { color: "#ff5722" } }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Email"
                                value={formData.email}
                                fullWidth
                                variant="outlined"
                                InputProps={{ readOnly: true, sx: { color: "#bbbbbb" } }}
                                InputLabelProps={{ sx: { color: "#ff5722" } }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Phone Number"
                                value={formData.phoneNumber}
                                onChange={(e) => handleChange("phoneNumber", e.target.value)}
                                fullWidth
                                variant="outlined"
                                InputProps={{ sx: { color: "white" } }}
                                InputLabelProps={{ sx: { color: "#ff5722" } }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Address"
                                value={formData.address}
                                onChange={(e) => handleChange("address", e.target.value)}
                                fullWidth
                                variant="outlined"
                                InputProps={{ sx: { color: "white" } }}
                                InputLabelProps={{ sx: { color: "#ff5722" } }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Specialization"
                                value={formData.specialization}
                                onChange={(e) => handleChange("specialization", e.target.value)}
                                fullWidth
                                variant="outlined"
                                InputProps={{ sx: { color: "white" } }}
                                InputLabelProps={{ sx: { color: "#ff5722" } }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Certification"
                                value={formData.certification}
                                onChange={(e) => handleChange("certification", e.target.value)}
                                fullWidth
                                variant="outlined"
                                InputProps={{ sx: { color: "white" } }}
                                InputLabelProps={{ sx: { color: "#ff5722" } }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Years of Experience"
                                type="number"
                                value={formData.yearsOfExperience}
                                onChange={(e) => handleChange("yearsOfExperience", parseInt(e.target.value))}
                                fullWidth
                                variant="outlined"
                                InputProps={{ sx: { color: "white" } }}
                                InputLabelProps={{ sx: { color: "#ff5722" } }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Price Per Hour"
                                type="number"
                                value={formData.pricePerHour}
                                onChange={(e) => handleChange("pricePerHour", parseFloat(e.target.value))}
                                fullWidth
                                variant="outlined"
                                InputProps={{ sx: { color: "white" } }}
                                InputLabelProps={{ sx: { color: "#ff5722" } }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Start Interval"
                                type="time"
                                value={formData.startInterval}
                                onChange={(e) => handleChange("startInterval", e.target.value)}
                                fullWidth
                                variant="outlined"
                                InputProps={{ sx: { color: "white" } }}
                                InputLabelProps={{ sx: { color: "#ff5722" } }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="End Interval"
                                type="time"
                                value={formData.endInterval}
                                onChange={(e) => handleChange("endInterval", e.target.value)}
                                fullWidth
                                variant="outlined"
                                InputProps={{ sx: { color: "white" } }}
                                InputLabelProps={{ sx: { color: "#ff5722" } }}
                            />
                        </Grid>

                        <Grid item xs={12} display="flex" justifyContent="flex-end">
                            <Button
                                variant="contained"
                                onClick={handleSubmit}
                                sx={{
                                    backgroundColor: "#ff5722",
                                    "&:hover": { backgroundColor: "#e64a19" },
                                    px: 4,
                                    py: 1.2,
                                    fontWeight: "bold",
                                    borderRadius: 2,
                                }}
                            >
                                SAVE CHANGES
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
};

export default TrainerProfileSettingsComponent;
