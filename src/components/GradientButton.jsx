import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { font } from '../utils/fontFamilies';

const GradientButton = ({
  title,
  onPress,
  colors = ['#FF1744', '#FF8C00'], // Default gradient based on screenshot
  start = { x: 0, y: 0 },
  end = { x: 1, y: 0 },
  style,
  textStyle,
  isLoading = false,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled || isLoading}
      style={[styles.container, style]}
    >
      <LinearGradient
        colors={colors}
        start={start}
        end={end}
        style={styles.gradient}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={[styles.text, textStyle]}>{title}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    width: '100%',
    overflow: 'hidden',
  },
  gradient: {
    paddingVertical: 14.5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: font.SEMI_BOLD,
    textAlign: 'center',
  },
});

export default GradientButton;
