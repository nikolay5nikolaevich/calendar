import { CLUB_NAME } from "../constants";

function getISOWeek(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}

function toDateStr(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function DashboardTopline({ tasks }) {
  const today = new Date();
  const todayStr = toDateStr(today);
  const weekNum = getISOWeek(today);

  const dateLabel = today.toLocaleDateString("ru", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - 6 + i);
    const dateStr = toDateStr(d);
    const done = tasks.some((t) => (t.done_days || []).includes(dateStr));
    return { dateStr, done, isToday: dateStr === todayStr };
  });

  return (
    <div className="dash_topline" id="dashboard">
      <div className="dash_topline_left">
        <div className="dash_topline_brand">
          СПОРТИВНЫЙ КЛУБ {CLUB_NAME.toUpperCase()} · ДНЕВНИК ДИСЦИПЛИНЫ
        </div>
        <div className="dash_topline_date">
          {dateLabel} · {weekNum}-я неделя {today.getFullYear()}
        </div>
      </div>
      <div className="dash_topline_strip">
        {last7.map((d, i) => (
          <div
            key={i}
            className={
              "dash_strip_cell" +
              (d.done ? " dash_strip_cell--done" : "") +
              (d.isToday ? " dash_strip_cell--today" : "")
            }
            title={d.dateStr}
          />
        ))}
      </div>
    </div>
  );
}
