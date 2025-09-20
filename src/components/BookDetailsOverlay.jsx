import { useState, useEffect } from 'react';
import { Box, Typography, IconButton, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

export default function BookDetailsOverlay({ bookKey, isOpen, onClose, coverUrl, title, author }) {
    const [bookDetails, setBookDetails] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBookDetails = async () => {
            if (!bookKey || !isOpen) return;
            
            setLoading(true);
            try {
                const { data } = await axios.get(`https://openlibrary.org${bookKey}.json`);
                setBookDetails(data);
            } catch (error) {
                console.error('Error fetching book details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [bookKey, isOpen]);

    if (!isOpen) return null;

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bgcolor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1300,
            }}
            onClick={onClose}
        >
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    p: 3,
                    maxWidth: 800,
                    width: '90%',
                    maxHeight: '90vh',
                    overflow: 'auto',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: 3,
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        bgcolor: 'background.paper',
                        '&:hover': { bgcolor: 'action.hover' },
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <Box
                    sx={{
                        width: { xs: '100%', md: 300 },
                        height: { xs: 300, md: 400 },
                        borderRadius: 1,
                        overflow: 'hidden',
                        flexShrink: 0,
                    }}
                >
                    <img
                        src={coverUrl}
                        alt={title}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                </Box>

                <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="h4" sx={{ mb: 1, fontSize: 24, fontWeight: 600 }}>
                        {title}
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 3, color: 'text.secondary', fontSize: 16 }}>
                        by {author}
                    </Typography>

                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Box>
                            {bookDetails?.description ? (
                                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                                    {typeof bookDetails.description === 'object'
                                        ? bookDetails.description.value
                                        : bookDetails.description}
                                </Typography>
                            ) : (
                                <Typography variant="body1" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                                    No description available.
                                </Typography>
                            )}
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
}