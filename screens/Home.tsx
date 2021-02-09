import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

function Home({ navigation }) {
  return (
    <View style={styles.container}>
    <Text>First page of app -- App.tsx</Text>
    <Button
      title =  "Login"
      //onPress = {()=> Alert.alert("Button pressed")} 
    />
    <Button
      title =  "Sign Up"
      onPress = {()=> navigation.navigate('SignUpDefault')} 
    />
  </View>
  );
}

export default Home;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });