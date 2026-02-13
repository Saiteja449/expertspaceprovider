import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Dimensions,
  Animated,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { font } from '../utils/fontFamilies';

const { height } = Dimensions.get('window');

const BottomModal = ({
  visible,
  title,
  message,
  onClose,
  type = 'error', // 'error', 'success', 'warning', 'info'
  actionButtonText = 'OK',
  onActionPress,
}) => {
  const getThemeColors = () => {
    switch (type) {
      case 'success':
        return {
          gradientColors: ['#4CAF50', '#45a049'],
          iconBg: '#4CAF50',
          textColor: '#FFFFFF',
        };
      case 'warning':
        return {
          gradientColors: ['#FFA726', '#FB8C00'],
          iconBg: '#FFA726',
          textColor: '#FFFFFF',
        };
      case 'info':
        return {
          gradientColors: ['#29B6F6', '#0288D1'],
          iconBg: '#29B6F6',
          textColor: '#FFFFFF',
        };
      case 'error':
      default:
        return {
          gradientColors: ['#FF1744', '#FF8C00'],
          iconBg: '#FF1744',
          textColor: '#FFFFFF',
        };
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'warning':
        return '⚠';
      case 'info':
        return 'ℹ';
      case 'error':
      default:
        return '✕';
    }
  };

  const theme = getThemeColors();
  const icon = getIcon();

  const handleClose = () => {
    onClose();
  };

  const handleAction = () => {
    if (onActionPress) {
      onActionPress();
    } else {
      handleClose();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <LinearGradient
            colors={theme.gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          >
            {/* Header with Icon */}
            <View style={styles.header}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
                ]}
              >
                <Text style={styles.icon}>{icon}</Text>
              </View>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleClose}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Content */}
            <View style={styles.content}>
              <Text style={[styles.title, { color: theme.textColor }]}>
                {title}
              </Text>
              <Text style={[styles.message, { color: theme.textColor }]}>
                {message}
              </Text>
            </View>

            {/* Action Button */}
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleAction}
              activeOpacity={0.8}
            >
              <Text style={styles.actionButtonText}>{actionButtonText}</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    height: 'auto',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  gradient: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  closeButtonText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  content: {
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    fontFamily: font.BOLD,
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: font.REGULAR,
  },
  actionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: font.BOLD,
  },
});

export default BottomModal;
