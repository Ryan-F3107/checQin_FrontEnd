import React from 'react';
import { Text, View, TouchableOpacity, Platform } from 'react-native';
import { Checkbox, TextInput } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import styles from '../styling/styles';
import stylePicker from '../styling/pickerStyle';
import { ScrollView } from 'react-native-gesture-handler';

import Validation from '../functions/Validation';


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
            errorCapacity: ''
        }
        this.state = initalState;
    }

    checkCheckBox() {
        this.setState({ isChecked: !this.state.isChecked })
    }

    validatePostalCode(postalCode) {

        if (postalCode.charAt(postalCode.length - 1) == " ") {
            postalCode = postalCode.slice(0, -1)

        } else if (postalCode.length == 4) {
            var last = postalCode.charAt(postalCode.length - 1)
            postalCode = postalCode.substring(0, 3) + " " + last

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
                <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.titleBusiness}> Getting Started </Text>
                    <Text style={styles.subTitle}> Business Account </Text>
                </View>
                <View style={styles.checkBusinessView}>

                    <Checkbox.Android
                        color='#fcba03'
                        value={this.state.isChecked}
                        status={this.state.isChecked ? 'unchecked' : 'checked'}
                        onPress={() => { this.checkCheckBox(); this.props.navigation.replace('CreateAccountDefault') }} />
                    <Text style={styles.isBusinessText}> I am creating an account {'\n'} for my business.</Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <TextInput
                        style={styles.signUpTextInput}
                        label="BUSINESS NAME"
                        mode="outlined"
                        dense
                        theme={{ colors: { primary: '#04074d' } }}
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
                    <Text style={styles.errorMessage}>{this.state.errorBusiness}</Text>

                    <TextInput
                        style={styles.signUpTextInput}
                        label="PHONE NUMBER"
                        mode="outlined"
                        dense
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

                    <TextInput style={styles.signUpTextInput}
                        label="CAPACITY"
                        mode="outlined"
                        dense
                        theme={{ colors: { primary: '#04074d' } }}
                        placeholder="Capacity of your business"
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
                    <Text style={styles.errorMessage}>{this.state.errorCapacity}</Text>

                    <Text style={styles.businessLabels}>ADDRESS </Text>

                    <TextInput
                        style={styles.signUpTextInput}
                        label="STREET"
                        mode="outlined"
                        theme={{ colors: { primary: '#04074d' } }}
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
                    <Text style={styles.errorMessage}>{this.state.errorStreet}</Text>

                    <TextInput
                        style={styles.signUpTextInput}
                        label="CITY"
                        mode="outlined"
                        theme={{ colors: { primary: '#04074d' } }}
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
                    <Text style={styles.errorMessage}>{this.state.errorCity}</Text>

                    <View style={styles.viewAndroidOnly}>
                        <RNPickerSelect
                            onValueChange={(prov) => this.setState({ province: prov })}
                            placeholder={{ label: "PROVINCE", value: '' }}
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
                                if (this.state.province == "") {
                                    console.log(this.state.province)
                                    this.setState(() => ({ errorProvince: "Required" }))
                                } else {
                                    this.setState(() => ({ errorProvince: "" }))
                                }
                            }}
                            onOpen={() => this.setState(() => ({ errorProvince: "" }))}
                        />
                    </View>
                    <Text style={styles.errorMessage}>{this.state.errorProvince}</Text>


                    <TextInput
                        style={styles.signUpTextInput}
                        label="POSTAL CODE"
                        mode="outlined"
                        placeholder="A1B 2C3"
                        theme={{ colors: { primary: '#04074d' } }}
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
                    <Text style={styles.errorMessage}>{this.state.errorPostalCode}</Text>


                    <TouchableOpacity
                        style={styles.BusinessNextButton}
                        onPress={() => {
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
                            console.log(this.state.postalCode.replace(/\s/gi, ''))
                        }}
                    //disabled={this.checkForm()}
                    >
                        <Text style={{ color: '#fafafa', alignSelf: 'center' }}>Next</Text>
                    </TouchableOpacity>

                </ScrollView>
            </View>
        )
    }
}

export default CreateAccountBusiness;