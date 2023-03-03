import React, { useEffect, useState } from "react";

import TodoList from "../components/TodoList";
import { getTodoLists } from "../API/todoAPI";

export default function TodoLists(props) {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [token, setToken] = useState(props.token);
  const [username, setUsername] = useState(props.username);

  useEffect(() => {
    if (data.length == 0) {
      getTodo(token, setData, username);
    }
  }, [data]);

  const getTodo = (token, setData, username) => {
    setError("");
    getTodoLists(username,token)
      .then((data) => {
        setData(data);
        return(data)
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return<TodoList data={data} token={token} username={username} rafraichir={getTodo}/>;
}