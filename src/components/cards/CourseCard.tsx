import {
    Avatar,
    Card,
    CardContent,
    Typography,
    Button,
    Box, Divider, Modal, TextField,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { deepOrange, deepPurple, blue, green } from "@mui/material/colors";
import { CourseCardResponse } from "./types";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import Grid from "@mui/material/Grid";
import { useContext, useState } from "react";
import axios from "axios";
import { API_URL } from "../../authorization/config";
import { ApplicationContext } from "../../context/ApplicationContext";

type Props = {
    course: CourseCardResponse;
    updatedNumber: () => void;
};

const colors = [deepOrange[500], deepPurple[500], blue[500], green[500]];

function getInitials(name: string) {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
}

export default function CourseCard({ course, updatedNumber }: Props) {

    const auth = useContext(ApplicationContext);
    const userId = auth?.user?.userId;
    const token = auth?.user?.token;

    const colorIndex = course.trainerName.length % colors.length;
    const initials = getInitials(course.trainerName);


    const [openModal, setOpenModal] = useState<boolean>(false);
    const addEnrollemntCourse = (course:CourseCardResponse) => {

        axios
            .post<string>(`${API_URL}/client/enrollmentCourse`, {
                clientId: userId,
                courseId: course.courseId
            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(({ data }) => {
                if(data == "Success")
                {
                    alert(`You successfully enrolled at the course ${course.title}!`);
                    updatedNumber();
                }
                else
                {
                    alert("You are already enrolled in this course!")
                }

            })
            .catch((err) => console.error("Failed to enroll at the course:", err));
    }
    function InfoLine({ label, value }: { label: string; value: string }) {
        return (
            <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                    variant="caption"
                    sx={{ fontWeight: 500, color: "#888", fontSize: "0.75rem" }}
                >
                    {label.toUpperCase()}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {value}
                </Typography>
            </Box>
        );
    }

    return (
        <>
            <Card
                sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 2,
                    bgcolor: "#362f2f",
                    borderRadius: 3,
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                        transform: "scale(1.03)",
                        boxShadow: 6,
                    },
                }}
            >
                <Avatar
                    sx={{
                        bgcolor: colors[colorIndex],
                        width: 56,
                        height: 56,
                        mr: 2,
                        fontSize: "1.1rem",
                        fontWeight: 600,
                    }}
                >
                    {initials}
                </Avatar>

                <CardContent
                    sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1.2,
                        justifyContent: "space-between",
                    }}
                >
                    <Box>
                        <Typography variant="h6" sx={{ color: "white", mb: 0.5 }}>
                            {course.title}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ color: "#bbb", fontStyle: "italic", mb: 0.5 }}
                        >
                            Trainer: {course.trainerName}
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{ color: "#ffc107", fontWeight: 600 }}
                        >
                            {course.totalParticipants}/{course.maxParticipants} Enrolled
                        </Typography>
                    </Box>

                    <Box mt={1}>
                        <Button
                            onClick={() => setOpenModal(true)}
                            variant="outlined"
                            size="small"
                            startIcon={<VisibilityIcon />}
                            sx={{
                                color: "white",
                                borderColor: "white",
                                "&:hover": {
                                    backgroundColor: "white",
                                    color: "#362f2f",
                                },
                            }}
                        >
                            Enroll Course
                        </Button>
                    </Box>
                </CardContent>

            </Card>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Modal open={openModal} onClose={() => setOpenModal(false)}>
                    <Box
                        sx={{
                            bgcolor: "#fff",
                            color: "#111",
                            p: 4,
                            borderRadius: 3,
                            width: "100%",
                            maxWidth: 520,
                            mx: "auto",
                            my: "10vh",
                            boxShadow: 10,
                            fontFamily: "Poppins, sans-serif",
                        }}
                    >
                        <Typography variant="h5" fontWeight={700} gutterBottom>
                            {course.title}
                        </Typography>

                        <Divider sx={{ mb: 3 }} />

                        {/* Info Section */}
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: 2,
                                mb: 4,
                            }}
                        >
                            <InfoLine label="Trainer" value={course.trainerName} />
                            <InfoLine label="Price" value={`$${course.price}`} />
                            <InfoLine label="Max Participants" value={`${course.maxParticipants}`} />
                            <InfoLine label="Total Enrolled" value={`${course.totalParticipants}`} />
                            <InfoLine label="Active" value={course.active ? "Yes" : "No"} />
                        </Box>


                        {/* Button */}
                        <Button
                            fullWidth
                            variant="contained"
                            disabled={(course.totalParticipants >= course.maxParticipants) || !course.active}
                            sx={{
                                mt: 4,
                                fontWeight: 600,
                                fontFamily: "Poppins, sans-serif",
                                backgroundColor: "#ff5722"

                            }}
                            onClick={() => {
                                addEnrollemntCourse(course);
                                setOpenModal(false);
                            }}
                        >
                            Enroll
                        </Button>
                    </Box>
                </Modal>
            </LocalizationProvider>
        </>
    );
}
