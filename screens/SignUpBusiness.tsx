import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Checkbox, TextInput } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';

class SignUpBusiness extends React.Component {

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
            errorCapacity: ''
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
        this.setState({ isChecked: !this.state.isChecked })
    }

    validatePostalCode(postalCode) {

        if (postalCode.length == 3) {
            postalCode = postalCode + " "

        } else if (postalCode.charAt(postalCode.length - 1) == " ") {
            postalCode = postalCode.slice(0, -1)
        }

        if (postalCode.length == 7) {
            if (/[^ABCEGHJKLMNPRSTVXY]/g.test(postalCode.charAt(0))
                || /[^0-9]/g.test(postalCode.charAt(1))
                || /[^ABCEGHJKLMNPRSTVXYWZ]/g.test(postalCode.charAt(2))
                || /[^0-9]/g.test(postalCode.charAt(4))
                || /[^ABCEGHJKLMNPRSTVXYWZ]/g.test(postalCode.charAt(5))
                || /[^0-9]/g.test(postalCode.charAt(6))) {

                this.setState({ errorPostalCode: "Invalid" });

            }
        } else {
            this.setState({ errorPostalCode: "" });
        }
        this.setState({ postalCode: postalCode });
    }

    checkForm() {
        let decision = false;

        if (this.state.businessName == "" || this.state.phoneNum.length < 12
            || this.state.street == "" || this.state.city == ""
            || this.state.province == "" || this.state.postalcode == ""
            || this.state.capacity == "") {
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
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.title}> Sign Up</Text>
                    <Text style={styles.subTitle}> Business Account</Text>
                </View>
                <View style={{ flexDirection: "row", marginBottom: 5 }}>

                    <Checkbox.Android
                        color='#fcba03'
                        value={this.state.isChecked}
                        status={this.state.isChecked ? 'unchecked' : 'checked'}
                        onPress={() => { this.checkCheckBox(); this.props.navigation.replace('SignUpDefault') }} />
                    <Text style={styles.isBusinessText}> I am creating an account for my business.</Text>
                </View>

                <TextInput
                    style={styles.textInput}
                    label="BUSINESS NAME"
                    mode="outlined"
                    theme={{ colors: { primary: 'blue' } }}
                    onChangeText={business => this.setState(() => ({ businessName: business }))}
                    value={this.state.businessName}
                    onBlur={() => {
                        if (this.state.businessName == "") {
                            this.setState(() => ({ errorBusiness: "Required" }))
                        }
                    }}
                    onFocus={() => {
                        this.setState(() => ({ errorBusiness: "" }))
                    }}
                />
                <Text style={{ color: 'red' }}>{this.state.errorBusiness}</Text>

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

                <TextInput style={styles.textInput}
                    label="CAPACITY"
                    mode="outlined"
                    theme={{ colors: { primary: 'blue' } }}
                    placeholder="Enter the capacity of your business"
                    keyboardType="numeric"
                    onChangeText={cap => this.setState(() => ({ capacity: cap }))
                    }
                    value={this.state.capacity}
                    onBlur={() => {
                        if (this.state.capacity == "") {
                            this.setState(() => ({ errorCapacity: "Required" }))
                        }
                    }}
                    onFocus={() => {
                        this.setState(() => ({ errorCapacity: "" }))
                    }}
                />
                <Text style={{ color: 'red' }}>{this.state.errorCapacity}</Text>

                <Text style={styles.labels}>ADDRESS </Text>

                <TextInput
                    style={styles.textInput}
                    label="STREET"
                    mode="outlined"
                    theme={{ colors: { primary: 'blue' } }}
                    dense
                    onChangeText={street => this.setState(() => ({ street: street }))}
                    value={this.state.street}
                    onBlur={() => {
                        if (this.state.street == "") {
                            this.setState(() => ({ errorStreet: "Required" }))
                        }
                    }}
                    onFocus={() => {
                        this.setState(() => ({ errorStreet: "" }))
                    }}
                />
                <Text style={{ color: 'red' }}>{this.state.errorStreet}</Text>

                <TextInput
                    style={styles.textInput}
                    label="CITY"
                    mode="outlined"
                    theme={{ colors: { primary: 'blue' } }}
                    dense
                    onChangeText={city => this.setState(() => ({ city: city }))}
                    value={this.state.city}
                    onBlur={() => {
                        if (this.state.city == "") {
                            this.setState(() => ({ errorCity: "Required" }))
                        }
                    }}
                    onFocus={() => {
                        this.setState(() => ({ errorCity: "" }))
                    }}
                />
                <Text style={{ color: 'red' }}>{this.state.errorCity}</Text>

                <RNPickerSelect
                    onValueChange={(prov) => this.setState({ province: prov })}
                    placeholder={{ label: "PROVINCE", value: '' }}
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
                    style={styleForPicker}
                    onClose={() => {
                        if (this.state.province == "") {
                            console.log(this.state.province)
                            this.setState(() => ({ errorProvince: "Required" }))
                        } else {
                            this.setState(() => ({ errorProvince: "" }))
                        }
                    }}
                    onOpen={() => this.setState(() => ({ errorProvince: "" }))}
                />
                <Text style={{ color: 'red' }}>{this.state.errorProvince}</Text>


                <TextInput
                    style={styles.textInput}
                    label="POSTAL CODE"
                    mode="outlined"
                    placeholder="A1B 2C3"
                    theme={{ colors: { primary: 'blue' } }}
                    dense
                    maxLength={7}
                    autoCapitalize='characters'
                    onChangeText={postalCode => this.validatePostalCode(postalCode)}
                    value={this.state.postalCode}
                    onBlur={() => {
                        if (this.state.postalCode == "") {
                            this.setState(() => ({ errorPostalCode: "Required" }))
                        }
                    }}
                    onFocus={() => {
                        this.setState(() => ({ errorPostalCode: "" }))
                    }}
                />
                <Text style={{ color: 'red' }}>{this.state.errorPostalCode}</Text>

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
    subTitle: {
        fontSize: 15,
        marginLeft: 5,
        paddingTop: 70,
        paddingBottom: 20,
        marginBottom: 20
    },
    labels: {
        fontSize: 15,
        paddingTop: 20,
    },
    labelAddress: {
        fontSize: 12,
        paddingTop: 15,
        paddingBottom: 7,
    },
    provLabel: {
        fontSize: 15,
        paddingTop: 15,
        paddingBottom: 7,
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
        paddingTop: 8,
    }
})

const styleForPicker = StyleSheet.create({
    inputIOS: {
        marginTop: 10,
        padding: 12,
        borderWidth: 1,
        borderRadius: 3,
        backgroundColor: 'white',
        borderColor: 'grey'
    },
    inputAndroid: {
        marginTop: 10,
        padding: 12,
        borderWidth: 1,
        borderRadius: 3,
        backgroundColor: 'white',
        borderColor: 'grey'
    }
})

export default SignUpBusiness;