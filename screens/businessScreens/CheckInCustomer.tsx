import React from 'react';
import { Text, View, TouchableOpacity, Platform, KeyboardAvoidingView } from 'react-native';
import { TextInput, IconButton, Checkbox, Divider } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import styles from '../../styling/styles';
import signUpDefaultstyleForPicker from '../../styling/signUpDefaultPicker';
import { showMessage } from 'react-native-flash-message';
import { ScrollView } from 'react-native-gesture-handler';
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
            errorEmail: '',
            validPhone: ''
        }
        this.state = initalState;
    }

    // verify that all the required fields are filled in
    checkForm() {
        let decision = false;

        if (!this.state.validPhone || this.state.numPeople == '') {
            if (this.state.isChecked && this.state.custEmail == '') {
                decision = false;
            } else if (!this.stateisChecked) {
                decision = false;
            }
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
                <View style={styles.homeContainer}>
                    <IconButton
                        style={styles.closeButton}
                        icon="close"
                        size={35}
                        color={'black'}
                        onPress={() => { this.props.navigation.goBack() }}
                    ></IconButton>


                    <Text
                        style={{
                            fontSize: 30,
                            paddingHorizontal: Platform.OS === "ios" ? 70 : 50,
                            //paddingTop: 20,
                            paddingBottom: 20
                        }}
                    >
                        Customer Check-in
                    </Text>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.checkInContainer}>

                            {/*Select the number of people who came with the customer. 
                            At most 6 people, including the customer is allowed*/}
                            <Text style={{ marginTop: 5, marginBottom: -5, color: '#0a0540' }}>NUMBER OF PEOPLE</Text>
                            <Text style={{ marginTop: 5, marginBottom: 0, color: '#0a0540', fontSize: 11 }}>including the customer</Text>
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
                                    // Check if an error message needs to be displayed
                                    var errorMessage = Validation.printPhoneNumErrorMessage(this.state.phoneNum);
                                    if (errorMessage == "") {
                                        this.setState({ validPhone: true });
                                    } else {
                                        this.setState({ errorPhoneNumber: errorMessage, validPhone: false });
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
                                        } else if (this.state.custEmail.length <= 5 || /@\w+\.\w+/.test(this.state.custEmail) == false) {
                                            this.setState(() => ({ errorEmail: "Invalid" }));
                                        }
                                    }
                                }}
                                onFocus={() => {
                                    this.setState(() => ({ errorEmail: "" }));
                                }}
                            />
                            <Text style={{ color: 'red' }}>{this.state.errorEmail}</Text>

                            {/*The Confirm Button*/}
                            <View style={{ marginBottom: Platform.OS === "ios" ? 30 : 50 }} />
                            <TouchableOpacity
                                style={styles.button}

                                onPress={() => {

                                    if (this.checkForm()) {
                                        //Flash message
                                        showMessage({
                                            message: "Customer has been checked in!",
                                            type: "success",
                                            autoHide: true,
                                            duration: 700,
                                            backgroundColor: "#0a0540",
                                            color: "#fafafa",
                                            icon: "success"
                                        });
                                        this.props.navigation.goBack();
                                    } else {
                                        showMessage({
                                            message: "Error: Incomplete/Invalid Form. Please fill in all the fields.",
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
                                <Text style={{ color: '#fafafa', alignSelf: 'center' }}>Confirm</Text>
                            </TouchableOpacity>

                        </View>
                    </ScrollView>
                </View >
            </KeyboardAvoidingView>
        )
    }
}

export default CheckInCustomer;