import { useEffect, useState } from "react";
import { BASE_URL } from "./api";

// importing spinner from library
import GridLoader from "react-spinners/GridLoader";
// importing todo section component
import TodoSection from "./components/TodoSection";

// main app component
const App = () => {
  // useState hook for setting up states
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editable, setEditable] = useState(false);
  const [editID, setEditID] = useState(false);

  // fetching todos from api
  const fetchTodos = async () => {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    console.log(data);
    setTodos(data);
    setLoading(false);
  };

  // useEffect hook to deal with api
  useEffect(() => {
    setTimeout(() => {
      fetchTodos();
    }, 3000);
  }, []);

  // handling POST & PUT request
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newTask && editable) {
      const response = await fetch(BASE_URL + editID, {
        method: "PUT",
        body: JSON.stringify({
          title: newTask,
          completed: false,
          userId: 1,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await response.json();
      data.id = Date.now();
      console.log(data);
      setTodos(
        todos.map((item) => {
          if (item.id === editID) {
            return { ...todos, title: newTask };
          }
          return item;
        })
      );

      setNewTask("");
      setEditable(false);
    } else {
      const response = await fetch(BASE_URL, {
        method: "POST",
        body: JSON.stringify({
          // id: new Date().getTime(),
          title: newTask,
          completed: false,
          userId: 1,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await response.json();
      data.id = Date.now();
      setNewTask("");
      setTodos([data, ...todos]);
    }
  };

  // handling DELETE request(deleting todo)
  const handleDelete = async (id) => {
    console.log(id);
    const newTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(newTodos);
    const response = await fetch(BASE_URL + "1", {
      method: "DELETE",
    });
  };

  // editing todo
  const editTodo = (id) => {
    const findItem = todos.find((item) => item.id === id);
    setNewTask(findItem.title);
    setEditable(true);
    setEditID(id);
  };

  // main component
  return (
    <div className="container">
      <h1>TODO LIST APP</h1>

      {loading ? (
        <GridLoader
          style={{ position: "absolute", left: "45%", top: "45%" }}
          color={"black"}
          loading={loading}
          size={8}
          margin={9}
        />
      ) : (
        <TodoSection
          todos={todos}
          setNewTask={setNewTask}
          newTask={newTask}
          editable={editable}
          handleSubmit={handleSubmit}
          editTodo={editTodo}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default App;
