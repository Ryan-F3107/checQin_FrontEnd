import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Checkbox, TextInput } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';

class SignUpDefault extends React.Component {
  constructor(props) {
    super(props);
    const initalState = {
      firstName: '',
      lastName: '',
      phoneNum: '',
      contactPref: '',
      isChecked: false,
      errorFN: '',
      errorLN: '',
      errorPhoneNumber: '',
      errorPref: '',
    }
    this.state = initalState;
  }

  validatePhoneNumber(numInputs) {
    if (numInputs.length == 3 || numInputs.length == 7) {
      numInputs = numInputs + "-"
    } else if (numInputs.charAt(numInputs.length - 1) == "-" && numInputs.charAt(numInputs.length - 2) == "-") {
      numInputs = numInputs.slice(0, -2)
    } else if (numInputs.charAt(numInputs.length - 1) == "-") {
      numInputs = numInputs.slice(0, -1)
    }
    this.setState({ phoneNum: numInputs });
  }

  checkCheckBox() {
    this.setState({ isChecked: this.state.isChecked })
  }

  checkForm() {
    let decision = false;

    if (this.state.firstName == "" || this.state.lastName == ""
      || this.state.phoneNum.length < 12 || this.state.contactPref == "") {
      decision = true
    }
    else {
      decision = false
    }
    return decision
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> Sign Up</Text>
        <View style={{ flexDirection: "row", marginBottom: 5 }}>

          <Checkbox.Android
            color='#fcba03'
            value={this.state.isChecked}
            status={this.state.isChecked ? 'checked' : 'unchecked'}
            onPress={() => { this.checkCheckBox(); this.props.navigation.replace('SignUpBusiness') }}
          />
          <Text style={styles.isBusinessText}> I am creating an account for my business.</Text>

        </View>
        <TextInput
          style={styles.textInput}
          label="FIRST NAME"
          mode="outlined"
          theme={{ colors: { primary: 'blue' } }}
          onChangeText={firstName => this.setState(() => ({ firstName: firstName }))}
          value={this.state.firstName}
          onBlur={() => {
            if (this.state.firstName == "") {
              this.setState(() => ({ errorFN: "Required" }))
            }
          }}
          onFocus={() => {
            this.setState(() => ({ errorFN: "" }))
          }}
        />
        <Text style={{ color: 'red' }}>{this.state.errorFN}</Text>

        <TextInput
          style={styles.textInput}
          label="LAST NAME"
          mode="outlined"
          theme={{ colors: { primary: 'blue' } }}
          onChangeText={lastName => this.setState(() => ({ lastName: lastName }))}
          value={this.state.lastName}
          onBlur={() => {
            if (this.state.lastName == "") {
              this.setState(() => ({ errorLN: "Required" }))
            }
          }}
          onFocus={() => {
            this.setState(() => ({ errorLN: "" }))
          }}
        />
        <Text style={{ color: 'red' }}>{this.state.errorLN}</Text>

        <TextInput
          style={styles.textInput}
          label="PHONE NUMBER"
          mode="outlined"
          theme={{ colors: { primary: 'blue' } }}
          placeholder="000-000-0000"
          keyboardType="number-pad"
          maxLength={12}

          onChangeText={(phoneNumber) => this.validatePhoneNumber(phoneNumber)}
          value={this.state.phoneNum}
          onBlur={() => {
            if (this.state.phoneNum == "") {
              this.setState(() => ({ errorPhoneNumber: "Required" }))

            } else if (this.state.phoneNum.length < 12) {

              this.setState(() => ({ errorPhoneNumber: "Invalid" }))
            }
          }}
          onFocus={() => {
            this.setState(() => ({ errorPhoneNumber: "" }))
          }}
        />
        <Text style={{ color: 'red' }}>{this.state.errorPhoneNumber}</Text>

        <RNPickerSelect
          onValueChange={(contactPref) => this.setState({ contactPref: contactPref })}
          placeholder={{ label: "CONTACT PREFERENCE", value: '' }}
          items={[
            { label: "Email", value: 'email' },
            { label: "Phone", value: 'phone' }]}
          style={styleForPicker}
          onClose={() => {
            if (this.state.contactPref == "") {
              console.log(this.state.contactPref)
              this.setState(() => ({ errorPref: "Required" }))
            } else {
              this.setState(() => ({ errorPref: "" }))
            }
          }}
          onOpen={() => {
            this.setState(() => ({ errorPref: "" }))
          }}

        />
        <Text style={{ color: 'red' }}>{this.state.errorPref}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => { this.props.navigation.navigate('CreateAccount') }}
        //disabled={this.checkForm()}
        >
          <Text style={{ color: 'white', alignSelf: 'center' }}>Next</Text>
        </TouchableOpacity>

      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 70,
    paddingBottom: 20,
    backgroundColor: 'white'
  },
  title: {
    fontSize: 30,
    paddingTop: 50,
    paddingBottom: 20,
    marginBottom: 20
  },
  textInput: {
    paddingTop: 5,
    backgroundColor: 'white',
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#0a0540',
    padding: 15,
    width: 90,
    marginTop: 20,
    marginBottom: 30,
    borderRadius: 25,
    shadowColor: 'rgba(1, 1, 1, 0.25)',
    shadowOpacity: 0.9,
    shadowRadius: 13,
    shadowOffset: { width: 1, height: 10 }
  },
  isBusinessText: {
    paddingTop: 8
  }
})

const styleForPicker = StyleSheet.create({
  inputIOS: {
    fontSize: 17,
    marginTop: 10,
    paddingTop: 19,
    paddingLeft: 10,
    paddingBottom: 19,
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: 'white',
    borderColor: 'grey'
  },
  inputAndroid: {
    fontSize: 17,
    marginTop: 10,
    paddingTop: 19,
    paddingLeft: 10,
    paddingBottom: 19,
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: 'white',
    borderColor: 'grey'
  }
})

export default SignUpDefault;