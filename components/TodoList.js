import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Button,
  Text,
  FlatList,
  ScrollView,
} from "react-native";

import TodoItem from "./TodoItem";
import Input from "./UI/Input";
import ProgressBar from "./ProgressBar";
import { updateTodoList } from "../API/todoAPI";

export default function TodoList(props) {
  const [todoData, setData] = useState(props.data);
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(
    todoData.filter((item) => item.done).length
  );

  const [todos, setTodos] = useState(todoData);
  const [todosSave, setTodosSave] = useState(todoData);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    setData(props.data);
    setTodos(props.data);
    setTodosSave(props.data);
    setCount(props.data.filter((item) => item.done).length);
    setTotal(props.data.length);
    setProgress(
      (props.data.filter((item) => item.done).length / props.data.length) * 100
    );
  }, [props.data]);

  const updateTasks = (id, done, token) => {
    setError("");
    updateTodoList(id, done, token)
      .then((data) => {
        setId(data.id);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const countDone = (done) => {
    if (done == false) {
      setCount(count + 1);
    } else {
      setCount(count - 1);
    }
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter((item) => item.id != id);
    const total = newTodos.length;
    const count = newTodos.filter((item) => item.done).length;
    setTodos(newTodos);
    setTodosSave(newTodos);
    setCount(count);
    setTotal(total);
    updateProgress(count, total);
  };

  const addNewTodo = (texte, id) => {
    const newTodos = [...todos, { id: id, title: texte, done: false }];
    setTodos(newTodos);
    setTodosSave(newTodos);
    const total = newTodos.length;
    setTotal(total);
    updateProgress(count, total);
  };

  const showInprocess = () => {
    setTodos(todosSave.filter((item) => item.done == false));
  };

  const showDone = () => {
    setTodos(todosSave.filter((item) => item.done == true));
  };

  const checkAll = () => {
    const newTodos = todosSave.map((item) => {
      updateTasks(item.id, true, props.token);
      item.done = true;
      return item;
    });
    const total = newTodos.length;
    const count = newTodos.filter((item) => item.done).length;
    setTodos(newTodos);
    setTodosSave(newTodos);
    setCount(count);
    updateProgress(count, total);
  };

  const uncheckAll = () => {
    const newTodos = todosSave.map((item) => {
      updateTasks(item.id, false, props.token);
      item.done = false;
      return item;
    });
    const total = newTodos.length;
    const count = newTodos.filter((item) => item.done).length;
    setTodos(newTodos);
    setTodosSave(newTodos);
    setCount(count);
    updateProgress(count, total);
  };

  const updateProgress = (count, total) => {
    setProgress((count / total) * 100);
  };

  return (
    <View style={styles.view}>
      <Text style={styles.titre}>My TodoList</Text>
      <View style={styles.filterButtonContent}>
        <Text style={{ paddingBottom: "10px" }}>Filtrer par : </Text>
        <View style={styles.filterButton}>
          <Button title="todos en cours" onPress={() => showInprocess()} />
          <Button title="todos faites" onPress={() => showDone()} />
          <Button title="tous les todos" onPress={() => setTodos(todosSave)} />
        </View>
      </View>

      <Input
        token={props.token}
        username={props.username}
        addNewTodo={addNewTodo}
      />

      <View style={styles.items}>
        <FlatList
          style={styles.liste}
          data={todos}
          nestedScrollEnabled={false}
          renderItem={({ item }) => (
            <TodoItem
              token={props.token}
              item={item}
              setCountDone={countDone}
              delete={deleteTodo}
              updateProgress={updateProgress}
              count={count}
              total={total}
            />
          )}
        />
      </View>

      <View style={styles.bottom}>
        <View style={styles.progress}>
          <ProgressBar count={count} total={total} progress={progress} />
          <Text style={{ alignSelf: "center", paddingBottom: "10px" }}>
            {count} items ont été réalisés
          </Text>
        </View>

        <View style={styles.filterButtonContent}>
          <Text style={{ paddingBottom: "10px" }}>Cocher/décocher :</Text>
          <View style={styles.checkButton}>
            <Button
              title="cocher toutes les todos"
              onPress={() => checkAll()}
            />
            <Button
              title="décocher toutes les todos"
              onPress={() => uncheckAll()}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    flex: 1,
  },
  titre: {
    alignSelf: "baseline",
    fontSize: "20px",
    padding: "10px",
    paddingBottom: "20px",
    paddingTop: "15px",
  },
  filterButtonContent: {
    display: "grid",
  },
  filterButton: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
  },
  checkButton: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
  },
  liste: {
    height: "200px",
  },
});
