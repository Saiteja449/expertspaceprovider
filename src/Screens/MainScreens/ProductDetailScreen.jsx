import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { styles as globalStyles } from '../../Globalcss/Globalcss';
import { BackArrowIcon } from '../../Icons/DashboardIcons';
import Svg, { Path } from 'react-native-svg';

const ProductDetailScreen = ({ navigation, route }) => {
  const product = route.params?.product || {
    title:
      'Rosewood 2-Seater Modern Classic Settee Sofa Diwan Chaise Lounge Couch with Pillow for Home and Living Room, Office, Bedroom (Beige Kulfi, Large)',
    image: 'https://via.placeholder.com/150',
    price: '22,000',
    productId: '20957689',
    category: 'Furniture',
    stock: 10,
    mrp: '24,000',
    selling: '22,000',
    earn: '21,500',
    discount: '10%',
    charge: '500',
    dimensions: '70D x 150W x 80H Centimeters',
    type: 'Sofa Chaise',
    colour: 'Multi colour',
    style: 'Modern,Classic',
    weight: '80kg',
    gst: '0%',
    description: [
      'Primary Material- Frame in Teak Wood| Foam 40 density With 1 Year Waranty | Good quality Velvet.',
      'Material- Wood, Product Dimension- 150L x 80W x 70H Centimeter, Package Content- Wooden Sofa',
      'No assembly required the product is delivered in a preassembled state. (only legs to be fix by the customer)',
      'The color of the product may vary slightly from the picture displayed on your screen this is due to lighting, pixel quality and color settings.. Accessories shown in the image are only for representation and are not part of the product.',
      'We want all of our customers to feel 100% satisfied. If you have any questions, please email us or Cantact in time, we guarantee to reply within 24 hours and give you a satisfactory reply.',
      'Versatile & Multi-Purpose: Functions as a diwan, chaise lounge, or accent sofa, offering a stylish and comfortable seating solution for guests and relaxation.',
    ],
  };

  const details = [
    { label: 'Actual MRP', value: `₹ ${product.mrp}`, bold: true },
    { label: 'Selling Price', value: `₹ ${product.selling}`, bold: true },
    { label: 'Earn Price', value: `₹ ${product.earn}`, bold: true },
    { label: 'Discount %', value: product.discount, color: '#00C853' },
    { label: 'Expert space charge', value: `₹ ${product.charge}`, bold: true },
    { label: 'Dimensions', value: product.dimensions },
    { label: 'Type', value: product.type },
    { label: 'Colour', value: product.colour },
    { label: 'Style', value: product.style },
    { label: 'Item Weight', value: product.weight },
    { label: 'Product GST', value: product.gst },
  ];

  return (
    <View style={globalStyles.screenContainer}>
      {/* Header */}
      <View style={globalStyles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ padding: 4 }}
        >
          <BackArrowIcon size={24} />
        </TouchableOpacity>
        <Text style={globalStyles.headerTitle}>Product Detail</Text>
        <TouchableOpacity
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: '#F5F5F5',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <Path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <Path d="M16 6l-4-4-4 4" />
            <Path d="M12 2v13" />
          </Svg>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
        <View style={styles.card}>
          <Text style={styles.title}>{product.title}</Text>

          <View style={styles.topSection}>
            <Image source={{ uri: product.image }} style={styles.mainImage} />
            <View style={styles.infoCol}>
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Price</Text>
                <Text style={styles.priceValue}>₹ {product.price}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Product ID</Text>
                <Text style={styles.infoValue}>{product.productId}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Category</Text>
                <Text style={styles.infoValue}>{product.category}</Text>
              </View>
            </View>
          </View>

          {/* Stock */}
          <View style={styles.stockRow}>
            <Text style={styles.sectionHeader}>Stock</Text>
            <View style={styles.stockPill}>
              <Text style={styles.stockText}>{product.stock}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Details List */}
          {details.map((item, index) => (
            <View key={index} style={styles.detailRow}>
              <Text style={styles.detailLabel}>{item.label}</Text>
              <Text
                style={[
                  styles.detailValue,
                  item.bold && { fontWeight: '700', color: '#000' },
                  item.color && { color: item.color, fontWeight: '700' },
                ]}
              >
                {item.value}
              </Text>
            </View>
          ))}

          <View style={[styles.divider, { marginTop: 15 }]} />

          {/* Description */}
          <Text style={[styles.sectionHeader, { marginBottom: 10 }]}>
            Description
          </Text>
          {product.description.map((point, index) => (
            <View key={index} style={styles.bulletRow}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.bulletText}>{point}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    lineHeight: 22,
    marginBottom: 16,
  },
  topSection: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  mainImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    marginRight: 16,
  },
  infoCol: {
    flex: 1,
    justifyContent: 'center',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 14,
    color: '#333',
  },
  priceValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  infoLabel: {
    fontSize: 13,
    color: '#333',
  },
  infoValue: {
    fontSize: 13,
    color: '#000',
  },
  stockRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  stockPill: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 30,
    minWidth: 100,
    alignItems: 'center',
  },
  stockText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: '#333',
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    textAlign: 'right',
    maxWidth: '60%',
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
    lineHeight: 20,
  },
  bulletText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    flex: 1,
  },
});

export default ProductDetailScreen;
