import {Card, CardContent, Grid, Typography } from "@mui/material";
import React, {useContext} from "react";
import ActiveCoursesList from "../../../components/activeCoursesList/ActiveCoursesList";
import ActiveSubscriptionInfoCard from "../../../components/cards/ActiveSubscriptionInfoCard";
import AddSessionCard from "../../../components/cards/AddNewSessionCard";
import NextTrainingInfoCard from "../../../components/cards/NextTrainingInfoCard";
import SummaryTrainerCard from "../../../components/cards/SummaryTrainerCard";
import TrainerCoursesCreated from "../../../components/cards/TrainerCoursesCreated";
import TrainerNextSession from "../../../components/cards/TrainerNextSession";
import TrainingChart from "../../../components/charts/TrainingChart";
import {ApplicationContext} from "../../../context/ApplicationContext";
export function DashboardContentTrainer()
{
    const auth   = useContext(ApplicationContext);

    return (
        <>
            <h1 style={{
                marginBottom: "16px",
                marginTop: "-5px",
                background: "#252223",
                color: "white",
                paddingLeft: 80,
                paddingTop: "30px",
                fontFamily: "Poppins, sans-serif",
                fontSize: 25
            }}
            >Welcome Back, {auth?.user?.userName}!</h1>
            <Grid container spacing={2}
                  sx={{padding: 3, backgroundColor: "#252223", minHeight: "100vh", position: "relative"}}>

                <Grid item style={{paddingLeft:70 }}>
                    <TrainerNextSession/>
                </Grid>

                <Grid item>
                    <SummaryTrainerCard/>
                </Grid>

                <Grid item xs={12} sx={{maxWidth: "600px", width: "100%", mr: "300px"}}>
                    <TrainingChart/>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md="auto"
                    sx={{
                        width: "280px",
                        position: "absolute",
                        right: "32px",
                        top: "180px",
                    }}
                >
                    <TrainerCoursesCreated/>
                </Grid>
            </Grid>

        </>
    );

}

