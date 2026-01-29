import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import styles from "./App.module.css";
import { useApp } from "./context/AppContext";

function App() {
  const { text } = useApp();
  return (
    <div className={styles.page}>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          © {new Date().getFullYear()} Utku. {text.nav.brand}
        </div>
      </footer>
    </div>
  );
}

export default App
