import React from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { IconButton } from 'react-native-paper';
import styles from '../styling/styles';
import AppName from '../styling/AppName';

function Help({ navigation, route }) {
    const { accountType } = route.params;
    return (
        <View style={styles.homeContainer}>

            {/*Close Button at the top right*/}
            <IconButton
                style={styles.closeButton}
                icon="close"
                size={35}
                color={'black'}
                onPress={() => {
                    if (accountType == "customer") {
                        navigation.goBack();

                    } else if (accountType == "business") {
                        navigation.goBack();
                    }
                }}
            ></IconButton>

            {/*Writing about the app*/}
            <View style={styles.QRCodeContainer}>
                <Text style={styles.QRcodeTitle}> About {AppName.appName()} </Text>
                <ScrollView
                    showsVerticalScrollIndicator={false}>
                    <Text style={styles.QRcodeQuestionTitle}> What is {AppName.appName()}? </Text>
                    <Text style={styles.QRcodeAnswer}>
                        {'\n'}{AppName.appName()} is a contactless QR code
                        {'\n'}check-in mobile application.
                        {'\n'}
                        {'\n'}As a customer/visitor, you can safely check into a business in no time by simply scanning a QR code posted by a business!
                        {'\n'}
                        {'\n'}{AppName.appName()} stores your visits to the business and shares this data securely with trained health unit contact tracers.
                        {'\n'}The contact tracers reference this visit information to contact you, if you visited a certain business at the same time as someone who has tested positive for COVID-19 has.
                        {'\n'}
                        {'\n'}Alternatively, a business can manually check customers in.
                        {'\n'}
                    </Text>

                    <Text style={styles.QRcodeQuestionTitle}> How do I edit my contact information? </Text>
                    <Text style={styles.QRcodeAnswer}>
                        {'\n'}Click the "My Profile" button to update your contact information at any time.
                        {'\n'}
                    </Text>

                    <Text style={styles.QRcodeQuestionTitle}> How do I scan the business QR Code? </Text>
                    <Text style={styles.QRcodeAnswer}>
                        {'\n'}[1] Once you have logged in. Click the "Scan QR Code" button and then enter the number of people in your group (including yourself).
                        {'\n'}
                        {'\n'}[2] Once again click the "Scan QR Code" button to access the phone's camera.
                        {'\n'}
                        {'\n'}[3] Once you have given the app permission to use the camera. Have the phone placed 15-25 cm away from the QR code and the phone will automatically scan it.
                        {'\n'}
                        {'\n'}When the QR code is scanned, you will be directed to the home screen. 
                        {'\n'}
                    </Text>

                    <Text style={styles.QRcodeQuestionTitle}> What happens when I delete my account? </Text>
                    <Text style={styles.QRcodeAnswer}>
                        {'\n'}Your account will be deactivated and you will no longer be able to sign in.
                        {'\n'}
                        {'\n'}However, your visit and contact information history will be retained in a database for contact tracing purposes.
                        {'\n'}
                        {'\n'}If you want to use {AppName.appName()} again after deleting your account, please create an account again.
                        {'\n'}
                    </Text>
                </ScrollView>
            </View >
        </View >
    )
}
export default Help;