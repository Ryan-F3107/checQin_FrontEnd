import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Picker} from 'react-native';
import { Checkbox } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';

function SignUpDefault ({ navigation }) {
    const [isChecked, setChoice] = useState(false);

    return (
      <View style = {styles.container}>
          <Text style= {styles.title}> Sign Up</Text>
            <View style={{ flexDirection: "row", marginBottom: 5 }}>
            <Checkbox.Android
              color = '#fcba03'
              status={isChecked ? 'unchecked' : 'unchecked'}
              onPress={() => {setChoice(!isChecked); navigation.replace('SignUpBusiness')}}/>
            <Text style= {styles.isBusinessText}> I am creating an account for my business.</Text>
            </View>

            <Text style= {styles.labels}>FIRST NAME </Text>
            <TextInput style= {styles.textInput} placeholder = "Enter"/>

            <Text style= {styles.labels}>LAST NAME </Text>
            <TextInput style= {styles.textInput} placeholder = "Enter"/>

            <Text style= {styles.labels}>PHONE NUMBER </Text>
            <TextInput style= {styles.textInput} placeholder = "000-000-0000"/>

            <Text style={styles.labels}>CONTACT PREFERENCE </Text>
        
        {/* Need to replace console.log(preference)*/}
        
        <RNPickerSelect 
          onValueChange={(preference) => console.log(preference)}
          items={[
            { label: "Email", value: 'email' },
            { label: "Phone", value: 'phone' }]}
          style={styleForPicker}/>

            <TouchableOpacity style= {styles.button}>
              <Text>Next</Text>
            </TouchableOpacity>
            
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, padding: 70, paddingBottom: 20
  },
  title: {
    fontSize: 30,
    paddingBottom: 20,
    marginBottom: 30
  },
  labels: {
    fontSize: 15,
    paddingTop: 50,
    paddingBottom: 10,
  },
  textInput: {
    borderBottomColor: 'black',
    borderBottomWidth: 1
  },
  button: {
    alignSelf: 'center',
    backgroundColor: 'yellow',
    padding: 10,
    marginTop: 20,
    marginBottom: 30
  },
  isBusinessText: {
    paddingTop: 8,
  }
})

const styleForPicker = StyleSheet.create({
  inputIOS: {
    borderBottomWidth: 1,
    borderColor: 'black'
  },
  inputAndroid: {
    borderBottomWidth: 1,
    borderColor: 'black'
  }
})

export default SignUpDefault;