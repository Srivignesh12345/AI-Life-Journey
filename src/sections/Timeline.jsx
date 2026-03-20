import { useState, useEffect, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

const events = [
  { year: "1950", title: "The Turing Test",             desc: "Alan Turing proposed that if a machine could converse indistinguishably from a human, it could be considered intelligent. This single idea sparked decades of AI research.", color: "#60a5fa" },
  { year: "1980", title: "Machine Learning Emerges",    desc: "Algorithms began learning from data rather than following explicit rules. Decision trees and early neural networks shifted the entire paradigm of software development.", color: "#22d3ee" },
  { year: "2000", title: "The Big Data Era",            desc: "The internet explosion generated unprecedented data volumes. AI finally had the raw material it needed to learn patterns at a scale never seen before.", color: "#818cf8" },
  { year: "2012", title: "Deep Learning Breakthrough",  desc: "AlexNet achieved superhuman accuracy in image recognition using deep convolutional networks. The modern AI revolution had officially begun — GPUs became the engine of intelligence.", color: "#a78bfa" },
  { year: "2020", title: "AI Goes Mainstream",          desc: "GPT-3, DALL·E, AlphaFold — AI stopped being a research curiosity and became a daily tool used in homes, hospitals, and boardrooms worldwide.", color: "#c084fc" },
  { year: "Future", title: "Artificial General Intelligence", desc: "The next frontier — AI that reasons, creates, and adapts across every domain as fluidly as a human mind. The question is no longer if, but when.", color: "#f472b6" },
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
    if (!active) { setTyped(""); return; }
    setTyped("");
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setTyped(text.slice(0, i));
      if (i >= text.length) clearInterval(iv);
    }, 18);
    return () => clearInterval(iv);
  }, [text, active]);
  return typed;
}

function TimelineCard({ event, index, active, onClick }) {
  const { year, title, desc, color } = event;
  const isActive = active === index;
  const [hover, setHover] = useState(false);

  const glitchYear  = useGlitch(year,  isActive || hover);
  const glitchTitle = useGlitch(title, isActive || hover);
  const typed       = useTypewriter(desc, isActive);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ position: "relative", paddingLeft: 56, marginBottom: 24, cursor: "pointer" }}
    >
      {/* Dot */}
      <div style={{
        position: "absolute", left: 12, top: 18,
        width: 16, height: 16, borderRadius: "50%",
        background: isActive ? color : "#1e293b",
        border: `2px solid ${color}`,
        boxShadow: isActive || hover ? `0 0 12px ${color}99` : "none",
        transition: "background 0.2s, transform 0.2s, box-shadow 0.3s",
        transform: isActive ? "scale(1.4)" : hover ? "scale(1.15)" : "scale(1)",
      }} />

      {/* Card */}
      <div style={{
        background: isActive ? "#0d0d14" : "#111120",
        border: `1px solid ${isActive || hover ? color : "#2d2d4e"}`,
        borderRadius: 12,
        padding: "18px 22px",
        boxShadow: isActive ? `0 0 24px ${color}33` : hover ? `0 0 12px ${color}22` : "none",
        transition: "border-color 0.2s, background 0.2s, box-shadow 0.3s",
      }}>
        <span style={{ fontFamily: "monospace", fontSize: 11, color, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700 }}>
          {glitchYear}
        </span>
        <h3 style={{ fontFamily: "monospace", fontSize: 16, fontWeight: 700, color: isActive || hover ? color : "#ffffff", margin: "6px 0 8px", transition: "color 0.2s" }}>
          {glitchTitle}
        </h3>

        {isActive ? (
          <p style={{ fontFamily: "monospace", fontSize: 13, color: "#cbd5e1", lineHeight: 1.8, margin: 0 }}>
            {typed}
            {typed.length < desc.length && (
              <span style={{ animation: "blink 0.7s step-end infinite" }}>█</span>
            )}
          </p>
        ) : (
          <p style={{ fontFamily: "monospace", fontSize: 12, color: "#475569", margin: 0 }}>Click to expand ›</p>
        )}
      </div>

      <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
    </div>
  );
}

export default function Timeline() {
  const [active, setActive] = useState(null);

  return (
    <section style={{ minHeight: "100vh", background: "#0f0f1a", padding: "80px 24px" }}>

      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <p style={{ fontFamily: "monospace", fontSize: 11, color: "#60a5fa", letterSpacing: 4, textTransform: "uppercase", marginBottom: 12 }}>A Living History</p>
        <h2 style={{ fontFamily: "monospace", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "#ffffff", marginBottom: 16 }}>Evolution of AI</h2>
        <p style={{ fontFamily: "monospace", fontSize: 14, color: "#94a3b8", maxWidth: 500, margin: "0 auto", lineHeight: 1.8 }}>
          The milestones that shaped artificial intelligence — from a thought experiment to a world-changing force.
        </p>
      </div>

      <div style={{ maxWidth: 640, margin: "0 auto", position: "relative" }}>
        <div style={{ position: "absolute", left: 20, top: 0, bottom: 0, width: 2, background: "#2d2d4e" }} />

        {events.map((event, i) => (
          <TimelineCard
            key={event.year}
            event={event}
            index={i}
            active={active}
            onClick={() => setActive(active === i ? null : i)}
          />
        ))}
      </div>
    </section>
  );
}
