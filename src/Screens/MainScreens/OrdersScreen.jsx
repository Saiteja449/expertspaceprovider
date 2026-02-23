import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
  TextInput,
} from 'react-native';
import { styles } from '../../Globalcss/Globalcss';
import CustomHeader from '../../components/CustomHeader';
import { ArrowDownIcon } from '../../Icons/ArrowDownIcon';

// SVG Icons
import CalenderIcon from '../../../assets/images/calenderIcon.svg';
import LocationIcon from '../../../assets/images/locationIcon.svg';
import SofaIcon from '../../../assets/images/sofasvg.svg';
import DummyProfile from '../../../assets/images/dummyProfile.svg';
import SearchIcon from '../../../assets/images/searchIcon.svg';
import FilterIcon from '../../../assets/images/filterIcon.svg';

import apiService from '../../api/apiService';
import { BASE_URL } from '../../utils/constant';

const OrdersScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Pending');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchOrders = async (pageNumber = 1, isRefresh = false) => {
    try {
      if (pageNumber === 1 && !isRefresh) {
        setLoading(true);
      }

      const response = await apiService.get(`provider/getOrderRequestsForProvider?page=${pageNumber}`);

      if (response?.data?.success) {
        setTotalPages(response.data.total_pages || 1);
        if (pageNumber === 1) {
          setOrders(response.data.data || []);
        } else {
          setOrders(prev => [...prev, ...(response.data.data || [])]);
        }
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
      setLoadingMore(false);
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      setLoading(true);
      console.log('Updating status for order:', orderId, 'to', newStatus);

      let response;
      if (newStatus === 'accept' || newStatus === 'rejected') {
        const payload = {
          action: newStatus === 'rejected' ? 'reject' : 'accept',
          ...(newStatus === 'rejected' && { rejection_reason: 'Out of stock' }) // Default rejection reason for now
        };
        response = await apiService.put(`provider/acceptOrRejectOrderRequestByProvider/${orderId}`, payload);
      } else {
        response = await apiService.put(`provider/updateOrderStatus/${orderId}`, { status: newStatus });
      }

      if (response?.data?.success) {
        handleRefresh();
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error('Error updating status:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(1);
  }, []);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(1);
    fetchOrders(1, true);
  }, []);

  const handleLoadMore = () => {
    if (!loadingMore && page < totalPages) {
      setLoadingMore(true);
      const nextPage = page + 1;
      setPage(nextPage);
      fetchOrders(nextPage);
    }
  };

  const getFilteredOrders = () => {
    return orders.filter(order => {
      const status = order.status?.toLowerCase() || '';

      // Handle active tab matching
      let isTabMatch = true;
      switch (activeTab) {
        case 'Pending':
          isTabMatch = status === 'pending';
          break;
        case 'Accept':
          isTabMatch = status === 'accept' || status === 'accepted';
          break;
        case 'Completed':
          isTabMatch = status === 'completed';
          break;
        case 'Rejected':
          isTabMatch = status === 'rejected';
          break;
        case 'Cancelled':
          isTabMatch = status === 'cancelled';
          break;
        default:
          isTabMatch = true;
      }

      // Handle search string matching
      let isSearchMatch = true;
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const customerName = order.customer?.name?.toLowerCase() || '';
        const subOrderNum = order.sub_order_number?.toLowerCase() || '';
        const firstItemName = order.items && order.items.length > 0 ? order.items[0].product_name?.toLowerCase() || '' : '';

        isSearchMatch = customerName.includes(query) || subOrderNum.includes(query) || firstItemName.includes(query);
      }

      return isTabMatch && isSearchMatch;
    });
  };

  const getCount = (tab) => {
    return orders.filter(order => {
      const status = order.status?.toLowerCase() || '';
      switch (tab) {
        case 'Pending':
          return status === 'pending';
        case 'Accept':
          return status === 'accept' || status === 'accepted';
        case 'Completed':
          return status === 'completed';
        case 'Rejected':
          return status === 'rejected';
        case 'Cancelled':
          return status === 'cancelled';
        default:
          return 0;
      }
    }).length;
  };

  const renderItem = useCallback(({ item }) => (
    <RenderOrderItem
      item={item}
      navigation={navigation}
      onUpdateStatus={handleUpdateStatus}
    />
  ), [navigation, handleRefresh]);

  return (
    <View style={styles.ordersContainer}>
      <CustomHeader variant="internal" title="Orders" hideRightIcon={true} />

      <View style={styles.inventorySearchRow}>
        <View style={styles.searchBarContainer}>
          <SearchIcon width={20} height={20} />
          <TextInput
            placeholder="Search order ID, product, or customer..."
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
          { backgroundColor: 'transparent', paddingHorizontal: 16 },
        ]}
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TabPill
            label="Pending"
            count={getCount('Pending')}
            active={activeTab === 'Pending'}
            onPress={() => setActiveTab('Pending')}
          />
          <TabPill
            label="Accept"
            count={getCount('Accept')}
            active={activeTab === 'Accept'}
            onPress={() => setActiveTab('Accept')}
          />
          <TabPill
            label="Completed"
            count={getCount('Completed')}
            active={activeTab === 'Completed'}
            onPress={() => setActiveTab('Completed')}
          />
          <TabPill
            label="Rejected"
            count={getCount('Rejected')}
            active={activeTab === 'Rejected'}
            onPress={() => setActiveTab('Rejected')}
          />
          <TabPill
            label="Cancelled"
            count={getCount('Cancelled')}
            active={activeTab === 'Cancelled'}
            onPress={() => setActiveTab('Cancelled')}
          />
        </ScrollView>
      </View>

      <View style={styles.orderListHeader}>
        <Text style={styles.orderListTitle}>Order List</Text>
        {/* <View style={styles.sortByContainer}>
          <Text style={styles.sortByText}>Sort By</Text>
          <ArrowDownIcon size={12} color="#333" />
        </View> */}
      </View>

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#F83336" />
        </View>
      ) : (
        <FlatList
          data={getFilteredOrders()}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 100, flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          onRefresh={handleRefresh}
          refreshing={refreshing}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loadingMore ? (
              <ActivityIndicator size="small" color="#F83336" style={{ marginVertical: 20 }} />
            ) : null
          }
          ListEmptyComponent={
            <View style={{ marginTop: 50, alignItems: 'center' }}>
              <Text style={{ color: '#7F8C8D', fontFamily: 'Inter-Medium' }}>No orders found</Text>
            </View>
          }
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

