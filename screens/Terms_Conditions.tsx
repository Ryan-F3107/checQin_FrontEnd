import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Linking } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Checkbox } from 'react-native-paper';
import styles from '../styling/styles';

function Terms_Conditions({ navigation, route }) {
    const [checkedPolicy, setPolicy] = useState(false);
    const [checkedTC, setTC] = useState(false);
    const { accountType } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.titleTC}> Terms & Conditions </Text>
            <Text
                style={styles.TClabels}>__NAME OF OUR APP__</Text>
            <Text style={{ paddingBottom: 30 }}>__NAME OF OUR APP__ is a mobile applicaiton that allows users to check into a businesses by scanning a QR. </Text>

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
            <View style={{ flexDirection: "row", marginTop: 10, marginBottom: 20 }}>

                <Checkbox.Android
                    color='#fcba03'
                    status={checkedPolicy ? 'checked' : 'unchecked'}
                    onPress={() => { setPolicy(!checkedPolicy) }}
                />
                <Text style={{ marginTop: 10 }}> I understand and agree.</Text>
            </View>

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

            <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 30 }}>
                <TouchableOpacity
                    style={styles.buttonTC}
                    disabled={!checkedTC || !checkedPolicy}
                    onPress={() => {
                        if (accountType == "customer") {
                            navigation.navigate('Home')
                        } else if (accountType == "business") {
                            navigation.navigate('HomeBusiness')
                        }
                    }
                    }
                >
                    <Text style={{ color: 'white' }}>ACCEPT</Text>
                </TouchableOpacity>
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