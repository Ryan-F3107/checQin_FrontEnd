import React from 'react';

import styles from '../../styling/styles';
import styleMenu from '../../styling/optionStyling';
import stylePicker from '../../styling/pickerStyle';

import { HOST_ADDRESS } from '../connectToBackend';
import { View, Text, TouchableOpacity } from 'react-native';
import { TextInput, IconButton } from 'react-native-paper';
import Validation from '../../functions/Validation';
import RNPickerSelect from 'react-native-picker-select';

import { ScrollView } from 'react-native-gesture-handler';

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

            phoneNumber: '',
            newPhoneNumber: '',
            validPhone: '',
            errorPhoneNumber: '',

            capacity: '',
            newCapacity: '',
            errorCapacity: '',

            street: '',
            newStreet: '',
            errorStreet: '',

            city: '',
            newCity: '',
            errorCity: '',

            postalCode: '',
            validPostalCode: '',
            newPostCode: '',
            errorPostalCode: '',

            province: '',
            errorProvince: '',
            newProvince: '',

        }   //end of initial State
        this.state = initialState
    }   //end of constructor

    // Verify that the entered postal code has the correct form
    validatePostalCode(postalCode) {

        // if-else statements to automatically put a space after the 3rd digit 
        if (postalCode.charAt(postalCode.length - 1) == " ") {
            postalCode = postalCode.slice(0, -1)

        } else if (postalCode.length == 4) {
            var last = postalCode.charAt(postalCode.length - 1)
            postalCode = postalCode.substring(0, 3) + " " + last

        }

        // The length here is 7 because of a space in the middle 
        // Based on postal code rules, referenced from: https://en.wikipedia.org/wiki/Postal_codes_in_Canada
        if (postalCode.length == 7) {
            if (/[^ABCEGHJKLMNPRSTVXY]/g.test(postalCode.charAt(0))
                || /[^0-9]/g.test(postalCode.charAt(1))
                || /[^ABCEGHJKLMNPRSTVXYWZ]/g.test(postalCode.charAt(2))
                || /\s/g.test(postalCode.charAt(3)) == false
                || /[^0-9]/g.test(postalCode.charAt(4))
                || /[^ABCEGHJKLMNPRSTVXYWZ]/g.test(postalCode.charAt(5))
                || /[^0-9]/g.test(postalCode.charAt(6))) {

                this.setState({ errorPostalCode: "Invalid", validPostalCode: false });

            }
        } else {
            this.setState({ errorPostalCode: "", validPostalCode: true });
        }
        this.setState({ postalCode: postalCode });
    }

    /*
        Function to retrieve info of business, using a GET request endpoint to backend
    */
    async getInfo() {
        let link = `${HOST_ADDRESS}/checkin/business/` + this.props.route.params.receivedUserInfo["id"] + "/";

        let response = await fetch(link, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.props.route.params.receivedUserInfo["access"],
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })  //end of response fetch promise
        response = await response.json();

        let addressArray = response["address"].split(" ", 3);
        let _street = addressArray[0];
        let _city = addressArray[1];
        this.setState(() => ({ email: response["user"]["email"] }));
        this.setState(() => ({ businessName: response["name"] }));
        this.setState(() => ({ phoneNumber: response["phone_num"] }));
        this.setState(() => ({ street: _street }));
        this.setState(() => ({ city: _city }));
        this.setState(() => ({ capacity: response["capacity"].toString() }))
    }   // end of getInfo()

    render() {
        return (
            <View style={styles.homeContainer}>
                <IconButton
                    style={styles.closeButton}
                    icon="close"
                    size={35}
                    color={'black'}
                    onPress={() => {
                        if (this.props.route.params.accountType == "customer") {
                            this.props.navigation.goBack();
                            //this.props.navigation.replace('Home');

                        } else if (this.props.route.params.accountType == "business") {
                            this.props.navigation.goBack();
                            //this.props.navigation.replace('HomeBusiness');
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
                                    var errorMessage = Validation.validateEmailAddress(this.state.newEmail);
                                    if (errorMessage == "") {
                                        this.setState({ validEmail: true });
                                    } else {
                                        this.setState({ errorEmail: errorMessage, validEmail: false });
                                    }
                                }}
                                onFocus={() => { // When the field is tapped, remove the error message
                                    this.setState(() => ({ errorEmail: "" }));
                                }}
                            />
                            <Text style={styles.errorMessage}>{this.state.errorEmail}</Text>

                            <Text style={styles.editProfileLabels}>Business Name</Text>
                            <TextInput
                                style={styles.signUpTextInput}
                                mode="outlined"
                                placeholder={this.state.businessName}
                                theme={{ colors: { primary: '#002970' } }}
                                onChangeText={newBusinessName => this.setState(() => ({ newBusinessName: newBusinessName }))}
                                value={this.state.newBusinessName}
                            />

                            <Text style={styles.editProfileLabels}>PHONE NUMBER</Text>
                            <TextInput	//Text input for phone number
                                style={styles.signUpTextInput}
                                mode="outlined"
                                placeholder={this.state.phoneNumber}
                                keyboardType="number-pad"
                                theme={{ colors: { primary: '#002970' } }}
                                onChangeText={newPhoneNumber => this.setState(() => ({ newPhoneNumber: Validation.validatePhoneNumber(newPhoneNumber) }))}
                                value={this.state.newPhoneNumber}
                                onBlur={() => {
                                    // Check if an error message needs to be displayed
                                    let errorMessage = Validation.printPhoneNumErrorMessage(this.state.newPhoneNumber);
                                    if (errorMessage == "") {
                                        this.setState({ validPhone: true });
                                    } else {
                                        this.setState({ errorPhoneNumber: errorMessage, validPhone: false });
                                    }
                                }}
                                onFocus={() => { // When the field is tapped, remove the error message
                                    this.setState(() => ({ errorPhoneNumber: "" }));
                                }}
                            />
                            <Text style={styles.businessLabels}>ADDRESS </Text>

                            {/*Street*/}
                            <TextInput
                                style={styles.signUpTextInput}
                                label="STREET"
                                mode="outlined"
                                theme={{ colors: { primary: '#0a0540' } }}
                                dense
                                onChangeText={newStreet => this.setState(() => ({ newStreet: newStreet }))}
                                value={this.state.newStreet}
                                placeholder={this.state.street}
                                onBlur={() => { // If the field is left blank, show an error message 
                                    if (this.state.newStreet == "") {
                                        this.setState(() => ({ errorStreet: "Required" }));
                                    }
                                }}
                                onFocus={() => { // When the field is tapped, remove the error message
                                    this.setState(() => ({ errorStreet: "" }));
                                }}
                            />
                            <Text style={styles.errorMessage}>{this.state.errorStreet}</Text>

                            {/*City*/}
                            <TextInput
                                style={styles.signUpTextInput}
                                label="CITY"
                                mode="outlined"
                                theme={{ colors: { primary: '#0a0540' } }}
                                placeholder={this.state.city}
                                dense
                                onChangeText={newCity => this.setState(() => ({ newCity: newCity }))}
                                value={this.state.newCity}
                                onBlur={() => { // If the field is left blank, show an error message 
                                    if (this.state.newCity == "") {
                                        this.setState(() => ({ errorCity: "Required" }));
                                    }
                                }}
                                onFocus={() => { // When the field is tapped, remove the error message
                                    this.setState(() => ({ errorCity: "" }));
                                }}
                            />
                            <Text style={styles.errorMessage}>{this.state.errorCity}</Text>

                            <Text style={styles.pickerTitle}>PROVINCE</Text>
                            {/*Select Province*/}
                            <View style={styles.viewAndroidOnly}>

                                <RNPickerSelect
                                    onValueChange={(prov) => this.setState({ newProvince: prov })}
                                    placeholder={{ label: "Select a province", value: '' }}
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
                                    onClose={() => { // If the field is left blank, show an error message 
                                        if (this.state.newProvince == "") {
                                            this.setState(() => ({ errorProvince: "Required" }));
                                        }
                                    }}
                                    onOpen={() => { // If the picker is open, remove the error message
                                        this.setState(() => ({ errorProvince: "" }));
                                    }}
                                />
                            </View>
                            <Text style={styles.errorMessage}>{this.state.errorProvince}</Text>

                            {/*Postal Code*/}
                            <TextInput
                                style={styles.signUpTextInput}
                                label="POSTAL CODE"
                                mode="outlined"
                                placeholder="eg:A1B 2C3"
                                theme={{ colors: { primary: '#0a0540' } }}
                                dense
                                maxLength={7}
                                autoCapitalize='characters'
                                onChangeText={newPostalCode => this.validatePostalCode(newPostalCode)}
                                value={this.state.newPostalCode}
                                onBlur={() => { // If the field is left blank, show an error message 
                                    if (this.state.newPostalCode == "") {
                                        this.setState(() => ({ errorPostalCode: "Required", validPostalCode: false }));
                                    }
                                }}
                                onFocus={() => { // When the field is tapped, remove the error message
                                    this.setState(() => ({ errorPostalCode: "" }));
                                }}
                            />
                            <Text style={styles.errorMessage}>{this.state.errorPostalCode}</Text>

                            {/*Capacity of a business*/}
                            <TextInput style={styles.signUpTextInput}
                                label="CAPACITY"
                                mode="outlined"
                                dense
                                theme={{ colors: { primary: '#0a0540' } }}
                                placeholder={this.state.capacity}
                                keyboardType="number-pad"
                                onChangeText={newCapacity => this.setState(() => ({ newCapacity: Validation.validateCapacity(newCapacity) }))}
                                value={this.state.newCapacity}
                                onBlur={() => { // If the field is left blank, show an error message 
                                    if (this.state.newCapacity == "") {
                                        this.setState(() => ({ errorCapacity: "Required" }));
                                    }
                                }}
                                onFocus={() => { // When the field is tapped, remove the error message
                                    this.setState(() => ({ errorCapacity: "" }));
                                }}
                            />
                            <Text style={styles.errorMessage}>{this.state.errorCapacity}</Text>

                            <View style={{ marginTop: 50 }} />
                            <TouchableOpacity	//confirm button for Edit Profile
                                style={styles.button}
                                onPress={async () => {
                                    var link = `${HOST_ADDRESS}/checkin/business/` + this.props.route.params.receivedUserInfo["id"] + "/";
                                    var linkEmail = `${HOST_ADDRESS}/checkin/change_email/` + this.props.route.params.receivedUserInfo["id"] + "/";

                                    let response = await fetch(link, {
                                        method: 'PUT',
                                        headers: {
                                            Accept: 'application/json',
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            name: this.state.newBusinessName,
                                            phone_num: this.state.newPhoneNumber,
                                        })
                                    })

                                    let responseEmail = await fetch(linkEmail, {
                                        method: 'PUT',
                                        headers: {
                                            Authorization: 'Bearer ' + this.props.route.params.receivedUserInfo["access"],
                                            Accept: 'application/json',
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            email: this.state.newEmail
                                        })
                                    })

                                    this.props.navigation.goBack();
                                }}	//confirmation splash screen
                            >
                                <Text style={{ color: '#fafafa', alignSelf: 'center' }}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        )
    }
}   //end of class

export default BusinessEditProfile;