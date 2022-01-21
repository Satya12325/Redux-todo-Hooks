export const getTodosRequest = () => {
  return {
    type: "GET_TODO_REQUEST",
    payload: {
      isLoading: true
    }
  };
};

export const getTodosSuccess = (todo) => {
  return {
    type: "GET_TODO_SUCCESS",
    payload: {
      todo: todo
    }
  };
};
export const addTodo = ({ title, status, id }) => {
  return {
    type: "ADD_TODO",
    payload: {
      title,
      status,
      id
    }
  };
};
export const removeTodo = (id) => ({
  type: "REMOVE_TODO_ITEM",
  payload: {
    id: id
  }
});

export const toggleTodo = (id) => ({
  type: "TOGGLE_TODO_STATUS",
  payload: {
    id: id
  }
});
