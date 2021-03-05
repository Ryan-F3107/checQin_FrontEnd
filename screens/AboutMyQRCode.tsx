import React from 'react';
import { Text, View, TouchableOpacity, Image, TextInput } from 'react-native';
import { IconButton } from 'react-native-paper';
//import * as Print from 'expo-print';
import styles from '../styling/styles';

function AboutMyQRCode({ navigation }) {
    const v = "ABC company"
    return (
        <View style={styles.homeContainer}>
            <IconButton
                style={styles.closeButton}
                icon="close"
                size={35}
                color={'black'}
                onPress={() => { navigation.replace("ViewMyQRCode") }}
            ></IconButton>
            <Text style={{ alignSelf: 'center', fontSize: 30, paddingBottom: 10 }}> Preview </Text>
            <View style={styles.EditQRCodeContainer}>
                <TextInput
                    placeholder={v}
                    style={{ alignSelf: 'center', marginTop: 20, fontSize: 30, paddingBottom: 10 }} />
                <Image
                    //Will be an image of a poster
                    //uri 
                    source={require('../logo/logoPlaceholder.png')}
                    style={{ alignSelf: 'center', width: 250, height: 250, marginTop: 50, marginBottom: 100, borderWidth: 1, resizeMode: 'contain' }} />
                <TextInput
                    placeholder="Edit Message: Scan the QR code to check into our business."
                    multiline={true}
                    numberOfLines={5}
                    style={{ alignSelf: 'center', borderBottomWidth: 1, width: 300, fontSize: 20, paddingBottom: 10 }} />
            </View >

            <TouchableOpacity
                style={styles.ViewQRCodebutton}
                onPress={() => navigation.replace("ViewMyQRCode")}
            >
                <Text style={{ color: '#fafafa', alignSelf: 'center' }}>Save</Text>
            </TouchableOpacity>


        </View >
    )
}
export default AboutMyQRCode;