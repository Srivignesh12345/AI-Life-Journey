import { useEffect } from "react";
import Hero from "./sections/Hero";
import Data from "./sections/Data";
import Learning from "./sections/Learning";
import Decision from "./sections/Decision";
import Impact from "./sections/Impact";
import Timeline from "./sections/Timeline";
import Journey from "./sections/Journey";

export default function App() {
  useEffect(() => {
    const cursor = document.querySelector(".cursor");
    const move = (e) => {
      if (cursor) {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div style={{ background: "#0d0d14" }}>
      <div className="cursor" />
      <Hero />
      <Data />
      <Learning />
      <Decision />
      <Impact />
      <Timeline />
      <Journey />
    </div>
  );
}
