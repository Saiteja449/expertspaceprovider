import React, { useEffect } from 'react';
import { View, Text, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../../Globalcss/Globalcss';
import SplashLogo from '../../../assets/images/LogoProvider.svg';

import { useContextState } from '../../context/Context';

const SplashScreen = ({ navigation }) => {
  const { fetchProviderProfile } = useContextState();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const result = await fetchProviderProfile();
          if (result && result.success) {
            navigation.replace('MainTabs');
          } else if (result && result.status === 'pending') {
            navigation.replace('ApprovalPendingScreen');
          } else {
            navigation.replace('LoginScreen');
          }
        } else {
          navigation.replace('LoginScreen');
        }
      } catch (error) {
        console.error('Splash Check Error:', error);
        navigation.replace('LoginScreen');
      }
    };

    const timer = setTimeout(() => {
      checkLogin();
    }, 2000);

    return () => clearTimeout(timer);
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
