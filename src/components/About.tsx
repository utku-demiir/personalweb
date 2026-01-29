import styles from "./About.module.css";
import { useApp } from "../context/AppContext";

export default function About() {
  const { text } = useApp();
  return (
    <section id="about" className={styles.section}>
      <h2 className={styles.title}>{text.about.title}</h2>
      <p className={styles.text}>{text.about.text}</p>
    </section>
  );
}
