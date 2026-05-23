import { useState } from "react";
import YearHeatmap from "../components/YearHeatmap";

const MONTHS_RU = ["янв","фев","мар","апр","май","июн","июл","авг","сен","окт","ноя","дек"];
const TRACK_H = 220;

function getLast12Months() {
  const months = [];
  const now = new Date();
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
      label: MONTHS_RU[d.getMonth()],
      showYear: d.getMonth() === 0,
      monthIdx: d.getMonth(),
    });
  }
  return months;
}

export default function ProgressPage({ tasks, goal }) {
  const [selectedId, setSelectedId] = useState(tasks[0]?.id ?? null);
  const habit = tasks.find((t) => t.id === selectedId) ?? null;
  const months = getLast12Months();
  const currentMonthIdx = new Date().getMonth();

  const chartData = months.map((m) => ({
    ...m,
    count: habit
      ? habit.done_days.filter((d) => d.startsWith(m.key)).length
      : 0,
  }));

  const habitGoal = habit ? (habit.goalPerMonth || goal) : goal;
  const maxCount = Math.max(...chartData.map((d) => d.count), habitGoal, 1);
  const totalDays = habit ? habit.done_days.length : 0;
  const sumCount = chartData.reduce((s, m) => s + m.count, 0);
  const avgPerMonth = Math.round(sumCount / 12);
  const bestMonth = Math.max(...chartData.map((d) => d.count));
  const goalLineBottom = (habitGoal / maxCount) * TRACK_H;

  return (
    <div className="progress_page">
      <div className="progress_topline">
        <h1 className="progress_title">прогресс</h1>
        <span className="progress_topline_sub">12 месяцев</span>
      </div>

      {tasks.length === 0 ? (
        <p className="progress_empty_text">
          Нет привычек. Добавь их на главной — здесь появится сетка года и графики.
        </p>
      ) : (
        <>
          <div className="progress_tabs" role="tablist">
            {tasks.map((task) => (
              <button
                key={task.id}
                role="tab"
                aria-selected={selectedId === task.id}
                className={
                  "progress_tab" +
                  (selectedId === task.id ? " progress_tab--active" : "")
                }
                onClick={() => setSelectedId(task.id)}
              >
                <span className="progress_tab_dot" />
                {task.name}
              </button>
            ))}
          </div>

          {!habit ? (
            <p className="progress_empty_text">Выбери привычку выше.</p>
          ) : (
            <>
              <div className="progress_chart_header">
                <div>
                  {habit.intent && (
                    <p className="progress_intent">«{habit.intent}»</p>
                  )}
                </div>
                <span className="progress_chart_sub">цель · {habitGoal} / мес</span>
              </div>

              <div className="chart_wrap">
                <div className="chart_bars">
                  {chartData.map((m, i) => {
                    const barH = (m.count / maxCount) * TRACK_H;
                    const isCurrent = m.monthIdx === currentMonthIdx && i === 11;
                    return (
                      <div
                        key={i}
                        className={"chart_col" + (isCurrent ? " chart_col--current" : "")}
                      >
                        <span className="chart_val">{m.count > 0 ? m.count : ""}</span>
                        <div className="chart_track">
                          <div
                            className="chart_bar"
                            style={{ height: `${barH}px` }}
                          />
                        </div>
                        <span className="chart_label">
                          {m.showYear ? `${m.label} ${m.key.slice(2, 4)}` : m.label}
                        </span>
                      </div>
                    );
                  })}
                  <div className="chart_goal_line" style={{ bottom: `${goalLineBottom + 28}px` }}>
                    <span className="chart_goal_badge">цель · {habitGoal}</span>
                  </div>
                </div>
              </div>

              <div className="progress_stats">
                <div className="stat_card">
                  <span className="stat_value">{totalDays}</span>
                  <span className="stat_label">всего дней</span>
                </div>
                <div className="stat_card">
                  <span className="stat_value">{avgPerMonth}</span>
                  <span className="stat_label">среднее / мес</span>
                </div>
                <div className="stat_card">
                  <span className="stat_value">{bestMonth}</span>
                  <span className="stat_label">лучший месяц</span>
                </div>
              </div>

              
            </>
          )}
        </>
      )}
    </div>
  );
}
