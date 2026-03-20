import { useState } from "react";

const LAYERS = [3, 4, 4, 2];
const W = 320, H = 180;
const layerX = [40, 130, 220, 300];

const nodes = LAYERS.map((count, li) =>
  Array.from({ length: count }, (_, ni) => ({
    x: layerX[li],
    y: H / 2 - ((count - 1) * 34) / 2 + ni * 34,
    li, ni,
  }))
);

export default function Learning() {
  const [progress, setProgress] = useState(0);
  const [activeLayer, setActiveLayer] = useState(-1);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);

  const train = () => {
    if (running) return;
    setRunning(true);
    setDone(false);
    setProgress(0);
    let val = 0, layer = 0;

    const lc = setInterval(() => {
      setActiveLayer(layer % LAYERS.length);
      layer++;
    }, 280);

    const iv = setInterval(() => {
      val += 1;
      setProgress(val);
      if (val >= 100) {
        clearInterval(iv);
        clearInterval(lc);
        setActiveLayer(-1);
        setRunning(false);
        setDone(true);
      }
    }, 50);
  };

  const loss = ((100 - progress) / 100).toFixed(2);

  return (
    <section style={{ minHeight: "100vh", background: "#0d0d14", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 24px", textAlign: "center" }}>

      <p style={{ fontFamily: "monospace", fontSize: 11, color: "#60a5fa", letterSpacing: 4, textTransform: "uppercase", marginBottom: 12 }}>How AI Thinks</p>
      <h2 style={{ fontFamily: "monospace", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "#93c5fd", marginBottom: 12 }}>AI Learning Phase</h2>
      <p style={{ fontFamily: "monospace", fontSize: 14, color: "#94a3b8", maxWidth: 480, lineHeight: 1.8, marginBottom: 32 }}>
        Neural networks pass signals through layers of nodes, adjusting weights each epoch until patterns emerge.
      </p>

      {/* SVG Network */}
      <div style={{ background: "#1a1a2e", border: "1px solid #2d2d4e", borderRadius: 16, padding: 24, marginBottom: 24, width: "100%", maxWidth: 420 }}>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }}>
          {/* Lines */}
          {nodes.slice(0, -1).map((layer, li) =>
            layer.flatMap(from =>
              nodes[li + 1].map(to => (
                <line key={`${li}-${from.ni}-${to.ni}`}
                  x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                  stroke={activeLayer === li || activeLayer === li + 1 ? "#3b82f6" : "#1e293b"}
                  strokeWidth="1"
                  style={{ transition: "stroke 0.3s" }}
                />
              ))
            )
          )}
          {/* Nodes */}
          {nodes.map((layer, li) =>
            layer.map(({ x, y, ni }) => (
              <circle key={`${li}-${ni}`}
                cx={x} cy={y} r={8}
                fill={activeLayer === li ? "#3b82f6" : "#1e293b"}
                stroke={activeLayer === li ? "#93c5fd" : "#334155"}
                strokeWidth="1.5"
                style={{ transition: "fill 0.3s" }}
              />
            ))
          )}
          {/* Labels */}
          {["Input", "Hidden", "Hidden", "Output"].map((lbl, li) => (
            <text key={li} x={layerX[li]} y={H - 2} textAnchor="middle" fontSize="8"
              fill={activeLayer === li ? "#93c5fd" : "#475569"}
              style={{ fontFamily: "monospace", transition: "fill 0.3s" }}>
              {lbl}
            </text>
          ))}
        </svg>

        {/* Stats */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, fontFamily: "monospace", fontSize: 12, color: "#94a3b8" }}>
          <span>Epoch: <strong style={{ color: "#fff" }}>{Math.floor(progress / 10)}</strong> / 10</span>
          <span>Loss: <strong style={{ color: progress > 70 ? "#4ade80" : "#f87171" }}>{loss}</strong></span>
        </div>

        {/* Loss bar */}
        <div style={{ marginTop: 8, height: 4, background: "#1e293b", borderRadius: 4, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${100 - progress}%`, background: "linear-gradient(to right,#ef4444,#f97316)", transition: "width 0.3s", borderRadius: 4 }} />
        </div>
      </div>

      {/* Button */}
      <button onClick={train} disabled={running} style={{
        padding: "12px 40px", fontFamily: "monospace", fontSize: 14, fontWeight: 700,
        background: running ? "#374151" : "#3b82f6", color: running ? "#6b7280" : "#fff",
        border: "none", borderRadius: 10, cursor: running ? "not-allowed" : "pointer",
        marginBottom: 20, letterSpacing: 2,
      }}>
        {running ? "TRAINING..." : done ? "RETRAIN" : "TRAIN AI"}
      </button>

      {/* Progress */}
      {(running || done) && (
        <div style={{ width: "100%", maxWidth: 360 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "monospace", fontSize: 12, color: "#94a3b8", marginBottom: 6 }}>
            <span>Progress</span><span style={{ color: "#fff" }}>{progress}%</span>
          </div>
          <div style={{ height: 8, background: "#1e293b", borderRadius: 8, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(to right,#3b82f6,#06b6d4)", transition: "width 0.2s", borderRadius: 8 }} />
          </div>
        </div>
      )}

      {done && (
        <p style={{ fontFamily: "monospace", fontSize: 14, color: "#4ade80", fontWeight: 700, marginTop: 16 }}>
          ✅ Model Trained Successfully — Loss: 0.00
        </p>
      )}
    </section>
  );
}
