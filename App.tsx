import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StackNavigation from './src/Navigations/StackNavigation';
import { Provider } from './src/context/Context';

function App() {
  return (
    <SafeAreaProvider>
      <Provider>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <StackNavigation />
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
