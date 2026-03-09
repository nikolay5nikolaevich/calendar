import Daysell from "./daycell"


const Calendar = () => {
  const last_day=new Date(2026,3,0).getDate
  console.log(last_day)
  const day_of_mart=[1,2,3,4,5,6,7,8,9,10]
  return (
    <div className="calendar">

      <div className="monthHeader">

        <button>{"<"}</button>

        <h2>March 2026</h2>

        <button>{">"}</button>

      </div>


      <div className="grid">

        {day_of_mart.map((day)=>{
          return <Daysell number_of_day={day}
          id={crypto?.randomUUID()}/>
        })}
      </div>

    </div>
  )
}
export default Calendar