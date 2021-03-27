import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

import { IconButton } from 'react-native-paper';
import styles from '../../styling/styles';

//References:
//https://docs.expo.io/versions/latest/sdk/filesystem/
//https://docs.expo.io/versions/latest/sdk/sharing/

// As our app will not be available in app stores by March 31, 2021, 
// this screen will not be used.
class ViewAppQRCode extends React.Component {
    constructor(props) {
        super(props)
    }

    async execute() {

        const html = `
        <head>
        <meta name="viewport" content ="width=device-width,initial-scale=1.0,user-scalable=yes" />
        </head>
        <img
        alt="Image"
        src=""
        width="250" height="250"/>`;
        //const {uri} = '../../logo/colourLogo.png';
        const response = await Print.printToFileAsync({ html });

        const pdfName = `${response.uri.slice(0, response.uri.lastIndexOf('/') + 1)}AppQRCode.pdf`;
        await FileSystem.moveAsync({
            from: response.uri,
            to: pdfName
        });
        Sharing.shareAsync(pdfName);
    }

    render() {
        return (
            <View style={styles.homeContainer}>
                <IconButton
                    style={styles.closeButton}
                    icon="close"
                    size={35}
                    color={'black'}
                    onPress={() => { this.props.navigation.goBack() }}
                ></IconButton>
                <View style={styles.QRCodeContainer}>
                    <Text style={{ alignSelf: 'center', fontSize: 30, paddingBottom: 10 }}> App QR Code </Text>
                    <Image
                        source={require('../../logo/colourLogo.png')}
                        style={{ width: 250, height: 250, marginTop: 10, marginBottom: 100, borderWidth: 1, resizeMode: 'contain' }} />

                    <TouchableOpacity
                        style={styles.ViewQRCodebutton}
                        onPress={() => this.execute()}
                    >
                        <Text style={{ color: '#fafafa', alignSelf: 'center' }}>Download PDF</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.ViewQRCodebutton}
                    //onPress={() => }
                    >
                        <Text style={{ color: '#fafafa', alignSelf: 'center' }}>Send to Email</Text>
                    </TouchableOpacity>
                </View >

            </View >
        )
    }

}
export default ViewAppQRCode;