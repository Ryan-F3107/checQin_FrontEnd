import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FlashMessage from "react-native-flash-message";
import { StatusBar } from 'expo-status-bar';

import Start from './screens/Start';
import Login from './screens/Login';
import CreateAccountDefault from './screens/customerScreens/CreateAccountDefault';
import CreateAccountBusiness from './screens/businessScreens/CreateAccountBusiness';
import CreateAccountInfo from './screens/CreateAccountInfo';
import Terms_Conditions from './screens/Terms_Conditions';
import Home from './screens/customerScreens/Home';
import HomeBusiness1 from './screens/businessScreens/HomeBusiness';
import CheckInByQRCode from './screens/customerScreens/CheckInByQRCode';
import CheckInCustomer from './screens/businessScreens/CheckInCustomer';

import MyQRcode from './screens/businessScreens/MyQRcode';
import HelpMyQRCode from './screens/businessScreens/HelpMyQRCode';
import About_MyQRcode from './screens/businessScreens/About_MyQRcode';

import DeleteAccount from './screens/DeleteAccount';
import CameraComponent from './screens/customerScreens/CameraComponent';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor="#fafafa"
        translucent={true} />
      <Stack.Navigator>
        <Stack.Screen name="Start" component={Start} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ title: "", headerBackTitleVisible: false, headerTintColor: 'black', headerTransparent: true, headerStyle: { backgroundColor: 'transparent' } }} />
        <Stack.Screen name="CreateAccountDefault" component={CreateAccountDefault} options={{ title: "", headerBackTitleVisible: false, headerTintColor: 'black', headerTransparent: true, headerStyle: { backgroundColor: 'transparent' } }} />
        <Stack.Screen name="CreateAccountBusiness" component={CreateAccountBusiness} options={{ title: "", headerBackTitleVisible: false, headerTintColor: 'black', headerTransparent: true, headerStyle: { backgroundColor: 'transparent' } }} />
        <Stack.Screen name="CreateAccountInfo" component={CreateAccountInfo} options={{ title: "", headerBackTitleVisible: false, headerTintColor: 'black', headerTransparent: true, headerStyle: { backgroundColor: 'transparent' } }} />
        <Stack.Screen name="Terms_Conditions" component={Terms_Conditions} options={{ title: "", headerBackTitleVisible: false, headerTintColor: 'black', headerTransparent: true, headerStyle: { backgroundColor: 'transparent' } }} />
        <Stack.Screen name="Home" component={Home} options={{ animationEnabled: false, headerShown: false }} />
        <Stack.Screen name="CheckInByQRCode" component={CheckInByQRCode} options={{ animationEnabled: false, headerShown: false }} />
        <Stack.Screen name="DeleteAccount" component={DeleteAccount} options={{ headerShown: false }} />
        <Stack.Screen name="HomeBusiness" component={HomeBusiness1} options={{ animationEnabled: false, headerShown: false }} />
        <Stack.Screen name="CheckInCustomer" component={CheckInCustomer} options={{ animationEnabled: false, headerShown: false }} />
        <Stack.Screen name="MyQRcode" component={MyQRcode} options={{ animationEnabled: false, headerShown: false }} />
        <Stack.Screen name="HelpMyQRCode" component={HelpMyQRCode} options={{ animationEnabled: false, headerShown: false }} />
        <Stack.Screen name="About_MyQRcode" component={About_MyQRcode} options={{ animationEnabled: false, headerShown: false }} />
        <Stack.Screen name="CameraComponent" component={CameraComponent} options={{ animationEnabled: false, headerShown: false }} />
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>



  );
}

export default App;