export default OrdersScreen;

const RenderOrderItem = React.memo(({ item, navigation, onUpdateStatus }) => {
  const firstItem = item.items && item.items.length > 0 ? item.items[0] : null;
  const imageUrl = firstItem?.image_url ? `${BASE_URL}${firstItem.image_url}` : null;
  const profileUrl = item.customer?.profile ? `${BASE_URL}${item.customer.profile}` : null;

  const formattedDate = item.created_at ? new Date(item.created_at).toLocaleString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  }) : '';

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('OrderDetailScreen', { orderId: item.id })}
      style={styles.orderCard}
    >
      <View style={styles.orderCardTop}>
        <View style={styles.orderProductImage}>
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={{ width: 75, height: 75, borderRadius: 8 }} />
          ) : (
            <SofaIcon width={75} height={75} />
          )}
        </View>
        <View style={styles.orderInfo}>
          <View style={styles.orderInfoTop}>
            <Text style={styles.orderProductName} numberOfLines={1}>
              {firstItem ? firstItem.product_name : 'N/A'} {item.items?.length > 1 ? `+ ${item.items.length - 1} more` : ''}
            </Text>
            <View style={[styles.pendingTag, { backgroundColor: item.status?.toLowerCase() === 'pending' ? '#FFF5E5' : (item.status?.toLowerCase() === 'cancelled' || item.status?.toLowerCase() === 'rejected') ? '#FFEBEE' : '#E8F5E9' }]}>
              <Text style={[styles.pendingTagText, { color: item.status?.toLowerCase() === 'pending' ? '#FFA500' : (item.status?.toLowerCase() === 'cancelled' || item.status?.toLowerCase() === 'rejected') ? '#F44336' : '#4CAF50', textTransform: 'capitalize' }]}>{item.status}</Text>
            </View>
          </View>

          <View style={styles.orderDateRow}>
            <CalenderIcon width={16} height={16} />
            <Text style={styles.orderDetailText}>{formattedDate}</Text>
          </View>

          <Text style={styles.orderPrice}>₹ {item.subtotal}</Text>

          <View style={styles.orderLocationRow}>
            <LocationIcon width={16} height={16} />
            <Text style={[styles.orderDetailText, { flex: 1, marginLeft: 4 }]} numberOfLines={2}>{item.shipping_address}</Text>
          </View>
        </View>
      </View>

      <View style={styles.customerDivider} />

      <View style={styles.customerRow}>
        <View style={styles.customerAvatar}>
          {profileUrl ? (
            <Image source={{ uri: profileUrl }} style={{ width: 40, height: 40, borderRadius: 20 }} />
          ) : (
            <DummyProfile width={40} height={40} />
          )}
        </View>
        <View style={styles.customerInfo}>
          <Text style={styles.customerLabel}>Customer Name</Text>
          <Text style={styles.customerName}>{item.customer?.name}</Text>
        </View>
      </View>

      {item.status?.toLowerCase() === 'pending' && (
        <View style={styles.orderActionButtons}>
          <TouchableOpacity style={styles.orderAcceptBtn} onPress={() => onUpdateStatus(item.id, 'accept')}>
            <Text style={styles.orderAcceptText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.orderRejectBtn} onPress={() => onUpdateStatus(item.id, 'rejected')}>
            <Text style={styles.orderRejectText}>Reject</Text>
          </TouchableOpacity>
        </View>
      )}

      {(item.status?.toLowerCase() === 'accept' || item.status?.toLowerCase() === 'accepted') && (
        <View style={styles.orderActionButtons}>
          <TouchableOpacity style={[styles.orderAcceptBtn, { width: '100%' }]} onPress={() => onUpdateStatus(item.id, 'completed')}>
            <Text style={styles.orderAcceptText}>Completed</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
});
