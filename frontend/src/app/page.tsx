"use client";
import styles from "./page.module.css";
import { Container, Stack, Typography } from "@mui/material";
import { MessageForm } from "@/components/MessageForm";
import { MessageGrid } from "@/components/MessageGrid";

export default function Home() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Typography variant="h4" component="h1" fontWeight={700}>
          Unsent Project
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Write an anonymous message to someone. Choose a color for how you feel.
        </Typography>
        <MessageForm />
        <MessageGrid />
      </Stack>
    </Container>
  );
}
