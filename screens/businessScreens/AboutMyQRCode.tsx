import React from 'react';
import { Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import styles from '../../styling/styles';

function AboutMyQRCode({ navigation, route }) {
    const { id } = route.params;
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
                <View
                    style={{ alignSelf: 'center', marginTop: 50, marginBottom: 100 }}>
                    <QRCode
                        value={`${id}`}
                        size={200}
                        logoBackgroundColor='transparent'
                    />
                </View>
            </View >
        </View >
    )
}
export default AboutMyQRCode;