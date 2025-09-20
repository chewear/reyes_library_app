import AboutBackgroundEffect from "../aboutComponents/AboutBackgroundEffect";
import { Box, Typography, Chip, Container, Link } from "@mui/material";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function About() {

    const stacks = [
        "HTML 5",
        "CSS",
        "Javascript",
        "Tailwind CSS",
        "ReactJS",
        "GSAP",
        "Redis",
        "Firebase",
        "MongoDB",
        "Supabase",
        "Unity",
        "Java",
        "Bootstrap",
        "Python",
        "Laravel",
        "NodeJS",
        "PostgreSQL",
        "MySQL",
        "ExpressJS",
        "Neo4j",
        "Git",
        "Figma",
        "PHP",
        "C#",
        "C++",
    ];


    const stacksRef = useRef([]);
    const headerRef = useRef(null);
    const bioRef = useRef(null);
    const websiteRef = useRef(null);
    const techTitleRef = useRef(null);

    useEffect(() => {
        stacksRef.current = stacksRef.current.slice(0, stacks.length);

        const tl = gsap.timeline({
            defaults: {
                ease: "power2.out",
            }
        });

        tl.fromTo(headerRef.current,
            {
                y: -50,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 1
            }
        )

        .fromTo(bioRef.current,
            {
                y: 30,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 1
            },
            "-=0.5" 
        )

        .fromTo(websiteRef.current,
            {
                y: 20,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.8
            },
            "-=0.7"
        )

        .fromTo(techTitleRef.current,
            {
                y: 30,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.8
            },
            "-=0.5"
        )

        .fromTo(stacksRef.current,
            {
                y: 30,
                opacity: 0,
                scale: 0.9
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.5,
                stagger: 0.01,
            },
            "-=0.3"
        );

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <Box className="about-container"> 
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: 8, pointerEvents: 'none' }}>
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    gap: 4,
                    textAlign: 'center',
                    maxWidth: 800,
                    mx: 'auto'
                }}>
                    <Typography 
                        ref={headerRef}
                        variant="h1" 
                        sx={{ 
                            fontSize: { xs: 32, md: 48 }, 
                            fontWeight: 600, 
                            color: "text.primary",
                            mb: 2,
                            opacity: 0,
                        }}
                    >
                        Hello there!
                    </Typography>

                    <Typography 
                        ref={bioRef}
                        variant="body1" 
                        sx={{ 
                            fontSize: { xs: 16, md: 18 },
                            color: "text.secondary",
                            lineHeight: 1.8,
                            mb: 4,
                            opacity: 0,
                        }}
                    >
                        As an aspiring web developer & designer from the Philippines, 
                        I've always had an insatiable curiosity about the world of technology 
                        and I like creating mesmerizing websites.
                    </Typography>

                    <Link 
                        ref={websiteRef}
                        href="https://myron.website" 
                        target="_blank" 
                        sx={{ 
                            color: 'primary.main',
                            textDecoration: 'none',
                            fontSize: 20,
                            fontWeight: 500,
                            opacity: 0, 
                            pointerEvents: 'auto',
                            '&:hover': {
                                textDecoration: 'underline'
                            }
                        }}
                    >
                        myron.website
                    </Link>

                    <Box sx={{ mt: 6 }}>
                        <Typography 
                            ref={techTitleRef}
                            variant="h2" 
                            sx={{ 
                                fontSize: 24, 
                                fontWeight: 500, 
                                mb: 4,
                                color: "text.primary",
                                opacity: 0 
                            }}
                        >
                            Technologies I Work With
                        </Typography>
                        
                        <Box sx={{ 
                            display: 'flex', 
                            flexWrap: 'wrap', 
                            gap: 1.5,
                            justifyContent: 'center',
                            maxWidth: 800
                        }}>
                            {stacks.map((stack, index) => (
                                <Chip
                                    key={stack}
                                    label={stack}
                                    ref={el => stacksRef.current[index] = el}
                                    sx={{
                                        opacity: 0, 
                                        bgcolor: 'background.paper',
                                        color: 'text.primary',
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        '&:hover': {
                                            bgcolor: 'primary.main',
                                            color: 'white',
                                            transform: 'translateY(-3px)',
                                        },
                                        transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out, transform 0.2s ease-in-out',
                                    }}
                                />
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Container>

            <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }}>
                <AboutBackgroundEffect />
            </Box>
        </Box>
    );
}