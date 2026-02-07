import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

// Screens
import SplashScreen from '../Screens/AuthScreens/SplashScreen';
import LoginScreen from '../Screens/AuthScreens/LoginScreen';
import SignupScreen from '../Screens/AuthScreens/SignupScreen';
import BottomNavigation from './BottomNavigation';
import ProductDetailScreen from '../Screens/MainScreens/ProductDetailScreen';
import AddProductScreen from '../Screens/MainScreens/AddProductScreen';
import ProductAddedSuccessScreen from '../Screens/MainScreens/ProductAddedSuccessScreen';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SignupScreen"
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#FFFFFF' }, // Ensure white background for all screens
          }}
        >
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignupScreen" component={SignupScreen} />
          <Stack.Screen name="MainTabs" component={BottomNavigation} />
          <Stack.Screen
            name="ProductDetailScreen"
            component={ProductDetailScreen}
          />
          <Stack.Screen name="AddProductScreen" component={AddProductScreen} />
          <Stack.Screen
            name="ProductAddedSuccessScreen"
            component={ProductAddedSuccessScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default StackNavigation;
