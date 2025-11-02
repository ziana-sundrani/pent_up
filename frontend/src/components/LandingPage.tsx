"use client";

import * as React from "react";
import { Box, Link } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import styles from "./LandingPage.module.css";

export function LandingPage() {
	return (
		<Box className={styles.landingContainer}>
			{/* Orange glow effect */}
			<Box className={styles.glowEffect} />

			{/* Navigation */}
			<Box className={styles.navigation}>
				<Link href="#notes" className={styles.navLink}>notes</Link>
				<Link href="#about" className={styles.navLink}>about</Link>
				<Link href="#search" className={styles.navLink}>
					<SearchIcon sx={{ fontSize: 18 }} />
				</Link>
			</Box>

			{/* Stars */}
			<Box className={styles.stars}>
				<Box className={styles.star} style={{ top: '15%', left: '10%', transform: 'rotate(45deg) scale(0.6)' }}>★</Box>
				<Box className={styles.star} style={{ top: '20%', left: '85%', transform: 'rotate(120deg) scale(0.5)' }}>★</Box>
				<Box className={styles.star} style={{ top: '35%', left: '5%', transform: 'rotate(200deg) scale(0.7)' }}>★</Box>
				<Box className={styles.star} style={{ top: '40%', left: '90%', transform: 'rotate(300deg) scale(0.6)' }}>★</Box>
				<Box className={styles.star} style={{ top: '55%', left: '15%', transform: 'rotate(80deg) scale(0.5)' }}>★</Box>
				<Box className={styles.star} style={{ top: '60%', left: '88%', transform: 'rotate(240deg) scale(0.6)' }}>★</Box>
				<Box className={styles.star} style={{ top: '75%', left: '8%', transform: 'rotate(160deg) scale(0.7)' }}>★</Box>
				<Box className={styles.star} style={{ top: '80%', left: '92%', transform: 'rotate(15deg) scale(0.5)' }}>★</Box>
			</Box>

			{/* Envelopes Container */}
			<Box className={styles.envelopesContainer}>
				{/* Bottom envelope */}
				<Box className={styles.envelopeBottom}>
					{/* Envelope background */}
					<Box className={styles.envelopeBody} />
					{/* Envelope flap */}
					<Box className={styles.envelopeFlap} />
				</Box>

				{/* Top envelope */}
				<Box className={styles.envelopeTop}>
					{/* Envelope background */}
					<Box className={styles.envelopeBody}>
						{/* Collection text */}
						<Box className={styles.collectionText}>
							A COLLECTION OF UNSENT MESSAGES
						</Box>
						
						{/* Postage stamp with devil */}
						<Box className={styles.postageStamp}>
							<Box className={styles.stampCharacter}>👿</Box>
						</Box>

						{/* Pent Up Logo */}
						<Box className={styles.logoContainer}>
							<h1 className={styles.mainTitle}>
								<span className={styles.pixelatedLarge}>P</span>
								<span className={styles.pixelatedSmall}>ent</span>
								{" "}
								<span className={styles.pixelatedLarge}>U</span>
								<span className={styles.pixelatedSmall}>p</span>
							</h1>
						</Box>
					</Box>
					{/* Envelope flap */}
					<Box className={styles.envelopeFlap} />
				</Box>
			</Box>

			{/* Edit Icon */}
			<Box className={styles.editIcon}>
				<EditIcon sx={{ fontSize: 24, color: '#888' }} />
			</Box>
		</Box>
	);
}
