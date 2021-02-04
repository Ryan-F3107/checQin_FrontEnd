import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>First page of app -- App.tsx</Text>
      <Button
        title =  "Login"
        onPress = {()=> Alert.alert("Button pressed")} 
      />
      <Button
        title =  "Sign Up"
        onPress = {()=> Alert.alert("Button pressed")} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
