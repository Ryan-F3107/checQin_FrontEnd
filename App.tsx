import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './screens/Home';
import Login from './screens/Login';
import SignUpDefault from './screens/SignUpDefault';
import SignUpBusiness from './screens/SignUpBusiness';
import CreateAccount from './screens/CreateAccount';
import Terms_Conditions from './screens/Terms_Conditions';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="SignUpDefault" component={SignUpDefault} options={{title: "", headerBackTitle: "Home", headerTransparent: true , headerStyle:{ backgroundColor : 'transparent'}}} />
        <Stack.Screen name="SignUpBusiness" component={SignUpBusiness} options={{ title: "", headerBackTitle: "Home", headerTransparent: true , headerStyle:{ backgroundColor : 'transparent'}}} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} options={{ title: "", headerBackTitle: "Back", headerTransparent: true , headerStyle:{ backgroundColor : 'transparent'}}} />
        <Stack.Screen name="Terms_Conditions" component={Terms_Conditions} options={{ title: "", headerBackTitle: "Back", headerTransparent: true , headerStyle:{ backgroundColor : 'transparent'}}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;