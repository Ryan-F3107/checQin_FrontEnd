import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import styles from '../styling/styles';

function Start({ navigation }) {
  return (
    <View style={styles.startContainer}>

      {/*App Logo image */}
      <Image
        source={require('../logo/colourL.png')}
        style={{ width: 250, height: 250, marginTop: 150, marginBottom: 100, resizeMode: 'contain' }} />

      {/*Login Button*/}
      <TouchableOpacity
        style={styles.signInBtn}
        onPress={() => { navigation.navigate('Login') }}
      >
        <Text style={{ fontSize: 20, padding: 10, paddingLeft: 60, paddingRight: 60, color: 'white', }}>Sign In</Text>
      </TouchableOpacity>

      {/*Forgot password? Button*/}
      <TouchableOpacity
        //style={styles.signInBtn}
        onPress={() => { navigation.navigate('ResetPassword') }}
      >
        <Text style={{ fontSize: 15, paddingTop: 20, padding: 10, paddingLeft: 60, paddingRight: 60, color: '#0a0540' }}>Forgot Password?</Text>
      </TouchableOpacity>

      {/*Create Account Button */}
      <View style={{ marginTop: 30 }}>
        <TouchableOpacity
          style={styles.createAccountBtn}
          onPress={() => { navigation.navigate('CreateAccountDefault') }}
        >
          <Text style={{ fontSize: 20, padding: 10, color: '#0a0540', }}>Create an Account</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

export default Start;
