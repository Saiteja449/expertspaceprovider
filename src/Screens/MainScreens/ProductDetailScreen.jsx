import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { styles } from '../../Globalcss/Globalcss';
import CustomHeader from '../../components/CustomHeader';
import ShareIcon from '../../../assets/images/shareIcon.svg';
import SofaIcon from '../../../assets/images/sofasvg.svg';
import { useProduct } from '../../context/ProductContext';
import { BASE_URL } from '../../utils/constant';

const ProductDetailScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const { getProductById, deleteProductImage, addProductImages } = useProduct();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionText, setActionText] = useState('');

  const fetchDetail = async () => {
    const data = await getProductById(productId);
    setProduct(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchDetail();
  }, [productId]);

  const handleDeleteImage = async imageId => {
    Alert.alert('Delete Image', 'Are you sure you want to delete this image?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          setActionText('Deleting Image...');
          setActionLoading(true);
          try {
            const res = await deleteProductImage(imageId);
            if (res.success) {
              await fetchDetail(); // Refresh data
              Alert.alert('Success', 'Image deleted successfully');
            } else {
              Alert.alert('Error', res.message || 'Failed to delete image');
            }
          } catch (err) {
            Alert.alert('Error', 'Something went wrong while deleting');
          } finally {
            setActionLoading(false);
          }
        },
      },
    ]);
  };

  const handleAddImages = async (type, variantId = null) => {
    const currentImagesCount =
      type === 'gallery'
        ? product.images?.filter(img => img.image_type === 'gallery').length ||
        0
        : product.colorVariants?.find(v => v.id === variantId)?.images
          ?.length || 0;

    const limit =
      type === 'gallery' ? 3 - currentImagesCount : 4 - currentImagesCount;
    if (limit <= 0) return;

    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });

    if (result.assets && result.assets.length > 0) {
      setActionText('Uploading Images...');
      setActionLoading(true);
      try {
        const payload = {
          product_id: product.id,
          image_type: type,
          color_variant_id: variantId,
          images: result.assets.map(asset => ({
            uri: asset.uri,
            type: asset.type,
            name: asset.fileName,
          })),
        };
        const res = await addProductImages(payload);
        if (res.success) {
          await fetchDetail();
          Alert.alert('Success', 'Images added successfully');
        } else {
          Alert.alert('Error', res.message || 'Failed to upload images');
        }
      } catch (err) {
        Alert.alert('Error', 'Something went wrong while uploading');
      } finally {
        setActionLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <View
        style={[
          styles.screenContainer,
          { justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <ActivityIndicator size="large" color="#F83336" />
      </View>
    );
  }

  if (!product) {
    return (
      <View
        style={[
          styles.screenContainer,
          { justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <Text>Product not found</Text>
      </View>
    );
  }

  const primaryImage = product.images?.find(
    img => img.image_type === 'primary',
  )?.image_url;
  const imageUrl = primaryImage ? `${BASE_URL}${primaryImage}` : null;
  const parsedDimensions =
    typeof product.dimensions === 'string'
      ? JSON.parse(product.dimensions)
      : product.dimensions;

  const galleryImages =
    product.images?.filter(img => img.image_type === 'gallery') || [];

  return (
    <View style={styles.screenContainer}>
      {actionLoading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}
        >
          <ActivityIndicator size="large" color="#FFF" />
          <Text
            style={{ color: '#FFF', marginTop: 10, fontFamily: 'Inter-Medium' }}
          >
            {actionText}
          </Text>
        </View>
      )}
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
          <Text style={styles.productDetailFullTitle}>{product.name}</Text>

          <View style={styles.detailSummaryRow}>
            <View style={styles.detailProductImg}>
              {imageUrl ? (
                <Image
                  source={{ uri: imageUrl }}
                  style={{ width: 75, height: 75, borderRadius: 12 }}
                />
              ) : (
                <SofaIcon width={75} height={75} />
              )}
            </View>
            <View style={styles.detailSummaryInfo}>
              <View style={styles.detailDataRow}>
                <Text style={styles.detailDataLabel}>Price</Text>
                <Text style={styles.detailPrice}>
                  ₹ {parseFloat(product.price).toLocaleString()}
                </Text>
              </View>
              <View style={styles.detailDataRow}>
                <Text style={styles.detailDataLabel}>Product ID</Text>
                <Text style={styles.detailDataValue}>#{product.id}</Text>
              </View>
              <View style={styles.detailDataRow}>
                <Text style={styles.detailDataLabel}>Category</Text>
                <Text style={styles.detailDataValue}>
                  {product.category?.name}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.detailStockRow}>
            <Text style={styles.detailStockLabel}>Stock</Text>
            <View style={styles.detailStockBox}>
              <Text style={styles.detailStockValue}>
                {product.total_stock || product.stock || 0}
              </Text>
            </View>
          </View>

          <View style={styles.attributesList}>
            <DetailItem
              label="Actual MRP"
              value={`₹ ${parseFloat(product.mrp).toLocaleString()}`}
              isPrice
            />
            <DetailItem
              label="Selling Price"
              value={`₹ ${parseFloat(product.price).toLocaleString()}`}
              isPrice
            />
            <DetailItem
              label="Discount %"
              value={`${product.discount_percent}%`}
              isDiscount
            />
            <DetailItem
              label="Dimensions"
              value={
                parsedDimensions
                  ? `${parsedDimensions.length}L x ${parsedDimensions.width}W x ${parsedDimensions.height}H`
                  : 'N/A'
              }
            />
            <DetailItem
              label="Sub Category"
              value={product.subCategory?.name}
            />
            <DetailItem label="Material" value={product.material} />
            <DetailItem label="Item Weight" value={`${product.weight} kg`} />
            <DetailItem label="SKU" value={product.sku} />
            <DetailItem
              label="Status"
              value={product.approval_status?.toUpperCase()}
            />
          </View>

          {product.colorVariants?.length > 0 && (
            <View style={{ marginBottom: 16 }}>
              <Text style={styles.descriptionTitle}>
                Color Variants (Max 4 images per variant)
              </Text>
              {product.colorVariants.map((variant, index) => (
                <View
                  key={index}
                  style={{
                    marginBottom: 16,
                    backgroundColor: '#F8F9FE',
                    padding: 10,
                    borderRadius: 12,
                  }}
                >
                  <View style={[styles.detailDataRow, { marginBottom: 8 }]}>
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                      <View
                        style={{
                          width: 14,
                          height: 14,
                          borderRadius: 7,
                          backgroundColor: variant.color_code,
                          marginRight: 8,
                          borderWidth: 1,
                          borderColor: '#DDD',
                        }}
                      />
                      <Text
                        style={[
                          styles.detailDataLabel,
                          { fontFamily: 'Inter-SemiBold', color: '#333' },
                        ]}
                      >
                        {variant.color_name}
                      </Text>
                    </View>
                    <Text style={styles.detailDataValue}>
                      Stock: {variant.stock}
                    </Text>
                  </View>

                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ marginTop: 8 }}
                  >
                    {variant.images?.map((img, imgIdx) => (
                      <View key={imgIdx} style={styles.imagePreviewContainer}>
                        <Image
                          source={{ uri: `${BASE_URL}${img.image_url}` }}
                          style={{
                            width: 60,
                            height: 60,
                            borderRadius: 8,
                            marginRight: 8,
                            backgroundColor: '#EEE',
                          }}
                        />
                        <TouchableOpacity
                          style={[
                            styles.removeImageBtn,
                            { width: 20, height: 20, top: -5, right: 3 },
                          ]}
                          onPress={() => handleDeleteImage(img.id)}
                        >
                          <Text
                            style={[styles.removeImageText, { fontSize: 10 }]}
                          >
                            X
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                    {(!variant.images || variant.images.length < 4) && (
                      <TouchableOpacity
                        onPress={() =>
                          handleAddImages('color_variant', variant.id)
                        }
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: 8,
                          marginRight: 8,
                          backgroundColor: '#FFF',
                          borderStyle: 'dashed',
                          borderWidth: 1,
                          borderColor: '#DDD',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginTop: 8,
                          marginBottom: 4,
                        }}
                      >
                        <Text style={{ fontSize: 20, color: '#DDD' }}>+</Text>
                      </TouchableOpacity>
                    )}
                  </ScrollView>
                </View>
              ))}
            </View>
          )}

          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.descriptionText}>{product.description}</Text>
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={styles.descriptionTitle}>
              Product Gallery (Max 3 images)
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
              {galleryImages.map((img, index) => (
                <View key={index} style={styles.imagePreviewContainer}>
                  <Image
                    source={{ uri: `${BASE_URL}${img.image_url}` }}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 8,
                    }}
                  />
                  <TouchableOpacity
                    style={styles.removeImageBtn}
                    onPress={() => handleDeleteImage(img.id)}
                  >
                    <Text style={styles.removeImageText}>X</Text>
                  </TouchableOpacity>
                </View>
              ))}
              {galleryImages.length < 3 && (
                <TouchableOpacity
                  onPress={() => handleAddImages('gallery')}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 8,
                    backgroundColor: '#F8F9FE',
                    borderStyle: 'dashed',
                    borderWidth: 1,
                    borderColor: '#DDD',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 8,
                    marginBottom: 4,
                  }}
                >
                  <Text style={{ fontSize: 24, color: '#DDD' }}>+</Text>
                </TouchableOpacity>
              )}
            </ScrollView>
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
