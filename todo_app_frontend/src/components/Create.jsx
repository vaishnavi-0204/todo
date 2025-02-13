import { useState } from "react";
import axios from "axios";

function Create() {
  const [task, setTask] = useState("");

  const handleAdd = () => {
    if (!task.trim()) {
      alert("Task cannot be empty!");
      return;
    }

    axios
      .post("http://localhost:3001/add", { task: task })
      .then((result) => {
        console.log("Response from server:", result);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="create_form">
      <input
        type="text"
        placeholder="Enter Your Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="button" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}

export default Create;

// import { useState } from "react";
// import axios from "axios";

// function Create() {
//   const [task, setTask] = useState();
//   const handleAdd = () => {
//     axios
//       .post("http://localhost:3001/add", { task: task })
//       .then((result) => {
//         location.reload();
//       })
//       .catch((err) => console.log(err));
//   };
//   return (
//     <div className="create_form">
//       <input
//         type="text"
//         name=""
//         id=""
//         placeholder="Enter Your Task"
//         onChange={(e) => setTask(e.target.value)}
//       ></input>
//       <button type="button" id="" onClick={handleAdd}>
//         Add
//       </button>
//     </div>
//   );
// }

// export default Create;
