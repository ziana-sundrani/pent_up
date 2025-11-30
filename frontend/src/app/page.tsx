"use client";
import * as React from "react";
import styles from "./page.module.css";
import { Box, Container, Stack, Typography } from "@mui/material";
import { LandingPage } from "@/components/LandingPage";
import { MessageForm } from "@/components/MessageForm";
import { MessageGrid } from "@/components/MessageGrid";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [showForm, setShowForm] = React.useState(false);

  const contentBoxSx = {
    minHeight: "100vh",
    bgcolor: "#f5e6d3",
    backgroundImage: 
      `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.12'/%3E%3C/svg%3E")`,
    pt: 8,
    position: "relative",
  };

  return (
    <Box>
      <LandingPage onAddClick={() => setShowForm(!showForm)} />
      <Box sx={contentBoxSx}>
        <Container maxWidth="lg" sx={{ py: 6, px: { xs: 3, sm: 4, md: 6 } }}>
          <Stack spacing={4}>
            {showForm && <MessageForm onSubmitted={() => setShowForm(false)} />}
            <MessageGrid />
          </Stack>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}
