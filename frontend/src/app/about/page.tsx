"use client";

import { useState } from "react";
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
          {characters.map((character) => (
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

      {/* Fiona Popup Modal */}
      {isFionaPopupOpen && (
        <div className={styles.popupOverlay} onClick={handleClosePopup}>
          <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={handleClosePopup}>
              ×
            </button>
            <img
              src="/assets/about_fiona_popup/Pop-up%20about.svg"
              alt="Fiona Popup"
              className={styles.popupImage}
            />
          </div>
        </div>
      )}
    </div>
  );
}

