import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { TextInput, IconButton, Checkbox, Divider } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import styles from '../../styling/styles';
import signUpDefaultstyleForPicker from '../../styling/signUpDefaultPicker';
import { showMessage } from 'react-native-flash-message';

import Validation from '../../functions/Validation';

class CheckInCustomer extends React.Component {
    constructor(props) {
        super(props);
        const initalState = {
            phoneNum: '',
            numPeople: '',
            isChecked: false,
            custEmail: '',
            num: 0,
            errorPhoneNumber: '',
            errorNumPeople: '',
            errorEmail: ''
        }
        this.state = initalState;
    }

    // verify that all the required fields are filled in
    checkForm() {
        let decision = false;

        if (this.state.phoneNum.length < 12 || this.state.numPeople == '') {
            if (this.state.isChecked && this.state.custEmail == '') {
                decision = true;
            } else if (!this.stateisChecked) {
                decision = true;
            }
        }
        else {
            decision = false;
        }
        return decision;

    }

    render() {
        return (
            <View style={styles.homeContainer}>
                <IconButton
                    style={styles.closeButton}
                    icon="close"
                    size={35}
                    color={'black'}
                    onPress={() => { this.props.navigation.goBack() }}
                ></IconButton>

                <View style={styles.checkInContainer}>
                    <Text style={styles.checkInTitle}> Customer Check in  </Text>

                    {/*Select the number of people who came with the customer. 
                      At most 6 people, including the customer is allowed*/}
                    <View style={styles.viewAndroidOnly}>
                        <Text style={{ marginTop: 5, marginBottom: -5, color: '#0a0540' }}>NUMBER OF PEOPLE</Text>
                        <Text style={{ marginTop: 5, marginBottom: -8, color: '#0a0540', fontSize: 11 }}>including the customer</Text>
                        <RNPickerSelect // Select the number of people 1-6
                            onValueChange={(numPeople) => this.setState({ numPeople: numPeople })}
                            placeholder={{ label: "Select the number", value: '' }}
                            useNativeAndroidPickerStyle={false}
                            items={[
                                { label: "1", value: '1' },
                                { label: "2", value: '2' },
                                { label: "3", value: '3' },
                                { label: "4", value: '4' },
                                { label: "5", value: '5' },
                                { label: "6", value: '6' }]}
                            style={signUpDefaultstyleForPicker}
                            onClose={() => {
                                if (this.state.numPeople == "") {
                                    this.setState(() => ({ errorNumPeople: "Required" }));
                                } else {
                                    this.setState(() => ({ errorNumPeople: "" }));
                                }
                            }}
                            onOpen={() => {
                                this.setState(() => ({ errorNumPeople: "" }));
                            }}

                        />
                    </View>
                    <Text style={styles.errorMessage}>{this.state.errorNumPeople}</Text>

                    {/*Phone number of the customer*/}
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
                            if (this.state.phoneNum == "") {
                                this.setState(() => ({ errorPhoneNumber: "Required" }));

                            } else if (this.state.phoneNum.length < 12) {

                                this.setState(() => ({ errorPhoneNumber: "Invalid" }));
                            }
                        }}
                        onFocus={() => {
                            this.setState(() => ({ errorPhoneNumber: "" }));
                        }}
                    />
                    <Text style={styles.errorMessage}>{this.state.errorPhoneNumber}</Text>

                    <Divider style={{ borderBottomWidth: 1.5, borderColor: 'grey', width: 300, alignSelf: 'center', marginTop: 30 }} />

                    {/*Check box. Whether a customer has an account with checQin or not*/}
                    <View style={styles.checkCheckInCustomer}>
                        <Checkbox.Android
                            value={this.state.isChecked}
                            color='#fcba03'
                            status={this.state.isChecked ? 'checked' : 'unchecked'}
                            onPress={() => {
                                this.setState({ isChecked: !this.state.isChecked }),
                                    this.setState({ errorEmail: "" })
                            }}
                            onPressOut={() => this.setState({ errorEmail: "" })}
                        />
                        <Text style={styles.checkInCustomerText}> Does a customer have an account? </Text>
                    </View>

                    {/*If the customer has an account, enter their email address*/}
                    <TextInput
                        style={styles.signUpTextInput}
                        label="EMAIL"
                        mode="outlined"
                        autoCapitalize='none'
                        placeholder="myemail@domain.com"
                        theme={{ colors: { primary: '#0a0540' } }}
                        disabled={this.state.isChecked == false}
                        onChangeText={custEmail => this.setState(() => ({ custEmail: custEmail }))}
                        value={this.state.custEmail}
                        onBlur={() => {
                            if (this.state.isChecked != false) {
                                if (this.state.custEmail == "") {
                                    this.setState(() => ({ errorEmail: "Required" }));
                                } else if (this.state.custEmail.length <= 5 || !this.state.custEmail.includes('@') && !this.state.custEmail.includes('.')) {
                                    this.setState(() => ({ errorEmail: "Invalid" }));
                                }
                            }
                        }}
                        onFocus={() => {
                            this.setState(() => ({ errorEmail: "" }));
                        }}
                    />
                    <Text style={{ color: 'red' }}>{this.state.errorEmail}</Text>

                    {/*the Confirm Button*/}
                    <View style={{ marginTop: 30 }}>
                        <TouchableOpacity
                            style={styles.button}
                            disabled={this.checkForm()}
                            onPress={() => { //Flash message 
                                showMessage({
                                    message: "Password changed!",
                                    type: "success",
                                    autoHide: true,
                                    duration: 700,
                                    backgroundColor: "#0a0540",
                                    description: "Password",
                                    color: "#fafafa",
                                    icon: "success"
                                });
                                this.props.navigation.goBack();
                            }}
                        >
                            <Text style={{ color: '#fafafa', alignSelf: 'center' }}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View >
        )
    }
}

export default CheckInCustomer;