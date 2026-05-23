function toDateStr(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function TodayPanel({ tasks, onToggleday }) {
  if (!tasks.length) return null;

  const today = new Date();
  const todayStr = toDateStr(today);

  const doneIds = new Set(
    tasks.filter((t) => (t.done_days || []).includes(todayStr)).map((t) => t.id)
  );
  const total = tasks.length;
  const done = doneIds.size;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  const dateLabel = today
    .toLocaleDateString("ru", { weekday: "long", day: "numeric", month: "long" })
    .toLowerCase();

  const upNext = tasks.slice(0, Math.min(4, tasks.length));

  return (
    <section className="today_panel" id="today">
      <div className="today_panel_left">
        <span className="today_panel_date">{dateLabel}</span>
        <span className="today_panel_count">
          <span className="today_panel_count_done">{String(done).padStart(2, "0")}</span>
          <span className="today_panel_count_slash">/</span>
          <span className="today_panel_count_total">{String(total).padStart(2, "0")}</span>
        </span>
        <span className="today_panel_count_label">привычек · сегодня</span>
      </div>

      <div className="today_panel_bar_wrap">
        <div className="today_panel_progress_meta">
          <span>прогресс дня</span>
          <span>{pct}%</span>
        </div>
        <div
          className="today_panel_ticks"
          style={{ gridTemplateColumns: `repeat(${total}, 1fr)` }}
        >
          {tasks.map((t) => (
            <button
              key={t.id}
              type="button"
              className={"today_panel_tick" + (doneIds.has(t.id) ? " is-done" : "")}
              onClick={() => onToggleday(t.id, todayStr)}
              aria-label={`${t.name}: ${doneIds.has(t.id) ? "снять" : "отметить"}`}
            />
          ))}
        </div>
        <div className="today_panel_progress_meta">
          <span>{done} done</span>
          <span>{total - done} left</span>
        </div>
      </div>

      <div className="today_panel_next">
        <span className="today_panel_next_label">список</span>
        {upNext.map((t) => (
          <div
            key={t.id}
            className={"today_panel_next_row" + (doneIds.has(t.id) ? " is-done" : "")}
          >
            <span className="today_panel_next_dot" />
            <span>{t.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
