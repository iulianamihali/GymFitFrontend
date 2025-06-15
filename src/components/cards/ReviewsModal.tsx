import React from "react";
import {
    Modal,
    Box,
    Typography,
    Divider,
    List,
    Rating,
} from "@mui/material";
import dayjs from "dayjs";

type Review = {
    ratingValue: number;
    comment: string;
    createdAt: string;
    clientName: string;
};

type Props = {
    open: boolean;
    onClose: () => void;
    trainerName: string;
    reviews: Review[];
};

export default function ReviewsModal({ open, onClose, trainerName, reviews }: Props) {
    return (
        <Modal open={open} onClose={onClose}>
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
                <Typography variant="h6" fontWeight={700}>
                    Reviews for {trainerName}
                </Typography>
                <Divider sx={{ my: 2 }} />

                {reviews.length === 0 ? (
                    <Typography sx={{ color: "#777", fontStyle: "italic" }}>
                        No reviews yet.
                    </Typography>
                ) : (
                    <List sx={{ maxHeight: 400, overflowY: "auto", pr: 1 }}>
                        {reviews.map((review, index) => (
                            <Box key={index} sx={{ mb: 3 }}>
                                <Rating value={review.ratingValue} readOnly size="small" />
                                <Typography sx={{ mt: 1 }}>{review.comment}</Typography>
                                <Typography variant="caption" sx={{ color: "#666" }}>
                                    — {review.clientName}, {dayjs(review.createdAt).format("DD MMM YYYY")}
                                </Typography>
                                <Divider sx={{ mt: 2 }} />
                            </Box>
                        ))}
                    </List>
                )}
            </Box>
        </Modal>
    );
}
