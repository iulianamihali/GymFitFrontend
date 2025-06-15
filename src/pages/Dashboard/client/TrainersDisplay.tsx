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
    const[reloadCard, setReloadCard] = useState<number>(0);

    const handleReload = () => {
        setReloadCard(x => x+1);
    }


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
    }, [specializationSelected, token,userId, reloadCard]);


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
            <Box sx={{ backgroundColor: "#252323", minHeight: "100vh", pt: 5, px: 2 }}>
            <Box sx={{ mb: 4,
                pb: 3,
                borderBottom: "1px solid rgba(255,255,255,0.06)", }}>

                <Typography
                    variant="h6"
                    sx={{
                        color: "#ccc",
                        fontWeight: 600,
                        fontSize: "1.15rem",
                        mb: 2,
                    }}
                >
                    Achieve lasting results with expert certified trainers by your side.
                </Typography>


                <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 2,  }}>
                    <Button
                        variant="contained"
                        startIcon={<GroupIcon />}
                        sx={{
                            backgroundColor: "#2e2e2e",
                            color: "white",
                            fontWeight: 600,
                            fontSize: "0.9rem",
                            borderRadius: "10px",
                            px: 3,
                            py: 1.2,
                            textTransform: "none",
                            boxShadow: "0px 4px 12px rgba(0,0,0,0.25)",

                            ":hover": {
                                backgroundColor: "#ef6c00",
                                boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.35)",
                            },
                            "& .MuiSvgIcon-root": {
                                color: "#fb8c00",
                            },
                        }}
                        onClick={() => setOpen(true)}
                    >
                        My Trainers
                    </Button>

                    <FormControl size="small" sx={{ ml: 100,minWidth: 200 }}>
                        <InputLabel
                            sx={{
                                color: "#bbb",
                                fontSize: "0.85rem",
                                fontWeight: 500,
                                "&.Mui-focused": {
                                    color: "#fb8c00",
                                },
                            }}
                        >
                            Specialization
                        </InputLabel>
                        <Select
                            value={specializationSelected || ""}
                            label="Specialization"
                            onChange={(e) => setSpecializationSelected(e.target.value || null)}
                            sx={{ color: "#fff",  backgroundColor: "#2e2e2e",   borderRadius: "10px",   "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#fb8c00",
                                },  "& .MuiSvgIcon-root": {
                                    color: "#fb8c00",
                                },
                                boxShadow: "0px 4px 12px rgba(0,0,0,0.25)",
                            }}
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
            </Box>



            <Grid container spacing={3}>
                {trainerCards.map((trainer) => (
                    <Grid item xs={12} sm={6} md={4} key={trainer.id}>
                        <TrainerCard trainer={trainer} />
                    </Grid>
                ))}
            </Grid>

        </Box>

            <MyTrainers open={open} onClose={() => setOpen(false)} reloadCards={handleReload} reloadCard={reloadCard}></MyTrainers>
            </>
    );
}