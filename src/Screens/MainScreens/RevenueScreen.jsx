import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform, KeyboardAvoidingView, ActivityIndicator, Dimensions } from 'react-native';
import CustomHeader from '../../components/CustomHeader';
import { font } from '../../utils/fontFamilies';
import { LineChart } from 'react-native-gifted-charts';
import Svg, { Path, Rect, Circle } from 'react-native-svg';
import { styles as globalStyles } from '../../Globalcss/Globalcss';
import { useUser } from '../../context/UserContext';

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

const CalendarIcon = ({ size = 16, color = '#9E9E9E' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <Path d="M16 2v4M8 2v4M3 10h18" />
  </Svg>
);

const { width } = Dimensions.get('window');

const RevenueScreen = () => {
  const { user, fetchProviderProfile, loading } = useUser();
  const [activeFilter, setActiveFilter] = useState('Weekly');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setRefreshing(true);
    await fetchProviderProfile();
    setRefreshing(false);
  };

  const getChartData = () => {
    if (!user || !user.businessInsights) return [];

    let rawData = [];
    if (activeFilter === 'Weekly') {
      rawData = user.businessInsights.weekly || [];
      return rawData.map(item => ({
        value: parseFloat(item.total),
        label: new Date(item.date).toLocaleDateString('en-US', { weekday: 'short' }),
      }));
    } else if (activeFilter === 'Monthly') {
      rawData = user.businessInsights.monthly || [];
      return rawData.map(item => ({
        value: parseFloat(item.total),
        label: item.month,
      }));
    } else if (activeFilter === 'Yearly') {
      rawData = user.businessInsights.yearly || [];
      return rawData.map(item => ({
        value: parseFloat(item.total),
        label: item.year.toString(),
      }));
    }
    return [];
  };

  const chartData = getChartData();
  const revenueStats = user?.revenueStats || {};
  const transactions = user?.recentTransactions || [];
  const provider = user?.provider || {};
  const providerDetails = provider?.providerDetails || {};

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.safeArea}>
      <CustomHeader />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

        {/* Welcome Section */}
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>
            <Text style={styles.welcomeBold}>Welcome Back! </Text>
            {providerDetails.business_name || provider?.name || "TONY'S HOUSE"}
          </Text>
          <Text style={styles.welcomeSubtitle}>Manage and grow your business</Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statsCard}>
            <Text style={styles.statsLabel}>Total Revenue</Text>
            <Text style={styles.statsValue}>₹ {revenueStats.totalRevenue || '0'}</Text>
          </View>
          <View style={styles.statsCard}>
            <Text style={styles.statsLabel}>This Month</Text>
            <Text style={styles.statsValue}>₹ {revenueStats.thisMonthRevenue || '0'}</Text>
          </View>
          <View style={styles.statsCard}>
            <Text style={styles.statsLabel}>Pending Payout</Text>
            <Text style={styles.statsValue}>₹ {revenueStats.pendingPayout || '0'}</Text>
          </View>
          <View style={styles.statsCard}>
            <Text style={styles.statsLabel}>Completed</Text>
            <Text style={styles.statsValue}>₹ {revenueStats.completedAmount || '0'}</Text>
          </View>
        </View>

        {/* Chart Section */}
        <View style={styles.chartCard}>
          <Text style={styles.sectionTitle}>Business Insights</Text>
          <View style={styles.filterRow}>
            {['Weekly', 'Monthly'].map(filter => (
              <TouchableOpacity
                key={filter}
                style={[styles.pillBtn, activeFilter === filter && styles.activePillBtn]}
                onPress={() => setActiveFilter(filter)}
              >
                <Text style={[styles.pillText, activeFilter === filter && styles.activePillText]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.chartContainer}>
            {chartData.length > 0 ? (
              <LineChart
                areaChart
                curved
                data={chartData}
                height={200}
                width={width - 100}
                initialSpacing={30}
                spacing={(width - 130) / (chartData.length > 1 ? chartData.length - 1 : 1)}
                color="#F76627"
                thickness={4}
                startFillColor="rgba(247, 102, 39, 0.3)"
                endFillColor="rgba(247, 102, 39, 0.05)"
                startOpacity={0.4}
                endOpacity={0.1}
                noOfSections={4}
                yAxisThickness={0}
                xAxisThickness={1}
                xAxisColor="#E0E0E0"
                yAxisTextStyle={{ color: '#9E9E9E', fontSize: 10, fontFamily: font.REGULAR }}
                xAxisLabelTextStyle={{ color: '#9E9E9E', fontSize: 10, fontFamily: font.REGULAR }}
                hideRules={false}
                rulesColor="#F0F0F0"
                rulesType="solid"
                yAxisColor="transparent"
                hideDataPoints={false}
                dataPointsColor="#F76627"
                dataPointsRadius={4}
                dataPointsWidth={10}
                showVerticalLines={false}
                pointerConfig={{
                  pointerStripColor: '#F76627',
                  pointerStripWidth: 2,
                  pointerColor: '#F76627',
                  radius: 6,
                  pointerLabelComponent: items => {
                    return (
                      <View
                        style={{
                          height: 30,
                          width: 50,
                          backgroundColor: '#000',
                          borderRadius: 4,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Text style={{ color: '#fff', fontSize: 10 }}>
                          {items[0].value}
                        </Text>
                      </View>
                    );
                  },
                }}
              />
            ) : (
              <View style={{ height: 200, width: width - 80, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#9E9E9E', fontFamily: font.REGULAR }}>No data available</Text>
              </View>
            )}
          </View>
        </View>

        {/* Transactions List */}
        <Text style={[styles.sectionTitle, { marginTop: 10, marginBottom: 16 }]}>Recent Transactions</Text>

        {transactions.map(item => (
          <View key={item.id} style={styles.transactionCard}>
            <View style={styles.transactionTop}>
              {/* Image removed as per user request */}
              <View style={styles.transactionInfo}>
                <Text style={styles.bookingId}>Sub Order: {item.sub_order_number}</Text>
                <View style={styles.dateRow}>
                  <CalendarIcon size={14} color="#666" />
                  <Text style={styles.dateText}>{formatDate(item.created_at)}</Text>
                </View>
                <Text style={styles.priceText}>₹ {item.subtotal}</Text>
              </View>
              <View style={[styles.statusBadge, {
                backgroundColor: item.status?.toLowerCase() === 'completed' ? '#E8F5E9' :
                  item.status?.toLowerCase() === 'pending' ? '#FFF3E0' :
                    (item.status?.toLowerCase() === 'accepted' || item.status?.toLowerCase() === 'accept') ? '#E3F2FD' : '#FFEBEE'
              }]}>
                <Text style={[styles.statusText, {
                  color: item.status?.toLowerCase() === 'completed' ? '#2E7D32' :
                    item.status?.toLowerCase() === 'pending' ? '#EF6C00' :
                      (item.status?.toLowerCase() === 'accepted' || item.status?.toLowerCase() === 'accept') ? '#1976D2' : '#C62828'
                }]}>
                  {item.status}
                </Text>
              </View>
            </View>
            {/* Customer name and avatar are not available in the provided API snippet, so we'll hide or use generic info if needed */}
          </View>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FE',
  },
  container: {
    padding: 16,
  },
  welcomeContainer: {
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 4,
  },
  welcomeBold: {
    fontWeight: 'bold',
    color: '#000',
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statsCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  statsLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  statsValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    letterSpacing: 0.5,
  },
  chartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
  },
  filterRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  pillBtn: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    marginRight: 10,
  },
  activePillBtn: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  pillText: {
    fontSize: 12,
    color: '#666',
  },
  activePillText: {
    color: '#FFFFFF',
  },
  chartContainer: {
    marginLeft: -10,
    marginTop: 10,
  },
  transactionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  transactionTop: {
    flexDirection: 'row',
  },
  productImagePlaceholder: {
    width: 70,
    height: 70,
    backgroundColor: '#EAEAEA',
    borderRadius: 12,
    marginRight: 12,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  transactionInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  bookingId: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  dateText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 6,
  },
  priceText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 12,
  },
  customerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eee',
    marginRight: 12,
  },
  customerLabel: {
    fontSize: 11,
    color: '#666',
  },
  customerName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'center',
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});

export default RevenueScreen;
