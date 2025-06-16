import React, {useContext, useEffect, useState} from "react";
import {CourseCardResponse} from "../../../components/cards/types";
import axios from "axios";
import {API_URL} from "../../../authorization/config";
import {Box, Grid, Typography, TextField} from "@mui/material";

import CourseCard from "../../../components/cards/CourseCard";
import {ApplicationContext} from "../../../context/ApplicationContext";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
export function CoursesDisplay() {
    const context = useContext(ApplicationContext);
    const userId = context?.user?.userId;
    const token = context?.user?.token;

    const [coursesCard, setCoursesCards] = useState<CourseCardResponse[]>([]);
    const [searchCourse, setSearchCourse] = useState<string|null>(null);

    const[numberUpdated, setNumberUpdated] = useState<number>(0);
    const handleUpdateNumbers = () => {
        setNumberUpdated(numberUpdated+1);
    }

    useEffect(() => {
        const filterQuery = searchCourse
            ? `?searchCourse=${encodeURIComponent(searchCourse)}`
            : "";

        axios
            .get<CourseCardResponse[]>(`${API_URL}/client/coursesCardInfo${filterQuery}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(({ data }) => {
               setCoursesCards(data);
            })
            .catch((err) => console.error(err));
    }, [searchCourse,numberUpdated, token,userId]);




    return (
        <>
            <Box sx={{ backgroundColor: "#252323", minHeight: "100vh", padding: 2.5 }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 2,
                        mb: 4,
                        px: 1,
                        pt:2
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 600,
                            fontSize: "1.25rem",
                            color: "#fff",
                            fontFamily: "Poppins, sans-serif",
                        }}
                    >
                        Your Fitness Journey Starts with the Right Course
                    </Typography>

                    <TextField
                        value={searchCourse}
                        onChange={(e) => setSearchCourse(e.target.value)}
                        placeholder="Search Course"
                        variant="outlined"
                        size="small"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: "#fb8c00", fontSize: "1.2rem" }} />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            backgroundColor: "#fff",
                            borderRadius: "10px",
                            width: { xs: "100%", sm: "260px" },
                            "& .MuiOutlinedInput-root": {
                                fontFamily: "Poppins, sans-serif",
                                fontSize: "0.9rem",
                                "& fieldset": {
                                    borderColor: "#ccc",
                                },
                                "&:hover fieldset": {
                                    borderColor: "#fb8c00",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#fb8c00",
                                    boxShadow: "0 0 0 1px #fb8c00",
                                },
                            },
                        }}
                    />
                </Box>



                <Grid container spacing={3} sx={{overflowY:"auto", maxHeight:"85vh", overflowX:"hidden"}}>
                    {coursesCard.map((course) => (
                        <Grid item xs={12} sm={6} md={4} key={course.courseId}>
                            <CourseCard course={course} updatedNumber={handleUpdateNumbers} />
                        </Grid>
                    ))}
                </Grid>

            </Box>


        </>
    );
}