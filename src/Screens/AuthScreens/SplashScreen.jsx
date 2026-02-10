import React, { useEffect } from 'react';
import { View, Text, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../../Globalcss/Globalcss';
import SplashLogo from '../../../assets/images/LogoProvider.svg';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        // We can add a small delay here if needed to show the splash logo for at least some time
        setTimeout(() => {
          if (userData) {
            navigation.replace('MainTabs');
          } else {
            navigation.replace('LoginScreen');
          }
        }, 2000);
      } catch (error) {
        console.error('Splash Check Error:', error);
        navigation.replace('LoginScreen');
      }
    };

    checkLogin();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.logoSection}>
        <View style={styles.logoContainer}>
          <SplashLogo width={240} height={80} />
        </View>
      </View>

      <Text style={styles.tagline}>
        Join our supplier{'\n'}network and start{'\n'}growing your business
        {'\n'}today.
      </Text>
    </View>
  );
};

export default SplashScreen;
