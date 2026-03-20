import { useState, useEffect, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";
const TITLE = "Data is the Fuel of AI";
const DESC  = "AI systems rely on vast amounts of structured and unstructured data to learn and evolve. Every image, sentence, and signal is a lesson the machine never forgets.";

function useGlitch(text, trigger) {
  const [display, setDisplay] = useState(text);
  const frame = useRef(null);

  useEffect(() => {
    if (!trigger) return;
    let iter = 0;
    clearInterval(frame.current);
    frame.current = setInterval(() => {
      setDisplay(
        text.split("").map((ch, i) =>
          i < iter ? ch : ch === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)]
        ).join("")
      );
      iter += 0.8;
      if (iter >= text.length) { setDisplay(text); clearInterval(frame.current); }
    }, 30);
    return () => clearInterval(frame.current);
  }, [trigger, text]);

  return display;
}

function useTypewriter(text, active) {
  const [typed, setTyped] = useState("");
  useEffect(() => {
    if (!active) return;
    setTyped("");
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setTyped(text.slice(0, i));
      if (i >= text.length) clearInterval(iv);
    }, 18);
    return () => clearInterval(iv);
  }, [active, text]);
  return typed;
}

export default function Data() {
  const [visible, setVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const glitchTitle = useGlitch(TITLE, visible);
  const typed       = useTypewriter(DESC, visible);

  return (
    <section style={{
      minHeight: "100vh",
      background: "#0f0f1a",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "60px 24px",
    }}>
      <div ref={ref} style={{
        background: "#0d0d14",
        border: `1px solid ${visible ? "#60a5fa" : "#2d2d4e"}`,
        borderRadius: 16,
        padding: "48px 40px",
        maxWidth: 560,
        width: "100%",
        textAlign: "center",
        boxShadow: visible ? "0 0 40px #60a5fa33" : "none",
        transition: "border-color 0.4s, box-shadow 0.4s",
      }}>
        <p style={{ fontFamily: "monospace", fontSize: 11, color: "#60a5fa", letterSpacing: 4, textTransform: "uppercase", marginBottom: 16 }}>
          Foundation
        </p>
        <h2 style={{ fontFamily: "monospace", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "#93c5fd", marginBottom: 20 }}>
          {glitchTitle}
        </h2>
        <p style={{ fontFamily: "monospace", fontSize: 15, color: "#cbd5e1", lineHeight: 1.8, minHeight: 80 }}>
          {typed}
          {typed.length < DESC.length && visible && (
            <span style={{ animation: "blink 0.7s step-end infinite" }}>█</span>
          )}
        </p>
        <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
      </div>
    </section>
  );
}
