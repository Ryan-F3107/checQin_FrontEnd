import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FlashMessage from "react-native-flash-message";
import { StatusBar } from 'expo-status-bar';

import Start from './screens/Start';
import Login from './screens/Login';
import CreateAccountDefault from './screens/CreateAccountDefault';
import CreateAccountBusiness from './screens/CreateAccountBusiness';
import CreateAccountInfo from './screens/CreateAccountInfo';
import Terms_Conditions from './screens/Terms_Conditions';
import Home from './screens/customerScreens/Home';
import HomeBusiness1 from './screens/businessScreens/HomeBusiness';
import CheckInByQRCode from './screens/customerScreens/CheckInByQRCode';
import CheckInCustomer from './screens/businessScreens/CheckInCustomer';

import ViewMyQRCode from './screens/businessScreens/ViewMyQRCode';
import HelpMyQRCode from './screens/businessScreens/HelpMyQRCode';
import AboutMyQRCode from './screens/businessScreens/AboutMyQRCode';

import DeleteAccount from './screens/DeleteAccount';
import CameraComponent from './screens/customerScreens/CameraComponent';

//import ResetPassword from './screens/ResetPassword';
//import ViewAppQRCode from './screens/businessScreens/ViewAppQRCode';

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
        {/* Can't be implemented at this point*/}
        {/*<Stack.Screen name="ResetPassword" component={ResetPassword} options={{ title: "", headerBackTitleVisible: false, headerTintColor: 'black', headerTransparent: true, headerStyle: { backgroundColor: 'transparent' } }} />*/}
        <Stack.Screen name="CreateAccountDefault" component={CreateAccountDefault} options={{ title: "", headerBackTitleVisible: false, headerTintColor: 'black', headerTransparent: true, headerStyle: { backgroundColor: 'transparent' } }} />
        <Stack.Screen name="CreateAccountBusiness" component={CreateAccountBusiness} options={{ title: "", headerBackTitleVisible: false, headerTintColor: 'black', headerTransparent: true, headerStyle: { backgroundColor: 'transparent' } }} />
        <Stack.Screen name="CreateAccountInfo" component={CreateAccountInfo} options={{ title: "", headerBackTitleVisible: false, headerTintColor: 'black', headerTransparent: true, headerStyle: { backgroundColor: 'transparent' } }} />
        <Stack.Screen name="Terms_Conditions" component={Terms_Conditions} options={{ title: "", headerBackTitleVisible: false, headerTintColor: 'black', headerTransparent: true, headerStyle: { backgroundColor: 'transparent' } }} />
        <Stack.Screen name="Home" component={Home} options={{ animationEnabled: false, headerShown: false }} />
        <Stack.Screen name="CheckInByQRCode" component={CheckInByQRCode} options={{ animationEnabled: false, headerShown: false }} />
        <Stack.Screen name="DeleteAccount" component={DeleteAccount} options={{ headerShown: false }} />
        <Stack.Screen name="HomeBusiness" component={HomeBusiness1} options={{ animationEnabled: false, headerShown: false }} />
        <Stack.Screen name="CheckInCustomer" component={CheckInCustomer} options={{ animationEnabled: false, headerShown: false }} />
        {/* Can't be implemented at this point*/}
        {/*<Stack.Screen name="ViewAppQRCode" component={ViewAppQRCode} options={{ animationEnabled: false, headerShown: false }} />*/}
        <Stack.Screen name="ViewMyQRCode" component={ViewMyQRCode} options={{ animationEnabled: false, headerShown: false }} />
        <Stack.Screen name="HelpMyQRCode" component={HelpMyQRCode} options={{ animationEnabled: false, headerShown: false }} />
        <Stack.Screen name="AboutMyQRCode" component={AboutMyQRCode} options={{ animationEnabled: false, headerShown: false }} />
        <Stack.Screen name="CameraComponent" component={CameraComponent} options={{ animationEnabled: false, headerShown: false }} />
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>



  );
}

export default App;