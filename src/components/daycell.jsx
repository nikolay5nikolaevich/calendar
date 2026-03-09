const Daysell=(props)=>{
    const {number_of_day,id}=props
    return (
        <div className="dayCell" id={id}>{number_of_day}</div>
    )
}
export default Daysell