import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Checkbox } from 'react-native-paper';


function Terms_Conditions({ navigation }) {
    const [checkedPolicy, setPolicy] = useState(false);
    const [checkedTC, setTC] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.title}> Terms & Conditions </Text>
            <Text
                style={styles.labels}>__NAME OF OUR APP__</Text>
            <Text>__NAME OF OUR APP__ is a mobile applicaiton that allows users to check into a businesses by scanning a QR. </Text>

            <Text style={styles.labels}>Data Collection</Text>
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
                    onPress={() => { navigation.navigate('Home') }}
                >
                    <Text style={{ color: 'white' }}>DECLINE</Text>
                </TouchableOpacity>
            </View>


        </View>

    )
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
    labels: {
        fontSize: 20,
        paddingTop: 20,
        paddingBottom: 10,
    },
    textInput: {
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    scrollview: {
        borderColor: '#e3e3e3',
        backgroundColor: '#f3f2f5',
        borderWidth: 2,
        borderRadius: 5,
        paddingLeft: 10,
        padding: 5,
    },
    buttonAccept: {
        backgroundColor: '#0a0540',
        padding: 15,
        marginRight: 15,
        marginTop: 20,
        marginBottom: 30,
        borderRadius: 25,
        shadowColor: 'rgba(1, 1, 1, 0.25)',
        shadowOpacity: 0.9,
        shadowRadius: 13,
        shadowOffset: { width: 1, height: 10 }
    },
    buttonDecline: {
        backgroundColor: '#0a0540',
        padding: 15,
        marginLeft: 15,
        marginTop: 20,
        marginBottom: 30,
        borderRadius: 25,
        shadowColor: 'rgba(1, 1, 1, 0.25)',
        shadowOpacity: 0.9,
        shadowRadius: 13,
        shadowOffset: { width: 1, height: 10 }
    }
})

export default Terms_Conditions;