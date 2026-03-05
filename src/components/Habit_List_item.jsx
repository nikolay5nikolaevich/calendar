const Habit_list_item=(props)=>{
    console.log(props)
    const {
        className=props.className,
        id=props.id,
        active=props.active,
        task=props.name,
        deletehabit=props.delete,
        setclassiclist
    }=props
    
    return (
        <li className={`habit-list ${className} + ${active}`}
        id={id}
        >
            <p>{task}</p>
            <button onClick={()=>deletehabit(id)}>✕</button> 
        </li>
    )
}

export default Habit_list_item