import { Animated, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
export default function ProgressBar(props) {
  const counter = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    load(props.progress)
  }, [props.progress]);

  const load = (value) => {
    Animated.timing(counter, {
      toValue: value,
      duration: 0,
      useNativeDriver: false,
    }).start();
  };

  const width = counter.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  })
  
  return (
      <View style={styles.progressBar}>
        <Animated.View style={{ ...StyleSheet.absoluteFill, backgroundColor: "#46FF33", width: width }}/>
      </View>
    
  );
}
const styles = StyleSheet.create({
  progressBar: {
   width: '200px',
   height: 40,
   backgroundColor: '#fff',
   borderWidth: 3,
   borderRadius: 8,
   borderColor: '#555',
   flexDirection:"row",
   alignSelf: "center",
 }
});
