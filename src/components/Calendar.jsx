import Daysell from "./daycell"
const Calendar = () => {
  return (
    <div className="calendar">

      <div className="monthHeader">

        <button>{"<"}</button>

        <h2>March 2026</h2>

        <button>{">"}</button>

      </div>


      <div className="grid">

        <Daysell />
        <Daysell />
        <Daysell />
        <Daysell />
        <Daysell />
        <Daysell />
        <Daysell />
        <Daysell />
        <Daysell />
        <Daysell />
        <Daysell />
        <Daysell />
        <Daysell />
        <Daysell />
        <Daysell />
        <Daysell />
        <Daysell />
        <Daysell />

      </div>

    </div>
  )
}
export default Calendar