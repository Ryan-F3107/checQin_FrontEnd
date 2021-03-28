import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

import { IconButton } from 'react-native-paper';
import styles from '../../styling/styles';


//References:
// *Learned how to use Sharing and FileSystem from
//
//https://docs.expo.io/versions/latest/sdk/filesystem/
//https://docs.expo.io/versions/latest/sdk/sharing/

// As our app will not be available in app stores by March 31, 2021, 
// this screen will not be used.
class AppQRcode extends React.Component {
    constructor(props) {
        super(props)
    }

    async sharePDF() {

        const html = `
        <head>
        <meta name="viewport" content ="width=device-width,initial-scale=1.0,user-scalable=yes" />
        </head>
        <img
        alt="Image"
        src=""
        width="250" height="250"/>`;
        //const {uri} = '../../logo/colourLogo.png';

        // Make html to pdf file
        const pdfDocument = await Print.printToFileAsync({ html });

        var substitute = pdfDocument.uri.slice(pdfDocument.uri.lastIndexOf('/'), pdfDocument.uri.lastIndexOf('.'));

        // File name
        const pdfFileName = pdfDocument.uri.replace(substitute, `/${AppName.appName()}-AppQRCode`);
        await FileSystem.moveAsync({
            from: pdfDocument.uri,
            to: pdfFileName
        });

        // Finally able to share a PDF file
        Sharing.shareAsync(pdfFileName);
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
                        onPress={() => this.sharePDF()}
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
export default AppQRcode;