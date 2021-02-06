import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Picker} from 'react-native';
import { Checkbox } from 'react-native-paper';


function SignUpBusiness({ navigation }) { 

    const [isChecked, setChoice] = useState(false);

    /*var i = 0;
    const validatePhoneNumber = digit => {

        let numreg = /^[0-9]+$/;
        if (numreg.test(digit)) {
            i++;
            if (i == 3 || i == 6 ) {
                console.log("Mod");
            }
        } else {
           //this.setState({ dig:  digit.replace(/[^0-9]/g , '') });
        }
    };*/

    return (
      <View style = {styles.container}>
          <Text style= {styles.title}> Sign Up Business</Text>
            <View style={{ flexDirection: "row", marginBottom: 5 }}>
            <Checkbox.Android
                    color='#fcba03'
                    
              status={isChecked ? 'unchecked': 'checked' }
              onPress={() => {setChoice(!isChecked); navigation.replace('SignUpDefault')}}/>
            <Text style= {styles.isBusinessText}> I am creating an account for my business.</Text>
            </View>

            <Text style= {styles.labels}>BUSINESS NAME </Text>
            <TextInput style= {styles.textInput} placeholder = "Enter"/>

            <Text style= {styles.labels}>PHONE NUMBER </Text>
            <TextInput style={styles.textInput}
                placeholder="000-000-0000"
                keyboardType='numeric'
                //onChangeText={(text) => validatePhoneNumber(text)}
                maxLength={10}/>

            <Text style={styles.labels}>ADDRESS </Text>
            <Text style={styles.labelAddress}> > STREET </Text>
            <TextInput style={styles.textInput} placeholder="Enter" />
            <Text style={styles.labelAddress}> > CITY </Text>
            <TextInput style={styles.textInput} placeholder="Enter" />
            <Text style={styles.labelAddress}> > POSTAL CODE </Text>
            <TextInput style={styles.textInput} placeholder="A1B 2C3" />

            <Text style= {styles.labels}>CAPACITY </Text>
            <TextInput style= {styles.textInput} placeholder = "Enter"/>
            
            <TouchableOpacity style= {styles.button}>
              <Text>Next</Text>
            </TouchableOpacity>
            
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
        padding: 70,
        paddingBottom: 20
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
    labelAddress: {
        fontSize: 12,
        paddingTop: 15,
        paddingBottom: 7,
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

export default SignUpBusiness;