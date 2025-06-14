import React, {useContext, useEffect, useState} from "react";
import TrainerCard from "../../../components/cards/TrainerCard";
import {CourseCardResponse, CourseDetails, TrainerCardResponse} from "../../../components/cards/types";
import axios from "axios";
import {API_URL} from "../../../authorization/config";
import {Box, Grid, Typography, FormControl, InputLabel, MenuItem, Select, Button, TextField} from "@mui/material";

import CourseCard from "../../../components/cards/CourseCard";

export function CoursesDisplay() {


    const [coursesCard, setCoursesCards] = useState<CourseCardResponse[]>([]);
    const [searchCourse, setSearchCourse] = useState<string|null>(null);

    const[numberUpdated, setNumberUpdated] = useState<number>(0);


    useEffect(() => {
        const filterQuery = searchCourse
            ? `?searchCourse=${encodeURIComponent(searchCourse)}`
            : "";

        axios
            .get<CourseCardResponse[]>(`${API_URL}/client/coursesCardInfo${filterQuery}`)
            .then(({ data }) => {
               setCoursesCards(data);
            })
            .catch((err) => console.error(err));
    }, [searchCourse,numberUpdated]);




    return (
        <>
            <Box sx={{ backgroundColor: "#252323", minHeight: "100vh", padding: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                    <Typography variant="h6" sx={{ color: "#ccc" }}>
                        Choose from our certified personal trainers to elevate your fitness journey.
                    </Typography>


                    <TextField
                        value={searchCourse}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setSearchCourse(event.target.value)
                        }
                        placeholder="Search Course"
                        variant="outlined"
                        type="text"
                        sx={{
                            backgroundColor: "#fff",
                            borderRadius: 2,
                            input: {
                                fontFamily: "Poppins, sans-serif",
                            },
                        }}
                    />

                </Box>


                <Grid container spacing={3}>
                    {coursesCard.map((course) => (
                        <Grid item xs={12} sm={6} md={4} key={course.courseId}>
                            <CourseCard course={course} updatedNumber={() => {setNumberUpdated(numberUpdated+1);}} />
                        </Grid>
                    ))}
                </Grid>

            </Box>


        </>
    );
}