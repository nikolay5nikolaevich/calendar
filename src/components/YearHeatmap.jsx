import Reveal from "./Reveal";

function buildWeeks(year) {
  const jan1 = new Date(year, 0, 1);
  const jan1Dow = jan1.getDay() || 7;
  const startOffset = jan1Dow - 1;

  const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  const totalDays = isLeap ? 366 : 365;

  const cells = Array(startOffset).fill(null);
  for (let i = 0; i < totalDays; i++) {
    const d = new Date(year, 0, 1 + i);
    cells.push(
      `${year}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
    );
  }
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

export default function YearHeatmap({ tasks }) {
  if (!tasks.length) return null;
  const year = new Date().getFullYear();
  const weeks = buildWeeks(year);
  const today = new Date();
  const todayStr = `${year}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  return (
    <Reveal>
      <section className="year_heatmap">
        <div className="year_heatmap_label">
          <span>Год по дням</span>
          <span>{year}</span>
        </div>
        {tasks.map((task) => {
          const doneDays = new Set(task.done_days || []);
          return (
            <div key={task.id} className="year_heatmap_row">
              <span className="year_heatmap_name">{task.name}</span>
              <div className="year_heatmap_grid">
                {weeks.map((week, wi) => (
                  <div key={wi} className="year_heatmap_week">
                    {week.map((dateStr, di) => {
                      if (!dateStr)
                        return <div key={di} className="year_cell year_cell--empty" />;
                      const isDone = doneDays.has(dateStr);
                      const isToday = dateStr === todayStr;
                      return (
                        <div
                          key={di}
                          className={
                            "year_cell" +
                            (isDone ? " year_cell--done" : "") +
                            (isToday ? " year_cell--today" : "")
                          }
                          title={dateStr}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </Reveal>
  );
}
