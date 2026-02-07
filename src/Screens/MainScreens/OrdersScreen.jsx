import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { styles } from '../../Globalcss/Globalcss';
import CustomHeader from '../../components/CustomHeader';
import { ArrowDownIcon } from '../../Icons/ArrowDownIcon';

// SVG Icons
import CalenderIcon from '../../../assets/images/calenderIcon.svg';
import LocationIcon from '../../../assets/images/locationIcon.svg';
import SofaIcon from '../../../assets/images/sofasvg.svg';
import DummyProfile from '../../../assets/images/dummyProfile.svg';

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
  },
  {
    id: '2',
    title: '3-seat sofa, grey',
    status: 'Pending',
    date: '12 january,2025, 12:34 AM',
    price: '₹ 22,990',
    location: 'Sindhubhawan road, Fox colony',
    customerName: 'Darrell Steward',
  },
  {
    id: '3',
    title: '3-seat sofa, grey',
    status: 'Pending',
    date: '12 january,2025, 12:34 AM',
    price: '₹ 22,990',
    location: 'Sindhubhawan road, Fox colony',
    customerName: 'Darrell Steward',
  },
];

const OrdersScreen = () => {
  const [activeTab, setActiveTab] = useState('Pending');

  const RenderOrderItem = ({ item }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderCardTop}>
        <View style={styles.orderProductImage}>
          <SofaIcon width={75} height={75} />
        </View>
        <View style={styles.orderInfo}>
          <View style={styles.orderInfoTop}>
            <Text style={styles.orderProductName}>{item.title}</Text>
            <View style={styles.pendingTag}>
              <Text style={styles.pendingTagText}>{item.status}</Text>
            </View>
          </View>

          <View style={styles.orderDateRow}>
            <CalenderIcon width={16} height={16} />
            <Text style={styles.orderDetailText}>{item.date}</Text>
          </View>

          <Text style={styles.orderPrice}>{item.price}</Text>

          <View style={styles.orderLocationRow}>
            <LocationIcon width={16} height={16} />
            <Text style={styles.orderDetailText}>{item.location}</Text>
          </View>
        </View>
      </View>

      <View style={styles.customerDivider} />

      <View style={styles.customerRow}>
        <View style={styles.customerAvatar}>
          <DummyProfile width={40} height={40} />
        </View>
        <View style={styles.customerInfo}>
          <Text style={styles.customerLabel}>Customer Name</Text>
          <Text style={styles.customerName}>{item.customerName}</Text>
        </View>
      </View>

      <View style={styles.orderActionButtons}>
        <TouchableOpacity style={styles.orderAcceptBtn}>
          <Text style={styles.orderAcceptText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.orderRejectBtn}>
          <Text style={styles.orderRejectText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.ordersContainer}>
      <CustomHeader variant="internal" title="Orders" />

      <View
        style={[
          styles.tabContainer,
          { backgroundColor: 'transparent', paddingHorizontal: 16 },
        ]}
      >
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

      <View style={styles.orderListHeader}>
        <Text style={styles.orderListTitle}>Order List</Text>
        <View style={styles.sortByContainer}>
          <Text style={styles.sortByText}>Sort By</Text>
          <ArrowDownIcon size={12} color="#333" />
        </View>
      </View>

      <FlatList
        data={ordersData}
        renderItem={RenderOrderItem}
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

export default OrdersScreen;
