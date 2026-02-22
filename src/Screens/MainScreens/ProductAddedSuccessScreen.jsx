import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from '../../Globalcss/Globalcss';
import GradientButton from '../../components/GradientButton';
import SuccessIcon from '../../Icons/SuccessIcon';

const ProductAddedSuccessScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={styles.successContainer}>
        <View style={styles.successIconContainer}>
          <SuccessIcon size={150} />
        </View>

        <Text style={styles.successTitle}>
          Product Uploaded{'\n'}Successfully
        </Text>

        <Text style={styles.successSubtitle}>
          Your product has been added to the inventory and is now available for
          customers to view and order.
        </Text>
      </View>

      <View style={styles.successFooter}>
        <TouchableOpacity
          style={styles.successViewProductBtn}
          onPress={() =>
            navigation.navigate('MainTabs', { screen: 'Inventory' })
          }
        >
          <Text style={styles.successViewProductText}>View Product</Text>
        </TouchableOpacity>

        <GradientButton
          title="Back To Home"
          onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })}
        />
      </View>
    </View>
  );
};

export default ProductAddedSuccessScreen;
