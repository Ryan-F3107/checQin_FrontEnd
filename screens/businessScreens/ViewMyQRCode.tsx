import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { IconButton } from 'react-native-paper';
import styles from '../../styling/styles';

function ViewMyQRCode({ navigation }) {
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
                    <Image
                        source={require('../../logo/logoPlaceholder.png')}
                        style={{ alignSelf: 'center', width: 250, height: 250, marginTop: 10, marginBottom: 100, borderWidth: 1, resizeMode: 'contain' }} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.ViewQRCodebutton}
                //onPress={() => navigation.replace("HomeBusiness")}
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