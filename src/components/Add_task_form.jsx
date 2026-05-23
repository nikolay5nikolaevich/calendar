import { useState, useRef } from "react";
import { HABIT_COLORS } from "../constants";

export default function Add_task_form({ onSubmit, defaultGoal }) {
  const [name, setName] = useState("");
  const [color, setColor] = useState(HABIT_COLORS[0]);
  const [goalPerMonth, setGoalPerMonth] = useState(String(defaultGoal));
  const [intent, setIntent] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    const g = Math.max(1, Math.min(31, parseInt(goalPerMonth, 10) || defaultGoal));
    onSubmit({ name: name.trim(), color, goalPerMonth: g, intent: intent.trim() });
    setName("");
    setIntent("");
    setGoalPerMonth(String(defaultGoal));
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit} className="habitForm">
      <input
        ref={inputRef}
        type="text"
        placeholder="название привычки…"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div className="form_color_row">
        {HABIT_COLORS.map((c) => (
          <button
            key={c}
            type="button"
            className={"form_color_swatch is-" + c + (color === c ? " form_color_swatch--active" : "")}
            onClick={() => setColor(c)}
            aria-label={c}
          />
        ))}
      </div>

      <div className="form_goal_row">
        <label className="form_label">Цель / месяц</label>
        <input
          type="number"
          min="1"
          max="31"
          value={goalPerMonth}
          onChange={(e) => setGoalPerMonth(e.target.value)}
          onBlur={() => {
            const v = Math.max(1, Math.min(31, parseInt(goalPerMonth, 10) || defaultGoal));
            setGoalPerMonth(String(v));
          }}
          className="form_goal_input"
        />
      </div>

      <input
        type="text"
        placeholder="намерение (необязательно)…"
        value={intent}
        onChange={(e) => setIntent(e.target.value)}
        className="form_intent_input"
      />

      <button type="submit">добавить</button>
    </form>
  );
}
