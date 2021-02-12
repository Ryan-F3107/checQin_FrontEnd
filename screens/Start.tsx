import React from 'react';
import { Text, View, Button } from 'react-native';
import styles from '../styling/styles';
function Start({ navigation }) {
  return (
    <View style={styles.startContainer}>
      <Text>First page of app -- App.tsx</Text>
      <Button
        title="Login"
      //onPress = {()=> Alert.alert("Button pressed")} 
      />
      <Button
        title="Sign Up"
        onPress={() => navigation.navigate('SignUpDefault')}
      />
    </View>
  );
}

export default Start;
