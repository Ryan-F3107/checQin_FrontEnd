import React from 'react';
import { Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import styles from '../../styling/styles';

//Preview of the QR code
function About_MyQRcode({ navigation, route }) {
    const { id } = route.params;
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

            <Text style={{ alignSelf: 'center', fontSize: 30, paddingBottom: 10 }}> Preview </Text>

            {/*A large version of the QR code*/}
            <View style={styles.PreviewQRCodeContainer}>
                <View
                    style={{ alignSelf: 'center', marginTop: 50, marginBottom: 100 }}>
                    <QRCode
                        value={`${id}`}
                        size={300}
                        logoBackgroundColor='transparent'
                    />
                </View>
            </View >
        </View >
    )
}
export default About_MyQRcode;