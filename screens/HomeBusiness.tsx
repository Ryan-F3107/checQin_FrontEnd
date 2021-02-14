import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import { createDrawerNavigator, DrawerItemList, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { IconButton, Divider } from 'react-native-paper';
import profile from './profile';

import styles from '../styling/styles';


const ReactDrawer = createDrawerNavigator();

function First({ navigation }) {
    return (
        <View style={styles.homeContainer}>
            <IconButton
                style={styles.menuButton}
                icon="menu"
                size={50}
                color='black'
                onPress={() => { navigation.openDrawer() }}
            ></IconButton>
            <View style={styles.BusinessViewbutton}>
                <TouchableOpacity style={styles.BusinessCheckInBtn}>
                    <IconButton
                        size={30}
                        icon="account-check" />
                    <Text style={styles.BusinessButtonText}>Check In</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.BusinessViewQR}>
                <TouchableOpacity style={styles.BusinessButton}>
                    <IconButton
                        size={30}
                        icon="cellphone-arrow-down" />
                    <Text style={styles.BusinessButtonText}> View APP QR Code</Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.BusinessButton}>
                    <IconButton
                        size={30}
                        icon="qrcode" />
                    <Text style={styles.BusinessButtonText}>View QR Code Information</Text>
                </TouchableOpacity>
            </View>

        </View>
    )

}

function CustomDrawerItemList(props) {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <Divider style={{ borderBottomWidth: 1, borderColor: 'lightgrey', width: 250, alignSelf: 'center' }} />
            <DrawerItem
                style={styles.deleteAccount}
                icon={() => (<IconButton
                    icon="logout" />)}
                label="Log Out"
                onPress={() => props.navigation.navigate("Start")}>

            </DrawerItem >
            <Divider style={{ borderBottomWidth: 1, borderColor: 'lightgrey', width: 250, alignSelf: 'center' }} />
            <DrawerItem
                icon={() => (<IconButton
                    icon="account-remove-outline"
                    color="red" />)}
                label="Delete Account"
                onPress={() => props.navigation.navigate("HomeBusiness")}>

            </DrawerItem >
        </DrawerContentScrollView>
    );
}

function Mydrawer() {
    return (
        <ReactDrawer.Navigator
            drawerPosition="right"
            drawerContentOptions={{
                activeBackgroundColor: 'transparent',
            }}
            drawerType="slide"
            drawerContent={props => <CustomDrawerItemList {...props} />} >
            <ReactDrawer.Screen name="HomeBusiness" component={First}
                options={{
                    title: "",
                }} />
            <ReactDrawer.Screen name="Profile" component={profile}
                options={{
                    title: "My Profile",
                    drawerIcon: (() => (
                        <IconButton
                            icon="account" />
                    ))
                }} />
            <ReactDrawer.Screen name="ChangePassword" component={profile}
                options={{
                    title: "Change Password",
                    drawerIcon: (() => (
                        <IconButton
                            icon="lock-open" />
                    ))
                }} />
            <ReactDrawer.Screen name="Help" component={profile}
                options={{
                    title: "Help",
                    drawerIcon: (() => (
                        <IconButton
                            icon="help" />
                    ))
                }} />
        </ReactDrawer.Navigator>
    );
}

function HomeBusiness() {
    return (
        <Mydrawer />
    );
}

export default HomeBusiness;

