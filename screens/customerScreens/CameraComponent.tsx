import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button,Text } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { IconButton } from 'react-native-paper';
import styles from '../../styling/styles';

function CameraComponent({navigation}){
    
    const [hasPermission, setHasPermission] = useState(null);   //Permission state to use the camera of OS
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    //Function called once QR code is scanned
    const handleBarCodeScanned = ({type, data}) => {
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned`);

    };

    if(hasPermission === null){
        return <Text>Requesting for camera permission</Text>
    }
    if(hasPermission === false) {
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
                    onBarCodeScanned = {scanned ? undefined : handleBarCodeScanned}
                    style= {StyleSheet.absoluteFillObject} />
                {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
            </View>
        </View>
        
        
    )
}   //end of function

const style = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent:'center'
    }
  })

  export default CameraComponent;

  //Reference for QR code scanner: https://docs.expo.io/versions/latest/sdk/bar-code-scanner/