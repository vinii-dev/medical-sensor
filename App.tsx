import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import AppRoutes from './src/routes/app.routes';
import { Theme } from './src/templates/theme';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <Theme>
        <AppRoutes />
      </Theme>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
  },
});
