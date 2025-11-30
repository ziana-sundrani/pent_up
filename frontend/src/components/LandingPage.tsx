"use client";

import * as React from "react";
import { Box, Link } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./LandingPage.module.css";

export function LandingPage({ onAddClick }: { onAddClick?: () => void }) {
	return (
		<div className={styles.landingContainer}>
			{/* Orange glow effect */}
			<div className={styles.glowEffect} />

			{/* Navigation */}
			<div className={styles.navigation}>
				<Link href="#notes" className={styles.navLink}>notes</Link>
				<Link href="#about" className={styles.navLink}>about</Link>
				<Link href="#search" className={styles.navLink}>
					<SearchIcon sx={{ fontSize: 18 }} />
				</Link>
			</div>

			{/* Envelopes Container */}
			<div className={styles.envelopesContainer}>
				<img 
					src="/envelopes.png" 
					alt="Envelopes" 
					className={styles.envelopesImage}
				/>
			</div>

			{/* Add Button */}
			<button 
				className={styles.addButton}
				onClick={onAddClick}
				aria-label="Add message"
			>
				<img 
					src="/add.png" 
					alt="Add" 
					className={styles.addButtonImage}
				/>
			</button>
		</div>
	);
}
