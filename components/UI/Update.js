import { updateTodoList } from "../../API/todoAPI";
import React, { useState, useEffect } from "react";
import { View, Switch} from "react-native";

export default function Update(props) {
    const [error, setError] = useState("");

    const updateTasks = (id, done, token) => {
        setError("");
        updateTodoList(id, done, token)
          .then((data) => {
            setId(data.id);
          })
          .catch((err) => {
            setError(err.message);
          });
      }

      const updateTodo = () => {
        updateTasks(props.id, !props.done, props.token);
        props.valueChange(props.done);
      }

      return(
      <View>
            <Switch value={props.done} onValueChange={() => updateTodo()} />
      </View>
      )
}