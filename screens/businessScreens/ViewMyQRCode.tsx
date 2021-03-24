import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import QRCode from 'react-native-qrcode-svg';
import styles from '../../styling/styles';


class ViewMyQRCode extends React.Component {
    constructor(props) {
        super(props);
        this.state = { qrCode: "" };
    }

    componentDidMount() {
        this.getDataURL();
    }

    async sharePDF() {

        // The <head> tag makes sure that a page has only one page.
        // QR code is displayed at the centre of the page.
        const html =
            `<head>
        <meta name="viewport" content ="width=device-width,initial-scale=1,user-scalable=yes" />
        </head>
        
        <style>
        div {
            text-align: center;
            margin-top: 100px;
        }
        </style>
        
        <div>
        <img
        src="data:image/jpeg;base64,${this.state.qrCode}"
        alt="*Error: Please try again."
        width="200" height="200"
        />
        </div>`;

        // Make html to pdf file
        const response = await Print.printToFileAsync({ html });
        console.log("Print: ", response.uri);

        //File name
        const pdfFileName = `${response.uri.slice(0, response.uri.lastIndexOf('/') + 1)}MyQRCode.pdf`;

        await FileSystem.moveAsync({
            from: response.uri,
            to: pdfFileName
        });

        // Finally able to share a PDF file
        Sharing.shareAsync(pdfFileName);
    }

    getDataURL() {
        this.svg.toDataURL(this.callback);
    }

    callback = (dataURL) => {
        this.setState({ qrCode: dataURL });
    }

    render() {
        return (
            <View style={styles.homeContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                    {/*Help Button*/}
                    <IconButton
                        style={styles.helpButton}
                        icon="help-box"
                        size={35}
                        color={'lightblue'}
                        onPress={() => { this.props.navigation.navigate("HelpMyQRCode") }}
                    ></IconButton>

                    {/*Close Button*/}
                    <IconButton
                        style={styles.closeButton}
                        icon="close"
                        size={35}
                        color={'black'}
                        onPress={() => { this.props.navigation.goBack() }}
                    ></IconButton>

                </View>
                <Text style={{ marginTop: -15, marginLeft: 22 }}>Help</Text>

                {/*Main Section of the screen*/}
                <View style={styles.QRCodeContainer}>
                    <Text style={styles.QRcodeTitle}> My QR Code </Text>

                    {/*Preview*/}
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate("AboutMyQRCode", { id: this.props.route.params.receivedUserInfo["id"] })}>

                        <View
                            style={{ alignSelf: 'center', marginTop: 10, marginBottom: 100 }}>

                            <QRCode // Create and display a QR code
                                value={`${this.props.route.params.receivedUserInfo["id"]}`}  // QR code is created based on a business id
                                size={200}
                                logoBackgroundColor='transparent'

                                getRef={(qrc) => (this.svg = qrc)}
                            />
                        </View>

                    </TouchableOpacity>

                    {/*Share PDF Button*/}
                    <TouchableOpacity
                        style={styles.ViewQRCodebutton}
                        onPress={() => this.sharePDF()}
                    >
                        <Text style={{ color: '#fafafa', alignSelf: 'center' }}>Share PDF</Text>

                    </TouchableOpacity>

                </View >

            </View >
        )
    }
}
export default ViewMyQRCode;