import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { IconButton } from 'react-native-paper';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import QRCode from 'react-native-qrcode-svg';
import styles from '../../styling/styles';


class ViewMyQRCode extends React.Component {
    constructor(props) {
        super(props);
        this.state = { qrData: "" };
    }

    componentDidMount() {
        this.getDataURL();
    }

    async execute() {
        const html = `
        <head>
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
        src="data:image/jpeg;base64,${this.state.qrData}"
        alt="*Error: Please contact cheQIn."
        width="200" height="200"
        />
        </div>`;
        const response = await Print.printToFileAsync({ html });

        const pdfName = `${response.uri.slice(0, response.uri.lastIndexOf('/') + 1)}MyQRCode.pdf`;
        await FileSystem.moveAsync({
            from: response.uri,
            to: pdfName
        });
        Sharing.shareAsync(pdfName);
    }

    getDataURL() {
        this.svg.toDataURL(this.callback);
        console.log(this.props.route.params.receivedUserInfo["id"])
    }

    callback = (dataURL) => {
        this.setState({ qrData: dataURL });
    }

    render() {
        return (
            <View style={styles.homeContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <IconButton
                        style={styles.helpButton}
                        icon="help-box"
                        size={35}
                        color={'lightblue'}
                        onPress={() => { this.props.navigation.navigate("HelpMyQRCode") }}
                    ></IconButton>

                    <IconButton
                        style={styles.closeButton}
                        icon="close"
                        size={35}
                        color={'black'}
                        onPress={() => { this.props.navigation.goBack() }}
                    ></IconButton>
                </View>

                <Text style={{ marginTop: -15, marginLeft: 22 }}>Help</Text>

                <View style={styles.QRCodeContainer}>
                    <Text style={styles.QRcodeTitle}> My QR Code </Text>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate("AboutMyQRCode")}>

                        <View
                            style={{ alignSelf: 'center', marginTop: 10, marginBottom: 100 }}>

                            <QRCode

                                value={`${this.props.route.params.receivedUserInfo["id"]}`}
                                size={200}
                                logoBackgroundColor='transparent'

                                getRef={(c) => (this.svg = c)}
                            />
                        </View>

                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.ViewQRCodebutton}
                        onPress={() => this.execute()}
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
}
export default ViewMyQRCode;