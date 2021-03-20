import React from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { IconButton } from 'react-native-paper';
import styles from '../styling/styles';

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
                <Text style={styles.QRcodeTitle}> About cheQIn </Text>
                <ScrollView
                    showsVerticalScrollIndicator={false}>
                    <Text style={styles.QRcodeQuestionTitle}> What is cheQIn? </Text>
                    <Text style={styles.QRcodeAnswer}>
                        {'\n'}cheQIn is a contactless QR code check-in mobile application.
                        {'\n'}
                        {'\n'}As a customer/visitor, you can safely check into a business in no time by simply scanning a QR code posted by a business!
                        {'\n'}
                        {'\n'}Alternatively, a business can manually check customers in.
                        {'\n'}
                    </Text>

                    <Text style={styles.QRcodeQuestionTitle}> How do I edit my contact information? </Text>
                    <Text style={styles.QRcodeAnswer}>
                        {'\n'}Click the "My Profile" button to update your contact information at any time.
                        {'\n'}
                    </Text>

                    <Text style={styles.QRcodeQuestionTitle}> What happens when I delete my account? </Text>
                    <Text style={styles.QRcodeAnswer}>
                        {'\n'}Once you delete your account, all your personal information will be deleted.
                        {'\n'}
                        {'\n'}However, your visit history will be retained in a database for contact tracing purposes.
                        {'\n'}
                        {'\n'}If you want to use checQin again after deleting your account, please create an account again.
                        {'\n'}
                    </Text>
                </ScrollView>
            </View >
        </View >
    )
}
export default Help;