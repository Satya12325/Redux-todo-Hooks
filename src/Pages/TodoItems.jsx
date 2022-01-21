import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function TodoItem({ title, status, id }) {
  return (
    <div style={{ display: "flex", padding: "1rem", gap: "2rem" }}>
      <dir>{title}</dir>
      <div>{`${status}`}</div>
      <dir>
        <Link to={`/todo/${id}/edit`}>Edit Btn</Link>
      </dir>
    </div>
  );
}
const getUsersById = (id) => {
  return axios.get(
    "https://json-server-mocker-masai.herokuapp.com/tasks/" + id
  );
};

// hooks

export default function TodoItems() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const isMounted = useRef(null);

  const handleGetUser = async () => {
    try {
      setIsLoading(true);
      const { data } = await getUsersById(id);
      if (!isMounted.current) {
        return;
      }
      setData(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleGetUser();
    if (!isMounted.current) {
      isMounted.current = true;
    }
    return () => {
      isMounted.current = false;
    };
  }, [id]);

  if (isLoading) return <div>...loading</div>;
  console.log(data);
  return (
    <div>
      <h3>User ID: {id}</h3>
      <TodoItem id={id} title={data.title} status={data.status} />
    </div>
  );
}
