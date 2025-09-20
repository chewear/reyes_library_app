import { Container, Box, Typography, TextField, InputAdornment, Alert } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import BookCard from "../components/BookCard";
import SkeletonLoading from "../components/SkeletonLoading";
import SearchIcon from '@mui/icons-material/Search';

export default function Browse() {
    const [searchQuery, setSearchQuery] = useState("");
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [noResults, setNoResults] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setLoading(true);
        setHasSearched(true);
        setNoResults(false);

        try {
            const { data } = await axios.get(`https://openlibrary.org/search.json?q=${encodeURIComponent(searchQuery)}&limit=24`);
            
            if (data.docs.length === 0) {
                setNoResults(true);
                setBooks([]);
            } else {
                const formattedBooks = data.docs.map(book => ({
                    title: book.title,
                    author: book.author_name?.[0] || 'Unknown Author',
                    coverUrl: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : "https://placehold.co/230x300?text=No+Cover",
                    rating: (Math.random() * 2 + 3).toFixed(1),
                    bookKey: book.key
                }));
                setBooks(formattedBooks);
            }
        } catch (error) {
            console.error('Error searching books:', error);
            setBooks([]);
            setNoResults(true);
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
                <Box 
                    sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: 2,
                        maxWidth: hasSearched ? '100%' : 500,
                        mx: 'auto',
                        width: '100%',
                        transition: 'all 0.3s ease-in-out',
                    }}
                >
                    {!hasSearched && (
                        <Typography 
                            variant="h1" 
                            sx={{ 
                                fontSize: 32, 
                                fontWeight: 600, 
                                color: "text.primary",
                                textAlign: 'center',
                                mb: 2
                            }}
                        >
                            Search Books
                        </Typography>
                    )}
                    
                    <form onSubmit={handleSearch} style={{ width: '100%' }}>
                        <TextField
                            fullWidth
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by title, author, or ISBN..."
                            variant="outlined"
                            sx={{
                                transition: 'all 0.3s ease-in-out',
                                transform: 'scale(1)',
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    height: 56,
                                    transition: 'all 0.3s ease-in-out',
                                    '&.Mui-focused': {
                                        transform: hasSearched ? 'none' : 'scale(1.05)',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                    }
                                },
                                '&:hover .MuiOutlinedInput-root': {
                                    transform: hasSearched ? 'none' : 'scale(1.02)',
                                },
                                ...(hasSearched && {
                                    maxWidth: '100%',
                                })
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchIcon 
                                            sx={{ 
                                                color: 'action.active',
                                                transition: 'all 0.3s ease-in-out',
                                                transform: 'scale(1)',
                                                '&:hover': {
                                                    transform: 'scale(1.1)',
                                                    color: 'primary.main'
                                                }
                                            }} 
                                        />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </form>
                </Box>

                {hasSearched && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {!loading && !noResults && books.length > 0 && (
                            <Typography variant="h2" sx={{ fontSize: 20, fontWeight: 500 }}>
                                Showing results for "{searchQuery}"
                            </Typography>
                        )}

                        {noResults && !loading && (
                            <Alert severity="info" sx={{ maxWidth: 600, mx: 'auto' }}>
                                No books found for "{searchQuery}". Try a different search term.
                            </Alert>
                        )}

                        <Box sx={{ 
                            display: "flex", 
                            flexDirection: "row", 
                            gap: 2, 
                            flexWrap: "wrap",
                        }}>
                            {loading ? (
                                [...Array(24)].map((_, index) => (
                                    <SkeletonLoading key={index} />
                                ))
                            ) : (
                                books.map((book, index) => (
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
                    </Box>
                )}
            </Box>
        </Container>
    );
}