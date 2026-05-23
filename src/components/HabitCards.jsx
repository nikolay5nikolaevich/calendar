import { useState } from "react"

// дни недели
const WEEKDAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]

// красный цвет для акцентов
const bloodRed = "#ff2e1f"

// длина окружности для svg кольца (2 * pi * 12)
const RING_CIRC = 75.4

// получить все недели для месяца
function getWeeksForMonth(year, month) {
  var firstDay = new Date(year, month, 1).getDay()
  var offset = (firstDay + 6) % 7
  var lastDayNum = new Date(year, month + 1, 0).getDate()

  var allDays = []

  // добавляем дни прошлого месяца для заполнения первой недели
  for (var i = offset; i > 0; i--) {
    allDays.push({ date: new Date(year, month, 1 - i), cur: false })
  }

  // добавляем дни текущего месяца
  for (var d = 1; d <= lastDayNum; d++) {
    allDays.push({ date: new Date(year, month, d), cur: true })
  }

  // добавляем дни следующего месяца чтобы заполнить последнюю неделю
  var remaining = (7 - (allDays.length % 7)) % 7
  for (var d2 = 1; d2 <= remaining; d2++) {
    allDays.push({ date: new Date(year, month + 1, d2), cur: false })
  }

  // разбиваем на недели по 7 дней
  var weeks = []
  for (var j = 0; j < allDays.length; j += 7) {
    weeks.push(allDays.slice(j, j + 7))
  }
  return weeks
}

// карточка одной привычки
function HabitCard({ task, viewMonth, onToggleday, onEdit, onDelete, goal, today_str, idx }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState("")

  var year = viewMonth.year
  var month = viewMonth.month
  var monthPrefix = year + "-" + String(month + 1).padStart(2, "0") + "-"

  // считаем сколько дней отмечено в этом месяце
  var doneDays = 0
  for (var i = 0; i < task.done_days.length; i++) {
    if (task.done_days[i].startsWith(monthPrefix)) {
      doneDays++
    }
  }

  var habitGoal = task.goalPerMonth || goal
  var weeks = getWeeksForMonth(year, month)

  // прогресс для кольца
  var ratio = doneDays / habitGoal
  if (ratio > 1) ratio = 1
  var dashLen = ratio * RING_CIRC

  function handleSaveEdit(name) {
    if (name.trim() !== "") {
      onEdit(task.id, name.trim())
    }
    setIsEditing(false)
  }

  return (
    <article
      className="hc_card"
      style={{ "--hc-color": bloodRed, animationDelay: idx * 70 + "ms" }}
    >
      <header className="hc_head">
        <div className="hc_head_left">
          <span className="hc_idx">N° {String(idx + 1).padStart(2, "0")}</span>
          {isEditing ? (
            <input
              className="hc_name_input"
              value={editValue}
              autoFocus
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSaveEdit(editValue)
                if (e.key === "Escape") setIsEditing(false)
              }}
              onBlur={() => handleSaveEdit(editValue)}
            />
          ) : (
            <h3 className="hc_name" title={task.name}>{task.name}</h3>
          )}
        </div>

        <div className="hc_head_right">
          <div className="hc_progress">
            <span className="hc_count">
              <span style={{ color: bloodRed }}>{String(doneDays).padStart(2, "0")}</span>
              <span className="hc_count_denom">/{String(habitGoal).padStart(2, "0")}</span>
            </span>
            {/* svg кольцо прогресса */}
            <svg width="34" height="34" viewBox="0 0 32 32" className="hc_ring">
              <circle cx="16" cy="16" r="12" fill="none" stroke="var(--rule)" strokeWidth="2" />
              <circle
                cx="16" cy="16" r="12"
                fill="none"
                stroke={bloodRed}
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={dashLen.toFixed(2) + " " + RING_CIRC}
                transform="rotate(-90 16 16)"
                style={{
                  filter: "drop-shadow(0 0 5px " + bloodRed + "aa)",
                  transition: "stroke-dasharray .8s cubic-bezier(.2,.8,.2,1)"
                }}
              />
            </svg>
          </div>

          <div className="hc_menu_wrap">
            <button
              className="hc_menu_btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Меню привычки"
            >
              ···
            </button>
            {menuOpen == true && (
              <>
                <div className="picker_backdrop" onClick={() => setMenuOpen(false)} />
                <div className="hc_menu_drop">
                  <button
                    onClick={() => {
                      setIsEditing(true)
                      setEditValue(task.name)
                      setMenuOpen(false)
                    }}
                  >
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path d="M8.5 1.5L10.5 3.5L4 10 1.5 10.5 2 8z"
                        stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                    </svg>
                    Переименовать
                  </button>
                  <button
                    className="hc_menu_del"
                    onClick={() => {
                      onDelete(task.id)
                      setMenuOpen(false)
                    }}
                  >
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path d="M2 4h8M5 4V2.5h2V4M4 4l.5 6h3L8 4"
                        stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round" />
                    </svg>
                    Удалить
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* заголовки дней недели */}
      <div className="hc_weekdays">
        {WEEKDAYS.map(function(wd, i) {
          return (
            <div key={i} className={i >= 5 ? "hc_wd hc_wd--end" : "hc_wd"}>
              {wd}
            </div>
          )
        })}
      </div>

      {/* сетка календаря */}
      <div className="hc_cal">
        {weeks.map(function(week, wi) {
          return (
            <div key={wi} className="hc_cal_week">
              {week.map(function(cell, di) {
                var date = cell.date
                var cur = cell.cur
                var y = date.getFullYear()
                var m = date.getMonth()
                var d = date.getDate()
                var dateStr = y + "-" + String(m + 1).padStart(2, "0") + "-" + String(d).padStart(2, "0")
                var isDone = cur && task.done_days.includes(dateStr)
                var isToday = dateStr === today_str

                var cellClass = "hc_cell"
                if (!cur) cellClass = cellClass + " hc_cell--other"
                if (isToday) cellClass = cellClass + " hc_cell--today"
                if (isDone) cellClass = cellClass + " hc_cell--done"

                return (
                  <button
                    key={di}
                    className={cellClass}
                    disabled={!cur}
                    onClick={() => {
                      if (cur) onToggleday(task.id, dateStr)
                    }}
                    aria-label={cur ? d + (isDone ? " отмечено" : "") : undefined}
                  >
                    <span className="hc_cell_n">{d}</span>
                  </button>
                )
              })}
            </div>
          )
        })}
      </div>
    </article>
  )
}

