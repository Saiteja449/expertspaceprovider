import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ChatIcon from '../../assets/images/chatIcon.svg';
import NotificationIcon from '../../assets/images/notificationIcon.svg';
import Logo from '../../assets/images/LogoProvider.svg'; // Using LogoProvider as the brand logo
import { styles } from '../Globalcss/Globalcss';

const CustomHeader = () => {
  // const navigation = useNavigation();

  return (
    <View style={styles.customHeaderContainer}>
      <View style={styles.customHeaderTopRow}>
        <View style={styles.customHeaderLogoContainer}>
          <Logo width={40} height={40} />
        </View>
        <View style={styles.customHeaderActionsContainer}>
          <TouchableOpacity
            style={styles.customHeaderIconButton}
            // onPress={() => console.log('Chat')}
          >
            <View style={styles.customHeaderBadgeContainer}>
              <Text style={styles.customHeaderBadgeText}>02</Text>
            </View>
            <ChatIcon width={24} height={24} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.customHeaderIconButton}
            // onPress={() => console.log('Notifications')}
          >
            <View style={styles.customHeaderDotBadge} />
            <NotificationIcon width={24} height={24} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CustomHeader;
