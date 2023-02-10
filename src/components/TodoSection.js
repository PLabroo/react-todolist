// todo container component

const TodoSection = (props) => {
  const {
    handleSubmit,
    handleDelete,
    editable,
    todos,
    editTodo,
    newTask,
    setNewTask,
  } = props;
  return (
    <>
      <form action="POST" className="form-action" onSubmit={handleSubmit}>
        <div className="form-controls">
          <input
            type="text"
            placeholder="Enter The New Task To Be Finished"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button type="submit">{editable ? "EDIT" : "ADD"}</button>
        </div>
      </form>
      <div className="todos-container">
        {todos.map((todo, index) => {
          const { userId, id, title, completed } = todo;
          return (
            <div key={index} className="each-todo">
              <div className="title">
                <p
                  style={{
                    textDecoration: `${completed ? "line-through" : ""}`,
                    color: `${completed ? "#ccc" : ""}`,
                  }}
                >
                  {title}
                </p>
              </div>

              <div className="todo-actions">
                {completed ? (
                  ""
                ) : (
                  <span>
                    <i
                      id="edit"
                      class="fa-solid fa-pen-to-square"
                      onClick={() => editTodo(id)}
                    ></i>
                  </span>
                )}

                <span>
                  <i
                    id="trash"
                    class="fa-solid fa-trash"
                    onClick={() => handleDelete(id)}
                  ></i>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TodoSection;
