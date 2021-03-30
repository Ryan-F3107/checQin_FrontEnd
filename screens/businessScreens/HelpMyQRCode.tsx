import React from 'react';
import { Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import styles from '../../styling/styles';
import { ScrollView } from 'react-native-gesture-handler';

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
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.QRcodeQuestionTitle}> What happens when a customer scan a QR code? </Text>
                    <Text style={styles.QRcodeAnswer}>
                        {'\n'}Scanning the QR code allows
                    {'\n'}customers to check into your business.
                    {'\n'}
                        {'\n'}The QR code sends information about
                    {'\n'} * your business
                    {'\n'} * customer's contact information and the total number of people who were checked in as one group
                    {'\n'}
                    </Text>

                    <Text style={styles.QRcodeQuestionTitle}> How to display a QR code? </Text>
                    <Text style={styles.QRcodeAnswer}>
                        {'\n'} 1.   Get a copy of your QR code by
                    {'\n'}      tapping the "Share PDF"
                    {'\n'}      button.
                        {'\n'}
                        {'\n'} 2.   Post it wherever your customers
                    {'\n'}      can see it well and scan it easily,
                    {'\n'}      such as at the entrance,
                    {'\n'}      at the cash register,
                    {'\n'}      and/or around a waiting area.

                    {'\n'}
                    </Text>
                </ScrollView>
            </View >
        </View >
    )
}
export default HelpMyQRCode;