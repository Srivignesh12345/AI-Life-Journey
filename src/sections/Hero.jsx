import { useState, useEffect, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";
const SUBTITLE = "From Data to Intelligence";

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
      iter += 0.7;
      if (iter >= text.length) { setDisplay(text); clearInterval(frame.current); }
    }, 30);
    return () => clearInterval(frame.current);
  }, [trigger, text]);

  return display;
}

function useTypewriter(text, delay = 0) {
  const [typed, setTyped] = useState("");
  useEffect(() => {
    let i = 0;
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        i++;
        setTyped(text.slice(0, i));
        if (i >= text.length) clearInterval(iv);
      }, 40);
      return () => clearInterval(iv);
    }, delay);
    return () => clearTimeout(t);
  }, [text, delay]);
  return typed;
}

export default function Hero() {
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setTriggered(true), 200);
    return () => clearTimeout(t);
  }, []);

  const glitchAI      = useGlitch("AI",      triggered);
  const glitchLife    = useGlitch("Life",    triggered);
  const glitchJourney = useGlitch("Journey", triggered);
  const typedSubtitle = useTypewriter(SUBTITLE, 900);

  return (
    <section style={{
      minHeight: "100vh",
      background: "#0d0d14",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "0 24px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Glow blob */}
      <div style={{
        position: "absolute",
        width: 400, height: 400,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <p style={{ color: "#60a5fa", fontFamily: "monospace", fontSize: 12, letterSpacing: 4, textTransform: "uppercase", marginBottom: 16 }}>
        — Welcome to the Future —
      </p>

      <h1 style={{ fontFamily: "monospace", fontSize: "clamp(2.5rem, 8vw, 5rem)", fontWeight: 900, lineHeight: 1.2, marginBottom: 24 }}>
        <span style={{ color: "#60a5fa" }}>{glitchAI}</span>{" "}
        <span style={{ color: "#ffffff" }}>{glitchLife}</span>{" "}
        <span style={{ color: "#a78bfa" }}>{glitchJourney}</span>
      </h1>

      <p style={{ fontFamily: "monospace", fontSize: 18, color: "#94a3b8", marginBottom: 48, letterSpacing: 2, minHeight: 28 }}>
        {typedSubtitle}
        {typedSubtitle.length < SUBTITLE.length && (
          <span style={{ animation: "blink 0.7s step-end infinite" }}>█</span>
        )}
      </p>

      <p style={{ fontFamily: "monospace", fontSize: 12, color: "#60a5fa", letterSpacing: 4, textTransform: "uppercase", animation: "bounce 1.5s infinite" }}>
        ↓ Scroll to explore
      </p>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        @keyframes blink { 50% { opacity: 0; } }
      `}</style>
    </section>
  );
}
