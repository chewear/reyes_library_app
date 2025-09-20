import { Box, Avatar, Typography, Chip } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import { useState } from 'react';
import BookDetailsOverlay from './BookDetailsOverlay';

export default function BookCard({ 
    title,
    author,
    coverUrl,
    trending = false,
    rank,
    rating,
    bookKey
}) {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const handleClick = () => {
        setIsOverlayOpen(true);
    };

    return (
        <>
            <Box 
                onClick={handleClick}
                sx={{ 
                    width: 230, 
                    height: 300, 
                    position: 'relative',
                    borderRadius: 2,
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                        transform: 'scale(1.03)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                    }
                }}
            >
                <Avatar 
                    variant="square" 
                    src={coverUrl}
                    sx={{ 
                        width: '100%', 
                        height: '100%',
                        transition: 'transform 0.3s ease',
                    }} 
                    className="book-cover"
                />

                {trending && 
                    <Chip 
                        label={`#${rank} in Trending`} 
                        size="small"
                        sx={{
                            position: 'absolute',
                            top: 12,
                            right: 12,
                            height: 20,
                            fontSize: 10,
                            backgroundColor: 'primary.main',
                            color: 'primary.contrastText',
                            fontWeight: 500,
                            zIndex: 2,
                        }}
                    />
                }
                
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '60%',
                        background: (theme) => `linear-gradient(to top, 
                            ${theme.palette.mode === 'dark' 
                                ? 'rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0) 100%'
                                : 'rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0) 100%'
                            })`,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        padding: 2,
                        gap: 0.5,
                    }}
                >
                    <Typography 
                        variant="h6" 
                        sx={{ 
                            fontSize: 14,
                            fontWeight: 600,
                            color: "white",
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            width: '100%',
                            textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                        }}
                    >
                        {title}
                    </Typography>
                    <Typography 
                        variant="body1" 
                        sx={{ 
                            fontSize: 12,
                            fontWeight: 400,
                            color: "rgba(255,255,255,0.8)",
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            width: '100%',
                            textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                        }}
                    >
                        {author}
                    </Typography>
                    
                    <Box sx={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: 0.5,
                        mt: 0.5,
                    }}>
                        <StarIcon sx={{ 
                            color: "yellow",
                            fontSize: 16,
                        }} />
                        <Typography 
                            variant="body2" 
                            sx={{ 
                                fontSize: 12,
                                fontWeight: 500,
                                color: "rgba(255,255,255,0.9)",
                                textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                            }}
                        >
                            {rating || '4.5'}
                        </Typography>
                    </Box>
                </Box>
        </Box>
            <BookDetailsOverlay
                isOpen={isOverlayOpen}
                onClose={() => setIsOverlayOpen(false)}
                title={title}
                author={author}
                coverUrl={coverUrl}
                bookKey={bookKey}
            />
        </>
    );
}