// пустое состояние когда нет привычек
function EmptyState() {
  return (
    <div className="hc_empty">
      <svg width="64" height="64" viewBox="0 0 52 52" fill="none" className="hc_empty_svg">
        <rect x="4"  y="4"  width="19" height="19" rx="2" stroke="currentColor" strokeWidth="1.2" />
        <rect x="29" y="4"  width="19" height="19" rx="2" stroke="currentColor" strokeWidth="1.2" />
        <rect x="4"  y="29" width="19" height="19" rx="2" stroke="currentColor" strokeWidth="1.2" />
        <rect x="29" y="29" width="19" height="19" rx="2" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      <p className="hc_empty_text">
        Сетка пуста. Добавь первую привычку слева — и эта пустыня превратится в карту.
      </p>
    </div>
  )
}

export default function HabitCards({ tasks, onToggleday, Delete_habit, editHabit, goal, viewMonth, onNavigateMonth, onGoToNow, onSetMonth }) {
  const [pickerOpen, setPickerOpen] = useState(false)
  const [pickerYear, setPickerYear] = useState(viewMonth.year)

  var year = viewMonth.year
  var month = viewMonth.month

  // строка сегодняшней даты
  var todayDate = new Date()
  var todayStr = todayDate.getFullYear() + "-"
    + String(todayDate.getMonth() + 1).padStart(2, "0") + "-"
    + String(todayDate.getDate()).padStart(2, "0")

  var isCurrentMonth = todayDate.getFullYear() === year && todayDate.getMonth() === month
  var monthLabel = new Date(year, month).toLocaleString("ru", { month: "long", year: "numeric" })

  // список месяцев для пикера
  var monthNames = []
  for (var i = 0; i < 12; i++) {
    monthNames.push(new Date(pickerYear, i).toLocaleString("ru", { month: "short" }))
  }

  return (
    <div className="hc_wrap">
      {/* навигация по месяцам */}
      <div className="calendar_nav">
        <button onClick={() => onNavigateMonth(-1)} aria-label="Предыдущий месяц">←</button>
        <span
          className="calendar_nav_label"
          onClick={() => {
            setPickerOpen(true)
            setPickerYear(year)
          }}
        >
          {monthLabel}
        </span>
        <button onClick={() => onNavigateMonth(1)} aria-label="Следующий месяц">→</button>
        {isCurrentMonth == false && (
          <button className="calendar_nav_now" onClick={onGoToNow}>сегодня</button>
        )}

        {pickerOpen == true && (
          <>
            <div className="picker_backdrop" onClick={() => setPickerOpen(false)} />
            <div className="month_picker">
              <div className="picker_year_nav">
                <button onClick={() => setPickerYear(pickerYear - 1)}>←</button>
                <span>{pickerYear}</span>
                <button onClick={() => setPickerYear(pickerYear + 1)}>→</button>
              </div>
              <div className="picker_months">
                {monthNames.map(function(name, i) {
                  var isActive = month === i && year === pickerYear
                  return (
                    <button
                      key={i}
                      className={isActive ? "picker_month_btn picker_active" : "picker_month_btn"}
                      onClick={() => {
                        onSetMonth(pickerYear, i)
                        setPickerOpen(false)
                      }}
                    >
                      {name}
                    </button>
                  )
                })}
              </div>
            </div>
          </>
        )}
      </div>

      {/* список карточек привычек */}
      {tasks.length > 0 ? (
        <div className="hc_grid" key={year + "-" + month}>
          {tasks.map(function(task, idx) {
            return (
              <HabitCard
                key={idx}
                task={task}
                viewMonth={viewMonth}
                onToggleday={onToggleday}
                onEdit={editHabit}
                onDelete={Delete_habit}
                goal={goal}
                today_str={todayStr}
                idx={idx}
              />
            )
          })}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  )
}
