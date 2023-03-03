import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

import { TokenContext } from '../Context/Context'

export default function SignOut ({ navigation }) {
  return (
    <TokenContext.Consumer>
      {([token, setToken]) => (
        <View style={styles.container}>
          <Text style={styles.text}>Click on the button below to sign out</Text>
          <Button title='Sign me out' onPress={() => setToken(null)} />
        </View>
      )}
    </TokenContext.Consumer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }, text: {
    fontSize: "15px",
    paddingBottom: "10px",
  }
})

