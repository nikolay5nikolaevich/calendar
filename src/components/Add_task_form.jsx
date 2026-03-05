const Add_tast_form=(props)=>{
    const {
        reset,
        setvalue,
        value1
    }=props
    return(
        <form onSubmit={reset} className="habitForm">

        <input
          type="text"
          placeholder="Habit name"
          value={value1}
          onChange={(e)=>setvalue(e.target.value)}
        />

        <button type="submit" >Add Habit</button>

      </form>
    )
}
export default Add_tast_form