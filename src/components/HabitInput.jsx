import { useState } from "react"
import Habit_list from "./HabitList"
import Add_tast_form from "./Add_task_form"
import { useEffect } from "react"
import js from "@eslint/js"
import Search_field from "./Search_field"
const Habit_input = () => {

  const handleOnClick=(e)=>{
    console.dir(e.target.previousElementSibling.value)
  }



  const handleClick_Delete=(taskid)=>{
    
    setclassiclist((classic_list)=>{
      const newlist=classic_list.filter(habit=>habit.id !=taskid)
      return newlist
    })
    
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


  const [classic_list,setclassiclist]=useState(()=>{
    const has_habit=localStorage.getItem('habit')
    if (has_habit){
      return JSON.parse(has_habit)
    }
    return []
  })
  const [value,setvalue]=useState('')


 useEffect(()=>{
  localStorage.setItem('habit',JSON.stringify(classic_list))
 },[classic_list])
  

 const [search_item,set_searchitem]=useState('')
 

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
      <Search_field search_item={search_item} set_searchitem={set_searchitem}/>
      <Habit_list tasks={classic_list} onDeletehabit={handleClick_Delete} />
      <button className="btn_delete_all" onClick={Deleteall}>удалить все </button>
    </div>
  )
}
export default Habit_input