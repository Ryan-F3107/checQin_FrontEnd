import React from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { TextInput, IconButton, Checkbox, Divider } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import styles from '../styling/styles';
import signUpDefaultstyleForPicker from '../styling/signUpDefaultPicker';

import Validation from '../functions/Validation';

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

    numUp() {
        this.setState({ num: this.state.num + 1 })
    }

    numDown() {
        if (this.state.num != 0) {
            this.setState({ num: this.state.num - 1 })
        }
    }

    render() {
        return (
            <View style={styles.homeContainer}>
                <IconButton
                    style={styles.closeButton}
                    icon="close"
                    size={35}
                    color={'black'}
                    onPress={() => { this.props.navigation.replace("HomeBusiness") }}
                ></IconButton>

                <View style={styles.checkInContainer}>
                    <Text style={styles.checkInTitle}> Customer Check-in </Text>
                    <TextInput
                        style={styles.signUpTextInput}
                        label="Number of People In Party"
                        mode="outlined"
                        theme={{ colors: { primary: 'blue' } }}
                        placeholder="0"
                        keyboardType="number-pad"
                        onChangeText={(numPeople) => this.setState({ numPeople: numPeople.replace(/[a-zA-z!@#$%^&*()_=+;.,><?/'|-]/gi, '') })}
                        value={this.state.numPeople}
                        onBlur={() => {
                            if (this.state.numPeople == "") {
                                this.setState(() => ({ errorNumPeople: "Required" }))
                            }
                        }}
                        onFocus={() => {
                            this.setState(() => ({ errorNumPeople: "" }))
                        }}
                    />
                    <Text style={{ color: 'red' }}>{this.state.errorNumPeople}</Text>

                    <View style={styles.viewAndroidOnly}>
                        <Text style={{ marginTop: 5, marginBottom: -10, color: '#04074d' }}>NUMBER OF PEOPLE</Text>
                        <RNPickerSelect
                            onValueChange={(numPeople) => this.setState({ numPeople: numPeople })}
                            placeholder={{ label: "Number of People", value: '' }}
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
                                    this.setState(() => ({ errorNumPeople: "Required" }))
                                } else {
                                    this.setState(() => ({ errorNumPeople: "" }))
                                }
                            }}
                            onOpen={() => {
                                this.setState(() => ({ errorNumPeople: "" }))
                            }}

                        />
                    </View>
                    <Text style={styles.errorMessage}>{this.state.errorNumPeople}</Text>


                    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                        <TouchableOpacity
                            style={styles.NumIncButton}
                            onPress={() => this.numDown()} >
                            <Text style={{ color: "white", alignSelf: "center" }}>-</Text>
                        </TouchableOpacity>
                        <Text style={{ marginTop: 10 }}>{this.state.num}</Text>
                        <TouchableOpacity
                            style={styles.NumIncButton}
                            onPress={() => this.numUp()} >
                            <Text style={{ color: "white", alignSelf: "center" }}>+</Text>
                        </TouchableOpacity>



                    </View>
                    <TextInput
                        style={styles.signUpTextInput}
                        label="PHONE NUMBER"
                        mode="outlined"
                        theme={{ colors: { primary: 'blue' } }}
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
                    <Text style={{ color: 'red' }}>{this.state.errorPhoneNumber}</Text>

                    <Divider style={{ borderBottomWidth: 1.5, borderColor: 'grey', width: 300, alignSelf: 'center', marginTop: 30 }} />
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


                    <TextInput
                        style={styles.signUpTextInput}
                        label="EMAIL"
                        mode="outlined"
                        autoCapitalize='none'
                        placeholder="myemail@domain.com"
                        theme={{ colors: { primary: 'blue' } }}
                        disabled={this.state.isChecked == false}
                        onChangeText={custEmail => this.setState(() => ({ custEmail: custEmail }))}
                        value={this.state.custEmail}
                        onBlur={() => {
                            if (this.state.isChecked != false) {
                                if (this.state.custEmail == "") {
                                    this.setState(() => ({ errorEmail: "Required" }))
                                } else if (this.state.custEmail.length <= 5 || !this.state.custEmail.includes('@') || !this.state.custEmail.includes('.')) {
                                    this.setState(() => ({ errorEmail: "Invalid" }))
                                }
                            }

                        }}
                        onFocus={() => {
                            this.setState(() => ({ errorEmail: "" }))
                        }}
                    />
                    <Text style={{ color: 'red' }}>{this.state.errorEmail}</Text>
                    <View style={{ marginTop: 30 }}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.props.navigation.replace("HomeBusiness")
                            /*{
                                Alert.alert("Checked In!", "",
                                    [{
                                        text: "Dismiss"
                                    }
                                    ]);
                            }*/}
                        //disabled={this.checkForm()}
                        >
                            <Text style={{ color: '#fafafa', alignSelf: 'center' }}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        )
    }
}

export default CheckInCustomer;