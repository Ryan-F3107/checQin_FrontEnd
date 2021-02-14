import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';
import styles from '../styling/styles';


function Profile({ navigation }) {
    return (
        <View style={styles.homeContainer}>
            <IconButton
                style={styles.closeButton}
                icon="close"
                size={35}
                color={'black'}
                onPress={() => { navigation.goBack() }}
            ></IconButton>
        </View>
    )
}

export default Profile;