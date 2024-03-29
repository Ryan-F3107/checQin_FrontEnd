
import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Checkbox } from 'react-native-paper';
import { showMessage } from 'react-native-flash-message';
import styles from '../styling/styles';
import { serverAddress } from './connectToBackend';
import AppName from '../styling/AppName';

function Terms_Conditions({ navigation, route }) {
    const [checkedPolicy, setPolicy] = useState(false);
    const [checkedTC, setTC] = useState(false);
    const { accountType, firstName, lastName, phoneNum, email, password, businessName, contactPref, street, city, province, postalCode, capacity } = route.params;

    return (
        <View style={styles.container}>
            <View style={{ paddingHorizontal: 50 }}>
                <Text style={styles.titleTC}> Data Collection Agreement</Text>
                <Text
                    style={styles.Applabels}>{AppName.appName()} </Text>
                <Text style={{ paddingBottom: 30 }}>{AppName.appName()} is a mobile applicaiton that allows users to check into a businesses by scanning a QR code. </Text>

                <Text style={styles.TClabels}>Information that we collect</Text>
                <View style={{ height: 170, marginBottom: 10 }}>
                    <ScrollView
                        style={styles.scrollview}
                        showsVerticalScrollIndicator={true}>
                        <Text>In General: </Text>
                        <Text>- Camera Permession</Text>
                        <Text></Text>
                        <Text>For a personal account: </Text>
                        <Text>- Full Name</Text>
                        <Text>- Phone Number</Text>
                        <Text>- Email Address</Text>
                        <Text>- Password</Text>
                        <Text>- Contact Preference</Text>
                        <Text></Text>
                        <Text>For a business account: </Text>
                        <Text>- Business Name</Text>
                        <Text>- Phone Number</Text>
                        <Text>- Address</Text>
                        <Text>- Capacity of your business</Text>
                        <Text>- Email Address</Text>
                        <Text>- Password</Text>
                        <Text></Text>
                    </ScrollView>
                </View>

                {/* Check or uncheck "I have read..."*/}
                <View style={{ flexDirection: "row", marginTop: 10, marginBottom: 20 }}>

                    <Checkbox.Android
                        color='#fcba03'
                        status={checkedPolicy ? 'checked' : 'unchecked'}
                        onPress={() => { setPolicy(!checkedPolicy) }}
                    />
                    <Text style={{ marginTop: 10 }}> I have read and agree to Data Collection.</Text>
                </View>

                {/*Full Terms and Conditions -- Can't be implemented 
            <Text
                style={{ color: 'blue', marginTop: 10, marginBottom: 15, fontSize: 20, textDecorationLine: 'underline' }}
                //onPress={() => Linking.openURL("")}// A link to a full Terms and Conditions
            >
                Full Terms and Conditions
            </Text>
            // A check button to indicate a user agrees to the Terms and Conditions
            <View style={{ flexDirection: "row", marginBottom: 5 }}>
                <Checkbox.Android
                    color='#fcba03'
                    status={checkedTC ? 'checked' : 'unchecked'}
                    onPress={() => { setTC(!checkedTC) }}
                />
                <Text> I have read and agree to {'\n'} the Terms and Conditions.</Text>
            </View>*/}

                {/* Accept - Send all the collected information to the backend */}
                <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 30 }}>
                    <TouchableOpacity
                        style={styles.buttonTC}
                        onPress={async () => {
                            if (!checkedPolicy) { // If the checkbox is not checked,
                                showMessage({
                                    message: `To complete registration, please tap on the Data Collection checkbox.`,
                                    type: "danger",
                                    autoHide: true,
                                    duration: 2500,
                                    backgroundColor: "#ff504a",
                                    color: "#fafafa",
                                    icon: "danger"
                                });
                            } else { // If a user agrees to the Data Collection, their account will be created and they will be automatically logged into the app.

                                if (accountType == "customer") { //Customer
                                    let response = await fetch(`${serverAddress}/checkin/customer/create_account/`, {
                                        method: 'POST',
                                        headers: {
                                            Accept: 'application/json',
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            user: {
                                                email: email,
                                                password: password
                                            },
                                            first_name: firstName,
                                            last_name: lastName,
                                            phone_num: phoneNum,
                                            contact_pref: contactPref
                                        })
                                    });

                                    let responseCode = await response.status;

                                    // If the backend has successfully created an account, send the success code
                                    if (responseCode == 201) {

                                        //Automatically log in a user
                                        let letUserLogin = await fetch(`${serverAddress}/api/token/`, {
                                            method: 'POST',
                                            headers: {
                                                Accept: 'application/json',
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify({
                                                email: email,
                                                password: password
                                            })
                                        });
                                        let accessToken = await letUserLogin.json(); // contains user information
                                        let responseLoginCode = await letUserLogin.status;

                                        if (responseLoginCode == 200) { // Only if the login is successful, go to the main screen.
                                            navigation.reset({ index: 0, routes: [{ name: 'Home', params: { userInfo: accessToken } }] })

                                            // Success Message
                                            showMessage({
                                                message: `Account Created. ${'\n'}${'\n'}Welcome!`,
                                                type: "success",
                                                autoHide: true,
                                                duration: 2000,
                                                backgroundColor: "#0a0540",
                                                color: "#fafafa",
                                                icon: "success"
                                            });
                                        } else {
                                            // Error Message
                                            showMessage({
                                                message: `Error: Create Account failed. ${'\n'}${'\n'}Please double-check your information and try again.`,
                                                type: "danger",
                                                autoHide: true,
                                                duration: 2000,
                                                backgroundColor: "#ff504a",
                                                color: "#fafafa",
                                                icon: "danger"
                                            });
                                        }

                                    } else if (responseCode == 403) { // Error Message- Account already exists
                                        showMessage({
                                            message: `Error: Create account failed. ${'\n'}${'\n'} Account already exists with the current email.`,
                                            type: "danger",
                                            autoHide: true,
                                            duration: 2500,
                                            backgroundColor: "#ff504a",
                                            color: "#fafafa",
                                            icon: "danger"
                                        });
                                    } else { // Error in creating an account
                                        showMessage({
                                            message: `Error: Create account failed. ${'\n'}${'\n'}Please check your information and try again.`,
                                            type: "danger",
                                            autoHide: true,
                                            duration: 2500,
                                            backgroundColor: "#ff504a",
                                            color: "#fafafa",
                                            icon: "danger"
                                        });
                                    }

                                    // If a user create a business account
                                } else if (accountType == "business") {

                                    let response = await fetch(`${serverAddress}/checkin/business/create_account/`, {
                                        method: 'POST',
                                        headers: {
                                            Accept: 'application/json',
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            user: {
                                                email: email,
                                                password: password
                                            },
                                            name: businessName,
                                            phone_num: phoneNum,
                                            street_address: street,
                                            city: city,
                                            postal_code: postalCode,
                                            province: province,
                                            capacity: capacity
                                        })
                                    });

                                    let responseCode = await response.status;

                                    // If the backend has successfully created an account, send the success code
                                    if (responseCode == 201) {

                                        //Automatically login a user
                                        let letUserLogin = await fetch(`${serverAddress}/api/token/`, {
                                            method: 'POST',
                                            headers: {
                                                Accept: 'application/json',
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify({
                                                email: email,
                                                password: password
                                            })
                                        });
                                        let accessToken = await letUserLogin.json();
                                        let responseLoginCode = await letUserLogin.status;

                                        if (responseLoginCode == 200) { // Only if the login is successful, go to the main screen.
                                            navigation.reset({ index: 0, routes: [{ name: 'HomeBusiness', params: { userInfo: accessToken } }] })

                                            // Success Message
                                            showMessage({
                                                message: `Account Created. ${'\n'}${'\n'}Welcome!`,
                                                type: "success",
                                                autoHide: true,
                                                duration: 2000,
                                                backgroundColor: "#0a0540",
                                                color: "#fafafa",
                                                icon: "success"
                                            });
                                        } else {
                                            // Error Message
                                            showMessage({
                                                message: `Error: Create Account failed. ${'\n'}${'\n'}Please double-check your information and try again.`,
                                                type: "danger",
                                                autoHide: true,
                                                duration: 2000,
                                                backgroundColor: "#ff504a",
                                                color: "#fafafa",
                                                icon: "danger"
                                            });
                                        }
                                    } else if (responseCode == 403) { // Error Message - Account already exists
                                        showMessage({
                                            message: `Error: Create account failed. ${'\n'}${'\n'} Account already exists with the current email.`,
                                            type: "danger",
                                            autoHide: true,
                                            duration: 2500,
                                            backgroundColor: "#ff504a",
                                            color: "#fafafa",
                                            icon: "danger"
                                        });

                                    } else { // Error Message - create account failed 
                                        showMessage({
                                            message: `Error: Create Account failed. ${'\n'}${'\n'}Please check double-check your information and try again.`,
                                            type: "danger",
                                            autoHide: true,
                                            duration: 2000,
                                            backgroundColor: "#ff504a",
                                            color: "#fafafa",
                                            icon: "danger"
                                        });
                                    }
                                }
                            }

                        }}
                    >
                        <Text style={{ color: 'white' }}>ACCEPT</Text>
                    </TouchableOpacity>

                    {/*Decline - go to the Start of the app*/}
                    <TouchableOpacity
                        style={styles.buttonTC}
                        onPress={() => { navigation.popToTop() }}

                    >
                        <Text style={{ color: 'white' }}>DECLINE</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>

    )
}

export default Terms_Conditions;