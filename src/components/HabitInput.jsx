import { useState } from "react"
import Habit_list from "./HabitList"
import Add_tast_form from "./Add_task_form"
const Habit_input = () => {

  const handleOnClick=(e)=>{
    console.dir(e.target.previousElementSibling.value)
  }

  

  const handleClick_Delete=(taskid)=>{
    console.log('delete task with id ', taskid)
  }

  const stopreset=(e)=>{
    e.preventDefault()
    const newhabit={
      name:value,
      id:crypto?.randomUUID(),
      className:`habit-item`} 
    setclassiclist((classic_list)=>{
      return classic_list=[...classic_list,newhabit]
    })
  }


  const [classic_list,setclassiclist]=useState([])
  const [value,setvalue]=useState('')

  

  const Deleteall=()=>{
    const sure=confirm('are u sure?')
    if (sure){
      setclassiclist([])
    }
  }

  return (
    <div className="left">

      <h2>Habits</h2>
      
      <Add_tast_form reset={stopreset} value1={value} setvalue={setvalue}/>

      <Habit_list tasks={classic_list} onDeletehabit={handleClick_Delete} />
      <button className="btn_delete_all" onClick={Deleteall}>удалить все </button>
    </div>
  )
}
export default Habit_input