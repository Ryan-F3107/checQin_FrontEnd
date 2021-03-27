import React from 'react';
import { Text, View, TouchableOpacity, Platform, KeyboardAvoidingView } from 'react-native';
import { Checkbox, TextInput } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import styles from '../styling/styles';
import stylePicker from '../styling/pickerStyle';
import { ScrollView } from 'react-native-gesture-handler';
import Validation from '../functions/Validation';
import { showMessage } from 'react-native-flash-message';

class CreateAccountBusiness extends React.Component {

    constructor(props) {
        super(props);
        const initalState = {
            phoneNum: '',
            isChecked: false,
            province: '',
            postalCode: '',
            businessName: '',
            street: '',
            city: '',
            capacity: '',
            errorBusiness: '',
            errorPhoneNumber: '',
            errorStreet: '',
            errorCity: '',
            errorProvince: '',
            errorPostalCode: '',
            errorCapacity: '',
            validPhone: '',
            validPostalCode: ''
        }
        this.state = initalState;
    }

    // Check whether a checkbox is selected or not
    checkCheckBox() {
        this.setState({ isChecked: !this.state.isChecked })
    }

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


    // Verify that all the required fields are filled in
    checkForm() {
        let decision = false;

        if (this.state.businessName == "" || !this.state.validPhone
            || this.state.street == "" || this.state.city == ""
            || this.state.province == "" || !this.state.validPostalCode
            || this.state.capacity == "") {
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
                <View style={styles.container}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.titleBusiness}> Getting Started </Text>
                        <Text style={styles.subTitle}> Business Account </Text>
                    </View>

                    <View style={styles.checkBusinessView}>

                        {/*CheckBox. Business account, if it is checked*/}
                        <Checkbox.Android
                            color='#fcba03'
                            value={this.state.isChecked}
                            status={this.state.isChecked ? 'unchecked' : 'checked'}
                            onPress={() => { this.checkCheckBox(); this.props.navigation.replace('CreateAccountDefault') }} />
                        <Text style={styles.isBusinessText}> I am creating an account {'\n'} for my business.</Text>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        {/*Business Name*/}
                        <TextInput
                            style={styles.signUpTextInput}
                            label="BUSINESS NAME"
                            mode="outlined"
                            dense
                            theme={{ colors: { primary: '#0a0540' } }}
                            maxLength={100}
                            onChangeText={business => this.setState(() => ({ businessName: business }))}
                            value={this.state.businessName}
                            onBlur={() => { // If the field is left blank, show an error message 
                                if (this.state.businessName == "") {
                                    this.setState(() => ({ errorBusiness: "Required" }));
                                }
                            }}
                            onFocus={() => { // When the field is tapped, remove the error message
                                this.setState(() => ({ errorBusiness: "" }));
                            }}
                        />
                        <Text style={styles.errorMessage}>{this.state.errorBusiness}</Text>

                        {/*Phone Number*/}
                        <TextInput
                            style={styles.signUpTextInput}
                            label="PHONE NUMBER"
                            mode="outlined"
                            dense
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
                                this.setState(() => ({ errorPhoneNumber: "" }));
                            }}
                        />
                        <Text style={styles.errorMessage}>{this.state.errorPhoneNumber}</Text>

                        {/*Capacity of a business*/}
                        <TextInput style={styles.signUpTextInput}
                            label="CAPACITY"
                            mode="outlined"
                            dense
                            theme={{ colors: { primary: '#0a0540' } }}
                            placeholder="Capacity of your business"
                            keyboardType="number-pad"
                            onChangeText={cap => this.setState(() => ({ capacity: Validation.validateCapacity(cap) }))}
                            value={this.state.capacity}
                            onBlur={() => { // If the field is left blank, show an error message 
                                if (this.state.capacity == "") {
                                    this.setState(() => ({ errorCapacity: "Required" }));
                                }
                            }}
                            onFocus={() => { // When the field is tapped, remove the error message
                                this.setState(() => ({ errorCapacity: "" }));
                            }}
                        />
                        <Text style={styles.errorMessage}>{this.state.errorCapacity}</Text>

                        <Text style={styles.businessLabels}>ADDRESS </Text>

                        {/*Street*/}
                        <TextInput
                            style={styles.signUpTextInput}
                            label="STREET"
                            mode="outlined"
                            theme={{ colors: { primary: '#0a0540' } }}
                            dense
                            onChangeText={street => this.setState(() => ({ street: street }))}
                            value={this.state.street}
                            onBlur={() => { // If the field is left blank, show an error message 
                                if (this.state.street == "") {
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
                            dense
                            onChangeText={city => this.setState(() => ({ city: city }))}
                            value={this.state.city}
                            onBlur={() => { // If the field is left blank, show an error message 
                                if (this.state.city == "") {
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
                                onValueChange={(prov) => this.setState({ province: prov })}
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
                                    if (this.state.province == "") {
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
                            placeholder="A1B 2C3"
                            theme={{ colors: { primary: '#0a0540' } }}
                            dense
                            maxLength={7}
                            autoCapitalize='characters'
                            onChangeText={postalCode => this.validatePostalCode(postalCode)}
                            value={this.state.postalCode}
                            onBlur={() => { // If the field is left blank, show an error message 
                                if (this.state.postalCode == "") {
                                    this.setState(() => ({ errorPostalCode: "Required", validPostalCode: false }));
                                }
                            }}
                            onFocus={() => { // When the field is tapped, remove the error message
                                this.setState(() => ({ errorPostalCode: "" }));
                            }}
                        />
                        <Text style={styles.errorMessage}>{this.state.errorPostalCode}</Text>

                        {/*Next Button*/}
                        <TouchableOpacity
                            style={styles.BusinessNextButton}
                            onPress={() => {
                                if (this.checkForm()) {
                                    this.props.navigation.navigate('CreateAccountInfo',
                                        {
                                            accountType: 'business',
                                            businessName: this.state.businessName,
                                            phoneNum: this.state.phoneNum.replace(/-/gi, ''),
                                            street: this.state.street,
                                            city: this.state.city,
                                            province: this.state.province,
                                            postalCode: this.state.postalCode.replace(/\s/gi, ''),
                                            capacity: this.state.capacity
                                        })
                                } else {
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
                            <Text style={{ color: '#fafafa', alignSelf: 'center' }}>Next</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>

        )
    }
}

export default CreateAccountBusiness;