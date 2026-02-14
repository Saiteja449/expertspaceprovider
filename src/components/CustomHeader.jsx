import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Logo from '../../assets/images/LogoProvider.svg';
import ChatIcon from '../../assets/images/chatIcon.svg';
import NotificationIcon from '../../assets/images/notificationIcon.svg';
import GoBackIcon from '../../assets/images/goBackIcon.svg';
import SearchIcon from '../../assets/images/searchIcon.svg';
import ShareIcon from '../../assets/images/shareIcon.svg';
import { styles } from '../Globalcss/Globalcss';

const CustomHeader = ({
  variant = 'dashboard',
  title = '',
  onLeftPress,
  onRightPress,
  rightIcon,
  onChatPress = () => console.log('Chat Pressed'),
  onNotificationPress = () => console.log('Notification Pressed'),
  showBadge = true,
  badgeCount = '02',
}) => {
  const navigation = useNavigation();

  if (variant === 'internal') {
    return (
      <View style={styles.ordersHeader}>
        <TouchableOpacity
          style={styles.headerIconButton}
          onPress={onLeftPress ? onLeftPress : () => navigation.goBack()}
        >
          <GoBackIcon width={24} height={24} />
        </TouchableOpacity>

        <Text style={styles.ordersTitle}>{title}</Text>

        <TouchableOpacity
          style={styles.headerIconButton}
          onPress={onRightPress}
        >
          {rightIcon ? rightIcon : <SearchIcon width={24} height={24} />}
        </TouchableOpacity>
      </View>
    );
  }

  // Dashboard variant (default)
  return (
    <View style={styles.customHeaderContainer}>
      <View style={styles.customHeaderTopRow}>
        <View style={styles.customHeaderLogoContainer}>
          <Logo width={40} height={40} />
        </View>
        <View style={styles.customHeaderActionsContainer}>
          <TouchableOpacity
            style={styles.customHeaderIconButton}
            onPress={onChatPress}
          >
            {showBadge && (
              <View style={styles.customHeaderBadgeContainer}>
                <Text style={styles.customHeaderBadgeText}>{badgeCount}</Text>
              </View>
            )}
            <ChatIcon width={24} height={24} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.customHeaderIconButton}
            onPress={onNotificationPress}
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
