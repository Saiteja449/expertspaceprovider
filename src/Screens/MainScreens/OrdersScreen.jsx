import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { styles as globalStyles } from '../../Globalcss/Globalcss';
import { SearchIcon, BackArrowIcon } from '../../Icons/DashboardIcons';

// Order Data
const ordersData = [
  {
    id: '1',
    title: '3-seat sofa, grey',
    status: 'Pending',
    date: '12 january,2025, 12:34 AM',
    price: '₹ 22,990',
    location: 'Sindhubhawan road, Fox colony',
    customerName: 'Darrell Steward',
    customerImage: 'https://via.placeholder.com/40', // Placeholder
    productImage: 'https://via.placeholder.com/80', // Placeholder
  },
  {
    id: '2',
    title: '3-seat sofa, grey',
    status: 'Pending',
    date: '12 january,2025, 12:34 AM',
    price: '₹ 22,990',
    location: 'Sindhubhawan road, Fox colony',
    customerName: 'Darrell Steward',
    customerImage: 'https://via.placeholder.com/40',
    productImage: 'https://via.placeholder.com/80',
  },
];

const OrdersScreen = () => {
  const [activeTab, setActiveTab] = useState('Pending');

  const renderOrderItem = ({ item }) => (
    <View style={globalStyles.listItemCard}>
      <View style={globalStyles.orderHeader}>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <Image
            source={{ uri: item.productImage }}
            style={globalStyles.productImage}
          />
          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <Text style={globalStyles.orderTitle}>{item.title}</Text>
              <View style={globalStyles.statusTag}>
                <Text style={globalStyles.statusText}>{item.status}</Text>
              </View>
            </View>

            <View style={{ marginTop: 8 }}>
              <View style={globalStyles.orderRow}>
                <Text style={{ fontSize: 12, color: '#666' }}>
                  📅 {item.date}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: '#000',
                  marginVertical: 4,
                }}
              >
                {item.price}
              </Text>
              <View style={globalStyles.orderRow}>
                <Text style={{ fontSize: 12, color: '#666' }}>
                  📍 {item.location}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View
        style={{ height: 1, backgroundColor: '#E0E0E0', marginVertical: 10 }}
      />

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={{ uri: item.customerImage }}
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            marginRight: 10,
            backgroundColor: '#ccc',
          }}
        />
        <View>
          <Text style={{ fontSize: 12, color: '#666' }}>Customer Name</Text>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#000' }}>
            {item.customerName}
          </Text>
        </View>
      </View>

      <View style={globalStyles.actionButtons}>
        <TouchableOpacity
          style={[globalStyles.actionButton, globalStyles.acceptButton]}
        >
          <Text style={globalStyles.acceptText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[globalStyles.actionButton, globalStyles.rejectButton]}
        >
          <Text style={globalStyles.rejectText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={globalStyles.container}>
      {/* Header */}
      <View style={globalStyles.headerContainer}>
        <TouchableOpacity>
          <BackArrowIcon size={24} />
        </TouchableOpacity>
        <Text style={globalStyles.headerTitle}>Orders</Text>
        <TouchableOpacity>
          <SearchIcon size={24} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={globalStyles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TabPill
            label="Pending"
            count="12"
            active={activeTab === 'Pending'}
            onPress={() => setActiveTab('Pending')}
          />
          <TabPill
            label="Deliverd"
            count="234"
            active={activeTab === 'Deliverd'}
            onPress={() => setActiveTab('Deliverd')}
          />
          <TabPill
            label="Ready to ship"
            count="34"
            active={activeTab === 'Ready to ship'}
            onPress={() => setActiveTab('Ready to ship')}
          />
        </ScrollView>
      </View>

      {/* Order List Header */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          marginVertical: 10,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: '700', color: '#000' }}>
          Order List
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 14, color: '#666' }}>Sort By</Text>
          {/* Chevron down icon could go here */}
        </View>
      </View>

      <FlatList
        data={ordersData}
        renderItem={renderOrderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
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

export default OrdersScreen;
