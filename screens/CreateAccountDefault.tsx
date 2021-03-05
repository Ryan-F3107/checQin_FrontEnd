import React from 'react';
import { Text, View, TouchableOpacity, Platform } from 'react-native';
import { Checkbox, TextInput } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import styles from '../styling/styles';
import signUpDefaultstyleForPicker from '../styling/signUpDefaultPicker';

import Validation from '../functions/Validation';

class CreateAccountDefault extends React.Component {
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
        <Text style={styles.title}> Getting Started </Text>
        <View style={styles.checkBusinessView}>

          <Checkbox.Android
            color='#fcba03'
            value={this.state.isChecked}
            status={this.state.isChecked ? 'checked' : 'unchecked'}
            onPress={() => { this.checkCheckBox(); this.props.navigation.replace('CreateAccountBusiness') }}
          />
          <Text style={styles.isBusinessText}> I am creating an account {'\n'}for my business.</Text>

        </View>
        <TextInput
          style={styles.signUpTextInput}
          label="FIRST NAME"
          mode="outlined"
          theme={{ colors: { primary: '#04074d' } }}
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
        <Text style={styles.errorMessage}>{this.state.errorFN}</Text>

        <TextInput
          style={styles.signUpTextInput}
          label="LAST NAME"
          mode="outlined"
          theme={{ colors: { primary: '#04074d' } }}
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
        <Text style={styles.errorMessage}>{this.state.errorLN}</Text>

        <TextInput
          style={styles.signUpTextInput}
          label="PHONE NUMBER"
          mode="outlined"
          theme={{ colors: { primary: '#04074d' } }}
          placeholder="000-000-0000"
          keyboardType="number-pad"
          maxLength={12}

          onChangeText={(phoneNumber) => this.setState({ phoneNum: Validation.validatePhoneNumber(phoneNumber) })}
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
        <Text style={styles.errorMessage}>{this.state.errorPhoneNumber}</Text>

        <View style={styles.viewAndroidOnly}>
          <Text style={{ marginTop: 5, marginBottom: -10, color: '#04074d' }}>CONTACT PREFERENCE</Text>
          <RNPickerSelect
            onValueChange={(contactPref) => this.setState({ contactPref: contactPref })}
            placeholder={{ label: "Select a contact preference", value: '' }}
            useNativeAndroidPickerStyle={false}
            items={[
              { label: "Email", value: 'email' },
              { label: "Phone", value: 'phone' }]}
            style={signUpDefaultstyleForPicker}
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
        </View>
        <Text style={styles.errorMessage}>{this.state.errorPref}</Text>

        <View style={{
          position: (Platform.OS === 'ios') ? "absolute" : "relative",
          bottom: (Platform.OS === 'ios') ? 230 : -30,
          alignSelf: 'center'
        }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate('CreateAccountInfo',
                {
                  accountType: 'customer',
                  firstName: this.state.firstName,
                  lastName: this.state.lastName,
                  phoneNum: this.state.phoneNum.replace(/-/gi, '')
                })
            }
            }
          //disabled={this.checkForm()}
          >
            <Text style={{ color: '#fafafa', alignSelf: 'center' }}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

}

export default CreateAccountDefault;