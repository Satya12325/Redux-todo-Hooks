import { useEffect } from "react";
import {
  shallowEqual,
  shellowEqual,
  useDispatch,
  useSelector
} from "react-redux";
import { Link } from "react-router-dom";
import {
  getTodosFailure,
  getTodosRequest,
  getTodosSuccess,
  removeTodo,
  toggleTodo
} from "../Redux/action";

function TodoItem({ title, status, onDelete, id, onToggle }) {
  return (
    <div style={{ display: "flex", padding: "1rem", gap: "2rem" }}>
      <div>
        <Link to={`/todo/${id}`}>{title}</Link>
      </div>
      <div>{`${status}`}</div>
      <button onClick={() => onDelete(id)}>Delete</button>
      {/* <button onClick={()=>onToggle(id)}>Toggle</button> */}
    </div>
  );
}

function TotalIncompleted({ length }) {
  return (
    <div>
      <h1>{length}</h1>
    </div>
  );
}

export default function TodoList() {
  const { todo, isError, isLoading } = useSelector(
    (state) => state,
    shallowEqual
  );

  const dispatch = useDispatch();
  const getTodos = () => {
    const requestAction = getTodosRequest();
    dispatch(requestAction);
    return fetch(`https://json-server-mocker-masai.herokuapp.com/tasks`)
      .then((res) => res.json())
      .then((res) => {
        const succeessAction = getTodosSuccess(res);
        dispatch(succeessAction);
      })
      .catch((res) => {
        const failureAction = getTodosFailure();
        dispatch(failureAction);
      });
  };
  useEffect(() => {
    getTodos();
  }, []);

  const handleDelete = (id) => {
    const action = removeTodo(id);
    dispatch(action);
  };

  // toggle
  // const handleToggle = (id)=>{
  //   const action = toggleTodo(id);
  //   dispatch(action)
  // }
  var total = todo.filter((item) => item.status === false);

  return (
    <div>
      {isLoading && <h3>Loading...</h3>}
      {isError && <h3> Somthing went wrong</h3>}
      <div style={{ textAlign: "center" }}>
        <h1>Total Incomplete task: </h1>
        <TotalIncompleted length={total.length} />
      </div>
      {todo.map((item) => (
        <TodoItem
          key={item.id}
          {...item}
          onDelete={handleDelete}
          // onToggle={handleToggle}
        />
      ))}
    </div>
  );
}
