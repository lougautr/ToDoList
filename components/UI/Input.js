import React, {useState, useEffect} from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { addTodoList } from "../../API/todoAPI";
import { IconButton } from 'react-native-paper';


export default function Input(props) {
    const [newTodoText, setNewTodoText] = useState("");
    const [token, setToken] = useState(props.token);
    const [username, setUsername] = useState(props.username);
    const [error, setError] = useState("");
    const [id, setId] = useState("");

    const getNewTask = (token, username, title) => {
        setError("");
        addTodoList(title, username,token)
          .then((data) => {
            setId(data.id);
          })
          .catch((err) => {
            setError(err.message);
          });
      };
     
      const addTodo = () => {
        getNewTask(token, username, newTodoText);
      };

      useEffect(() => {
        if (id != "") {
          props.addNewTodo(newTodoText, id);
          setNewTodoText("");
        }
      }, [id]);

      const button = () => (
        <IconButton
          icon="camera"
          iconColor={MD3Colors.error50}
          size={20}
          onPress={() => console.log('Pressed')}
        />
      );

      

    return (
        <View style={styles.container}>
            <TextInput
                style={{ width: "150px" }}
                onChangeText={setNewTodoText}
                placeholder="saisir ici un nouvel item"
                onSubmitEditing={addTodo}
                value={newTodoText}
            />
            <IconButton icon="plus-circle" iconColor="#2280F0" size={20} onPress={addTodo} />
            </View>
    )
}

   const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            paddingTop: "10px",
        },
    })

