import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  HomeIcon,
  OrdersIcon,
  InventoryIcon,
  RevenueIcon,
  MoreIcon,
} from '../Icons/TabIcons';

// Screens
import HomeScreen from '../Screens/MainScreens/HomeScreen';
import OrdersScreen from '../Screens/MainScreens/OrdersScreen';
import InventoryScreen from '../Screens/MainScreens/InventoryScreen';
import RevenueScreen from '../Screens/MainScreens/RevenueScreen'; // Will create placeholder
import MoreScreen from '../Screens/MainScreens/MoreScreen'; // Will create placeholder

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#9E9E9E',
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 85 : 70,
          paddingBottom: Platform.OS === 'ios' ? 25 : 10,
          paddingTop: 10,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1.5,
          borderTopColor: '#F5F5F5',
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 5,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '500',
          marginTop: 2,
        },
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Home') {
            return <HomeIcon color={color} size={24} />;
          } else if (route.name === 'Orders') {
            return <OrdersIcon color={color} size={24} />;
          } else if (route.name === 'Inventory') {
            return <InventoryIcon color={color} size={24} />;
          } else if (route.name === 'Revenue') {
            return <RevenueIcon color={color} size={24} />;
          } else if (route.name === 'More') {
            return <MoreIcon color={color} size={24} />;
          }
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{ tabBarLabel: 'Orders' }}
      />
      <Tab.Screen
        name="Inventory"
        component={InventoryScreen}
        options={{ tabBarLabel: 'Inventory' }}
      />
      <Tab.Screen
        name="Revenue"
        component={RevenueScreen}
        options={{ tabBarLabel: 'Revenue' }}
      />
      <Tab.Screen
        name="More"
        component={MoreScreen}
        options={{ tabBarLabel: 'More' }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
