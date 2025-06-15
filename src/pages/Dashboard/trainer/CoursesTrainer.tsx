import { Box, Typography, Grid, Card, CardContent, IconButton } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {ApplicationContext} from "../../../context/ApplicationContext";
import {CoursesCreatedByTrainer} from "../../../components/cards/types";
import {API_URL} from "../../../authorization/config";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import EditCourseModal from "../../../components/cards/EditCourseModal";
import AddIcon from "@mui/icons-material/Add";
import Cookies from "js-cookie";


export default function CoursesTrainer() {
    const auth = useContext(ApplicationContext);
    const userId = auth?.user?.userId;
    const token = auth?.user?.token;

    const [courses, setCourses] = useState<CoursesCreatedByTrainer[]>([]);
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [course, setCourse] = useState<CoursesCreatedByTrainer>();
    const [updatedNumber, setUpdatedNumber] = useState<number>(0);
    const [isForEdit, setIsForEdit] = useState<boolean>(false);

    useEffect(() => {
        if (!userId || !token) return;
        axios
            .get(`${API_URL}/trainer/coursesCreatedByTrainer/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            .then(({ data }) => setCourses(data))
            .catch((err) => console.error("Failed to fetch courses:", err));
    }, [userId, updatedNumber,token]);


    return (
        <Box sx={{ backgroundColor: "#252223", minHeight: "100vh", px: 8, py: 6 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                <Typography
                    variant="h4"
                    sx={{
                        color: "#ff5722",
                        fontFamily: "Poppins, sans-serif",
                        pl: "10px",
                    }}
                >
                    Your Created Courses
                </Typography>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{
                        backgroundColor: "#ff5722",
                        borderRadius: "50px",
                        textTransform: "none",
                        fontWeight: "bold",
                        fontSize: "0.875rem",
                        px: 3,
                        py: 1.2,
                        fontFamily: "Poppins, sans-serif",
                        boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
                        "&:hover": {
                            backgroundColor: "#e64a19",
                            transform: "scale(1.03)",
                            transition: "0.2s",
                        },
                    }}
                    onClick={() => {
                        setCourse({
                            id: null,
                            title: "",
                            description: "",
                            price: 0,
                            maxParticipants: 0,
                            totalParticipants: 0,
                            active: true,
                        });
                        setOpenEdit(true);
                        setIsForEdit(false);
                    }}
                >
                    Add Course
                </Button>
            </Box>



            <Grid container spacing={3}>
                {courses.map((course, idx) => (
                    <Grid item xs={12} sm={6} md={4} key={idx}>
                        <Card
                            sx={{
                                background:course.active ? "#362f2f" :"linear-gradient(135deg, #424242, #616161)",
                                color: "white",
                                borderRadius: "16px",
                                boxShadow: 3,
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                fontFamily: "Poppins, sans-serif",
                                position: "relative", // foarte important
                            }}
                        >

                            <IconButton onClick={() => {
                                setOpenEdit(true);
                                setIsForEdit(true);
                                setCourse(course);
                            }}
                                sx={{
                                    position: "absolute",
                                    top: 8,
                                    right: 8,
                                    color: "#fff",
                                    backgroundColor: "#ff5722",
                                    "&:hover": {
                                        backgroundColor: "#e64a19",
                                    },
                                    width: 32,
                                    height: 32,
                                }}
                            >
                                <EditIcon fontSize="small" />
                            </IconButton>

                            <CardContent>
                                <Typography variant="h6" sx={{ color: "#ff5722", mb: 1 }}>
                                    {course.title}
                                </Typography>

                                <Typography variant="body2" sx={{ opacity: 0.85, mb: 2 }}>
                                    {course.description}
                                </Typography>

                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography variant="subtitle2">
                                        <strong>{course.price} RON</strong>
                                    </Typography>

                                    <Typography variant="caption" sx={{ color: "#ff5722" }}>
                                        {course.totalParticipants}/{course.maxParticipants}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>

                    </Grid>
                ))}
            </Grid>
            {course ?
            <EditCourseModal
                open={openEdit}
                onClose={() => setOpenEdit(false)}
                course={course}
                updateNumber={() => setUpdatedNumber(updatedNumber+1)}
                isForEdit={isForEdit}
            /> : null}
        </Box>
    );
}
