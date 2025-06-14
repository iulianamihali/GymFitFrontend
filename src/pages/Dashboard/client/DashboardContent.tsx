import {Card, CardContent, Grid, Typography } from "@mui/material";
import React, {useContext} from "react";
import ActiveCoursesList from "../../../components/activeCoursesList/ActiveCoursesList";
import ActiveSubscriptionInfoCard from "../../../components/cards/ActiveSubscriptionInfoCard";
import AddSessionCard from "../../../components/cards/AddNewSessionCard";
import NextTrainingInfoCard from "../../../components/cards/NextTrainingInfoCard";
import TrainingChart from "../../../components/charts/TrainingChart";
import {ApplicationContext} from "../../../context/ApplicationContext";
function DashboardContent()
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
                    <NextTrainingInfoCard/>
                </Grid>

                <Grid item>
                    <ActiveSubscriptionInfoCard/>
                </Grid>

                <Grid item style={{paddingLeft: 255, paddingTop:3}}>
                    <AddSessionCard/>
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
                    <ActiveCoursesList/>
                </Grid>
            </Grid>

        </>
    );

}

export default DashboardContent;