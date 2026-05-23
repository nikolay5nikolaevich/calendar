export default function Marquee({ items = [], variant = "default" }) {
  const doubled = [...items, ...items];
  const className = "marquee" + (variant === "ribbon" ? " marquee--ribbon" : "");
  return (
    <div className={className} aria-hidden="true">
      <div className="marquee_track">
        {doubled.map((item, i) => (
          <span key={i} className={"marquee_item" + (i % 3 === 1 ? " marquee_item--alt" : "")}>
            <span className="marquee_dot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
