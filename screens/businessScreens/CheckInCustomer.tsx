import React from 'react';
import { Text, View, TouchableOpacity, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import { TextInput, IconButton, Checkbox, Divider } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import styles from '../../styling/styles';
import signUpDefaultstyleForPicker from '../../styling/signUpDefaultPicker';
import { showMessage } from 'react-native-flash-message';
import { ScrollView } from 'react-native-gesture-handler';
import Validation from '../../functions/Validation';
import { serverAddress } from '../connectToBackend';
import AppName from '../../styling/AppName';
import moment from 'moment'; // TimeStamp

class CheckInCustomer extends React.Component {
    constructor(props) {
        super(props);
        const initalState = {
            phoneNum: '',
            numPeople: '',
            firstName: '',
            lastName: '',
            isChecked: false,
            custEmail: '',

            errorPhoneNumber: '',
            errorNumPeople: '',
            errorFN: '',
            errorLN: '',
            errorEmail: '',

            validPhone: '',
            validEmail: ''
        }
        this.state = initalState;
    }
    helpButton = () => {
        Alert.alert(
            `How to check in customers${"\n"}`,
            `The maximum number of people who can be checked in as one group is 6.${'\n'}${'\n'}If a customer has a ${AppName.appName()} account, click the checkbox and enter their email address.${'\n'}${'\n'}If a customer does not have a ${AppName.appName()} account, please enter their contact information under "FOR NON-${AppName.appName()} USER".${"\n"}${"\n"}${"\n"}*Please note that a customer is NOT creating their account with this form.`,
            [{
                text: 'Close',
            }]
        )
    }
    // verify that all the required fields are filled in
    checkForm() {
        let decision = false;

        if (this.state.numPeople == '') {
            decision = false;
        } else {
            if (this.state.isChecked && !this.state.validEmail) {
                decision = false;
            } else if (!this.state.isChecked && (!this.state.validPhone || this.state.firstName == '' || this.state.lastName == '')) {
                decision = false;
            } else {
                decision = true;
            }
        }
        return decision;
    }

    render() {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <View style={styles.homeContainer}>


                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                        {/*Help Button*/}
                        <IconButton
                            style={styles.helpButton}
                            icon="help-box"
                            size={35}
                            color={'lightblue'}
                            onPress={() => { this.helpButton() }}
                        ></IconButton>

                        {/*Close Button*/}
                        <IconButton
                            style={styles.closeButton}
                            icon="close"
                            size={35}
                            color={'black'}
                            onPress={() => { this.props.navigation.goBack() }}
                        ></IconButton>

                    </View>
                    <Text style={{ marginTop: -15, marginLeft: 22, fontSize: 12 }}>Help</Text>

                    <Text
                        style={{
                            fontSize: 30,
                            paddingHorizontal: 50,
                            paddingTop: 10,
                            paddingBottom: 20
                        }}
                    >
                        Customer Check-in
                    </Text>

                    <View style={{
                        flex: 1,
                        paddingHorizontal: 10,
                        backgroundColor: '#fafafa',
                        alignSelf: 'center'
                    }}>

                        <ScrollView>
                            <View style={styles.checkInContainer}>

                                {/*Select the number of people who came with the customer. 
                            At most 6 people, including the customer is allowed*/}
                                <Text style={{ fontSize: 15, marginTop: 5, marginBottom: -5, color: '#0a0540' }}>NUMBER OF PEOPLE</Text>
                                <Text style={{ marginTop: 6, marginBottom: 3, color: '#0a0540', fontSize: 11 }}>including the customer who is providing their information to this form.</Text>
                                <View style={styles.viewAndroidOnly}>
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
                                                this.setState({ errorNumPeople: "Required" });
                                            } else {
                                                this.setState({ errorNumPeople: "" });
                                            }
                                        }}
                                        onOpen={() => {
                                            this.setState({ errorNumPeople: "" });
                                        }}

                                    />
                                </View>
                                <Text style={styles.errorMessage}>{this.state.errorNumPeople}</Text>

                                <Divider style={{ borderBottomWidth: 1.5, borderColor: 'lightgrey', width: 350, alignSelf: 'center', marginTop: 15, marginBottom: 15 }} />

                                {/*Check box. Whether a customer has an account with checQin or not*/}
                                <View style={styles.checkCheckInCustomer}>
                                    <Checkbox.Android
                                        value={this.state.isChecked}
                                        color='#fcba03'
                                        status={this.state.isChecked ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            this.setState({ isChecked: !this.state.isChecked }),
                                                this.setState({ errorEmail: "", errorFN: "", errorLN: "", errorPhoneNumber: "" })
                                        }}
                                        onPressOut={() => this.setState({ errorEmail: "" })}
                                    />
                                    <Text style={styles.checkInCustomerText}> Does a customer have a {AppName.appName()} account? </Text>
                                </View>

                                {/*If the customer has an account, enter their email address*/}
                                <TextInput
                                    style={styles.signUpTextInput}
                                    label="EMAIL"
                                    mode="outlined"
                                    autoCapitalize='none'
                                    spellCheck={false}
                                    placeholder="myemail@domain.com"
                                    theme={{ colors: { primary: '#0a0540' } }}
                                    disabled={this.state.isChecked == false}
                                    onChangeText={custEmail => this.setState({ custEmail: custEmail })}
                                    value={this.state.custEmail}
                                    onBlur={() => { // Check if the email has the correct form. If not, display an error message
                                        if (this.state.isChecked != false) {
                                            var errorMessage = Validation.validateEmailAddress(this.state.custEmail);
                                            if (errorMessage == "") {
                                                this.setState({ validEmail: true });
                                            } else {
                                                this.setState({ errorEmail: errorMessage, validEmail: false });
                                            }
                                        }
                                    }}
                                    onFocus={() => {
                                        this.setState({ errorEmail: "" });
                                    }}
                                />
                                <Text style={styles.errorMessage}>{this.state.errorEmail}</Text>

                                <Divider style={{ borderBottomWidth: 1.5, borderColor: 'lightgrey', width: 350, alignSelf: 'center', marginTop: 15, marginBottom: 15 }} />

                                <Text style={{ fontSize: 15, marginLeft: -20, marginBottom: 5, color: '#0a0540' }}> FOR NON-{AppName.appName()} USER: </Text>
                                {/*First Name*/}
                                <TextInput
                                    style={styles.signUpTextInput}
                                    label="FIRST NAME"
                                    mode="outlined"
                                    spellCheck={false}
                                    theme={{ colors: { primary: '#0a0540' } }}
                                    disabled={this.state.isChecked == true}
                                    onChangeText={firstName => this.setState({ firstName: firstName })}
                                    value={this.state.firstName}
                                    onBlur={() => { // If the field is left blank, show an error message 
                                        if (this.state.firstName == "") {
                                            this.setState({ errorFN: "Required" });
                                        }
                                    }}
                                    onFocus={() => { // When the field is tapped, remove the error message
                                        this.setState({ errorFN: "" });
                                    }}
                                />
                                <Text style={styles.errorMessage}>{this.state.errorFN}</Text>

                                {/*Last Name*/}
                                <TextInput
                                    style={styles.signUpTextInput}
                                    label="LAST NAME"
                                    mode="outlined"
                                    spellCheck={false}
                                    theme={{ colors: { primary: '#0a0540' } }}
                                    disabled={this.state.isChecked == true}
                                    onChangeText={lastName => this.setState({ lastName: lastName })}
                                    value={this.state.lastName}
                                    onBlur={() => { // If the field is left blank, show an error message 
                                        if (this.state.lastName == "") {
                                            this.setState({ errorLN: "Required" });
                                        }
                                    }}
                                    onFocus={() => { // When the field is tapped, remove the error message
                                        this.setState({ errorLN: "" });
                                    }}
                                />
                                <Text style={styles.errorMessage}>{this.state.errorLN}</Text>

                                {/*Phone number of the customer*/}
                                <TextInput
                                    style={styles.signUpTextInput}
                                    label="PHONE NUMBER"
                                    mode="outlined"
                                    theme={{ colors: { primary: '#0a0540' } }}
                                    disabled={this.state.isChecked == true}
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
                                    onFocus={() => {
                                        this.setState({ errorPhoneNumber: "" });
                                    }}
                                />
                                <Text style={styles.errorMessage}>{this.state.errorPhoneNumber}</Text>

                                {/*The Confirm Button*/}
                                <View style={{ marginBottom: Platform.OS === "ios" ? 30 : 50 }} />
                                <TouchableOpacity
                                    style={styles.button}

                                    onPress={async () => {

                                        if (this.checkForm()) {
                                            var responseCode = 0;

                                            if (this.state.isChecked && this.state.validEmail) {
                                                var link = `${serverAddress}/checkin/visit/business_create_visit/`;

                                                let response = await fetch(link, {
                                                    method: 'POST',
                                                    headers: {
                                                        Authorization: 'Bearer ' + this.props.route.params.receivedUserInfo["access"],
                                                        Accept: 'application/json',
                                                        'Content-Type': 'application/json'
                                                    },
                                                    body: JSON.stringify({
                                                        dateTime: (moment().isDST()) ? moment().utcOffset('-04:00').format('YYYY-MM-DD HH:mm:ss') : moment().utcOffset('-05:00').format('YYYY-MM-DD HH:mm:ss'),
                                                        customer: this.state.custEmail,
                                                        business: this.props.route.params.receivedUserInfo["id"],
                                                        numVisitors: this.state.numPeople
                                                    })
                                                })
                                                responseCode = await response.status;

                                            } else {

                                                var link = `${serverAddress}/checkin/visit/business_create_unregistered_visit/`;

                                                let response = await fetch(link, {
                                                    method: 'POST',
                                                    headers: {
                                                        Authorization: 'Bearer ' + this.props.route.params.receivedUserInfo["access"],
                                                        Accept: 'application/json',
                                                        'Content-Type': 'application/json'
                                                    },
                                                    body: JSON.stringify({
                                                        dateTime: (moment().isDST()) ? moment().utcOffset('-04:00').format('YYYY-MM-DD HH:mm:ss') : moment().utcOffset('-05:00').format('YYYY-MM-DD HH:mm:ss'),
                                                        first_name: this.state.firstName,
                                                        last_name: this.state.lastName,
                                                        business: this.props.route.params.receivedUserInfo["id"],
                                                        phone_num: this.state.phoneNum.replace(/-/gi, ''),
                                                        numVisitors: this.state.numPeople

                                                    })
                                                })
                                                responseCode = await response.status;
                                            }

                                            // Check the response code from the backend

                                            if (responseCode == 201) {
                                                //Flash message
                                                showMessage({
                                                    message: "Checked in successfully!!",
                                                    type: "success",
                                                    autoHide: true,
                                                    duration: 2000,
                                                    backgroundColor: "#219903",
                                                    color: "#fafafa",
                                                    icon: "success"
                                                });
                                                this.props.navigation.goBack();
                                            } else if (responseCode == 400) {
                                                //Error Check-in message
                                                showMessage({
                                                    message: `Error: Check-in Failed. ${'\n'}${'\n'}Please try again.`,
                                                    type: "danger",
                                                    autoHide: true,
                                                    duration: 2000,
                                                    backgroundColor: "#0a0540",
                                                    color: "#fafafa",
                                                    icon: "danger"
                                                });
                                            } else if (responseCode == 500) {
                                                //Error message: Unregistered User
                                                showMessage({
                                                    message: `Error: Unregistered user. ${'\n'}${'\n'}Please enter customer's conact information.`,
                                                    type: "danger",
                                                    autoHide: true,
                                                    duration: 2500,
                                                    backgroundColor: "#ff504a",
                                                    color: "#fafafa",
                                                    icon: "danger"
                                                });
                                            }

                                        } else { //this.checkForm() == false
                                            showMessage({
                                                message: `Error: Incomplete/Invalid Form. ${'\n'}${'\n'}Please fill in all the fields.`,
                                                type: "danger",
                                                autoHide: true,
                                                duration: 2500,
                                                backgroundColor: "#ff504a",
                                                color: "#fafafa",
                                                icon: "danger"
                                            });
                                        }
                                    }}
                                >
                                    <Text style={{ color: '#fafafa', alignSelf: 'center' }}>Check In!</Text>
                                </TouchableOpacity>

                            </View>
                        </ScrollView>
                    </View >
                </View>
            </KeyboardAvoidingView>
        )
    }
}

export default CheckInCustomer;