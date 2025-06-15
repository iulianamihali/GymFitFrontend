import React, {useContext, useEffect, useState} from "react";
import TrainerCard from "../../../components/cards/TrainerCard";
import {CourseDetails, TrainerCardResponse} from "../../../components/cards/types";
import axios from "axios";
import {API_URL} from "../../../authorization/config";
import {Box, Grid, Typography, FormControl, InputLabel, MenuItem, Select, Button} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import MyTrainers from "../../../components/cards/MyTrainers";
import {ApplicationContext} from "../../../context/ApplicationContext";

export function TrainersDisplay() {
    const auth = useContext(ApplicationContext);
    const userId = auth?.user?.userId;
    const token = auth?.user?.token;

    const [trainerCards, setTrainerCards] = useState<TrainerCardResponse[]>([]);
    const [specializationSelected, setSpecializationSelected] = useState<string|null>(null);
    const [allSpecializations, setAllSpecializations] = useState<string[]>([]);
    const[open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        const filterQuery = specializationSelected
            ? `?$filter=specialization eq '${specializationSelected}'`
            : "";

        axios
            .get<TrainerCardResponse[]>(`${API_URL}/client/trainerCardInfo${filterQuery}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(({ data }) => {
                setTrainerCards(data);
            })
            .catch((err) => console.error(err));
    }, [specializationSelected, token,userId]);


    useEffect(() => {
        axios
            .get<string[]>(`${API_URL}/client/allSpecializations`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(({ data }) => setAllSpecializations(data))
            .catch((err) => console.error("Failed to fetch specializations", err));
    }, [token,userId]);


    return (
        <>
        <Box sx={{ backgroundColor: "#252323", minHeight: "100vh", padding: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                <Typography variant="h6" sx={{ color: "#ccc" }}>
                    Choose from our certified personal trainers to elevate your fitness journey.
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<GroupIcon />}
                    sx={{
                        backgroundColor: "#ff5722",
                        color: "white",
                        fontWeight: 600,
                        borderRadius: "10px",
                        paddingX: 3,
                        paddingY: 1.2,
                        boxShadow: "0px 3px 10px rgba(0,0,0,0.3)",
                        textTransform: "none",
                        ":hover": {
                            backgroundColor: "#e64a19",
                        },
                    }}
                    onClick={() => {
                        setOpen(true);
                    }}
                >
                    My Trainers
                </Button>

                <FormControl size="small" sx={{ minWidth: 200 }}>
                    <InputLabel sx={{ color: "#ccc" }}>Specialization</InputLabel>
                    <Select
                        value={specializationSelected || ""}
                        label="Specialization"
                        onChange={(e) => setSpecializationSelected(e.target.value || null)}
                        sx={{ color: "#fff", borderColor: "#ccc" }}
                    >
                        <MenuItem value="">All</MenuItem>
                        {allSpecializations.map((spec) => (
                            <MenuItem key={spec} value={spec}>
                                {spec}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>


            <Grid container spacing={3}>
                {trainerCards.map((trainer) => (
                    <Grid item xs={12} sm={6} md={4} key={trainer.id}>
                        <TrainerCard trainer={trainer} />
                    </Grid>
                ))}
            </Grid>

        </Box>

            <MyTrainers open={open} onClose={() => setOpen(false)}></MyTrainers>
            </>
    );
}