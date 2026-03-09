
import Habit_list_item from "./Habit_List_item"
import No_habits_list_item from "./No_Habit_List_item"
const Habit_list = (props) => {

  const { tasks,onDeletehabit,setclassiclist,search_item,set_searchitem}=props
 
  

  if (tasks.length==0) {
    return <No_habits_list_item />
  }
  else{
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
  }
export default Habit_list