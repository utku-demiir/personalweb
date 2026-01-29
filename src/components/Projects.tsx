import styles from "./Projects.module.css";
import { useApp } from "../context/AppContext";

export default function Projects() {
  const { text } = useApp();
  return (
    <section id="projects" className={styles.section}>
      <h2 className={styles.title}>{text.projects.title}</h2>
      <div className={styles.grid}>
        {text.projects.items.map((p) => (
          <article key={p.title} className={styles.card}>
            <h3 className={styles.cardTitle}>{p.title}</h3>
            <p className={styles.cardText}>{p.description}</p>
            {p.link && (
              <a className={styles.cardLink} href={p.link}>
                İncele →
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
