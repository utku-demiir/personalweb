import styles from "./Navbar.module.css";
import { useApp } from "../context/AppContext";

export default function Navbar() {
  const { theme, toggleTheme, language, setLanguage, text } = useApp();

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <a href="#home" className={styles.brand}>{text.nav.brand}</a>
        <div className={styles.links}>
          <a href="#about" className={styles.link}>{text.nav.about}</a>
          <a href="#projects" className={styles.link}>{text.nav.projects}</a>
          <a href="#contact" className={styles.link}>{text.nav.contact}</a>
          <div className={styles.languageGroup}>
            <span className={styles.langLabel}>{text.nav.language}:</span>
            <button
              type="button"
              className={styles.langButton}
              aria-pressed={language === "tr"}
              onClick={() => setLanguage("tr")}
            >
              TR
            </button>
            <button
              type="button"
              className={styles.langButton}
              aria-pressed={language === "en"}
              onClick={() => setLanguage("en")}
            >
              EN
            </button>
          </div>
          <button
            aria-label={text.nav.theme}
            className={styles.toggle}
            onClick={toggleTheme}
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </button>
        </div>
      </nav>
    </header>
  );
}
