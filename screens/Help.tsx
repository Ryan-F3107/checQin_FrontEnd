import React from 'react';
import { Text, View, Linking } from 'react-native';
import { IconButton } from 'react-native-paper';
import styles from '../styling/styles';

function Help({ navigation, route }) {
    const { accountType } = route.params;
    return (
        <View style={styles.homeContainer}>
            <IconButton
                style={styles.closeButton}
                icon="close"
                size={35}
                color={'black'}
                onPress={() => {
                    if (accountType == "customer") {
                        navigation.replace('Home');

                    } else if (accountType == "business") {
                        navigation.replace('HomeBusiness');
                    }
                }}
            ></IconButton>

            <View style={styles.QRCodeContainer}>
                <Text style={styles.QRcodeTitle}> About {"<"} APP {">"} </Text>

                <Text style={styles.QRcodeQuestionTitle}> APP </Text>
                <Text style={styles.QRcodeAnswer}> APP is...
                {'\n'}
                    {'\n'}
                </Text>

            </View >

        </View >
    )
}
export default Help;