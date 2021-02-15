import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import styles from '../styling/styles';


function Start({ navigation }) {
  return (
    <View style={styles.startContainer}>
      <Image
        source={require('../logo/logoPlaceholder.png')}
        style={{ width: 250, height: 250, marginTop: 150, marginBottom: 100, resizeMode: 'contain' }} />

      <TouchableOpacity
        style={styles.signInBtn}
        onPress={() => { navigation.navigate('Login') }}
      >
        <Text style={{ fontSize: 20, padding: 10, paddingLeft: 60, paddingRight: 60, color: 'white', }}>Sign In</Text>
      </TouchableOpacity>


      <View style={{ marginTop: 30 }}>
        <TouchableOpacity
          style={styles.createAccountBtn}
          onPress={() => { navigation.navigate('CreateAccountDefault') }}
        >
          <Text style={{ fontSize: 20, padding: 10, color: '#04074d', }}>Create an Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Start;
