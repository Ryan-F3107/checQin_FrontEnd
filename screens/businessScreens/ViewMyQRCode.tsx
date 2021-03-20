import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { IconButton } from 'react-native-paper';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import QRCode from 'react-native-qrcode-svg';
import styles from '../../styling/styles';

function ViewMyQRCode({ navigation, route }) {
    const { receivedUI } = route.params;
    console.log("View my QR: ", receivedUI);

    async function execute() {
        const html = `
        <head>
        <meta name="viewport" content ="width=device-width,initial-scale=1,user-scalable=yes" />
        </head>
        <h1>Hello</h1>
        <img
        alt="Image"
        src=""
        width="250" height="250"/>`;
        //const {uri} = '../../logo/logoPlaceholder.png';
        const response = await Print.printToFileAsync({ html });

        const pdfName = `${response.uri.slice(0, response.uri.lastIndexOf('/') + 1)}MyQRCode.pdf`;
        await FileSystem.moveAsync({
            from: response.uri,
            to: pdfName
        })
        Sharing.shareAsync(pdfName);
    }

    return (
        <View style={styles.homeContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <IconButton
                    style={styles.helpButton}
                    icon="help-box"
                    size={35}
                    color={'lightblue'}
                    onPress={() => { navigation.replace("HelpMyQRCode") }}
                ></IconButton>

                <IconButton
                    style={styles.closeButton}
                    icon="close"
                    size={35}
                    color={'black'}
                    onPress={() => { navigation.goBack() }}
                ></IconButton>
            </View>

            <Text style={{ marginTop: -15, marginLeft: 22 }}>Help</Text>

            <View style={styles.QRCodeContainer}>
                <Text style={styles.QRcodeTitle}> My QR Code </Text>
                <TouchableOpacity
                    onPress={() => navigation.replace("AboutMyQRCode")}>

                    <View
                        style={{ alignSelf: 'center', marginTop: 10, marginBottom: 100 }}>
                        <QRCode
                            value="example@example.com"
                            size={200}
                            logoBackgroundColor='transparent'
                        />
                    </View>

                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.ViewQRCodebutton}
                    onPress={() => execute()}
                >
                    <Text style={{ color: '#fafafa', alignSelf: 'center' }}>Download PDF</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.ViewQRCodebutton}
                //onPress={() => navigation.replace("HomeBusiness")}
                >
                    <Text style={{ color: '#fafafa', alignSelf: 'center' }}>Send to my email</Text>
                </TouchableOpacity>
            </View >

        </View >
    )
}
export default ViewMyQRCode;