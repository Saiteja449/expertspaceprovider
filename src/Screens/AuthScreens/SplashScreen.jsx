import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar } from 'react-native';
import { styles } from '../../Globalcss/Globalcss';
import SplashLogo from '../../../assets/images/SplashLogo.svg';

const SplashScreen = ({ navigation }) => {
  // Optional: Auto-navigate logic could go here if requested, but user just asked for design.
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     navigation.replace('LoginScreen');
  //   }, 3000);
  //   return () => clearTimeout(timer);
  // }, [navigation]);

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
