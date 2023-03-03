import React, {useEffect, useState} from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { getUsers } from '../API/todoAPI';

import UsersList from '../components/UsersList';

export default function AdminScreen (props) {

    const [data, setData] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        if (data.length == 0) {
          users(props.token, setData);
        }
      }, [data]);
    
      const users = (token, setData) => {
        setError("");
        getUsers(token)
          .then((data) => {
            setData(data);
          })
          .catch((err) => {
            setError(err.message);
          });
      };
      
  return (
          <View>
            <Text style={styles.titre}>Liste des utilisateurs</Text>
            <UsersList data={data} token={props.token}/>
          </View>
        )
}

const styles = StyleSheet.create({
titre: {
  fontSize: 30,
  textAlign: "left",
  marginTop: 15,
  marginBottom: 20,
  marginLeft: 10,
},
});
