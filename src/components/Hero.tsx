import styles from "./Hero.module.css";
import { useApp } from "../context/AppContext";

export default function Hero() {
  const { text } = useApp();
  return (
    <section id="home" className={styles.section}>
      <div className={styles.grid}>
        <div>
          <h1 className={styles.title}>{text.hero.title}</h1>
          <p className={styles.text}>{text.hero.subtitle}</p>
          <div className={styles.actions}>
            <a href="#projects" className={styles.primaryButton}>
              {text.hero.primary}
            </a>
            <a href="#contact" className={styles.secondaryButton}>
              {text.hero.secondary}
            </a>
          </div>
        </div>
        <div className={styles.art}>
          <div className={styles.artBox} />
        </div>
      </div>
    </section>
  );
}
