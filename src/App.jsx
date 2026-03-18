import { useEffect, useState } from "react";
import Habit_input from "./components/HabitInput";
import Calendar from "./components/Calendar";
import Welcome_text from "./components/Welcome_text";

const habit_colors = ["yellow", "mint", "blue", "purple"];

function normalize_habit(task, index) {
  return {
    name: task.name || "",
    id: task.id || crypto?.randomUUID(),
    className: task.className || "habit-item",
    goal: task.goal || 20,
    color: task.color || habit_colors[index % habit_colors.length],
    done_days: Array.isArray(task.done_days) ? task.done_days : [],
  };
}

function App() {
  const [tasks, settasks] = useState(() => {
    const saved_habits = localStorage.getItem("habit");

    if (saved_habits) {
      const parsed_habits = JSON.parse(saved_habits);
      return parsed_habits.map((task, index) => normalize_habit(task, index));
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem("habit", JSON.stringify(tasks));
  }, [tasks]);

  const onAddhabit = (habit_name) => {
    if (habit_name.trim() === "") {
      return;
    }

    settasks((old_tasks) => {
      const newhabit = {
        name: habit_name,
        id: crypto?.randomUUID() || String(Date.now()),
        className: "habit-item",
        goal: 20,
        color: habit_colors[old_tasks.length % habit_colors.length],
        done_days: [],
      };

      return [...old_tasks, newhabit];
    });
  };

  const Delete_habit=(id)=>{
    return settasks(tasks.filter((habit_arr)=>habit_arr.id!=id))

  }

  const onDeleteall = () => {
    const sure = window.confirm("Delete all habits?");

    if (sure) {
      settasks([]);
    }
  };


  const onToggleday = (taskid, day) => {
    settasks((old_tasks) => {
      return old_tasks.map((task) => {
        if (task.id !== taskid) {
          return task;
        }

        const has_day = task.done_days.includes(day);

        if (has_day) {
          return {
            ...task,
            done_days: task.done_days.filter((item) => item !== day),
          };
        }

        return {
          ...task,
          done_days: [...task.done_days, day].sort((a, b) => a - b),
        };
      });
    });
  };


  function editHabit(id,editHabit){
    settasks((old_task)=>{
      return old_task.map((habit)=>{
        if (habit.id==id) {
          return {...habit,name:editHabit}
        }
        else {
          return habit
        }
      })
    })



  }

  return (
    <div className="app">
      <Welcome_text />
      <div className="layout">
        <Habit_input
          tasks={tasks}
          onAddhabit={onAddhabit}
       
          onDeleteall={onDeleteall}
        />

        <div className="right">
          <Calendar tasks={tasks} onToggleday={onToggleday} Delete_habit={Delete_habit} editHabit={editHabit}/>
        </div>
      </div>
    </div>
  );
}

export default App;
