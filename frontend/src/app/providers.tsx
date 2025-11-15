"use client";

import * as React from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

const theme = createTheme({
	palette: {
		mode: "light",
	},
	shape: { borderRadius: 12 },
});

// Create Emotion cache with prepend: true to avoid hydration issues
const cache = createCache({
	key: "css",
	prepend: true,
});

export function AppProviders({ children }: { children: React.ReactNode }) {
	return (
		<CacheProvider value={cache}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</CacheProvider>
	);
}
