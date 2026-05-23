import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import Habit_input from "./components/HabitInput"
import HabitCards from "./components/HabitCards"
import Toast from "./components/Toast"
import Navbar from "./components/Navbar"
import Cursor from "./components/Cursor"
import Grain from "./components/Grain"
import ScrollProgress from "./components/ScrollProgress"
import HeroSection from "./components/HeroSection"
import Marquee from "./components/Marquee"
import ClubIntro from "./components/ClubIntro"
import TodayPanel from "./components/TodayPanel"
import CoachRoster from "./components/CoachRoster"
import ProgressPage from "./pages/ProgressPage"
import Footer from "./components/Footer"
import { HABIT_COLORS } from "./constants"

// items for the scrolling ribbon
var RIBBON_ITEMS = [
  "Тренируйся.",
  "Отмечай.",
  "Повторяй.",
  "Баки",
  "2026",
]

function App() {
  // load habits from localstorage
  var savedData = []
  try {
    var raw = localStorage.getItem("habit")
    if (raw) {
      var parsed = JSON.parse(raw)
      // convert old format (numbers) to new format (date strings)
      for (var i = 0; i < parsed.length; i++) {
        var t = parsed[i]
        if (!t.id) t.id = crypto.randomUUID()
        if (!t.name) t.name = ""
        if (!t.color) t.color = HABIT_COLORS[i % HABIT_COLORS.length]
        if (!t.goalPerMonth) t.goalPerMonth = t.goal || Number(localStorage.getItem("goal")) || 20
        if (!t.intent) t.intent = ""
        if (!Array.isArray(t.done_days)) t.done_days = []
        // migrate old number format to string dates
        if (t.done_days.length > 0 && typeof t.done_days[0] === "number") {
          var now = new Date()
          var yr = now.getFullYear()
          var mo = String(now.getMonth() + 1).padStart(2, "0")
          t.done_days = t.done_days.map(function(day) {
            return yr + "-" + mo + "-" + String(day).padStart(2, "0")
          })
        }
        savedData.push(t)
      }
    }
  } catch(e) {
    console.log("Ошибка загрузки привычек", e)
    savedData = []
  }

  const [tasks, setTasks] = useState(savedData)
  const [viewMonth, setViewMonth] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth()
  })
  const [toast, setToast] = useState(null)
  // храним таймер отдельно чтобы очищать
  const [toastTimer, setToastTimer] = useState(null)

  // goal из localstorage
  var goal = 20
  if (localStorage.getItem("goal")) {
    goal = parseInt(localStorage.getItem("goal"))
  }

  // сохраняем при изменении задач
  useEffect(function() {
    localStorage.setItem("habit", JSON.stringify(tasks))
  }, [tasks])

  // показать тост уведомление
  function showToast(msg, undoFn) {
    if (toastTimer) {
      clearTimeout(toastTimer)
    }
    var timer = setTimeout(function() {
      setToast(null)
      setToastTimer(null)
    }, 5000)
    setToast({ message: msg, undoFn: undoFn, timerId: timer })
    setToastTimer(timer)
  }

  // добавить новую привычку
  function addHabit(habitData) {
    if (!habitData.name || habitData.name.trim() == "") {
      return
    }
    var newHabit = {
      id: crypto.randomUUID(),
      name: habitData.name.trim(),
      color: habitData.color || HABIT_COLORS[tasks.length % HABIT_COLORS.length],
      goalPerMonth: habitData.goalPerMonth || goal,
      intent: habitData.intent || "",
      done_days: [],
    }
    var newList = [...tasks, newHabit]
    setTasks(newList)
  }

  // удалить одну привычку по id
  function deleteHabit(id) {
    var snapshot = [...tasks]
    // ищем имя привычки
    var habitName = "Habit"
    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].id == id) {
        habitName = tasks[i].name
        break
      }
    }
    var filtered = tasks.filter(function(h) { return h.id !== id })
    setTasks(filtered)
    showToast('"' + habitName + '" deleted', function() {
      setTasks(snapshot)
    })
  }

  // удалить все привычки
  function deleteAll() {
    if (tasks.length == 0) return
    var snapshot = [...tasks]
    setTasks([])
    showToast("All habits deleted", function() {
      setTasks(snapshot)
    })
  }

  // отметить/снять отметку с дня
  function toggleDay(taskId, dateStr) {
    var updated = tasks.map(function(task) {
      if (task.id !== taskId) {
        return task
      }
      if (task.done_days.includes(dateStr)) {
        // снимаем отметку
        var newDays = task.done_days.filter(function(d) { return d !== dateStr })
        return { ...task, done_days: newDays }
      } else {
        // ставим отметку
        var newDays = [...task.done_days, dateStr]
        newDays.sort()
        return { ...task, done_days: newDays }
      }
    })
    setTasks(updated)
  }

  // навигация по месяцам
  function goToPrevMonth() {
    var m = viewMonth.month - 1
    var y = viewMonth.year
    if (m < 0) {
      m = 11
      y = y - 1
    }
    setViewMonth({ year: y, month: m })
  }

  function goToNextMonth() {
    var m = viewMonth.month + 1
    var y = viewMonth.year
    if (m > 11) {
      m = 0
      y = y + 1
    }
    setViewMonth({ year: y, month: m })
  }

  function navigateMonth(direction) {
    if (direction === -1) {
      goToPrevMonth()
    } else {
      goToNextMonth()
    }
  }

  function goToToday() {
    setViewMonth({
      year: new Date().getFullYear(),
      month: new Date().getMonth()
    })
  }

  function setMonth(y, m) {
    setViewMonth({ year: y, month: m })
  }

  // переименовать привычку
  function editHabit(id, newName) {
    var updated = tasks.map(function(habit) {
      if (habit.id === id) {
        return { ...habit, name: newName }
      }
      return habit
    })
    setTasks(updated)
  }

  return (
    <div className="app">
      <Grain />
      <ScrollProgress />
      <Cursor />
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <Marquee items={RIBBON_ITEMS} variant="ribbon" />
              <ClubIntro />

              <div className="tracker_section_label">
                Трекер / отметь сегодняшний день
              </div>

              <div className="layout" id="tracker">
                <Habit_input
                  onAddhabit={addHabit}
                  onDeleteall={deleteAll}
                  goal={goal}
                />
                <div className="right">
                  <TodayPanel tasks={tasks} onToggleday={toggleDay} />
                  <HabitCards
                    tasks={tasks}
                    onToggleday={toggleDay}
                    Delete_habit={deleteHabit}
                    editHabit={editHabit}
                    goal={goal}
                    viewMonth={viewMonth}
                    onNavigateMonth={navigateMonth}
                    onGoToNow={goToToday}
                    onSetMonth={setMonth}
                  />
                </div>
              </div>

              <CoachRoster />
            </>
          }
        />

        <Route
          path="/progress"
          element={<ProgressPage tasks={tasks} goal={goal} />}
        />
      </Routes>

      <Footer />
      <Toast toast={toast} />
    </div>
  )
}

export default App
