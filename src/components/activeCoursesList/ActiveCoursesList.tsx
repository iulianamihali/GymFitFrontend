import React, { useContext, useState, useEffect } from "react";
import {
    Card, CardContent, Typography, List, ListItem, ListItemAvatar,
    ListItemText, Avatar, Box, IconButton, Button, Modal, Divider
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import axios from "axios";
import { API_URL } from "../../authorization/config";
import { ApplicationContext } from "../../context/ApplicationContext";
import { ClientCourses } from "./types";
import {CourseDetails} from "../cards/types";

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import GroupIcon from '@mui/icons-material/Group';

const MAX_HEIGHT = 460;
const SLICE_AT   = 5;

export default function ActiveCoursesList() {
    const auth   = useContext(ApplicationContext);
    const userId = auth?.user?.userId;
    const token = auth?.user?.token;

    const [courses, setCourses] = useState<ClientCourses[]>([]);
    const [showAll, setShowAll] = useState(false);
    const [open, setOpen] = useState<boolean>(false);
    const [courseDetails, setCourseDetails] = useState<CourseDetails|null>(null);

    useEffect(() => {
        axios
            .get<ClientCourses[]>(`${API_URL}/client/courses/${userId}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(({ data }) => setCourses(data))
            .catch((err) => console.error(err));
    }, [userId,token]);

    const handleGetCourseDetails = (courseId: string) => {
        axios
            .get<CourseDetails>(`${API_URL}/client/courseDetails/${courseId}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(({ data }) => {
                setCourseDetails(data);
                setOpen(true);
            })
            .catch((err) => console.error(err));
    }
    const visibleCourses = showAll ? courses : courses.slice(0, SLICE_AT);

    return (
        <>
        <Card
            sx={{
                background: "linear-gradient(180deg, #2e2b2b 0%, #1c1a1a 100%)",
                color: "white",
                borderRadius: 2,
                width: 280,
                maxHeight: 480,      // ← limitezi la 460 px
                overflow: "hidden",  // ← blochezi extinderea; surplusul se ascunde
                display: "flex",
                flexDirection: "column",
            }}
        >
            <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", p: 2, minHeight: 0}}>

                <Typography variant="h6" sx={{ mb: 2, fontFamily: "Poppins, sans-serif" }}>
                    Active Courses
                </Typography>

                <Box
                    sx={{
                        flex: 1,
                        minHeight: 0,
                        overflowY: "auto",
                        pr: 1,
                        "&::-webkit-scrollbar": { width: "6px" },
                        "&::-webkit-scrollbar-thumb": {
                            background: "#444",
                            borderRadius: "10px",
                            "&:hover": { background: "#666" },
                        },
                    }}
                >
                    <List sx={{ p: 0 }}>
                        {visibleCourses.map((course, idx) => (
                            <ListItem
                                key={idx}
                                sx={{
                                    py: 1,
                                    px: 1,
                                    "& .MuiListItemSecondaryAction-root": {
                                        right: 4,
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                    },
                                }}
                                secondaryAction={
                                    <IconButton edge="end" onClick={() => {
                                        handleGetCourseDetails(course.courseId);
                                    }}>
                                        <ChevronRightIcon sx={{ color: "#ff7a00" }} />
                                    </IconButton>
                                }
                            >
                                <ListItemAvatar sx={{ minWidth: 40, mr: 1.4 }}>
                                    <Avatar sx={{ bgcolor: "#555" }}>
                                        {course.trainerName[0].toUpperCase()}
                                    </Avatar>
                                </ListItemAvatar>

                                <ListItemText
                                    primary={
                                        <Typography sx={{ fontSize: "0.95rem", fontFamily: "Poppins, sans-serif" }}>
                                            {course.courseTitle}
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography
                                            noWrap
                                            sx={{ color: "#888", fontSize: "0.8rem", fontFamily: "Poppins, sans-serif" }}
                                        >
                                            Trainer: {course.trainerName}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>


                {courses.length > SLICE_AT && (
                    <Button
                        size="small"
                        onClick={() => setShowAll(!showAll)}
                        sx={{
                            mt: 1,
                            alignSelf: "center",
                            fontSize: "0.8rem",
                            color: "#aaa",
                            textTransform: "none",
                            "&:hover": { color: "white", background: "transparent" },
                        }}
                    >
                        {showAll ? "Show Less" : "More"}
                    </Button>
                )}
            </CardContent>
        </Card>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "white",          
                        color: "#1e1d1d",
                        borderRadius: 2,
                        boxShadow: 24,
                        p: 4,
                        width: 320,
                        maxWidth: "90vw",
                        fontFamily: "Poppins, sans-serif",
                    }}
                >
                    <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                        {courseDetails?.title}
                    </Typography>

                    <Typography sx={{ mb: 2, color: "#555" }}>
                        Trainer: <b>{courseDetails?.trainerName}</b>
                    </Typography>

                    <Divider sx={{ borderColor: "#e0e0e0", mb: 2 }} />

                    <Typography sx={{ mb: 2, fontSize: 14, lineHeight: 1.45 }}>
                        {courseDetails?.description}
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                        <MonetizationOnIcon sx={{ color: "#ff774c" }} />
                        <Typography variant="body1">
                            <b>{courseDetails?.price.toFixed(2)} RON</b>
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
                        <GroupIcon sx={{ color: "#1976d2" }} />
                        <Typography variant="body1">
                            Max participants: <b>{courseDetails?.maxParticipants}</b>
                        </Typography>
                    </Box>

                    <Button
                        fullWidth
                        variant="contained"
                        onClick={() => setOpen(false)}
                        sx={{
                            background: "linear-gradient(135deg,#ff5e2d,#ff774c)",
                            color: "white",
                            fontWeight: 600,
                            borderRadius: 3,
                            "&:hover": {
                                background: "linear-gradient(135deg,#e84c1a,#ff6a3c)",
                            },
                        }}
                    >
                        OK
                    </Button>
                </Box>
            </Modal>

        </>
    );
}
