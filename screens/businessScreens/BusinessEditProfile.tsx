import React from 'react';

import styles from '../../styling/styles';
import styleMenu from '../../styling/optionStyling';
import stylePicker from '../../styling/pickerStyle';

import { serverAddress } from '../connectToBackend';
import { View, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { TextInput, IconButton } from 'react-native-paper';
import Validation from '../../functions/Validation';
import RNPickerSelect from 'react-native-picker-select';
import { ScrollView } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';

class BusinessEditProfile extends React.Component {
    constructor(props) {
        super(props);
        this.getInfo();
        const initialState = {
            email: '',
            newEmail: '',
            validEmail: '',

            businessName: '',
            newBusinessName: '',
            validBusinessName: '',
            errorBusiness: '',

            phoneNumber: '',
            newPhoneNumber: '',
            validPhone: '',
            errorPhoneNumber: '',

            capacity: '',
            newCapacity: '',
            errorCapacity: '',

            street: '',
            newStreet: '',
            validStreet: '',
            errorStreet: '',

            city: '',
            newCity: '',
            validCity: '',
            errorCity: '',

            postalCode: '',
            validPostalCode: '',
            newPostalCode: '',
            errorPostalCode: '',

            province: '',
            errorProvince: '',

            emailToBackend: '',
            businessNameToBackend: '',
            phoneNumberToBackend: '',
            capacityToBackend: '',
            streetToBackend: '',
            cityToBackend: '',
            postalCodeToBackend: '',
            provinceToBackend: '',

        }   //end of initial State
        this.state = initialState
    }   //end of constructor

    // Verify that the entered postal code has the correct form
    validatePostalCode(newPostalCode) {

        // if-else statements to automatically put a space after the 3rd digit 
        if (newPostalCode.charAt(newPostalCode.length - 1) == " ") {
            newPostalCode = newPostalCode.slice(0, -1)

        } else if (newPostalCode.length == 4) {
            var last = newPostalCode.charAt(newPostalCode.length - 1)
            newPostalCode = newPostalCode.substring(0, 3) + " " + last

        }

        // The length here is 7 because of a space in the middle 
        // Based on postal code rules, referenced from: https://en.wikipedia.org/wiki/Postal_codes_in_Canada

        if (newPostalCode.length == 7) {
            if (/[^ABCEGHJKLMNPRSTVXY]/g.test(newPostalCode.charAt(0))
                || /[^0-9]/g.test(newPostalCode.charAt(1))
                || /[^ABCEGHJKLMNPRSTVXYWZ]/g.test(newPostalCode.charAt(2))
                || /\s/g.test(newPostalCode.charAt(3)) == false
                || /[^0-9]/g.test(newPostalCode.charAt(4))
                || /[^ABCEGHJKLMNPRSTVXYWZ]/g.test(newPostalCode.charAt(5))
                || /[^0-9]/g.test(newPostalCode.charAt(6))) {

                this.setState({ errorPostalCode: "Invalid", validPostalCode: false });

            } else {
                this.setState({ errorPostalCode: "", validPostalCode: true });
            }
        } else {
            this.setState({ errorPostalCode: "", validPostalCode: true });
        }
        this.setState({ newPostalCode: newPostalCode });
    }

    /*
        Function to retrieve info of business, using a GET request endpoint to backend
    */
    async getInfo() {
        let link = `${serverAddress}/checkin/business/` + this.props.route.params.receivedUserInfo["id"] + "/";

        let response = await fetch(link, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.props.route.params.receivedUserInfo["access"],
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })  //end of response fetch promise
        response = await response.json();

        let formattedPhone = response["phone_num"].slice(0, 3) + "-" + response["phone_num"].slice(3, 6) + "-" + response["phone_num"].slice(6, response["phone_num"].length);

        this.setState(() => ({ email: response["user"]["email"], emailToBackend: response["user"]["email"], validEmail: true }));
        this.setState(() => ({ businessName: response["name"], businessNameToBackend: response["name"], validBusinessName: true }));
        this.setState(() => ({ phoneNumber: formattedPhone, phoneNumberToBackend: formattedPhone, validPhone: true }));

        //Address
        this.setState(() => ({ street: response["street_address"], streetToBackend: response["street_address"], validStreet: true }));
        this.setState(() => ({ city: response["city"], cityToBackend: response["city"], validCity: true }));
        this.setState(() => ({ province: response["province"], provinceToBackend: response["province"] }));
        this.setState(() => ({ postalCode: response["postal_code"], postalCodeToBackend: response["postal_code"], validPostalCode: true }));
        this.setState(() => ({ capacity: response["capacity"].toString(), capacityToBackend: response["capacity"].toString() }))
    }   // end of getInfo()

    // Verify that all the required fields are filled in
    checkForm() {
        let decision = false;

        if (!this.state.validEmail || !this.state.validPhone
            || !this.state.validBusinessName || !this.state.validStreet
            || !this.state.validCity || this.state.errorProvince != ""
            || this.state.errorPostalCode != "") {
            decision = false
        }
        else {
            decision = true
        }
        return decision
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
                        onPress={() => {
                            if (this.props.route.params.accountType == "customer") {
                                this.props.navigation.goBack();

                            } else if (this.props.route.params.accountType == "business") {
                                this.props.navigation.goBack();

                            }
                        }}
                    ></IconButton>
                    <View style={styleMenu.optionScreen}>
                        <Text style={styleMenu.optionTitle}>
                            Edit Profile
					</Text>
                        <ScrollView>
                            <View style={{ paddingHorizontal: 50 }}>
                                <Text style={styles.editProfileLabels}>EMAIL</Text>
                                <TextInput	//Text Input for email

                                    style={styles.signUpTextInput}
                                    mode="outlined"
                                    placeholder={this.state.email}
                                    autoCapitalize="none"
                                    theme={{ colors: { primary: '#002970' } }}
                                    //* Check verify that the entered email is valid 
                                    onChangeText={newEmail => this.setState(() => ({ newEmail: newEmail }))}
                                    value={this.state.newEmail}
                                    onBlur={() => { // Check if the email has the correct form. If not, display an error message
                                        if (this.state.newEmail != "") {
                                            var errorMessage = Validation.validateEmailAddress(this.state.newEmail);

                                            if (errorMessage == "") {   //no issue
                                                this.setState({ validEmail: true, emailToBackend: this.state.newEmail });

                                            } else {    //issue with email
                                                this.setState({ errorEmail: errorMessage, validEmail: false });
                                            }
                                        } else {  //if email has not been modified, use old value
                                            this.setState({ emailToBackend: this.state.email })
                                        }
                                    }}
                                    onFocus={() => { // When the field is tapped, remove the error message
                                        this.setState(() => ({ errorEmail: "" }));
                                    }}
                                />
                                <Text style={styles.errorMessage}>{this.state.errorEmail}</Text>

                                <Text style={styles.editProfileLabels}>BUSINESS NAME</Text>
                                <TextInput
                                    style={styles.signUpTextInput}
                                    mode="outlined"
                                    placeholder={this.state.businessName}
                                    theme={{ colors: { primary: '#002970' } }}
                                    onChangeText={newBusinessName => this.setState(() => ({ newBusinessName: newBusinessName }))}
                                    value={this.state.newBusinessName}
                                    onBlur={() => { // Check if the input is valid
                                        if (this.state.newBusinessName != "") { // new business name, must check whehter it has the valid form
                                            let errorMessage = Validation.validateName(this.state.newBusinessName);

                                            if (errorMessage == "") {
                                                this.setState({ validBusinessName: true, businessNameToBackend: this.state.newBusinessName });

                                            } else {
                                                this.setState({ errorBusiness: errorMessage, validBusinessName: false });
                                            }
                                        } else {
                                            this.setState({ businessNameToBackend: this.state.businessName })
                                        }

                                    }}
                                    onFocus={() => { // When the field is tapped, remove the error message
                                        this.setState({ errorBusiness: "" });
                                    }}
                                />
                                <Text style={styles.errorMessage}>{this.state.errorBusiness}</Text>

                                <Text style={styles.editProfileLabels}>PHONE NUMBER</Text>
                                <TextInput	//Text input for phone number
                                    style={styles.signUpTextInput}
                                    mode="outlined"
                                    placeholder={this.state.phoneNumber}
                                    keyboardType="number-pad"
                                    maxLength={12}
                                    theme={{ colors: { primary: '#002970' } }}
                                    onChangeText={newPhoneNumber => this.setState(() => ({ newPhoneNumber: Validation.validatePhoneNumber(newPhoneNumber) }))}
                                    value={this.state.newPhoneNumber}
                                    onBlur={() => {
                                        if (this.state.newPhoneNumber != "") {
                                            // Check if an error message needs to be displayed
                                            let errorMessage = Validation.printPhoneNumErrorMessage(this.state.newPhoneNumber);
                                            if (errorMessage == "") {   //No issue
                                                this.setState({ phoneNumberToBackend: this.state.newPhoneNumber, validPhone: true });
                                            } else {    //issue with phone number
                                                this.setState({ errorPhoneNumber: errorMessage, validPhone: false });
                                            }
                                        } else { //phone number not modified
                                            this.setState({ phoneNumberToBackend: this.state.phoneNumber, validPhone: true })
                                        }
                                    }}  //end of onBlur()
                                    onFocus={() => { // When the field is tapped, remove the error message
                                        this.setState(() => ({ errorPhoneNumber: "" }));
                                    }}
                                />
                                <Text style={styles.errorMessage}>{this.state.errorPhoneNumber}</Text>

                                <Text style={styles.businessLabels}>ADDRESS </Text>

                                {/*Street*/}
                                <Text style={styles.editProfileLabels}>STREET</Text>
                                <TextInput
                                    style={styles.signUpTextInput}
                                    mode="outlined"
                                    theme={{ colors: { primary: '#0a0540' } }}
                                    dense
                                    onChangeText={newStreet => this.setState(() => ({ newStreet: newStreet }))}
                                    value={this.state.newStreet}
                                    placeholder={this.state.street}
                                    onBlur={() => { // Check if the input is valid
                                        if (this.state.newStreet != "") { // street is modified, must check whehter it has the valid form
                                            let errorMessage = Validation.validateName(this.state.newStreet);

                                            if (errorMessage == "") {
                                                this.setState({ validStreet: true, streetToBackend: this.state.newStreet });

                                            } else {
                                                this.setState({ errorStreet: errorMessage, validStreet: false });
                                            }
                                        } else {
                                            this.setState({ streetToBackend: this.state.street })
                                        }

                                    }}
                                    onFocus={() => { // When the field is tapped, remove the error message
                                        this.setState({ errorStreet: "" });
                                    }}
                                />
                                <Text style={styles.errorMessage}>{this.state.errorStreet}</Text>

                                {/*City*/}
                                <Text style={styles.editProfileLabels}>CITY</Text>
                                <TextInput
                                    style={styles.signUpTextInput}
                                    mode="outlined"
                                    theme={{ colors: { primary: '#0a0540' } }}
                                    placeholder={this.state.city}
                                    dense
                                    onChangeText={newCity => this.setState(() => ({ newCity: newCity }))}
                                    value={this.state.newCity}
                                    onBlur={() => { // Check if the input is valid
                                        if (this.state.newCity != "") { // city is modified, must check whehter it has the valid form
                                            let errorMessage = Validation.validateName(this.state.newCity);

                                            if (errorMessage == "") {
                                                this.setState({ validCity: true, cityToBackend: this.state.newCity });

                                            } else {
                                                this.setState({ errorCity: errorMessage, validCity: false });
                                            }
                                        } else {
                                            this.setState({ cityToBackend: this.state.city })
                                        }

                                    }}
                                    onFocus={() => { // When the field is tapped, remove the error message
                                        this.setState({ errorCity: "" });
                                    }}
                                />
                                <Text style={styles.errorMessage}>{this.state.errorCity}</Text>

                                {/*Select Province*/}
                                <Text style={styles.pickerTitle}>PROVINCE</Text>
                                <View style={styles.viewAndroidOnly}>

                                    <RNPickerSelect
                                        value={this.state.province}
                                        onValueChange={(prov) => this.setState({ province: prov })}
                                        style={stylePicker}
                                        useNativeAndroidPickerStyle={false}
                                        items={[
                                            { label: "Ontario", value: 'ON' },
                                            { label: "Alberta", value: 'AB' },
                                            { label: "British Columbia", value: 'BC' },
                                            { label: "Manitoba", value: 'MB' },
                                            { label: "New Brunswick", value: 'NB' },
                                            { label: "Newfoundland and Labrador", value: 'NL' },
                                            { label: "Nova Scotia", value: 'NS' },
                                            { label: "Prince Edward Island", value: 'PEI' },
                                            { label: "Quebec", value: 'QC' },
                                            { label: "Saskatchewan", value: 'SK' },
                                            { label: "Northwest Territories", value: 'NT' },
                                            { label: "Nunavut", value: 'NU' },
                                            { label: "Yukon", value: 'YT' },]}
                                        onClose={() => {
                                            if (this.state.province == null) {// If the field is left blank, use old values 
                                                this.setState({ provinceToBackend: this.state.province })
                                            } else {
                                                this.setState({ provinceToBackend: this.state.province })
                                            }
                                        }}
                                        onOpen={() => { // If the picker is open, remove the error message
                                            this.setState(() => ({ errorProvince: "" }));
                                        }}
                                    />
                                </View>
                                <Text style={styles.errorMessage}>{this.state.errorProvince}</Text>

                                {/*Postal Code*/}
                                <Text style={styles.pickerTitle}>POSTAL CODE</Text>
                                <TextInput
                                    style={styles.signUpTextInput}
                                    mode="outlined"
                                    placeholder={this.state.postalCode}
                                    theme={{ colors: { primary: '#0a0540' } }}
                                    dense
                                    maxLength={7}
                                    autoCapitalize='characters'
                                    onChangeText={newPostalCode => this.validatePostalCode(newPostalCode)}
                                    value={this.state.newPostalCode}
                                    onBlur={() => { // If the field is left blank, use old value
                                        if (this.state.newPostalCode == "") {
                                            this.setState({ postalCodeToBackend: this.state.postalCode, validPostalCode: true })
                                        } else {
                                            this.setState({ postalCodeToBackend: this.state.newPostalCode })
                                        }
                                    }}
                                    onFocus={() => { // When the field is tapped, remove the error message
                                        this.setState(() => ({ errorPostalCode: "" }));
                                    }}
                                />
                                <Text style={styles.errorMessage}>{this.state.errorPostalCode}</Text>

                                {/*Capacity of a business*/}
                                <Text style={styles.pickerTitle}>CAPACITY</Text>
                                <TextInput style={styles.signUpTextInput}
                                    mode="outlined"
                                    dense
                                    theme={{ colors: { primary: '#0a0540' } }}
                                    placeholder={this.state.capacity}
                                    keyboardType="number-pad"
                                    onChangeText={newCapacity => this.setState(() => ({ newCapacity: Validation.validateCapacity(newCapacity) }))}
                                    value={this.state.newCapacity}
                                    onBlur={() => { // If the field is left blank, use old value
                                        if (this.state.newCapacity == "") {
                                            this.setState({ capacityToBackend: this.state.capacity })
                                        } else {
                                            this.setState({ capacityToBackend: this.state.newCapacity })
                                        }
                                    }}
                                />

                                <View style={{ marginTop: 50 }} />
                                <TouchableOpacity	//confirm button for Edit Profile
                                    style={styles.button}
                                    onPress={async () => {
                                        if (this.checkForm()) { // Success
                                            var link = `${serverAddress}/checkin/business/` + this.props.route.params.receivedUserInfo["id"] + "/";
                                            var linkEmail = `${serverAddress}/checkin/change_email/` + this.props.route.params.receivedUserInfo["id"] + "/";

                                            let response = await fetch(link, {
                                                method: 'PUT',
                                                headers: {
                                                    Authorization: 'Bearer ' + this.props.route.params.receivedUserInfo["access"],
                                                    Accept: 'application/json',
                                                    'Content-Type': 'application/json'
                                                },
                                                body: JSON.stringify({
                                                    street_address: this.state.streetToBackend,
                                                    city: this.state.cityToBackend,
                                                    postal_code: this.state.postalCodeToBackend,
                                                    province: this.state.provinceToBackend,
                                                    capacity: this.state.capacityToBackend,
                                                    name: this.state.businessNameToBackend,
                                                    phone_num: this.state.phoneNumberToBackend.replace(/-/gi, ''),
                                                })
                                            })
                                            let responseUpdateCode = await response.status;

                                            let responseEmail = await fetch(linkEmail, {
                                                method: 'PUT',
                                                headers: {
                                                    Authorization: 'Bearer ' + this.props.route.params.receivedUserInfo["access"],
                                                    Accept: 'application/json',
                                                    'Content-Type': 'application/json'
                                                },
                                                body: JSON.stringify({
                                                    email: this.state.emailToBackend
                                                })
                                            })
                                            let responseEmailCode = await responseEmail.status;

                                            if (responseEmailCode == 200 && responseUpdateCode == 200) {

                                                //Remove all the new fields
                                                this.setState({ newEmail: '', newBusinessName: '', newPhoneNumber: '', newCapacity: '', newStreet: '', newCity: '', newPostalCode: '', });

                                                // Success Message
                                                showMessage({
                                                    message: `Profile Updated!`,
                                                    type: "success",
                                                    autoHide: true,
                                                    duration: 2000,
                                                    backgroundColor: "#0a0540",
                                                    color: "#fafafa",
                                                    icon: "success"
                                                });
                                                this.props.navigation.goBack();

                                            } else {
                                                showMessage({
                                                    message: `Error: Profile update failed. ${'\n'}${'\n'}Please try again.`,
                                                    type: "danger",
                                                    autoHide: true,
                                                    duration: 2500,
                                                    backgroundColor: "#ff504a",
                                                    color: "#fafafa",
                                                    icon: "danger"
                                                });
                                            }

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
                                    }}	//confirmation splash screen


                                >
                                    <Text style={{ color: '#fafafa', alignSelf: 'center' }}>Save</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </KeyboardAvoidingView>
        )
    }
}   //end of class

export default BusinessEditProfile;