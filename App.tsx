import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FlashMessage from "react-native-flash-message";


import Start from './screens/Start';
import Login from './screens/Login';
import ResetPassword from './screens/ResetPassword';
import CreateAccountDefault from './screens/CreateAccountDefault';
import CreateAccountBusiness from './screens/CreateAccountBusiness';
import CreateAccountInfo from './screens/CreateAccountInfo';
import Terms_Conditions from './screens/Terms_Conditions';
import Home from './screens/Home';
import HomeBusiness1 from './screens/HomeBusiness';
import CheckInByQRCode from './screens/CheckInByQRCode';
import CheckInCustomer from './screens/CheckInCustomer';
import ViewAppQRCode from './screens/ViewAppQRCode';
import ViewMyQRCode from './screens/ViewMyQRCode';
import HelpMyQRCode from './screens/HelpMyQRCode';
import AboutMyQRCode from './screens/AboutMyQRCode';
import { StatusBar } from 'expo-status-bar';

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
        <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ title: "", headerBackTitleVisible: false, headerTintColor: 'black', headerTransparent: true, headerStyle: { backgroundColor: 'transparent' } }} />
        <Stack.Screen name="CreateAccountDefault" component={CreateAccountDefault} options={{ title: "", headerBackTitleVisible: false, headerTintColor: 'black', headerTransparent: true, headerStyle: { backgroundColor: 'transparent' } }} />
        <Stack.Screen name="CreateAccountBusiness" component={CreateAccountBusiness} options={{ title: "", headerBackTitleVisible: false, headerTintColor: 'black', headerTransparent: true, headerStyle: { backgroundColor: 'transparent' } }} />
        <Stack.Screen name="CreateAccountInfo" component={CreateAccountInfo} options={{ title: "", headerBackTitleVisible: false, headerTintColor: 'black', headerTransparent: true, headerStyle: { backgroundColor: 'transparent' } }} />
        <Stack.Screen name="Terms_Conditions" component={Terms_Conditions} options={{ title: "", headerBackTitleVisible: false, headerTintColor: 'black', headerTransparent: true, headerStyle: { backgroundColor: 'transparent' } }} />
        <Stack.Screen name="Home" component={Home} options={{ animationEnabled: false, headerShown: false }} />
        <Stack.Screen name="CheckInByQRCode" component={CheckInByQRCode} options={{ animationEnabled: false, headerShown: false }} />
        <Stack.Screen name="HomeBusiness" component={HomeBusiness1} options={{ animationEnabled: false, headerShown: false }} />
        <Stack.Screen name="CheckInCustomer" component={CheckInCustomer} options={{ animationEnabled: false, headerShown: false }} />
        <Stack.Screen name="ViewAppQRCode" component={ViewAppQRCode} options={{ animationEnabled: false, headerShown: false }} />
        <Stack.Screen name="ViewMyQRCode" component={ViewMyQRCode} options={{ animationEnabled: false, headerShown: false }} />
        <Stack.Screen name="HelpMyQRCode" component={HelpMyQRCode} options={{ animationEnabled: false, headerShown: false }} />
        <Stack.Screen name="AboutMyQRCode" component={AboutMyQRCode} options={{ animationEnabled: false, headerShown: false }} />
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>



  );
}

export default App;