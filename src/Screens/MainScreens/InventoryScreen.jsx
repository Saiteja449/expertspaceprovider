import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import { styles } from '../../Globalcss/Globalcss';
import CustomHeader from '../../components/CustomHeader';
import SearchIcon from '../../../assets/images/searchIcon.svg';
import FilterIcon from '../../../assets/images/filterIcon.svg';
import PlusIcon from '../../../assets/images/plusIcon.svg';
import EyeIcon from '../../../assets/images/eyeIcon.svg';
import ShareIcon from '../../../assets/images/shareIcon.svg';
import SofaIcon from '../../../assets/images/sofasvg.svg';

const productsData = [
  {
    id: '1',
    title:
      'Rosewood 2-Seater Modern Classic Settee Sofa Diwan Chaise Lounge Couch with Pillow for Home and Living Room, Office, Bedroom (Beige Kulfi, Large)',
    productId: '20957689',
    category: 'Furniture',
    stock: 10,
  },
  {
    id: '2',
    title:
      'Rosewood 2-Seater Modern Classic Settee Sofa Diwan Chaise Lounge Couch with Pillow for Home and Living Room, Office, Bedroom (Beige Kulfi, Large)',
    productId: '20957689',
    category: 'Furniture',
    stock: 10,
  },
  {
    id: '3',
    title:
      'Rosewood 2-Seater Modern Classic Settee Sofa Diwan Chaise Lounge Couch with Pillow for Home and Living Room, Office, Bedroom (Beige Kulfi, Large)',
    productId: '20957689',
    category: 'Furniture',
    stock: 10,
  },
];

const InventoryScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Active');

  const RenderProductItem = ({ item }) => (
    <View style={styles.productCard}>
      <View style={styles.productCardTop}>
        <View style={styles.productImg}>
          <SofaIcon width={75} height={75} />
        </View>
        <View style={styles.productContent}>
          <Text style={styles.productTitle} numberOfLines={3}>
            {item.title}
          </Text>
          <View style={styles.productDataRow}>
            <Text style={styles.productDataLabel}>Product ID</Text>
            <Text style={styles.productDataValue}>{item.productId}</Text>
          </View>
          <View style={styles.productDataRow}>
            <Text style={styles.productDataLabel}>Category</Text>
            <Text style={styles.productDataValue}>{item.category}</Text>
          </View>
        </View>
      </View>

      <View style={styles.productDivider} />

      <View style={styles.productFooter}>
        <View style={styles.stockContainer}>
          <Text style={styles.stockLabel}>Stock</Text>
          <Text style={styles.stockValue}>{item.stock}</Text>
        </View>
        <View style={styles.productActions}>
          <TouchableOpacity
            style={styles.viewDetailBtn}
            onPress={() =>
              navigation.navigate('ProductDetailScreen', { product: item })
            }
          >
            <EyeIcon width={20} height={20} />
            <Text style={styles.viewDetailText}>View Product</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareBtn}>
            <ShareIcon width={20} height={20} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

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
            placeholder="Search..."
            style={styles.searchInput}
            placeholderTextColor="#7F8C8D"
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
            count="12"
            active={activeTab === 'Active'}
            onPress={() => setActiveTab('Active')}
          />
          <TabPill
            label="Pending"
            count="234"
            active={activeTab === 'Pending'}
            onPress={() => setActiveTab('Pending')}
          />
          <TabPill
            label="Paused"
            count="34"
            active={activeTab === 'Paused'}
            onPress={() => setActiveTab('Paused')}
          />
          <TabPill
            label="Blocked"
            count="2"
            active={activeTab === 'Blocked'}
            onPress={() => setActiveTab('Blocked')}
          />
        </ScrollView>
      </View>

      <FlatList
        data={productsData}
        renderItem={RenderProductItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />
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
