import React, { useEffect, useState, useContext } from "react";
import {
    Grid,
    TextField,
    Typography,
    Button,
    MenuItem,
    Card,
    CardContent,
    CircularProgress,
    Box,
} from "@mui/material";
import axios from "axios";
import { ApplicationContext } from "../../../context/ApplicationContext";
import { API_URL } from "../../../authorization/config";
import {SettingsInfoClient} from "../../../components/cards/types";

const genders = ["Male", "Female", "Other"];

const ProfileSettings = () => {
    const context = useContext(ApplicationContext);
    const userId = context?.user?.userId;
    const [formData, setFormData] = useState<SettingsInfoClient | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) return;
        axios
            .get<SettingsInfoClient>(`${API_URL}/client/settingsInfoClient/${userId}`)
            .then(({ data }) => {
                setFormData(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Failed to fetch settings", error);
                setLoading(false);
            });
    }, [userId]);

    const handleChange = (field: keyof SettingsInfoClient, value: string) => {
        if (!formData) return;
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = () => {
        if (!formData || !userId) return;

        axios
            .put(`${API_URL}/client/editProfile`, formData)
            .then(() => {
                alert("Saved successfully");
            })
            .catch((error) => {
                console.error("Failed to save settings", error);
            });
    };

    if (loading || !formData) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress sx={{ color: "#ff5722" }} />
            </Box>
        );
    }

    return (

        <Box display="flex" justifyContent="center" mt={5} >
            <Card
                sx={{
                    backgroundColor: "#362f2f",
                    color: "white",
                    p: 4,
                    borderRadius: 3,
                    maxWidth: 800,
                    width: "100%",
                    boxShadow: 5,
                }}
            >
                <CardContent>
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", color: "#ff5722" }}>
                        Profile Settings
                    </Typography>

                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="First Name"
                                value={formData.firstName}
                                onChange={(e) => handleChange("firstName", e.target.value)}
                                fullWidth
                                variant="outlined"
                                InputProps={{ sx: { color: "white" } }}
                                InputLabelProps={{ sx: { color: "#ff5722" } }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Last Name"
                                value={formData.lastName}
                                onChange={(e) => handleChange("lastName", e.target.value)}
                                fullWidth
                                variant="outlined"
                                InputProps={{ sx: { color: "white" } }}
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
                                inputProps={{ maxLength: 10 ,minLength: 10}}

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
                                label="User Type"
                                value={formData.userType}
                                fullWidth
                                variant="outlined"
                                InputProps={{ readOnly: true, sx: { color: "#bbbbbb" } }}
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

export default ProfileSettings;
