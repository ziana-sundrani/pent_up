"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

const characters = [
  { name: "Melody", role: "Project Lead", image: "/assets/about_characters/melody.png" },
  { name: "Gia", role: "Project Lead", image: "/assets/about_characters/gia.png" },
  { name: "Gordon", role: "developer", image: "/assets/about_characters/gordon.png" },
  { name: "Ziana", role: "developer", image: "/assets/about_characters/ziana.png" },
  { name: "Sam", role: "developer", image: "/assets/about_characters/sam.png" },
  { name: "Fiona", role: "designer", image: "/assets/about_characters/fiona.png" },
  { name: "Zara", role: "designer", image: "/assets/about_characters/zara.png" },
];

export default function AboutPage() {
  const [isFionaPopupOpen, setIsFionaPopupOpen] = useState(false);

  const handleFionaClick = () => {
    setIsFionaPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsFionaPopupOpen(false);
  };

  return (
    <div className={styles.aboutContainer}>
      {/* Fixed Home Button */}
      <Link href="/" className={styles.homeButton}>
        <img
          src="/assets/home_button/home_stamp.png"
          alt="Return Home"
          className={styles.homeButtonImage}
        />
      </Link>

      {/* Main content wrapper */}
      <div className={styles.contentWrapper}>
        {/* Left panel - About card SVG */}
        <div className={styles.aboutPanel}>
          <img
            src="/assets/about_card/Group%2015.svg"
            alt="About Pent Up"
            className={styles.aboutCard}
          />
        </div>
        
        {/* Right section - Character grid */}
        <div className={styles.charactersSection}>
          {/* Row 1: Melody and Gia */}
          <div className={styles.characterRow}>
            {characters.filter(c => c.name === "Melody" || c.name === "Gia").map((character) => (
              <div 
                key={character.name} 
                className={`${styles.characterCard} ${character.name === "Fiona" ? styles.clickableCard : ""}`}
                onClick={character.name === "Fiona" ? handleFionaClick : undefined}
              >
                <img
                  src={character.image}
                  alt={character.name}
                  className={styles.characterImage}
                />
                <div className={styles.characterInfo}>
                  <div className={styles.characterName}>{character.name}:</div>
                  <div className={styles.characterRole}>{character.role}</div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Row 2: Gordon, Ziana, and Sam */}
          <div className={styles.characterRow}>
            {characters.filter(c => c.name === "Gordon" || c.name === "Ziana" || c.name === "Sam").map((character) => (
              <div 
                key={character.name} 
                className={`${styles.characterCard} ${character.name === "Fiona" ? styles.clickableCard : ""}`}
                onClick={character.name === "Fiona" ? handleFionaClick : undefined}
              >
                <img
                  src={character.image}
                  alt={character.name}
                  className={styles.characterImage}
                />
                <div className={styles.characterInfo}>
                  <div className={styles.characterName}>{character.name}:</div>
                  <div className={styles.characterRole}>{character.role}</div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Row 3: Fiona and Zara */}
          <div className={styles.characterRow}>
            {characters.filter(c => c.name === "Fiona" || c.name === "Zara").map((character) => (
              <div 
                key={character.name} 
                className={`${styles.characterCard} ${character.name === "Fiona" ? styles.clickableCard : ""}`}
                onClick={character.name === "Fiona" ? handleFionaClick : undefined}
              >
                <img
                  src={character.image}
                  alt={character.name}
                  className={styles.characterImage}
                />
                <div className={styles.characterInfo}>
                  <div className={styles.characterName}>{character.name}:</div>
                  <div className={styles.characterRole}>{character.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Info Section */}
      <div className={styles.contactInfoSection}>
        <img
          src="/assets/contact_info/Group%2096%20(1).png"
          alt="Contact Info"
          className={styles.contactInfoImage}
        />
        <div className={styles.contactInfoOverlay}>
          <div className={styles.contactLinks}>
            <a href="https://www.instagram.com/pent.up.project/" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
              Instagram
            </a>
            <span className={styles.contactSeparator}> • </span>
            <a href="https://github.com/ziana-sundrani/pent_up" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
              GitHub
            </a>
            <span className={styles.contactSeparator}> • </span>
            <a href="https://www.linkedin.com/company/pennspark/" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
              LinkedIn
            </a>
            <span className={styles.contactSeparator}> • </span>
            <a href="https://pennspark.substack.com/" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
              Newsletter
            </a>
            <span className={styles.contactSeparator}> • </span>
            <a href="https://pennclubs.com/club/penn-spark/" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
              Penn Clubs
            </a>
          </div>
          <div className={styles.contactEmail}>
            Contact Us: <a href="mailto:upennspark@gmail.com" className={styles.contactLink}>upennspark@gmail.com</a>
          </div>
        </div>
      </div>

      {/* Fiona Popup Modal */}
      {isFionaPopupOpen && (
        <div className={styles.popupOverlay} onClick={handleClosePopup}>
          <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.popupImageContainer}>
              <button className={styles.exitButton} onClick={handleClosePopup}>
                <img
                  src="/assets/exit_button/exit button.png"
                  alt="Close"
                  className={styles.exitButtonImage}
                />
              </button>
              <img
                src="/assets/about_fiona_popup/Pop-up%20about.svg"
                alt="Fiona Popup"
                className={styles.popupImage}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

