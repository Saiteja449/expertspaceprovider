import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StackNavigation from './src/Navigations/StackNavigation';

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <StackNavigation />
    </SafeAreaProvider>
  );
}

export default App;
