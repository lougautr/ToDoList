import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Delete from './UI/Delete';

export default function UsersList(props){

    const [data, setData] = useState(props.data);

    useEffect(() => {
        setData(props.data);
    }, [props.data]);

    const deleteUser = (id)=> {
        const newListe = data.filter(item => item.id != id);
        setData(newListe);
      }

    return(
        <View>
        <FlatList
                data={data}
                renderItem={({ item }) => (
                    <View style={styles.users}>
                        <Text style={styles.Text}>{item.username}</Text>
                        <Delete token={props.token} id={item.id} choix={"user"} deleteFunction={deleteUser} username={item.username}/>
                        </View>
                )}
            />
        </View>
    )
} 

const styles = StyleSheet.create({
    users:{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
    },
    Text:{
        paddingRight : "8px",
        fontSize: 15,
    }

})