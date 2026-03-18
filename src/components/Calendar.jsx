const now = new Date();
const days_count = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
const week_days = ["S", "M", "T", "W", "T", "F", "S"];
const days = Array.from({ length: days_count }, (_, index) => index + 1);

function get_week_day(day) {
  const date = new Date(now.getFullYear(), now.getMonth(), day);
  return week_days[date.getDay()];
}

const Calendar = (props) => {
  const { tasks, onToggleday,Delete_habit,editHabit} = props;
  const today = now.getDate();

  return (
    <div className="calendar">
      <div className="tracker_scroller">
        <div className="tracker_table">
          <div className="tracker_head_row">
            <div className="tracker_header tracker_habits">Habits</div>

            {days.map((day) => {
              return (
                <div
                  key={day}
                  className={day === today ? "tracker_day today" : "tracker_day"}
                >
                  <span>{get_week_day(day)}</span>
                  <strong>{day}</strong>
                </div>
              );
            })}

            <div className="tracker_header tracker_total_header">Done</div>
          </div>

          {tasks.map((task) => {
            const done_days = task.done_days || [];
            const achieved = done_days.length;

            return (
              <div className="tracker_row" key={task.id}>
                <div className="tracker_habit_name">
                  <div className="tracker_habit_name_text">
                      {task.name}
                  </div>


                  <div className="tracker_habit_name_btn">
                    <img onClick={()=>editHabit(task.id)} src="../pict/edit.svg" alt="" />
                    <img onClick={()=>Delete_habit(task.id)}  src="../pict/delete.svg" alt="" />
                  </div>
                  
                </div>

                {days.map((day) => {
                  const is_done = done_days.includes(day);
                  const cell_class = is_done
                    ? `tracker_cell is-filled is-${task.color}`
                    : "tracker_cell";

                  return (
                    <button
                      className={cell_class}
                      key={task.id + String(day)}
                      type="button"
                      onClick={() => onToggleday(task.id, day)}
                    >
                      {is_done ? "v" : ""}
                    </button>
                    
                  );
                })}

                <div className={achieved >= task.goal ? "tracker_achieved good" : "tracker_achieved warn"}>
                  {achieved}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {tasks.length === 0 ? (
        <p className="tracker_empty_text">Add your first habit on the left.</p>
      ) : null}
    </div>
  );
};

export default Calendar;
