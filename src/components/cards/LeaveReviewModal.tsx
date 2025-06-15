import React, {useContext, useState} from "react";
import {
    Box,
    Modal,
    Typography,
    Button,
    TextField,
    Rating,
} from "@mui/material";
import axios from "axios";
import {API_URL} from "../../authorization/config";
import {ApplicationContext} from "../../context/ApplicationContext";

interface LeaveReviewModalProps {
    open: boolean;
    onClose: () => void;
    trainerId: string;
    reloadCards: () => void;
}



const LeaveReviewModal= (props: LeaveReviewModalProps) => {
    const auth = useContext(ApplicationContext);
    const userId = auth?.user?.userId;
    const token = auth?.user?.token;

    const [ratingValue, setRatingValue] = useState<number | null>(0);
    const [comment, setComment] = useState("");
    console.log(ratingValue);
    const handleSubmit = () => {
        if (ratingValue !== null) {
            const temp = {
                ratingValue: ratingValue,
                comment: comment,
                clientId: userId,
                trainerId: props.trainerId
            }
            axios
                .post(`${API_URL}/client/addReview`, temp,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                .then(() => {

                    alert("Added review successfully");
                })
                .catch((error) => {
                    console.error("Failed to add review", error);
                });
            props.reloadCards();
            props.onClose();
            setRatingValue(0);
            setComment("");
        }
    };

    return (
        <Modal open={props.open} onClose={props.onClose}>
            <Box
                sx={{
                    bgcolor: "#fff",
                    p: 4,
                    borderRadius: 3,
                    width: "100%",
                    maxWidth: 500,
                    mx: "auto",
                    my: "10vh",
                    boxShadow: 10,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    fontFamily: "Poppins, sans-serif",
                }}
            >
                <Typography variant="h6" fontWeight={600}>
                    Leave a Review
                </Typography>

                <Typography variant="body1" sx={{ color: "#555" }}>
                    How would you rate your experience?
                </Typography>

                <Rating
                    value={ratingValue}
                    onChange={(_, newValue) => setRatingValue(newValue)}
                    size="large"
                />

                <TextField
                    label="Your comments"
                    multiline
                    minRows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    fullWidth
                />

                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}>
                    <Button variant="outlined" onClick={props.onClose} sx={{ borderRadius: 2 }}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{
                            bgcolor: "#fb8c00",
                            ":hover": { bgcolor: "#ef6c00" },
                            borderRadius: 2,
                            fontWeight: 600,
                        }}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default LeaveReviewModal;
