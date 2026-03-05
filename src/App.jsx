import Habit_input from "./components/HabitInput";
import Calendar from "./components/Calendar";
import Stats from "./components/StatsPanel";
function App() {
  return (

    <div className="app">

      <header className="header">
        <h1>Habit Tracker</h1>
      </header>

      <div className="layout">
        <Habit_input />

        <div className="right">

          <Calendar />
          <Stats />
          
        </div>
      </div>
    </div>

  );
}

export default App;