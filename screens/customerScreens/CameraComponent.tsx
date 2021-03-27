import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { IconButton } from 'react-native-paper';
import styles from '../../styling/styles';
import { showMessage } from 'react-native-flash-message';
import { HOST_ADDRESS } from '../connectToBackend';
import moment from 'moment';    //For Date

function CameraComponent({ navigation, route }) {
    const { numVisit, receivedUserInfo } = route.params;
    const [hasPermission, setHasPermission] = useState(null);   //Permission state to use the camera of OS
    const [scanned, setScanned] = useState(false);
    const popAction = StackActions.pop(2);

    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        var date = (moment().isDST()) ? moment().utcOffset('-04:00').format('YYYY-MM-DD HH:mm:ss') : moment().utcOffset('-05:00').format('YYYY-MM-DD HH:mm:ss');
        setCurrentDate(date);
    }, []);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    //Function called once QR code is scanned
    const handleBarCodeScanned = async ({ data }) => {
        setScanned(true);

        var link = `${HOST_ADDRESS}/checkin/visit/create_visit/`;
        let response = await fetch(link, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + receivedUserInfo["access"],
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                dateTime: currentDate,
                customer: receivedUserInfo["id"],
                business: data,
                numVisitors: numVisit
            })
        })
        var responseCode = await response.status;

        if (responseCode == 201) {
            showMessage({
                message: `Checked in successfully!`,
                type: "success",
                autoHide: true,
                duration: 2000,
                backgroundColor: "#219903",
                color: "#fafafa",
                icon: "success"
            });
            navigation.dispatch(popAction);

        } else {
            //Add Error Message
            showMessage({
                message: `Error: `,
                type: "danger",
                autoHide: true,
                duration: 2500,
                backgroundColor: "#ff504a",
                color: "#fafafa",
                icon: "danger"
            });
        }

    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>
    }
    if (hasPermission === false) {
        return <Text> no access to camera </Text>
    }
    return (
        <View style={styles.homeContainer}>
            <IconButton	//Adding the exit icon to the top-right corner
                style={styles.closeButton}
                icon="close"
                size={35}
                color={'black'}
                onPress={() => {
                    navigation.goBack();
                }}
            ></IconButton>
            <View style={style.container}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject} />
                {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
            </View>
        </View>


    )
}   //end of function

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    }
})

export default CameraComponent;

  //Reference for QR code scanner: https://docs.expo.io/versions/latest/sdk/bar-code-scanner/