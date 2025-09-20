import { useState } from "react";
import Header from "./components/Header";
import { Container, Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { lightTheme, darkTheme } from "./styles/theme";
import { Routes, Route } from "react-router-dom";
import Trending from "./pages/Trending";
import Browse from "./pages/Browse";
import Random from "./pages/Random";
import About from "./pages/About";

export default function App() {
    const [isDarkMode, setIsDarkMode] = useState(true);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <CssBaseline />
            <Box sx={{ minHeight: '100vh'}}>
                <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
                <Box maxWidth="xl" sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", paddingY: 16, margin: "0 auto" }}>
                    <Routes>
                        <Route path="/" element={<Trending />} />
                        <Route path="/browse" element={<Browse />} />
                        <Route path="/random" element={<Random />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
