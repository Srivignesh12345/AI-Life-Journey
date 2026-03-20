import { useState, useEffect, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

function useGlitchLabel(label, trigger) {
  const [display, setDisplay] = useState(label);
  const frame = useRef(null);

  useEffect(() => {
    if (!trigger) return;
    let iter = 0;
    clearInterval(frame.current);
    frame.current = setInterval(() => {
      setDisplay(
        label.split("").map((ch, i) =>
          i < iter ? ch : ch === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)]
        ).join("")
      );
      iter += 0.5;
      if (iter >= label.length) {
        setDisplay(label);
        clearInterval(frame.current);
      }
    }, 30);
    return () => clearInterval(frame.current);
  }, [trigger, label]);

  return display;
}

function useTypewriter(text, active) {
  const [typed, setTyped] = useState("");
  useEffect(() => {
    if (!active) { setTyped(""); return; }
    setTyped("");
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setTyped(text.slice(0, i));
      if (i >= text.length) clearInterval(iv);
    }, 28);
    return () => clearInterval(iv);
  }, [text, active]);
  return typed;
}

function GlitchButton({ label, color, border, bg, onClick, active }) {
  const [hover, setHover] = useState(false);
  const glitch = useGlitchLabel(label, hover || active);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: "14px 28px",
        fontFamily: "monospace", fontSize: 13, fontWeight: 700,
        background: active ? color + "22" : bg,
        color: active ? color : "#e2e8f0",
        border: `1px solid ${active || hover ? color : border}`,
        borderRadius: 10, cursor: "pointer", letterSpacing: 1,
        boxShadow: hover || active ? `0 0 18px ${color}55` : "none",
        transition: "box-shadow 0.3s, border-color 0.3s, background 0.3s",
        minWidth: 180,
      }}
    >
      {glitch}
    </button>
  );
}

const HUMAN = {
  color: "#a78bfa",
  title: "👤 Human Decision",
  lines: [
    "> Analyzing emotional state...",
    "> Recalling past experiences...",
    "> Gut feeling: HIGH RISK",
    "> Verdict: INVEST — feels right.",
  ],
};

const AI = {
  color: "#60a5fa",
  title: "🤖 AI Decision",
  lines: [
    "> Loading market dataset [47K rows]...",
    "> Running probability model...",
    "> Confidence: 34.7% success rate",
    "> Verdict: DO NOT INVEST — risk exceeds threshold.",
  ],
};

function TerminalCard({ data, active }) {
  const [lines, setLines] = useState([]);
  const [lineIdx, setLineIdx] = useState(0);
  const typed = useTypewriter(active && lineIdx < data.lines.length ? data.lines[lineIdx] : "", active);

  useEffect(() => {
    if (!active) { setLines([]); setLineIdx(0); }
  }, [active]);

  useEffect(() => {
    if (!active || !typed) return;
    if (typed === data.lines[lineIdx]) {
      const t = setTimeout(() => {
        setLines(prev => [...prev, typed]);
        setLineIdx(i => i + 1);
      }, 200);
      return () => clearTimeout(t);
    }
  }, [typed, active, lineIdx, data.lines]);

  if (!active) return null;

  return (
    <div style={{
      marginTop: 36, padding: "24px 32px",
      background: "#0d0d14",
      border: `1px solid ${data.color}`,
      borderRadius: 12,
      maxWidth: 520, width: "100%",
      textAlign: "left",
      boxShadow: `0 0 32px ${data.color}33`,
      fontFamily: "monospace", fontSize: 13,
    }}>
      <p style={{ color: data.color, fontWeight: 700, marginBottom: 14, fontSize: 14 }}>{data.title}</p>
      {lines.map((l, i) => (
        <p key={i} style={{ color: "#94a3b8", margin: "4px 0" }}>{l}</p>
      ))}
      {lineIdx < data.lines.length && (
        <p style={{ color: "#e2e8f0", margin: "4px 0" }}>
          {typed}<span style={{ animation: "blink 0.7s step-end infinite" }}>█</span>
        </p>
      )}
      <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
    </div>
  );
}

export default function Decision() {
  const [active, setActive] = useState(null);

  return (
    <section style={{ minHeight: "100vh", background: "#0f0f1a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 24px", textAlign: "center" }}>

      <p style={{ fontFamily: "monospace", fontSize: 11, color: "#60a5fa", letterSpacing: 4, textTransform: "uppercase", marginBottom: 12 }}>Interactive</p>
      <h2 style={{ fontFamily: "monospace", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "#67e8f9", marginBottom: 12 }}>Decision Simulator</h2>
      <p style={{ fontFamily: "monospace", fontSize: 14, color: "#94a3b8", marginBottom: 36, lineHeight: 1.8 }}>
        Scenario: Should you invest in a risky startup?
      </p>

      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
        <GlitchButton
          label="👤 Human Decision"
          color="#a78bfa" border="#374151" bg="#1e1e2e"
          active={active === "human"}
          onClick={() => setActive(active === "human" ? null : "human")}
        />
        <GlitchButton
          label="🤖 AI Decision"
          color="#60a5fa" border="#3b82f6" bg="#1d3a6e"
          active={active === "ai"}
          onClick={() => setActive(active === "ai" ? null : "ai")}
        />
      </div>

      <TerminalCard data={HUMAN} active={active === "human"} />
      <TerminalCard data={AI} active={active === "ai"} />
    </section>
  );
}
