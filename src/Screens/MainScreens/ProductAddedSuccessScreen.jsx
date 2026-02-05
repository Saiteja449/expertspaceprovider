import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { styles as globalStyles } from '../../Globalcss/Globalcss';
import Svg, { Circle, Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

const ProductAddedSuccessScreen = ({ navigation }) => {
  return (
    <View
      style={[
        globalStyles.screenContainer,
        {
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 20,
        },
      ]}
    >
      {/* Success Illustration */}
      <View style={{ marginBottom: 40, alignItems: 'center' }}>
        {/* Simplified Confetti/Success Graphic */}
        <Svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <Circle cx="60" cy="60" r="50" fill="#E8F5E9" />
          <Circle cx="60" cy="60" r="30" fill="#00C853" />
          <Path
            d="M48 60L56 68L72 52"
            stroke="white"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Decorative bits */}
          <Circle cx="30" cy="30" r="2" fill="#FFC107" />
          <Circle cx="90" cy="40" r="2" fill="#FF5722" />
          <Circle cx="40" cy="90" r="2" fill="#2196F3" />
        </Svg>
      </View>

      <Text style={styles.title}>Product Uploaded</Text>
      <Text style={styles.title}>Successfully</Text>

      <Text style={styles.subtitle}>
        Your product has been added to the inventory and is now available for
        customers to view and order.
      </Text>

      <View style={{ width: '100%', marginTop: 40 }}>
        <TouchableOpacity
          style={globalStyles.outlineButton}
          onPress={() => {
            // In a real app, you might pass the new product ID here
            navigation.navigate('ProductDetailScreen');
          }}
        >
          <Text style={globalStyles.outlineButtonText}>View Product</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={globalStyles.primaryButton}
          onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })}
        >
          <Text style={globalStyles.primaryButtonText}>Back To Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 24,
    maxWidth: width * 0.85,
  },
});

export default ProductAddedSuccessScreen;
