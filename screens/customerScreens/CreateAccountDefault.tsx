import React from 'react';
import { Text, View, TouchableOpacity, Platform, KeyboardAvoidingView } from 'react-native';
import { Checkbox, TextInput } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import styles from '../../styling/styles';
import signUpDefaultstyleForPicker from '../../styling/signUpDefaultPicker';
import { ScrollView } from 'react-native-gesture-handler';
import Validation from '../../functions/Validation';
import { showMessage } from 'react-native-flash-message';

class CreateAccountDefault extends React.Component {
  constructor(props) {
    super(props);
    const initalState = {
      firstName: '',
      lastName: '',
      phoneNum: '',
      contactPref: '',
      isChecked: false,

      validPhone: '',
      validFirstName: '',
      validLastName: '',

      errorFN: '',
      errorLN: '',
      errorPhoneNumber: '',
      errorPref: ''
    }
    this.state = initalState;
  }

  // Check whether a checkbox is selected or not
  checkCheckBox() {
    this.setState({ isChecked: this.state.isChecked })
  }

  // Verify that all the required fields are filled in
  checkForm() {
    let decision = false;

    if (!this.state.validFirstName || !this.state.validLastName
      || !this.state.validPhone || this.state.contactPref == "") {
      decision = false;

    }
    else {
      decision = true;
    }
    return decision;
  }

  render() {
    return (

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <View style={{ paddingTop: 20 }}>
            <Text style={styles.title}> Getting Started </Text>
            <View style={styles.checkBusinessView}>

              {/*Check Box*/}
              <Checkbox.Android
                color='#fcba03'
                value={this.state.isChecked}
                status={this.state.isChecked ? 'checked' : 'unchecked'}
                onPress={() => { this.checkCheckBox(); this.props.navigation.replace('CreateAccountBusiness') }}
              />
              <Text style={styles.isBusinessText}> I am creating an account {'\n'}for my business.</Text>
            </View>
          </View>

          <ScrollView>
            <View style={{ paddingHorizontal: 50 }}>
              {/*First Name*/}
              <TextInput
                style={styles.signUpTextInput}
                label="FIRST NAME"
                mode="outlined"
                theme={{ colors: { primary: '#0a0540' } }}
                spellCheck={false}
                onChangeText={firstName => this.setState(({ firstName: firstName }))}
                value={this.state.firstName}
                onBlur={() => { // Check if the input is valid
                  let errorMessage = Validation.validateName(this.state.firstName);

                  if (errorMessage == "") {
                    this.setState({ validFirstName: true });
                  } else {
                    this.setState({ errorFN: errorMessage, validFirstName: false });
                  }
                }}
                onFocus={() => { // When the field is tapped, remove the error message
                  this.setState(({ errorFN: "" }));
                }}
              />
              <Text style={styles.errorMessage}>{this.state.errorFN}</Text>

              {/*Last Name*/}
              <TextInput
                style={styles.signUpTextInput}
                label="LAST NAME"
                mode="outlined"
                theme={{ colors: { primary: '#0a0540' } }}
                spellCheck={false}
                onChangeText={lastName => this.setState(({ lastName: lastName }))}
                value={this.state.lastName}
                onBlur={() => { // Check if the input is valid
                  let errorMessage = Validation.validateName(this.state.lastName);

                  if (errorMessage == "") {
                    this.setState({ validLastName: true });
                  } else {
                    this.setState({ errorLN: errorMessage, validLastName: false });
                  }
                }}
                onFocus={() => { // When the field is tapped, remove the error message
                  this.setState(({ errorLN: "" }));
                }}
              />
              <Text style={styles.errorMessage}>{this.state.errorLN}</Text>

              {/*Phone Number*/}
              <TextInput
                style={styles.signUpTextInput}
                label="PHONE NUMBER"
                mode="outlined"
                theme={{ colors: { primary: '#0a0540' } }}
                placeholder="000-000-0000"
                keyboardType="number-pad"
                maxLength={12}

                onChangeText={(phoneNumber) => this.setState({ phoneNum: Validation.validatePhoneNumber(phoneNumber) })}
                value={this.state.phoneNum}
                onBlur={() => {
                  // Check if an error message needs to be displayed
                  var errorMessage = Validation.printPhoneNumErrorMessage(this.state.phoneNum);
                  if (errorMessage == "") {
                    this.setState({ validPhone: true });
                  } else {
                    this.setState({ errorPhoneNumber: errorMessage, validPhone: false });
                  }
                }}
                onFocus={() => { // When the field is tapped, remove the error message
                  this.setState(({ errorPhoneNumber: "" }));
                }}
              />
              <Text style={styles.errorMessage}>{this.state.errorPhoneNumber}</Text>

              {/*Select Contact Preference: email or phone*/}
              <Text style={styles.pickerTitle}>CONTACT PREFERENCE</Text>
              <View style={styles.viewAndroidOnly}>
                <RNPickerSelect
                  onValueChange={(contactPref) => this.setState({ contactPref: contactPref })}
                  placeholder={{ label: "Select your contact preference", value: '' }}
                  useNativeAndroidPickerStyle={false}
                  items={[
                    { label: "Email", value: 'email' },
                    { label: "Phone", value: 'phone' }]}
                  style={signUpDefaultstyleForPicker}
                  onClose={() => { // If the field is left blank, show an error message 
                    if (this.state.contactPref == "") {
                      this.setState(({ errorPref: "Required" }));
                    }
                  }}
                  onOpen={() => { // If the picker is open, remove the error message
                    this.setState(({ errorPref: "" }));
                  }}

                />
              </View>
              <Text style={styles.errorMessage}>{this.state.errorPref}</Text>

              {/*Next Button*/}
              <View style={{
                marginBottom: 30
              }} />

              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  var contactPforB = '';
                  if (this.state.contactPref == "email") {
                    contactPforB = 'E';
                  } else {
                    contactPforB = 'P';
                  }

                  if (this.checkForm()) { // Success
                    this.props.navigation.navigate('CreateAccountInfo',
                      {
                        accountType: 'customer',
                        firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        phoneNum: this.state.phoneNum.replace(/-/gi, ''),
                        contactPref: contactPforB
                      })
                  } else { // Error Message
                    showMessage({
                      message: `Error: Invalid Form. ${'\n'}${'\n'}Please fill in all the fields.`,
                      type: "danger",
                      autoHide: true,
                      duration: 2500,
                      backgroundColor: "#ff504a",
                      color: "#fafafa",
                      icon: "danger"
                    });
                  }
                }
                }
              >
                <Text style={{ color: '#fafafa', alignSelf: 'center' }}>Next</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

      </KeyboardAvoidingView >

    )
  }

}

export default CreateAccountDefault;