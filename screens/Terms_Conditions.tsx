import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Linking } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Checkbox } from 'react-native-paper';
import styles from '../styling/styles';

function Terms_Conditions({ navigation }) {
    const [checkedPolicy, setPolicy] = useState(false);
    const [checkedTC, setTC] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.title}> Terms & Conditions </Text>
            <Text
                style={styles.TClabels}>__NAME OF OUR APP__</Text>
            <Text>__NAME OF OUR APP__ is a mobile applicaiton that allows users to check into a businesses by scanning a QR. </Text>

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
            <View style={{ flexDirection: "row", marginBottom: 5 }}>

                <Checkbox.Android
                    color='#fcba03'
                    status={checkedPolicy ? 'checked' : 'unchecked'}
                    onPress={() => { setPolicy(!checkedPolicy) }}
                />
                <Text style={{ marginTop: 10 }}> I understand and agree.</Text>
            </View>

            <Text style={{ color: 'blue', marginTop: 10, padding: 10, fontSize: 20, textDecorationLine: 'underline' }} onPress={() => Linking.openURL("https://www.google.ca/")}>
                Full Terms and Conditions
                </Text>
            <View style={{ flexDirection: "row", marginBottom: 5 }}>
                <Checkbox.Android
                    color='#fcba03'
                    status={checkedTC ? 'checked' : 'unchecked'}
                    onPress={() => { setTC(!checkedTC) }}
                />
                <Text> I have read and agree to the Terms and Conditions.</Text>
            </View>


            {/*<IconButton
                    style={{alignSelf: 'center'}}
                    icon="arrow-right-bold"
                    size={50}
                    color={'white'}
                    onPress={() => { navigation.navigate('Home') }}
                //disabled={this.checkForm()}
                ></IconButton>*/}
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                <TouchableOpacity
                    style={styles.buttonAccept}
                    onPress={() => { navigation.navigate('Home') }}
                    disabled={!checkedTC || !checkedPolicy}
                >
                    <Text style={{ color: 'white' }}>ACCEPT</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonDecline}
                    onPress={() => { navigation.navigate('Start') }}
                >
                    <Text style={{ color: 'white' }}>DECLINE</Text>
                </TouchableOpacity>
            </View>


        </View>

    )
}

export default Terms_Conditions;