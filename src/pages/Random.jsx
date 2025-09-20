import { Container, Box, Typography, Button, Alert } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "../components/BookCard";
import SkeletonLoading from "../components/SkeletonLoading";
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RefreshIcon from '@mui/icons-material/Refresh';

const SUBJECTS = [
    'fiction', 'science', 'history', 'mystery', 'romance', 'fantasy',
    'biography', 'adventure', 'thriller', 'comedy', 'drama', 'poetry'
];

export default function Random() {
    const [randomBooks, setRandomBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, sethasSearched] = useState(false);
    const [error, setError] = useState(null);
    const [currentSubject, setCurrentSubject] = useState(() => {
        const savedIndex = localStorage.getItem('lastSubjectIndex');
        return savedIndex ? SUBJECTS[parseInt(savedIndex)] : SUBJECTS[0];
    });

    const fetchRandomBooks = async () => {
        setLoading(true);
        setError(null);
        sethasSearched(true);
        try {
            const currentIndex = SUBJECTS.indexOf(currentSubject);
            const nextIndex = (currentIndex + 1) % SUBJECTS.length;
            
            localStorage.setItem('lastSubjectIndex', nextIndex.toString());
            
            const { data } = await axios.get(`https://openlibrary.org/search.json?subject=${currentSubject}&limit=12`);
            
            if (!data.docs || !Array.isArray(data.docs)) {
                throw new Error('Invalid data format received');
            }
            
            const books = data.docs.map((book, index) => ({
                title: book.title,
                author: book.author_name?.[0] || 'Unknown Author',
                coverUrl: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : "https://placehold.co/230x300?text=No+Cover",
                rating: (Math.random() * 2 + 3).toFixed(1),
                bookKey: book.key
            }));

            setRandomBooks(books);
            setCurrentSubject(SUBJECTS[nextIndex]);
        } catch (error) {
            console.error('Error fetching random books:', error);
            setError(error.message || 'Failed to fetch random books');
            setRandomBooks([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="false">
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 4, 
                py: 4 
            }}>
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center'
                }}>
                    <Box>
                        <Typography variant="h1" sx={{ 
                            fontSize: 24, 
                            fontWeight: 600, 
                            color: "text.primary" 
                        }}>
                            Random Book Discovery
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                            {hasSearched 
                                ? `Currently showing: ${currentSubject.charAt(0).toUpperCase() + currentSubject.slice(1)} books`
                                : "Click 'Surprise Me' to discover random books from different genres!"
                            }
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        onClick={fetchRandomBooks}
                        startIcon={<ShuffleIcon />}
                        sx={{ 
                            height: 48,
                            px: 3,
                            borderRadius: 2,
                            textTransform: 'none',
                            fontSize: '1rem'
                        }}
                    >
                        Surprise Me
                    </Button>
                </Box>

                {hasSearched && (
                    <Box sx={{ 
                        display: "flex", 
                        flexDirection: "row", 
                        gap: 2, 
                        flexWrap: "wrap",
                    }}>
                        {loading ? (
                            [...Array(12)].map((_, index) => (
                                <SkeletonLoading key={index} />
                            ))
                        ) : error ? (
                            <Box sx={{ width: '100%' }}>
                                <Alert 
                                    severity="error" 
                                    action={
                                        <Button
                                            color="inherit"
                                            size="small"
                                            onClick={fetchRandomBooks}
                                            startIcon={<RefreshIcon />}
                                        >
                                            Retry
                                        </Button>
                                    }
                                >
                                    {error}
                                </Alert>
                            </Box>
                        ) : (
                            randomBooks.map((book, index) => (
                                <BookCard
                                    key={index}
                                    title={book.title}
                                    author={book.author}
                                    coverUrl={book.coverUrl}
                                    rating={book.rating}
                                    bookKey={book.bookKey}
                                />
                            ))
                        )}
                    </Box>
                )}
            </Box>
        </Container>
    );
}