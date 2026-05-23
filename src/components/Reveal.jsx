import { useEffect, useRef } from "react";

export default function Reveal({
  className = "",
  variant = "fade",
  delay = 0,
  children,
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      el.classList.add("is-in");
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-in");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("is-in"), delay);
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    io.observe(el);

    // Safety fallback: if still hidden after 2.5s (e.g. headless screenshot),
    // force visible so content is never permanently invisible.
    const fallback = setTimeout(() => {
      el.classList.add("is-in");
      io.disconnect();
    }, 2500);

    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, [delay]);

  const baseClass = variant === "mask" ? "reveal-mask" : "reveal";
  const finalClass = `${baseClass} ${className}`.trim();

  return (
    <div ref={ref} className={finalClass} {...rest}>
      {children}
    </div>
  );
}
