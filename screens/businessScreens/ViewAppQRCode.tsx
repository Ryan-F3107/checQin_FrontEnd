import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { IconButton } from 'react-native-paper';
import styles from '../../styling/styles';

function ViewAppQRCode({ navigation }) {
    return (
        <View style={styles.homeContainer}>
            <IconButton
                style={styles.closeButton}
                icon="close"
                size={35}
                color={'black'}
                onPress={() => { navigation.goBack() }}
            ></IconButton>
            <View style={styles.QRCodeContainer}>
                <Text style={{ alignSelf: 'center', fontSize: 30, paddingBottom: 10 }}> App QR Code </Text>
                <Image
                    source={require('../../logo/logoPlaceholder.png')}
                    style={{ width: 250, height: 250, marginTop: 10, marginBottom: 100, borderWidth: 1, resizeMode: 'contain' }} />

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
                    <Text style={{ color: '#fafafa', alignSelf: 'center' }}>Send to Email</Text>
                </TouchableOpacity>
            </View >

        </View >
    )
}
export default ViewAppQRCode;