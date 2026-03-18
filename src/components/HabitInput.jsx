import { useState , useRef} from "react";
import Add_tast_form from "./Add_task_form";

const Habit_input = (props) => {
  const { onAddhabit } = props;
  const [value, setvalue] = useState("");
  const inputRef=useRef(null)

  const stopreset = (e) => {
    e.preventDefault();
    inputRef.current.focus()
    onAddhabit(value);
    setvalue("");
  };

  return (
    <div className="left">
      <h2>Habits</h2>
      <p className="left_text">
        Add a habit here. It will appear in the table on the right.
      </p>

      <Add_tast_form reset={stopreset} value1={value} setvalue={setvalue} inputRef={inputRef} />
    </div>
  );
};

export default Habit_input;
