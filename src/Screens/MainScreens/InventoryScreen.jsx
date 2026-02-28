import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
  ActivityIndicator,
} from 'react-native';
import { styles } from '../../Globalcss/Globalcss';
import CustomHeader from '../../components/CustomHeader';
import SearchIcon from '../../../assets/images/searchIcon.svg';
import FilterIcon from '../../../assets/images/filterIcon.svg';
import PlusIcon from '../../../assets/images/plusIcon.svg';
import EyeIcon from '../../../assets/images/eyeIcon.svg';
import SofaIcon from '../../../assets/images/sofasvg.svg';
import { useProduct } from '../../context/ProductContext';
import { BASE_URL } from '../../utils/constant';

const InventoryScreen = ({ navigation }) => {
  const { products, fetchProducts, loading } = useProduct();
  const [activeTab, setActiveTab] = useState('Approved');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const getFilteredProducts = () => {
    let filtered = products;

    // Tab filtering
    switch (activeTab) {
      case 'Approved':
        filtered = products.filter(p => p.approval_status === 'approved' && p.is_active == true);
        break;
      case 'Inactive':
        filtered = products.filter(p => p.approval_status === 'approved' && p.is_active == false);
        break;
      case 'Pending':
        filtered = products.filter(p => p.approval_status === 'pending');
        break;
      case 'Rejected':
        filtered = products.filter(p => p.approval_status === 'rejected');
        break;
      default:
        break;
    }

    // Search filtering
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const RenderProductItem = ({ item }) => {
    const primaryImage = item.images?.find(img => img.image_type === 'primary')?.image_url || item.primary_image;
    const imageUrl = primaryImage ? `${BASE_URL}${primaryImage}` : null;

    return (
      <View style={styles.productCard}>
        <View style={styles.productCardTop}>
          <View style={styles.productImg}>
            {imageUrl ? (
              <Image source={{ uri: imageUrl }} style={{ width: 75, height: 75, borderRadius: 8 }} />
            ) : (
              <SofaIcon width={75} height={75} />
            )}
          </View>
          <View style={styles.productContent}>
            <Text style={styles.productTitle} numberOfLines={3}>
              {item.name}
            </Text>
            <View style={styles.productDataRow}>
              <Text style={styles.productDataLabel}>Product ID</Text>
              <Text style={styles.productDataValue}>#{item.id}</Text>
            </View>
            <View style={styles.productDataRow}>
              <Text style={styles.productDataLabel}>Category</Text>
              <Text style={styles.productDataValue}>{item.category?.name}</Text>
            </View>
          </View>
        </View>

        <View style={styles.productDivider} />

        <View style={styles.productFooter}>
          <View style={styles.stockContainer}>
            <Text style={styles.stockLabel}>Stock</Text>
            <Text style={styles.stockValue}>{item.total_stock || item.stock || 0}</Text>
          </View>
          <View style={styles.productActions}>
            <TouchableOpacity
              style={styles.viewDetailBtn}
              onPress={() =>
                navigation.navigate('ProductDetailScreen', { productId: item.id })
              }
            >
              <EyeIcon width={20} height={20} />
              <Text style={styles.viewDetailText}>View Product</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const getCount = (tab) => {
    switch (tab) {
      case 'Approved':
        return products.filter(p => p.approval_status === 'approved' && p.is_active === true).length;
      case 'Inactive':
        return products.filter(p => p.approval_status === 'approved' && p.is_active === false).length;
      case 'Pending':
        return products.filter(p => p.approval_status === 'pending').length;
      case 'Rejected':
        return products.filter(p => p.approval_status === 'rejected').length;
      default:
        return 0;
    }
  };

  return (
    <View style={styles.screenContainer}>
      <CustomHeader variant="dashboard" />

      <View style={styles.inventoryHeader}>
        <Text style={styles.inventoryTitle}>My Inventory</Text>
        <TouchableOpacity
          style={styles.addProductBtn}
          onPress={() => navigation.navigate('AddProductScreen')}
        >
          <PlusIcon width={14} height={14} />
          <Text style={styles.addProductText}>Add Product</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inventorySearchRow}>
        <View style={styles.searchBarContainer}>
          <SearchIcon width={20} height={20} />
          <TextInput
            placeholder="Search SKU or Name..."
            style={styles.searchInput}
            placeholderTextColor="#7F8C8D"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterBtn}>
          <FilterIcon width={24} height={24} />
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.tabContainer,
          {
            backgroundColor: 'transparent',
            paddingHorizontal: 16,
            paddingVertical: 0,
            marginBottom: 16,
          },
        ]}
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TabPill
            label="Active"
            count={getCount('Approved')}
            active={activeTab === 'Approved'}
            onPress={() => setActiveTab('Approved')}
          />
          <TabPill
            label="Inactive"
            count={getCount('Inactive')}
            active={activeTab === 'Inactive'}
            onPress={() => setActiveTab('Inactive')}
          />
          <TabPill
            label="Pending"
            count={getCount('Pending')}
            active={activeTab === 'Pending'}
            onPress={() => setActiveTab('Pending')}
          />
          <TabPill
            label="Rejected"
            count={getCount('Rejected')}
            active={activeTab === 'Rejected'}
            onPress={() => setActiveTab('Rejected')}
          />
        </ScrollView>
      </View>

      {loading && products.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#F83336" />
        </View>
      ) : (
        <FlatList
          data={getFilteredProducts()}
          renderItem={RenderProductItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={{ marginTop: 50, alignItems: 'center' }}>
              <Text style={{ color: '#7F8C8D', fontFamily: 'Inter-Medium' }}>No products found</Text>
            </View>
          }
          onRefresh={fetchProducts}
          refreshing={loading}
        />
      )}
    </View>
  );
};

const TabPill = ({ label, count, active, onPress }) => (
  <TouchableOpacity
    style={[styles.pillTab, active && styles.activePillTab]}
    onPress={onPress}
  >
    <Text
      style={[
        styles.pillText,
        active ? styles.activePillText : { color: '#7F8C8D' },
      ]}
    >
      {label}
    </Text>
    <View style={[styles.badge, active && { backgroundColor: '#FFFFFF' }]}>
      <Text style={[styles.badgeText, active && { color: '#000000' }]}>
        {count}
      </Text>
    </View>
  </TouchableOpacity>
);

export default InventoryScreen;
