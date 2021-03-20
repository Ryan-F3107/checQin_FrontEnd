import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import * as Linking from 'expo-linking';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

import { IconButton } from 'react-native-paper';
import styles from '../../styling/styles';

class ViewAppQRCode extends React.Component {
    constructor(props) {
        super(props)
    }

    async execute() {

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
                        source={require('../../logo/logoPlaceholder.png')}
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