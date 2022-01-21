import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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
      <div>{title}</div>
      <div>{`${status}`}</div>
      <button onClick={() => onToggle(id)}>Toggle Status</button>
    </div>
  );
}

export default function EditTodo() {
  const { todo, isError, isLoading } = useSelector(
    (state) => state,
    shallowEqual
  );

  const { id } = useParams();
  const dispatch = useDispatch();
  const getTodos = (id) => {
    const requestAction = getTodosRequest();
    dispatch(requestAction);
    return fetch(`https://json-server-mocker-masai.herokuapp.com/tasks/${id}`)
      .then((res) => res.json())
      .then((res) => {
        const sucessAction = getTodosSuccess(res);
        dispatch(sucessAction);
      })
      .catch((err) => {
        const failureAction = getTodosFailure();
        dispatch(failureAction);
      });
  };

  useEffect(() => {
    getTodos(id);
  }, [id]);

  const handleToggle = (id) => {
    const action = toggleTodo(id);
    dispatch(action);
  };
  return (
    <div>
      {isLoading && <h3>...Looding</h3>}
      {isError && <h3>Something want wrong</h3>}
      <div>
        <TodoItem key={id} {...todo} onToggle={handleToggle} />
      </div>
    </div>
  );
}
