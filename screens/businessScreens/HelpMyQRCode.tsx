import React from 'react';
import { Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import styles from '../../styling/styles';

function HelpMyQRCode({ navigation }) {
    return (
        <View style={styles.homeContainer}>
            <IconButton
                style={styles.closeButton}
                icon="close"
                size={35}
                color={'black'}
                onPress={() => { navigation.replace("ViewMyQRCode") }}
            ></IconButton>

            <View style={styles.QRCodeContainer}>
                <Text style={styles.QRcodeTitle}> QR Code FAQ </Text>

                <Text style={styles.QRcodeQuestionTitle}> What is a QR code? </Text>
                <Text style={styles.QRcodeAnswer}> A QR code is...
                {'\n'}
                    {'\n'} </Text>

                <Text style={styles.QRcodeQuestionTitle}> What happends when a customer scan a QR code? </Text>
                <Text style={styles.QRcodeAnswer}> The QR code contains information about
                 {'\n'} - location of your business
                 {'\n'} - check-in time
                ...
                {'\n'}
                    {'\n'}
                    {'\n'}
                </Text>

                <Text style={styles.QRcodeQuestionTitle}> How to display a QR code? </Text>
                <Text style={styles.QRcodeAnswer}>{'\n'} {'\n'} {'\n'} </Text>


            </View >

        </View >
    )
}
export default HelpMyQRCode;