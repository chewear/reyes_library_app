import { Container, Box, Typography, Divider, Alert, Button } from "@mui/material";
import SkeletonLoading from "../components/SkeletonLoading";
import BookCard from "../components/BookCard";
import { useState, useEffect } from "react";
import axios from "axios";
import RefreshIcon from '@mui/icons-material/Refresh';


export default function Trending() {
    const [trendingBooks, setTrendingBooks] = useState([]);
    const [fictionBooks, setFictionBooks] = useState([]);
    const [scienceBooks, setScienceBooks] = useState([]);
    const [historyBooks, setHistoryBooks] = useState([]);
    
    const [trendingLoading, setTrendingLoading] = useState(true);
    const [fictionLoading, setFictionLoading] = useState(true);
    const [scienceLoading, setScienceLoading] = useState(true);
    const [historyLoading, setHistoryLoading] = useState(true);
    
    const [trendingError, setTrendingError] = useState(null);
    const [fictionError, setFictionError] = useState(null);
    const [scienceError, setScienceError] = useState(null);
    const [historyError, setHistoryError] = useState(null);

    const fetchTrendingBooks = async () => {
        setTrendingLoading(true);
        setTrendingError(null);
        try {
            const { data } = await axios.get('https://openlibrary.org/trending/daily.json');
            if (!data.works || !Array.isArray(data.works)) {
                throw new Error('Invalid data format received');
            }
            const books = data.works.slice(0, 12).map((book, index) => ({
                 title: book.title,
                 author: book.author_name?.[0] || 'Unknown Author',
                 coverUrl: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : "https://placehold.co/230x300?text=No+Cover",
                 rank: index + 1,
                 rating: (Math.random() * 2 + 3).toFixed(1),
                 bookKey: book.key
            }));
            setTrendingBooks(books);
        } catch (error) {
            console.error('Error fetching trending books:', error);
            setTrendingError(error.message || 'Failed to fetch trending books');
            setTrendingBooks([]);
        } finally {
            setTrendingLoading(false);
        }
    };

    const fetchPopularFiction = async () => {
        setFictionLoading(true);
        setFictionError(null);
        try {
            const { data } = await axios.get('https://openlibrary.org/search.json?subject=fiction&limit=6');
            if (!data.docs || !Array.isArray(data.docs)) {
                throw new Error('Invalid data format received');
            }
            const books = data.docs.map((book, index) => ({
                 title: book.title,
                 author: book.author_name?.[0] || 'Unknown Author',
                 coverUrl: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : "https://placehold.co/230x300?text=No+Cover",
                 rank: index + 1,
                 rating: (Math.random() * 2 + 3).toFixed(1),
                 bookKey: book.key
            }));
            setFictionBooks(books);
        } catch (error) {
            console.error('Error fetching fiction books:', error);
            setFictionError(error.message || 'Failed to fetch fiction books');
            setFictionBooks([]);
        } finally {
            setFictionLoading(false);
        }
    };

    const fetchScienceAndTechnology = async () => {
        setScienceLoading(true);
        setScienceError(null);
        try {
            const { data } = await axios.get('https://openlibrary.org/search.json?subject=science&limit=6');
            if (!data.docs || !Array.isArray(data.docs)) {
                throw new Error('Invalid data format received');
            }
            const books = data.docs.map((book, index) => ({
                 title: book.title,
                 author: book.author_name?.[0] || 'Unknown Author',
                 coverUrl: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : "https://placehold.co/230x300?text=No+Cover",
                 rank: index + 1,
                 rating: (Math.random() * 2 + 3).toFixed(1),
                 bookKey: book.key
            }));
            setScienceBooks(books);
        } catch (error) {
            console.error('Error fetching science books:', error);
            setScienceError(error.message || 'Failed to fetch science books');
            setScienceBooks([]);
        } finally {
            setScienceLoading(false);
        }
    };
    
    const fetchHistoryAndBiography = async () => {
        setHistoryLoading(true);
        setHistoryError(null);
        try {
            const { data } = await axios.get('https://openlibrary.org/search.json?subject=history&limit=6');
            if (!data.docs || !Array.isArray(data.docs)) {
                throw new Error('Invalid data format received');
            }
            const books = data.docs.map((book, index) => ({
                 title: book.title,
                 author: book.author_name?.[0] || 'Unknown Author',
                 coverUrl: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : "https://placehold.co/230x300?text=No+Cover",
                 rank: index + 1,
                 rating: (Math.random() * 2 + 3).toFixed(1),
                 bookKey: book.key
            }));
            setHistoryBooks(books);
        } catch (error) {
            console.error('Error fetching history books:', error);
            setHistoryError(error.message || 'Failed to fetch history books');
            setHistoryBooks([]);
        } finally {
            setHistoryLoading(false);
        }
    };

    useEffect(() => {
        fetchTrendingBooks();
        fetchPopularFiction();
        fetchScienceAndTechnology();
        fetchHistoryAndBiography();
    }, []);
    return (
        <Container maxWidth="false" sx={{ width: "100%", }}>

            <Box>
                <Typography variant="h1" sx={{ fontSize: 24, fontWeight: 600, color: "text.primary", marginBottom: 2 }}>Trending Books Today</Typography>
                <Box sx={{ display: "flex", flexDirection: "row", gap: 2, flexWrap: "wrap", minHeight: 300 }}>
                    {trendingLoading ? (
                        <Box sx={{ display: "flex", flexDirection: "row", gap: 2, flexWrap: "wrap" }}>
                            {[1,2,3,4,5,6].map((index) => (
                                <SkeletonLoading key={index} />
                            ))}
                        </Box>
                    ) : trendingError ? (
                        <Box sx={{ width: '100%' }}>
                            <Alert 
                                severity="error" 
                                action={
                                    <Button
                                        color="inherit"
                                        size="small"
                                        onClick={fetchTrendingBooks}
                                        startIcon={<RefreshIcon />}
                                    >
                                        Retry
                                    </Button>
                                }
                            >
                                {trendingError}
                            </Alert>
                        </Box>
                    ) : (
                        trendingBooks.map((book) => (
                            <BookCard 
                                key={book.rank}
                                title={book.title}
                                author={book.author}
                                coverUrl={book.coverUrl}
                                trending={true}
                                rank={book.rank}
                                rating={book.rating}
                                bookKey={book.bookKey}
                            />
                        ))
                    )}
                </Box>
            </Box>

            <Divider sx={{ marginY: 4 }} />

            <Box>
                <Typography variant="h1" sx={{ fontSize: 24, fontWeight: 600, color: "text.primary", marginBottom: 2, marginTop: 2 }}>Popular Fiction</Typography>
                <Box sx={{ display: "flex", flexDirection: "row", gap: 2, flexWrap: "wrap", minHeight: 300 }}>
                    {fictionLoading ? (
                        <Box sx={{ display: "flex", flexDirection: "row", gap: 2, flexWrap: "wrap" }}>
                            {[1,2,3,4,5,6].map((index) => (
                                <SkeletonLoading key={index} />
                            ))}
                        </Box>
                    ) : fictionError ? (
                        <Box sx={{ width: '100%' }}>
                            <Alert 
                                severity="error" 
                                action={
                                    <Button
                                        color="inherit"
                                        size="small"
                                        onClick={fetchPopularFiction}
                                        startIcon={<RefreshIcon />}
                                    >
                                        Retry
                                    </Button>
                                }
                            >
                                {fictionError}
                            </Alert>
                        </Box>
                    ) : (
                        fictionBooks.map((book) => (
                            <BookCard 
                                key={book.rank}
                                title={book.title}
                                author={book.author}
                                coverUrl={book.coverUrl}
                                rating={book.rating}
                                bookKey={book.bookKey}
                            />
                        ))
                    )}
                </Box>
            </Box>

            <Divider sx={{ marginY: 4 }} />

            <Box>
                <Typography variant="h1" sx={{ fontSize: 24, fontWeight: 600, color: "text.primary", marginBottom: 2 }}>Science & Technology</Typography>
                <Box sx={{ display: "flex", flexDirection: "row", gap: 2, flexWrap: "wrap", minHeight: 300 }}>
                    {scienceLoading ? (
                        <Box sx={{ display: "flex", flexDirection: "row", gap: 2, flexWrap: "wrap" }}>
                            {[1,2,3,4,5,6].map((index) => (
                                <SkeletonLoading key={index} />
                            ))}
                        </Box>
                    ) : scienceError ? (
                        <Box sx={{ width: '100%' }}>
                            <Alert 
                                severity="error" 
                                action={
                                    <Button
                                        color="inherit"
                                        size="small"
                                        onClick={fetchScienceAndTechnology}
                                        startIcon={<RefreshIcon />}
                                    >
                                        Retry
                                    </Button>
                                }
                            >
                                {scienceError}
                            </Alert>
                        </Box>
                    ) : (
                        scienceBooks.map((book) => (
                            <BookCard 
                                key={book.rank}
                                title={book.title}
                                author={book.author}
                                coverUrl={book.coverUrl}
                                rating={book.rating}
                                bookKey={book.bookKey}
                            />
                        ))
                    )}
                </Box>
            </Box>

            <Divider sx={{ marginY: 4 }} />

            <Box>
                <Typography variant="h1" sx={{ fontSize: 24, fontWeight: 600, color: "text.primary", marginBottom: 2 }}>History & Biography</Typography>
                <Box sx={{ display: "flex", flexDirection: "row", gap: 2, flexWrap: "wrap", minHeight: 300 }}>
                    {historyLoading ? (
                        <Box sx={{ display: "flex", flexDirection: "row", gap: 2, flexWrap: "wrap" }}>
                            {[1,2,3,4,5,6].map((index) => (
                                <SkeletonLoading key={index} />
                            ))}
                        </Box>
                    ) : historyError ? (
                        <Box sx={{ width: '100%' }}>
                            <Alert 
                                severity="error" 
                                action={
                                    <Button
                                        color="inherit"
                                        size="small"
                                        onClick={fetchHistoryAndBiography}
                                        startIcon={<RefreshIcon />}
                                    >
                                        Retry
                                    </Button>
                                }
                            >
                                {historyError}
                            </Alert>
                        </Box>
                    ) : (
                        historyBooks.map((book) => (
                            <BookCard 
                                key={book.rank}
                                title={book.title}
                                author={book.author}
                                coverUrl={book.coverUrl}
                                rating={book.rating}
                                bookKey={book.bookKey}
                            />
                        ))
                    )}
                </Box>
            </Box>

        </Container>
    );
}