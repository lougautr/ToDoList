import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, View} from 'react-native';
import { deleteTodoList, deleteUser } from "../../API/todoAPI";

export default function Delete(props) {

    const [error, setError] = useState("");

    const getDeleteTask = (token, id) => {
        setError("");
        deleteTodoList(id,token)
          .then(() => {
          })
          .catch((err) => {
            setError(err.message);
          });
      };

    const getDeleteUser = (token, id) => {
        setError("");
        deleteUser(id,token)
            .then(() => {
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    const deleteFunction = (token, id) => {
        if(props.choix == "todo"){
            getDeleteTask(token, id);
            props.deleteFunction(id);
        }else{
            if(props.username != "admin"){
                getDeleteUser(token, id);
                props.deleteFunction(id);
            }
        }
       
    }

    return (
        <View>
            <TouchableOpacity onPress={() => deleteFunction(props.token, props.id)}>
                <Image source={require('../../assets/trash-can-outline.png')} style={{ height: 24, width: 24 }} />
            </TouchableOpacity>
        </View>
    )

}

