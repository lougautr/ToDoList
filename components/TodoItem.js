import React, { useEffect, useState } from "react";
import { Image, View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import Delete from "./UI/Delete";
import Update from "./UI/Update";

export default function TodoItem(props) {
    const [done, setDone] = useState(props.item.done);

    useEffect(() => {
        setDone(props.item.done);
    }, [props.item.done]);

    const valueChange = (state) => {
        if(state == true){
            props.updateProgress(props.count-1, props.total);
        }else{
            props.updateProgress(props.count+1, props.total);
        }
        props.setCountDone(state);
        setDone(!state);
        props.item.done = !state;
    }

    return (
        <View style={styles.content}>
           <Update id={props.item.id} done={done} token={props.token} valueChange={valueChange}/>
            <Text style={[styles.text_item, { textDecorationLine: done ? 'line-through' : 'none' }]}>{props.item.title}</Text>
            <Delete token={props.token} id={props.item.id} deleteFunction ={props.delete} choix={"todo"} />
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        paddingBottom: "15px",
    },
    text_item: {
        marginLeft: 10,
        width: "115px",
    }
})