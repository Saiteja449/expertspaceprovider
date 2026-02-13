import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StackNavigation from './src/Navigations/StackNavigation';
import RootContext from './src/context/RootContext';

const App = () => {
  return (
    <SafeAreaProvider>
      <RootContext>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <StackNavigation />
      </RootContext>
    </SafeAreaProvider>
  );
};

export default App;
