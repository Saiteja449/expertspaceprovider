import React from 'react';
import { View, StyleSheet, Platform, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { font } from '../utils/fontFamilies';

// Icons
import HomeActive from '../../assets/images/homeActive.svg';
import HomeInactive from '../../assets/images/homeInactive.svg';
import OrderActive from '../../assets/images/orderActive.svg';
import OrderInactive from '../../assets/images/orderInactive.svg';
import InventoryActive from '../../assets/images/inventoryActive.svg';
import InventoryInactive from '../../assets/images/inventoryINctive.svg'; // User typo in filename
import RevenueInactive from '../../assets/images/revenueInactive.svg'; // Only inactive provided?
import MoreInactive from '../../assets/images/MoreInactive.svg'; // Only inactive provided?

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
          fontFamily: font.MEDIUM,
          marginTop: 4,
        },
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Home') {
            return focused ? (
              <HomeActive width={24} height={24} />
            ) : (
              <HomeInactive width={24} height={24} />
            );
          } else if (route.name === 'Orders') {
            return focused ? (
              <OrderActive width={24} height={24} />
            ) : (
              <OrderInactive width={24} height={24} />
            );
          } else if (route.name === 'Inventory') {
            return focused ? (
              <InventoryActive width={24} height={24} />
            ) : (
              <InventoryInactive width={24} height={24} />
            );
          } else if (route.name === 'Revenue') {
            // Only inactive found, using for both or applying tint if possible. SVG component might not accept color unless implemented.
            // Assuming separate active icon was intended or we reuse inactive.
            // If I look at the file list, there is no revenueActive.
            return <RevenueInactive width={24} height={24} />;
          } else if (route.name === 'More') {
            return <MoreInactive width={24} height={24} />;
          }
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: 'Home' }}
      />
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
        options={{ tabBarLabel: 'Revenue' }} // Correct spelling from previous 'Reveneu' in screenshot label if any
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
