import Add_task_form from "./Add_task_form";

export default function Habit_input({ onAddhabit, onDeleteall, goal }) {
  return (
    <aside className="left">
      <div className="left_header">
        <h2>привычки</h2>

      </div>
      <p className="left_text">
        Добавь привычку — она появится справа карточкой со своей сеткой месяца.
      </p>

      <Add_task_form onSubmit={onAddhabit} defaultGoal={goal} />

      <button className="btn_delete_all" type="button" onClick={onDeleteall}>
        Очистить всё
      </button>
    </aside>
  );
}
