import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Linking } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Checkbox } from 'react-native-paper';
import { showMessage } from 'react-native-flash-message';
import styles from '../styling/styles';

function Terms_Conditions({ navigation, route }) {
    const [checkedPolicy, setPolicy] = useState(false);
    const [checkedTC, setTC] = useState(false);
    const { accountType, firstName, lastName, phoneNum, email, password, businessName, street, city, province, postalCode, capacity } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.titleTC}> Terms & Conditions </Text>
            <Text
                style={styles.TClabels}>cheQIn</Text>
            <Text style={{ paddingBottom: 30 }}>cheQIn is a mobile applicaiton that allows users to check into a businesses by scanning a QR code. </Text>

            <Text style={styles.TClabels}>Data Collection</Text>
            <View style={{ height: 110, marginBottom: 10 }}>
                <ScrollView
                    style={styles.scrollview}
                    showsVerticalScrollIndicator={true}>
                    <Text>In General: </Text>
                    <Text>- Camera Permession</Text>
                    <Text>- Location Permession</Text>
                    <Text></Text>
                    <Text>For a personal account: </Text>
                    <Text>- Full Name</Text>
                    <Text>- Phone Number</Text>
                    <Text>- Email Address</Text>
                    <Text></Text>
                    <Text>For a business account: </Text>
                    <Text>- Business Name</Text>
                    <Text>- Phone Number</Text>
                    <Text>- Address</Text>
                    <Text>- Capacity of your business</Text>
                    <Text>- Email Address</Text>
                    <Text></Text>
                </ScrollView>
            </View>

            {/* Check or uncheck "I understand..."*/}
            <View style={{ flexDirection: "row", marginTop: 10, marginBottom: 20 }}>

                <Checkbox.Android
                    color='#fcba03'
                    status={checkedPolicy ? 'checked' : 'unchecked'}
                    onPress={() => { setPolicy(!checkedPolicy) }}
                />
                <Text style={{ marginTop: 10 }}> I understand and agree.</Text>
            </View>

            {/*Full Terms and Conditions*/}
            <Text style={{ color: 'blue', marginTop: 10, marginBottom: 15, fontSize: 20, textDecorationLine: 'underline' }} onPress={() => Linking.openURL("https://www.google.ca/")}>
                Full Terms and Conditions
                </Text>
            <View style={{ flexDirection: "row", marginBottom: 5 }}>
                <Checkbox.Android
                    color='#fcba03'
                    status={checkedTC ? 'checked' : 'unchecked'}
                    onPress={() => { setTC(!checkedTC) }}
                />
                <Text> I have read and agree to {'\n'} the Terms and Conditions.</Text>
            </View>

            {/* Accept - Send all the collected information to the backend */}
            <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 30 }}>
                <TouchableOpacity
                    style={styles.buttonTC}
                    disabled={!checkedTC || !checkedPolicy}
                    onPress={async () => {

                        if (accountType == "customer") {
                            let response = await fetch('http://127.0.0.1:8000/checkin/customer/create_account/', {
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
                                    phone_num: phoneNum
                                })
                            }); //end of response
                            let json = await response.json();
                            let responseCode = await response.status;

                            // If the backend has successfully created an account, send the success code
                            if (responseCode == "201") {
                                navigation.navigate('Home', {
                                    userInfo: json
                                })
                            } else {
                                showMessage({
                                    message: "Error: Create Account failed. Please re-check your information and try again.",
                                    type: "danger",
                                    autoHide: true,
                                    duration: 2000,
                                    backgroundColor: "#ff504a",
                                    color: "#fafafa",
                                    icon: "danger"
                                });
                            }

                        } else if (accountType == "business") {
                            var full = street + " " + city + " " + province + " " + postalCode;

                            let response = await fetch('http://127.0.0.1:8000/checkin/business/create_account/', {
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
                                    address: full,
                                    capacity: capacity
                                })
                            }); //end of response
                            let json = await response.json();
                            let responseCode = await response.status;

                            // If the backend has successfully created an account, send the success code
                            if (responseCode == "201") {
                                navigation.navigate('HomeBusiness', {
                                    userInfo: json
                                })
                            } else {
                                showMessage({
                                    message: "Error: Create Account failed. Please re-check your information and try again.",
                                    type: "danger",
                                    autoHide: true,
                                    duration: 2000,
                                    backgroundColor: "#ff504a",
                                    color: "#fafafa",
                                    icon: "danger"
                                });
                            }
                        }
                    }}
                >
                    <Text style={{ color: 'white' }}>ACCEPT</Text>
                </TouchableOpacity>

                {/*Decline - go back to the Start of the app*/}
                <TouchableOpacity
                    style={styles.buttonTC}
                    onPress={() => { navigation.navigate('Start') }}

                >
                    <Text style={{ color: 'white' }}>DECLINE</Text>
                </TouchableOpacity>
            </View>


        </View>

    )
}

export default Terms_Conditions;