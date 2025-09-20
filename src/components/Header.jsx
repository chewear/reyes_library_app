import * as React from "react";
import PropTypes from "prop-types";
import { useLocation, Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SunnyIcon from '@mui/icons-material/Sunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const drawerWidth = 240;
const navItems = ["Trending", "Browse", "Random", "About"];

function Header(props) {
    const { window, isDarkMode, toggleTheme } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const location = useLocation();

    const isActive = (path) => {
        if (path === '/trending') {
            return location.pathname === '/' || location.pathname === '/trending';
        }
        return location.pathname === path;
    };

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box  sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ my: 2, display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
                <MenuBookIcon /> BOOKSHELF
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => {
                    const path = item === "Trending" ? "/" : `/${item.toLowerCase()}`;
                    return (
                        <ListItem key={item} disablePadding>
                            <ListItemButton
                                component={Link}
                                to={path}
                                onClick={handleDrawerToggle}
                                sx={{
                                    textAlign: "center",
                                    bgcolor: isActive(path) ? 'action.selected' : 'transparent',
                                }}
                            >
                                <ListItemText primary={item} />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
                <ListItem disablePadding>
                    <ListItemButton 
                        sx={{ 
                            textAlign: "center",
                            justifyContent: "center" 
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleTheme();
                        }}
                    >
                        <IconButton color="inherit">
                            {isDarkMode ? <DarkModeIcon /> : <SunnyIcon />}
                        </IconButton>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <Box className="test" sx={{ display: "flex", justifyContent: "center" }}>
            <CssBaseline />
            <AppBar component="nav" sx={{ width: "97%", left: "auto", right: "auto", marginTop: 4 }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        alignContent="center"
                        justifyContent="center"
                        textTransform={"uppercase"}
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", sm: "block" },
                        }}
                    >
                        <Box
                            display={"flex"}
                            alignItems={"center"}
                            gap={1}
                        >
                            <MenuBookIcon /> BOOKSHELF
                        </Box>
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: "100%", justifyContent: "flex-end" }}>
                        <Box sx={{ display: { xs: "none", sm: "block" } }}>
                            {navItems.map((item) => {
                                const path = item === "Trending" ? "/" : `/${item.toLowerCase()}`;
                                return (
                                    <Button
                                        key={item}
                                        component={Link}
                                        to={path}
                                        sx={{
                                            color: "#fff",
                                            borderBottom: isActive(path) ? 2 : 0,
                                            borderRadius: 0,
                                            '&:hover': {
                                                borderBottom: 2,
                                            },
                                        }}
                                    >
                                        {item}
                                    </Button>
                                );
                            })}
                        </Box>
                        <IconButton
                            sx={{ ml: 1 }}
                            onClick={toggleTheme}
                            color="inherit"
                        >
                            {isDarkMode ? <DarkModeIcon /> : <SunnyIcon />}
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, 
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
}

Header.propTypes = {
    window: PropTypes.func,
    isDarkMode: PropTypes.bool.isRequired,
    toggleTheme: PropTypes.func.isRequired,
};

export default Header;
