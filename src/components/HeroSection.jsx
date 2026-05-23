import { useRef } from "react";
import Marquee from "./Marquee";

const STRIP_ITEMS = [
  "БОКС",
  "ММА",
  "МУАЙ-ТАЙ",
  "ДИСЦИПЛИНА",
  "2026",
  "СПОРТКЛУБ БАКИ",
];

export default function HeroSection() {
  const ctaRef = useRef(null);

  const onMove = (e) => {
    const btn = ctaRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.22;
    const dy = (e.clientY - cy) * 0.32;
    btn.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const onLeave = () => {
    const btn = ctaRef.current;
    if (btn) btn.style.transform = "";
  };

  const scrollToTracker = () => {
    document.getElementById("tracker")?.scrollIntoView({ behavior: "smooth" });
  };

  const today = new Date();
  const dateStr = today
    .toLocaleDateString("ru", { day: "2-digit", month: "long", year: "numeric" })
    .toLowerCase();

  return (
    <section className="hero" id="hero">
      <div className="hero_media">
        <div className="hero_poster" aria-hidden="true" />
      </div>
      <div className="hero_vignette" aria-hidden="true" />

      <div className="hero_stamp">
        <div>habit<span className="hero_stamp_em">·</span>grid</div>
        <div>{dateStr}</div>
      </div>

      <div className="hero_body">
        <span className="hero_eyebrow">Трекер для бойцов клуба Баки</span>

        <h1 className="hero_heading">
          Не сила воли.<br />
          <em className="hero_heading_em">Ритуал</em>.
        </h1>

        <div className="hero_meta_row" onMouseMove={onMove} onMouseLeave={onLeave}>
          <p className="hero_tagline">
            Каждая клетка — это вечер, который ты прожил<br />
            в согласии с тем, кем хочешь стать.
          </p>

          <button
            ref={ctaRef}
            className="hero_cta"
            onClick={scrollToTracker}
            aria-label="Открыть трекер"
          >
            <span className="hero_cta_label">открыть трекер</span>
            <svg className="hero_cta_arrow" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <path d="M5 14h18M16 7l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter" />
            </svg>
          </button>
        </div>
      </div>

      <div className="hero_strip">
        <Marquee items={STRIP_ITEMS} />
      </div>
    </section>
  );
}
