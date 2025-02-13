import { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";
import {
  BsCircleFill,
  BsFillCheckCircleFill,
  BsFillTrashFill,
} from "react-icons/bs";

function Home() {
  const [todos, setTodos] = useState([]);

  // Fetch data when component mounts
  useEffect(() => {
    axios
      .get("http://localhost:3001/get")
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
  }, []);

  // Toggle completion status
  const handleEdit = (id) => {
    axios
      .put(`http://localhost:3001/update/${id}`)
      // eslint-disable-next-line no-unused-vars
      .then((result) => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === id ? { ...todo, done: !todo.done } : todo
          )
        );
      })
      .catch((err) => console.log(err));
  };

  // Delete task
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/delete/${id}`)
      .then(() => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="home">
      <h2> Todo list</h2>
      <Create />
      {todos.length === 0 ? (
        <h2>No Records</h2>
      ) : (
        todos.map((todo, index) => (
          <div className="task" key={index}>
            <div className="checkbox" onClick={() => handleEdit(todo._id)}>
              {todo.done ? (
                <BsFillCheckCircleFill className="icon" />
              ) : (
                <BsCircleFill className="icon" />
              )}
              <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
            </div>
            <div>
              <span>
                <BsFillTrashFill
                  className="icon"
                  onClick={() => handleDelete(todo._id)}
                />
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;

// import { useEffect, useState } from "react";
// import Create from "./Create";
// import axios from "axios";
// import {
//   BsCircleFill,
//   BsFillCheckCircleFill,
//   BsFillTrashFill,
// } from "react-icons/bs";

// function Home() {
//   // we have use use state hooks
//   const [todos, setTodos] = useState([]); // empty array
//   useEffect(() => {
//     axios
//       .get("http://localhost:3001/get")
//       .then((result) => setTodos(result.data))
//       .catch((err) => console.log(err));
//   }, []);

//   const handleEdit = (id) => {
//     axios
//       .put("http://localhost:3001/update/" + id)
//       .then((result) => {
//         location.reload();
//       })
//       .catch((err) => console.log(err));
//   };
//   const handleDelete = (id) => {
//     axios
//       .put("http://localhost:3001/delete/" + id)
//       .then((result) => {
//         location.reload();
//       })
//       .catch((err) => console.log(err));
//   };
//   return (
//     <div className="home">
//       <h2> Todo list</h2>
//       <Create />
//       {todos.length === 0 ? (
//         <div>
//           {" "}
//           <h2> No Records</h2>
//         </div>
//       ) : (
//         todos.map((todos, index) => (
//           <div className="task" key={index}>
//             <div className="checkbox" onClick={() => handleEdit(todos._id)}>
//               {todos.done ? (
//                 <BsFillCheckCircleFill className="icon"></BsFillCheckCircleFill>
//               ) : (
//                 <BsCircleFill className="icon"></BsCircleFill>
//               )}
//               <BsCircleFill className="icon" />
//               <p className={todos.done ? "line_through" : ""}> {todos.task} </p>
//             </div>
//             <div>
//               <span>
//                 <BsFillTrashFill
//                   className="icon"
//                   onClick={() => handleDelete(todos._id)}
//                 />
//               </span>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default Home;
