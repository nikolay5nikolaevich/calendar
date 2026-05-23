import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    };

    const tick = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    const onOver = (e) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      const hover = t.closest(
        'a, button, input, textarea, select, [role="button"], .hc_cell, .nav_link, .picker_month_btn, .calendar_nav_label, .progress_habit_btn'
      );
      ring.classList.toggle("is-hover", !!hover);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    tick();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="cursor_ring" ref={ringRef} aria-hidden="true" />
      <div className="cursor_dot" ref={dotRef} aria-hidden="true" />
    </>
  );
}
