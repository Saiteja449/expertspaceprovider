import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import { styles as globalStyles } from '../../Globalcss/Globalcss';
import { SearchIcon } from '../../Icons/DashboardIcons';
import Svg, { Path } from 'react-native-svg';

const FilterIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Path d="M4 4H20V6H4V4ZM7 10H17V12H7V10ZM10 16H14V18H10V16Z" fill="#666" />
  </Svg>
);

const InventoryScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Active');

  const products = [
    {
      id: '1',
      title: 'Rosewood 2-Seater Modern Classic Settee Sofa Diwan...',
      productId: '20957689',
      category: 'Furniture',
      stock: 10,
      image: 'https://via.placeholder.com/80',
    },
    {
      id: '2',
      title: 'Rosewood 2-Seater Modern Classic Settee Sofa Diwan...',
      productId: '20957689',
      category: 'Furniture',
      stock: 10,
      image: 'https://via.placeholder.com/80',
    },
  ];

  const renderProductItem = ({ item }) => (
    <View style={globalStyles.listItemCard}>
      <View style={{ flexDirection: 'row' }}>
        <Image source={{ uri: item.image }} style={globalStyles.productImage} />
        <View style={globalStyles.productCardContent}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: '#000',
              marginBottom: 5,
            }}
          >
            {item.title}
          </Text>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={{ fontSize: 12, color: '#666' }}>Product ID</Text>
            <Text style={{ fontSize: 12, color: '#000' }}>
              {item.productId}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 4,
            }}
          >
            <Text style={{ fontSize: 12, color: '#666' }}>Category</Text>
            <Text style={{ fontSize: 12, color: '#000' }}>{item.category}</Text>
          </View>
        </View>
      </View>

      <View
        style={{ height: 1, backgroundColor: '#F0F0F0', marginVertical: 12 }}
      />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <View>
          <Text style={{ fontSize: 12, color: '#666' }}>Stock</Text>
          <Text style={{ fontSize: 16, fontWeight: '700', color: '#000' }}>
            {item.stock}
          </Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={[globalStyles.viewProductBtn, { marginRight: 10 }]}
            onPress={() =>
              navigation.navigate('ProductDetailScreen', { product: item })
            }
          >
            {/* Eye Icon */}
            <Svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="2"
              style={{ marginRight: 4 }}
            >
              <Path
                d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8-11-8-11-8z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
            <Text style={{ fontSize: 12, fontWeight: '600', color: '#000' }}>
              View Product
            </Text>
          </TouchableOpacity>

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
            {/* Share Icon */}
            <Svg
              width="16"
              height="16"
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
      </View>
    </View>
  );

  return (
    <View style={globalStyles.container}>
      {/* Header */}
      <View style={globalStyles.headerContainer}>
        <Text style={globalStyles.headerTitle}>My Inventory</Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#FF4500',
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('AddProductScreen')}
        >
          <Text
            style={{
              color: '#FFF',
              fontSize: 18,
              fontWeight: '600',
              marginRight: 4,
            }}
          >
            +
          </Text>
          <Text style={{ color: '#FFF', fontSize: 14, fontWeight: '600' }}>
            Add Product
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View
        style={{
          paddingHorizontal: 16,
          marginVertical: 12,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: '#FFF',
            borderRadius: 8,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 12,
            height: 44,
            borderWidth: 1,
            borderColor: '#E0E0E0',
          }}
        >
          <SearchIcon size={20} color="#9E9E9E" />
          <TextInput
            placeholder="Search..."
            style={{ flex: 1, paddingHorizontal: 10, fontSize: 14 }}
            placeholderTextColor="#9E9E9E"
          />
        </View>
        <TouchableOpacity
          style={{
            marginLeft: 10,
            width: 44,
            height: 44,
            backgroundColor: '#FFF',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#E0E0E0',
          }}
        >
          <FilterIcon />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={globalStyles.tabContainer}>
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
        data={products}
        renderItem={renderProductItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const TabPill = ({ label, count, active, onPress }) => (
  <TouchableOpacity
    style={[globalStyles.pillTab, active && globalStyles.activePillTab]}
    onPress={onPress}
  >
    <Text
      style={[globalStyles.pillText, active && globalStyles.activePillText]}
    >
      {label}
    </Text>
    <View
      style={[
        globalStyles.badge,
        active
          ? { backgroundColor: '#FFFFFF' }
          : { backgroundColor: '#000000' },
      ]}
    >
      <Text
        style={[
          globalStyles.badgeText,
          active ? { color: '#000' } : { color: '#FFF' },
        ]}
      >
        {count}
      </Text>
    </View>
  </TouchableOpacity>
);

export default InventoryScreen;
