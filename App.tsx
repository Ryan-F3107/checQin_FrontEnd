import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import FrontPage from './screens/FrontPage';
import Login from './screens/Login';
import SignUpDefault from './screens/SignUpDefault';
import SignUpBusiness from './screens/SignUpBusiness';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="FrontPage" component={FrontPage} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="SignUpDefault" component={SignUpDefault} options={{ headerShown: false }} />
        <Stack.Screen name="SignUpBusiness" component={SignUpBusiness} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;