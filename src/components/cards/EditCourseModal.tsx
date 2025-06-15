import React, {useState, useEffect, useContext} from "react";
import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    Grid,
} from "@mui/material";
import { CoursesCreatedByTrainer } from "./types";
import { Checkbox, FormControlLabel } from "@mui/material";
import axios from "axios";
import {API_URL} from "../../authorization/config";
import {ApplicationContext} from "../../context/ApplicationContext";


type Props = {
    open: boolean;
    onClose: () => void;
    course: CoursesCreatedByTrainer;
    updateNumber: () => void;
    isForEdit: boolean;
};

export default function EditCourseModal({ open, onClose, course, updateNumber, isForEdit}: Props) {
    const auth = useContext(ApplicationContext);
    const userId = auth?.user?.userId;
    const [editedCourse, setEditedCourse] = useState(course);

    useEffect(() => {
        setEditedCourse(course);
    }, [course]);

    const handleChange = (field: keyof CoursesCreatedByTrainer) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setEditedCourse(prev => ({
            ...prev,
            [field]: field === "price" || field === "maxParticipants"
                ? Number(event.target.value)
                : event.target.value,
        }));
    };

    const handleSave = () => {
        if(isForEdit){
            axios
                .put(`${API_URL}/trainer/editCourse`, editedCourse)
                .then(() => {
                    alert("Saved successfully");
                    updateNumber();
                })
                .catch((error) => {
                    console.error("Failed to save settings", error);
                });
        }else{
            axios
                .post(`${API_URL}/trainer/addCourse/${userId}`, editedCourse)
                .then(() => {
                    alert("Saved successfully");
                    updateNumber();
                })
                .catch((error) => {
                    console.error("Failed to save settings", error);
                });
        }

        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    backgroundColor: "#362f2f",
                    color: "white",
                    p: 4,
                    borderRadius: 2,
                    width: 500,
                    mx: "auto",
                    mt: "10vh",
                    boxShadow: 24,
                    fontFamily: "Poppins, sans-serif"
                }}
            >
                <Typography variant="h6" sx={{ mb: 3, color: "#ff5722" }}>
                    Edit Course
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Title"
                            value={editedCourse.title}
                            onChange={handleChange("title")}
                            variant="outlined"
                            InputLabelProps={{ style: { color: "#ccc" } }}
                            InputProps={{ style: { color: "white" } }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Description"
                            value={editedCourse.description}
                            onChange={handleChange("description")}
                            variant="outlined"
                            multiline
                            minRows={3}
                            InputLabelProps={{ style: { color: "#ccc" } }}
                            InputProps={{ style: { color: "white" } }}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Price (RON)"
                            type="number"
                            value={editedCourse.price}
                            onChange={handleChange("price")}
                            variant="outlined"
                            InputLabelProps={{ style: { color: "#ccc" } }}
                            InputProps={{ style: { color: "white" } }}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Max Participants"
                            type="number"
                            value={editedCourse.maxParticipants}
                            onChange={handleChange("maxParticipants")}
                            variant="outlined"
                            InputLabelProps={{ style: { color: "#ccc" } }}
                            InputProps={{ style: { color: "white" } }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={editedCourse.active}
                                    onChange={(e) =>
                                        setEditedCourse((prev) => ({
                                            ...prev,
                                            active: e.target.checked,
                                        }))
                                    }
                                    sx={{
                                        color: "#ff5722",
                                        "&.Mui-checked": {
                                            color: "#ff5722",
                                        },
                                    }}
                                />
                            }
                            label={
                                <Typography sx={{ color: "#ccc", fontFamily: "Poppins, sans-serif" }}>
                                    Active
                                </Typography>
                            }
                        />
                    </Grid>

                </Grid>

                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4, gap: 2 }}>
                    <Button onClick={onClose} sx={{ color: "#ccc" }}>
                        Cancel
                    </Button>
                    <Button variant="contained" sx={{ backgroundColor: "#ff5722" }} onClick={handleSave}>
                        {isForEdit ? "Save" : "Add"}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
