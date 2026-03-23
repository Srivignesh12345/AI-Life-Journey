import { useState, useEffect, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

const steps = [
  { emoji: "📊", label: "Data Collection",  color: "#60a5fa", desc: "AI begins by ingesting vast amounts of raw data — images, text, signals — the fuel for everything that follows." },
  { emoji: "🧠", label: "Model Training",   color: "#a78bfa", desc: "Neural networks process the data, adjusting millions of weights across layers until patterns emerge from the noise." },
  { emoji: "⚖️", label: "Decision Making",  color: "#34d399", desc: "The trained model makes predictions and decisions — faster, more consistent, and at a scale no human team could match." },
  { emoji: "🌐", label: "Deployment",       color: "#f97316", desc: "The model goes live — powering apps, automating workflows, and learning continuously from real-world feedback." },
  { emoji: "🌌", label: "Future: AGI",      color: "#f472b6", desc: "Artificial General Intelligence — AI that reasons across every domain as fluidly as a human mind. The horizon we race toward." },
];

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

      if (iter >= text.length) {
        setDisplay(text);
        clearInterval(frame.current);
      }
    }, 30);

    return () => clearInterval(frame.current);
  }, [trigger, text]);

  return display;
}

function useTypewriter(text, key) {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    setTyped("");
    let i = 0;

    const iv = setInterval(() => {
      i++;
      setTyped(text.slice(0, i));
      if (i >= text.length) clearInterval(iv);
    }, 18);

    return () => clearInterval(iv);
  }, [key, text]);

  return typed;
}

function GlitchTab({ step, active, onClick }) {
  const [hover, setHover] = useState(false);
  const glitch = useGlitch(step.label, hover || active);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: "10px 20px",
        fontFamily: "monospace",
        fontSize: 13,
        fontWeight: 700,
        background: active ? step.color + "22" : "#1a1a2e",
        color: active ? step.color : hover ? step.color : "#64748b",
        border: `1px solid ${active || hover ? step.color : "#2d2d4e"}`,
        borderRadius: 10,
        cursor: "pointer",
        letterSpacing: 1,
        boxShadow: active
          ? `0 0 16px ${step.color}55`
          : hover
          ? `0 0 10px ${step.color}33`
          : "none",
        transition: "all 0.2s",
      }}
    >
      {step.emoji} {glitch}
    </button>
  );
}

function useGlitchOnce(text, trigger) {
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

      iter += 1;

      if (iter >= text.length) {
        setDisplay(text);
        clearInterval(frame.current);
      }
    }, 30);

    return () => clearInterval(frame.current);
  }, [trigger, text]); // ✅ FIXED

  return display;
}

function ActiveCard({ step, index }) {
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    setTriggered(false);
    const t = setTimeout(() => setTriggered(true), 10);
    return () => clearTimeout(t);
  }, [index]);

  const glitchLabel = useGlitchOnce(step.label, triggered);
  const typed = useTypewriter(step.desc, index);

  return (
    <div
      style={{
        background: "#0d0d14",
        border: `1px solid ${step.color}`,
        borderRadius: 16,
        padding: "40px 48px",
        maxWidth: 560,
        width: "100%",
        textAlign: "center",
        boxShadow: `0 0 40px ${step.color}33`,
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}
    >
      <div style={{ fontSize: 48, marginBottom: 16 }}>{step.emoji}</div>

      <h3
        style={{
          fontFamily: "monospace",
          fontSize: 20,
          fontWeight: 800,
          color: step.color,
          marginBottom: 16,
        }}
      >
        {glitchLabel}
      </h3>

      <p
        style={{
          fontFamily: "monospace",
          fontSize: 14,
          color: "#cbd5e1",
          lineHeight: 1.9,
          minHeight: 80,
        }}
      >
        {typed}
        {typed.length < step.desc.length && (
          <span style={{ animation: "blink 0.7s step-end infinite" }}>█</span>
        )}
      </p>

      <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
    </div>
  );
}

export default function Journey() {
  const [active, setActive] = useState(0);

  return (
    <section
      style={{
        minHeight: "100vh",
        background: "#0d0d14",
        padding: "80px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <p
        style={{
          fontFamily: "monospace",
          fontSize: 11,
          color: "#60a5fa",
          letterSpacing: 4,
          textTransform: "uppercase",
          marginBottom: 12,
        }}
      >
        The Journey
      </p>

      <h2
        style={{
          fontFamily: "monospace",
          fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
          fontWeight: 800,
          color: "#ffffff",
          marginBottom: 48,
          textAlign: "center",
        }}
      >
        AI's Path to Intelligence
      </h2>

      <div
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: 40,
        }}
      >
        {steps.map((s, i) => (
          <GlitchTab key={i} step={s} active={active === i} onClick={() => setActive(i)} />
        ))}
      </div>

      <ActiveCard step={steps[active]} index={active} />

      <div style={{ display: "flex", gap: 10, marginTop: 32 }}>
        {steps.map((s, i) => (
          <div
            key={i}
            onClick={() => setActive(i)}
            style={{
              width: active === i ? 24 : 8,
              height: 8,
              borderRadius: 4,
              background: active === i ? s.color : "#2d2d4e",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
          />
        ))}
      </div>
    </section>
  );
}