import { useEffect, useRef, useState } from "react";

const stats = [
  { label: "Efficiency Increase", value: 100, suffix: "%", color: "#4ade80" },
  { label: "Industries Transformed", value: 47, suffix: "+", color: "#60a5fa" },
  { label: "AI Models Deployed", value: 85, suffix: "K+", color: "#a78bfa" },
];

export default function Impact() {
  const [counts, setCounts] = useState([0, 0, 0]);
  const ref = useRef();
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        stats.forEach((stat, i) => {
          let val = 0;
          const iv = setInterval(() => {
            val += Math.ceil(stat.value / 60);
            if (val >= stat.value) { val = stat.value; clearInterval(iv); }
            setCounts(prev => { const n = [...prev]; n[i] = val; return n; });
          }, 25);
        });
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ minHeight: "100vh", background: "#0d0d14", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 24px", textAlign: "center" }}>

      <p style={{ fontFamily: "monospace", fontSize: 11, color: "#60a5fa", letterSpacing: 4, textTransform: "uppercase", marginBottom: 12 }}>By the Numbers</p>
      <h2 style={{ fontFamily: "monospace", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "#67e8f9", marginBottom: 48 }}>AI Impact</h2>

      <div style={{ display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "center" }}>
        {stats.map((stat, i) => (
          <div key={i} style={{ background: "#1a1a2e", border: "1px solid #2d2d4e", borderRadius: 16, padding: "36px 40px", minWidth: 180, textAlign: "center" }}>
            <p style={{ fontFamily: "monospace", fontSize: "clamp(2.5rem,6vw,3.5rem)", fontWeight: 900, color: stat.color, lineHeight: 1 }}>
              {counts[i]}{stat.suffix}
            </p>
            <p style={{ fontFamily: "monospace", fontSize: 12, color: "#94a3b8", marginTop: 10, letterSpacing: 1 }}>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
