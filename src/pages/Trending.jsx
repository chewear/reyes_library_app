import { Container, Box, Typography, Divider } from "@mui/material";
import SkeletonLoading from "../components/SkeletonLoading";
import BookCard from "../components/BookCard";
import { useState, useEffect } from "react";
import axios from "axios";


export default function Trending() {
    const [trendingBooks, setTrendingBooks] = useState([]);
    const [fictionBooks, setFictionBooks] = useState([]);
    const [scienceBooks, setScienceBooks] = useState([]);
    const [historyBooks, setHistoryBooks] = useState([]);
    const [trendingLoading, setTrendingLoading] = useState(true);
    const [fictionLoading, setFictionLoading] = useState(true);
    const [scienceLoading, setScienceLoading] = useState(true);
    const [historyLoading, setHistoryLoading] = useState(true);

    const fetchTrendingBooks = async () => {
        try {
            const { data } = await axios.get('https://openlibrary.org/trending/daily.json');
            const books = data.works.slice(0, 12).map((book, index) => ({
                 title: book.title,
                 author: book.author_name?.[0] || 'Unknown Author',
                 coverUrl: `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`,
                 rank: index + 1,
                 rating: (Math.random() * 2 + 3).toFixed(1)
            }));
            setTrendingBooks(books);
        } catch (error) {
            console.error('Error fetching trending books:', error);
        } finally {
            setTrendingLoading(false);
        }
    };

    const fetchPopularFiction = async () => {
        try {
            const { data } = await axios.get('https://openlibrary.org/search.json?subject=fiction&limit=6');
            const books = data.docs.map((book, index) => ({
                 title: book.title,
                 author: book.author_name?.[0] || 'Unknown Author',
                 coverUrl: `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`,
                 rank: index + 1,
                 rating: (Math.random() * 2 + 3).toFixed(1)
            }));
            setFictionBooks(books);
        } catch (error) {
            console.error('Error fetching fiction books:', error);
        } finally {
            setFictionLoading(false);
        }
    };

    const fetchScienceAndTechnology = async () => {
        try {
            const { data } = await axios.get('https://openlibrary.org/search.json?subject=science&limit=6');
            const books = data.docs.map((book, index) => ({
                 title: book.title,
                 author: book.author_name?.[0] || 'Unknown Author',
                 coverUrl: `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`,
                 rank: index + 1,
                 rating: (Math.random() * 2 + 3).toFixed(1)
            }));
            setScienceBooks(books);
        } catch (error) {
            console.error('Error fetching science books:', error);
        } finally {
            setScienceLoading(false);
        }
    };
    
    const fetchHistoryAndBiography = async () => {
        try {
            const { data } = await axios.get('https://openlibrary.org/search.json?subject=history&limit=6');
            const books = data.docs.map((book, index) => ({
                 title: book.title,
                 author: book.author_name?.[0] || 'Unknown Author',
                 coverUrl: `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`,
                 rank: index + 1,
                 rating: (Math.random() * 2 + 3).toFixed(1)
            }));
            setHistoryBooks(books);
        } catch (error) {
            console.error('Error fetching history books:', error);
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
                            />
                        ))
                    )}
                </Box>
            </Box>

            <Divider sx={{ marginY: 4 }} />

            <Box>
                <Typography variant="h1" sx={{ fontSize: 24, fontWeight: 600, color: "text.primary", marginBottom: 2, marginTop: 2 }}>Popular Fiction</Typography>
                <Box sx={{ display: "flex", flexDirection: "row", gap: 2, flexWrap: "wrap", }}>
                    {fictionLoading ? (
                        <Box sx={{ display: "flex", flexDirection: "row", gap: 2, flexWrap: "wrap" }}>
                            {[1,2,3,4,5,6].map((index) => (
                                <SkeletonLoading key={index} />
                            ))}
                        </Box>
                    ) : (
                        fictionBooks.map((book) => (
                            <BookCard 
                                key={book.rank}
                                title={book.title}
                                author={book.author}
                                coverUrl={book.coverUrl}
                                rating={book.rating}
                            />
                        ))
                    )}
                </Box>
            </Box>

            <Divider sx={{ marginY: 4 }} />

            <Box>
                <Typography variant="h1" sx={{ fontSize: 24, fontWeight: 600, color: "text.primary", marginBottom: 2 }}>Science & Technology</Typography>
                <Box sx={{ display: "flex", flexDirection: "row", gap: 2, flexWrap: "wrap", }}>
                    {scienceLoading ? (
                        <Box sx={{ display: "flex", flexDirection: "row", gap: 2, flexWrap: "wrap" }}>
                            {[1,2,3,4,5,6].map((index) => (
                                <SkeletonLoading key={index} />
                            ))}
                        </Box>
                    ) : (
                        scienceBooks.map((book) => (
                            <BookCard 
                                key={book.rank}
                                title={book.title}
                                author={book.author}
                                coverUrl={book.coverUrl}
                                rating={book.rating}
                            />
                        ))
                    )}
                </Box>
            </Box>

            <Divider sx={{ marginY: 4 }} />

            <Box>
                <Typography variant="h1" sx={{ fontSize: 24, fontWeight: 600, color: "text.primary", marginBottom: 2 }}>History & Biography</Typography>
                <Box sx={{ display: "flex", flexDirection: "row", gap: 2, flexWrap: "wrap", }}>
                    {historyLoading ? (
                        <Box sx={{ display: "flex", flexDirection: "row", gap: 2, flexWrap: "wrap" }}>
                            {[1,2,3,4,5,6].map((index) => (
                                <SkeletonLoading key={index} />
                            ))}
                        </Box>
                    ) : (
                        historyBooks.map((book) => (
                            <BookCard 
                                key={book.rank}
                                title={book.title}
                                author={book.author}
                                coverUrl={book.coverUrl}
                                rating={book.rating}
                            />
                        ))
                    )}
                </Box>
            </Box>

        </Container>
    );
}