import React from 'react';
import { Text, View, TouchableOpacity, Image, TextInput } from 'react-native';
import { IconButton } from 'react-native-paper';
//import * as Print from 'expo-print';
import QRCode from 'react-native-qrcode-svg';
import styles from '../../styling/styles';

function AboutMyQRCode({ navigation }) {
    const v = "ABC company"
    return (
        <View style={styles.homeContainer}>
            <IconButton
                style={styles.closeButton}
                icon="close"
                size={35}
                color={'black'}
                onPress={() => { navigation.goBack() }}
            ></IconButton>
            <Text style={{ alignSelf: 'center', fontSize: 30, paddingBottom: 10 }}> Preview </Text>
            <View style={styles.EditQRCodeContainer}>
                {/*<TextInput
                    //placeholder={v}
                style={{ alignSelf: 'center', marginTop: 20, fontSize: 30, paddingBottom: 10 }} />*/}

                <View
                    style={{ alignSelf: 'center', marginTop: 10, marginBottom: 100 }}>
                    <QRCode
                        value="example@example.com"
                        size={200}
                        logoBackgroundColor='transparent'
                    />
                </View>

                {/*<TextInput
                    //placeholder="Edit Message: Scan the QR code to check into our business."
                    //borderBottomWidth: 1,
                    multiline={true}
                    numberOfLines={5}
                style={{ alignSelf: 'center', width: 300, fontSize: 20, paddingBottom: 10 }} />*/}
            </View >

            {/*<TouchableOpacity
                style={styles.ViewQRCodebutton}
                onPress={() => navigation.replace("ViewMyQRCode")}
            >
                <Text style={{ color: '#fafafa', alignSelf: 'center' }}>Save</Text>
            </TouchableOpacity>*/}


        </View >
    )
}
export default AboutMyQRCode;