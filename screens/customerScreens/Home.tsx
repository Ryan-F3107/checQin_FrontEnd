import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import { createDrawerNavigator, DrawerItemList, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { IconButton, Divider } from 'react-native-paper';

import ChangePassword from '../ChangePassword';
import Help from '../Help';
import EditProfile from './EditProfile';

import styles from '../../styling/styles';

const ReactDrawer = createDrawerNavigator();
var userInformation = '';


// References:
// * Learned how to structure a menu side bar
// https://reactnavigation.org/docs/drawer-based-navigation/
// https://reactnavigation.org/docs/drawer-navigator/

// Main Screen
function MainScreen({ navigation }) {
    return (
        <View style={styles.homeContainer}>
            <IconButton
                style={styles.menuButton}
                icon="menu"
                size={40}
                color='black'
                onPress={() => { navigation.openDrawer() }}
            ></IconButton>
            <View style={styles.QRViewbutton}>
                <TouchableOpacity>
                    <IconButton
                        size={70}
                        icon="qrcode-scan"
                        onPress={() => { navigation.navigate("CheckInByQRCode", { receivedUserInfo: userInformation }) }}
                    />
                    <Text style={styles.qrCodeText}>Scan QR Code</Text>
                </TouchableOpacity>
            </View>

        </View>
    )

}

// Logout and Delete drawer list
function LDDrawerItemList(props) {
    return (

        <DrawerContentScrollView {...props} >

            <DrawerItemList {...props} />
            <Divider style={{ borderBottomWidth: 1, borderColor: 'lightgrey', width: 250, alignSelf: 'center' }} />

            {/*Delete account*/}
            <DrawerItem
                icon={() => (<IconButton
                    icon="account-remove-outline"
                    color="red" />)}
                label="Delete Account"
                onPress={() => props.navigation.navigate("DeleteAccount", { receivedUserInfo: userInformation, accountType: 'customer' })}
            >
            </DrawerItem >

            {/*Separate between delete account and logout
                Have to do this to ensure the Logout button is shown in most devices*/}
            <Divider style={{ borderBottomWidth: 1, borderColor: 'lightgrey', width: 150, alignSelf: 'right' }} />
            <Divider style={{ borderBottomWidth: 1, borderColor: 'lightgrey', width: 150, alignSelf: 'right' }} />
            <Divider style={{ borderBottomWidth: 1, borderColor: 'lightgrey', width: 150, alignSelf: 'right' }} />
            <Divider style={{ borderBottomWidth: 1, borderColor: 'lightgrey', width: 150, alignSelf: 'right' }} />
            <Divider style={{ borderBottomWidth: 1, borderColor: 'lightgrey', width: 150, alignSelf: 'right' }} />
            <Divider style={{ borderBottomWidth: 1, borderColor: 'lightgrey', width: 150, alignSelf: 'right' }} />
            <Divider style={{ borderBottomWidth: 1, borderColor: 'lightgrey', width: 150, alignSelf: 'right' }} />
            <Divider style={{ borderBottomWidth: 1, borderColor: 'lightgrey', width: 150, alignSelf: 'right' }} />
            <Divider style={{ borderBottomWidth: 1, borderColor: 'lightgrey', width: 150, alignSelf: 'right' }} />
            <Divider style={{ borderBottomWidth: 1, borderColor: 'lightgrey', width: 150, alignSelf: 'right' }} />
            <Divider style={{ borderBottomWidth: 1, borderColor: 'white', width: 150, alignSelf: 'right' }} />
            <Divider style={{ borderBottomWidth: 1, borderColor: 'white', width: 150, alignSelf: 'right' }} />
            <Divider style={{ borderBottomWidth: 1, borderColor: 'white', width: 150, alignSelf: 'right' }} />
            <Divider style={{ borderBottomWidth: 1, borderColor: 'white', width: 150, alignSelf: 'right' }} />
            <Divider style={{ borderBottomWidth: 1, borderColor: 'white', width: 150, alignSelf: 'right' }} />
            <Divider style={{ borderBottomWidth: 1, borderColor: 'white', width: 150, alignSelf: 'right' }} />
            <Divider style={{ borderBottomWidth: 1, borderColor: 'white', width: 150, alignSelf: 'right' }} />
            <Divider style={{ borderBottomWidth: 1, borderColor: 'white', width: 150, alignSelf: 'right' }} />
            <Divider style={{ borderBottomWidth: 1, borderColor: 'white', width: 150, alignSelf: 'right' }} />
            <Divider style={{ borderBottomWidth: 1, borderColor: 'white', width: 150, alignSelf: 'right' }} />
            <Divider style={{ borderBottomWidth: 1, borderColor: 'white', width: 150, alignSelf: 'right' }} />
            <Divider style={{ borderBottomWidth: 1, borderColor: 'white', width: 150, alignSelf: 'right' }} />
            <Divider style={{ borderBottomWidth: 1, borderColor: 'white', width: 150, alignSelf: 'right' }} />

            {/*Logout*/}
            <DrawerItem
                icon={() => (<IconButton
                    icon="logout"
                    color="#3238a8" />)}
                label="Log Out"
                onPress={() => props.navigation.replace('Start')}>
            </DrawerItem >
        </DrawerContentScrollView >

    );
}

// My Profile (editing contact information), Change Password, and Help in the drawer
function Home({ route }) {
    const { userInfo } = route.params;
    userInformation = userInfo;
    return (

        <ReactDrawer.Navigator
            drawerPosition="right"
            drawerContentOptions={{
                activeBackgroundColor: 'transparent',
            }}
            drawerType="slide"
            drawerContent={props => <LDDrawerItemList {...props} />} // delete account and logout
        >
            {/*Main Screen*/}
            <ReactDrawer.Screen name="Home" component={MainScreen}
                options={{
                    title: ""
                }} />

            {/*Edit profile*/}
            <ReactDrawer.Screen name="Profile" component={EditProfile}
                initialParams={{ accountType: 'customer', receivedUserInfo: userInfo }}
                options={{
                    title: "My Profile",
                    drawerIcon: (() => (
                        <IconButton
                            icon="account" />
                    )),
                    unmountOnBlur: true
                }}
            />

            {/*Change password*/}
            <ReactDrawer.Screen name="ChangePassword" component={ChangePassword}
                initialParams={{ accountType: 'customer', receivedUserInfo: userInfo }}
                options={{
                    title: "Change Password",
                    drawerIcon: (() => (
                        <IconButton
                            icon="lock-open" />
                    )),
                    unmountOnBlur: true
                }}
            />

            {/*Help screen*/}
            <ReactDrawer.Screen name="Help" component={Help}
                initialParams={{ accountType: 'customer' }}
                options={{
                    title: "Help",
                    drawerIcon: (() => (
                        <IconButton
                            icon="help" />
                    )),
                    unmountOnBlur: true
                }}
            />
        </ReactDrawer.Navigator>

    );
}

export default Home;