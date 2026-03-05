const habits_item1 = true
import Habit_list_item from "./Habit_List_item"
import No_habits_list_item from "./No_Habit_List_item"
const Habit_list = (props) => {

  const { tasks,onDeletehabit,setclassiclist}=props
 
  

  if (!habits_item1) {
    return <No_habits_list_item />
  }
  return (
    <ul className="habit-list">
      {tasks.map((task)=>{

        return <Habit_list_item  className={task.className}
        key={task.id}
        id={task.id}
        active={task.active}
        name={task.name}
        delete={onDeletehabit}
        setclassiclist={setclassiclist}
        
        />
      })}
    </ul>)
}
export default Habit_list