import React from 'react';

import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SensorForm } from '../screens/SensorForm';

const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

const AppRoutes = () => ( 
  <NavigationContainer theme={theme}>
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTransparent: true,
        headerTitleStyle: {
          fontSize: 24, 
        },
      }}
      initialRouteName="SensorForm"
    >
      <Stack.Screen 
        name="SensorForm" 
        component={SensorForm}
        options={{
          title: 'Cadastre seu sensor',
        }} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppRoutes;
