import { useState } from "react";
import axios, { AxiosError } from "axios";
import styles from "./Contact.module.css";
import { useApp } from "../context/AppContext";

export default function Contact() {
  const { text } = useApp();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [responseId, setResponseId] = useState<string | null>(null);
  const [apiNote, setApiNote] = useState<string | null>(null);
  const [errorDetail, setErrorDetail] = useState<string | null>(null);

  const sendDemo = async () => {
    setStatus("loading");
    setResponseId(null);
    setApiNote(null);
    setErrorDetail(null);
    try {
      const payload = { name: "Utku", role: "Frontend Developer", language: "React" };
      try {
        const res = await axios.post("/reqres/api/workintech", payload);
        setResponseId(String(res.data?.id ?? "-"));
        setStatus("success");
        return;
      } catch {
        const res = await axios.post("/reqres/api/users", payload);
        setResponseId(String(res.data?.id ?? "-"));
        setApiNote("(fallback: /api/users)");
        setStatus("success");
        return;
      }
    } catch (err) {
      const error = err as AxiosError;
      const statusCode = error.response?.status;
      const message = error.message || "Unknown error";
      setErrorDetail(statusCode ? `HTTP ${statusCode} - ${message}` : message);

      setStatus("error");
    }
  };

  return (
    <section id="contact" className={styles.section}>
      <h2 className={styles.title}>{text.contact.title}</h2>
      <p className={styles.text}>{text.contact.text}</p>
      <a className={styles.button} href="mailto:utku@example.com">
        {text.contact.cta}
      </a>

      <div className={styles.apiBox}>
        <h3 className={styles.apiTitle}>{text.contact.apiTitle}</h3>
        <p className={styles.apiText}>{text.contact.apiText}</p>
        <button className={styles.apiButton} onClick={sendDemo} disabled={status === "loading"}>
          {status === "loading" ? "..." : text.contact.apiButton}
        </button>
        {status === "success" && (
          <p className={styles.apiStatus}>
            {text.contact.apiSuccess} {responseId} {apiNote ? apiNote : ""}
          </p>
        )}
        {status === "error" && (
          <p className={styles.apiError}>
            {text.contact.apiError}
            {errorDetail ? ` (${errorDetail})` : ""}
          </p>
        )}
      </div>
    </section>
  );
}
