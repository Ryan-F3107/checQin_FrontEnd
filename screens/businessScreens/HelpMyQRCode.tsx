import React from 'react';
import { Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import styles from '../../styling/styles';

function HelpMyQRCode({ navigation }) {
    return (
        <View style={styles.homeContainer}>

            {/*Close Button*/}
            <IconButton
                style={styles.closeButton}
                icon="close"
                size={35}
                color={'black'}
                onPress={() => { navigation.goBack() }}
            ></IconButton>

            {/*QR Code FAQ*/}
            <View style={styles.QRCodeContainer}>
                <Text style={styles.QRcodeTitle}> QR Code FAQ </Text>

                <Text style={styles.QRcodeQuestionTitle}> What happends when a customer scan a QR code? </Text>
                <Text style={styles.QRcodeAnswer}>
                    {'\n'}Scanning the QR code allows
                    {'\n'}customers to check into your business.
                    {'\n'}
                    {'\n'}The QR code sends information about
                    {'\n'} * your business
                    {'\n'} * customer information
                    {'\n'}
                </Text>

                <Text style={styles.QRcodeQuestionTitle}> How to display a QR code? </Text>
                <Text style={styles.QRcodeAnswer}>
                    {'\n'} 1.   Download the QR code by clicking
                    {'\n'}      the "Download PDF" button.
                    {'\n'}
                    {'\n'} 2.   Post it wherever your customers
                    {'\n'}      can see it well and scan it easily,
                    {'\n'}      such as at the entrance,
                    {'\n'}      at the cash register,
                    {'\n'}      and/or around a waiting area.

                    {'\n'}
                </Text>
            </View >
        </View >
    )
}
export default HelpMyQRCode;