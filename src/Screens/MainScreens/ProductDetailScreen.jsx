import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from '../../Globalcss/Globalcss';
import CustomHeader from '../../components/CustomHeader';
import ShareIcon from '../../../assets/images/shareIcon.svg';
import SofaIcon from '../../../assets/images/sofasvg.svg';

const ProductDetailScreen = ({ route, navigation }) => {
  // Use product data from route params if available, otherwise use defaults
  const product = route?.params?.product || {
    title:
      'Rosewood 2-Seater Modern Classic Settee Sofa Diwan Chaise Lounge Couch with Pillow for Home and Living Room, Office, Bedroom (Beige Kulfi, Large)',
    productId: '20957689',
    category: 'Furniture',
    price: '₹ 22,000',
    stock: 10,
    mrp: '₹ 24,000',
    sellingPrice: '₹ 22,000',
    earnPrice: '₹ 21,500',
    discount: '10%',
    charge: '₹ 500',
    dimensions: '70D x 150W x 80H Centimeters',
    type: 'Sofa Chaise',
    colour: 'Multi colour',
    style: 'Modern,Classic',
    weight: '80kg',
    gst: '0%',
  };

  const points = [
    'Primary Material- Frame in Teak Wood| Foam 40 density With 1 Year Waranty | Good quality Velvet.',
    'Material- Wood, Product Dimension- 150L x 80W x 70H Centimeter, Package Content- Wooden Sofa',
    'No assembly required the product is delivered in a preassembled state. (only legs to be fix by the customer)',
    'The color of the product may vary slightly from the picture displayed on your screen this is due to lighting, pixel quality and color settings... Accessories shown in the image are only for representation and are not part of the product.',
    'We want all of our customers to feel 100% satisfied. If you have any questions, please email us or Cantact in time, we guarantee to reply within 24 hours and give you a satisfactory reply.',
    'Versatile & Multi-Purpose: Functions as a diwan, chaise lounge, or accent sofa, offering a stylish and comfortable seating solution for guests and relaxation.',
    'We want all of our customers to feel 100% satisfied. If you have any questions, please email us or Cantact in time, we guarantee to reply within 24 hours and give you a satisfactory reply.',
  ];

  return (
    <View style={styles.screenContainer}>
      <CustomHeader
        variant="internal"
        title="Product Detail"
        rightIcon={<ShareIcon width={24} height={24} />}
        onRightPress={() => console.log('Share Pressed')}
      />

      <ScrollView
        contentContainerStyle={styles.productDetailScroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.productDetailCard}>
          <Text style={styles.productDetailFullTitle}>{product.title}</Text>

          <View style={styles.detailSummaryRow}>
            <View style={styles.detailProductImg}>
              <SofaIcon width={75} height={75} />
            </View>
            <View style={styles.detailSummaryInfo}>
              <View style={styles.detailDataRow}>
                <Text style={styles.detailDataLabel}>Price</Text>
                <Text style={styles.detailPrice}>{product.price}</Text>
              </View>
              <View style={styles.detailDataRow}>
                <Text style={styles.detailDataLabel}>Product ID</Text>
                <Text style={styles.detailDataValue}>{product.productId}</Text>
              </View>
              <View style={styles.detailDataRow}>
                <Text style={styles.detailDataLabel}>Category</Text>
                <Text style={styles.detailDataValue}>{product.category}</Text>
              </View>
            </View>
          </View>

          <View style={styles.detailStockRow}>
            <Text style={styles.detailStockLabel}>Stock</Text>
            <View style={styles.detailStockBox}>
              <Text style={styles.detailStockValue}>{product.stock}</Text>
            </View>
          </View>

          <View style={styles.attributesList}>
            <DetailItem label="Actual MRP" value={product.mrp} isPrice />
            <DetailItem
              label="Selling Price"
              value={product.sellingPrice}
              isPrice
            />
            <DetailItem label="Earn Price" value={product.earnPrice} isPrice />
            <DetailItem
              label="Discount %"
              value={product.discount}
              isDiscount
            />
            <DetailItem
              label="Expert space charge"
              value={product.charge}
              isPrice
            />
            <DetailItem label="Dimensions" value={product.dimensions} />
            <DetailItem label="Type" value={product.type} />
            <DetailItem label="Colour" value={product.colour} />
            <DetailItem label="Style" value={product.style} />
            <DetailItem label="Item Weight" value={product.weight} />
            <DetailItem label="Product GST" value={product.gst} />
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Description</Text>
            {points.map((point, index) => (
              <View key={index} style={styles.descriptionPoint}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.descriptionText}>{point}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const DetailItem = ({ label, value, isPrice, isDiscount }) => (
  <View style={styles.attributeItem}>
    <Text style={styles.attributeLabel}>{label}</Text>
    <Text
      style={[
        styles.attributeValue,
        isPrice && styles.attributePrice,
        isDiscount && styles.attributeDiscount,
      ]}
    >
      {value}
    </Text>
  </View>
);

export default ProductDetailScreen;
