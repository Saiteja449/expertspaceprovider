import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform, KeyboardAvoidingView } from 'react-native';
import CustomHeader from '../../components/CustomHeader';
import { LineChart } from 'react-native-gifted-charts';
import Svg, { Path, Rect, Circle } from 'react-native-svg';
import { styles as globalStyles } from '../../Globalcss/Globalcss'; // for font/generic layout if needed

const CalendarIcon = ({ size = 16, color = '#9E9E9E' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <Path d="M16 2v4M8 2v4M3 10h18" />
  </Svg>
);

const RevenueScreen = () => {
  const [activeFilter, setActiveFilter] = useState('Weekly');

  const chartData = [
    { value: 6000, label: 'Jan' },
    { value: 9000, label: 'Feb' },
    { value: 20000, label: 'Mar' },
    { value: 7000, label: 'Apr' },
    { value: 4000, label: 'May' },
    { value: 8000, label: 'Jun' },
    { value: 4000, label: 'Jul' },
    { value: 6000, label: 'Aug' },
    { value: 5000, label: 'Sep' },
  ];

  const transactions = [
    { id: '1', bookingId: 'ASJH657', date: '12 January,2025, 12:34 AM', price: '22,990', customer: 'Darrell Steward', avatar: 'https://i.pravatar.cc/100?img=5' },
    { id: '2', bookingId: 'ASJH658', date: '12 January,2025, 12:34 AM', price: '22,990', customer: 'Darrell Steward', avatar: 'https://i.pravatar.cc/100?img=5' },
    { id: '3', bookingId: 'ASJH659', date: '12 January,2025, 12:34 AM', price: '22,990', customer: 'Darrell Steward', avatar: 'https://i.pravatar.cc/100?img=5' },
  ];

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.safeArea}>
      <CustomHeader />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

        {/* Welcome Section */}
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>
            <Text style={styles.welcomeBold}>Welcome Back! </Text>
            TONY'S HOUSE
          </Text>
          <Text style={styles.welcomeSubtitle}>Manage and grow your business</Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statsCard}>
            <Text style={styles.statsLabel}>Total Revenue</Text>
            <Text style={styles.statsValue}>₹ 02,12,235</Text>
          </View>
          <View style={styles.statsCard}>
            <Text style={styles.statsLabel}>This Month</Text>
            <Text style={styles.statsValue}>₹ 45,200</Text>
          </View>
          <View style={styles.statsCard}>
            <Text style={styles.statsLabel}>Pending Payout</Text>
            <Text style={styles.statsValue}>₹ 12,500</Text>
          </View>
          <View style={styles.statsCard}>
            <Text style={styles.statsLabel}>Completed</Text>
            <Text style={styles.statsValue}>₹ 1,99,735</Text>
          </View>
        </View>

        {/* Chart Section */}
        <View style={styles.chartCard}>
          <Text style={styles.sectionTitle}>Business Insights</Text>
          <View style={styles.filterRow}>
            {['Weekly', 'Monthly', 'Yearly'].map(filter => (
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
            <LineChart
              data={chartData}
              width={300}
              height={180}
              thickness={3}
              color="#F76627"
              maxValue={50000}
              noOfSections={5}
              yAxisLabelSuffix="k"
              formatYLabel={(label) => (Number(label) / 1000).toString()}
              yAxisTextStyle={{ color: '#9E9E9E', fontSize: 10 }}
              xAxisLabelTextStyle={{ color: '#9E9E9E', fontSize: 10 }}
              hideRules
              yAxisColor="transparent"
              xAxisColor="#E6EAF1"
              curved
              isAnimated
              initialSpacing={0}
              endSpacing={0}
              dataPointsColor="#F76627"
              dataPointsRadius={0}
              adjustToWidth
            />
          </View>
        </View>

        {/* Transactions List */}
        <Text style={[styles.sectionTitle, { marginTop: 10, marginBottom: 16 }]}>Recent Transactions</Text>

        {transactions.map(item => (
          <View key={item.id} style={styles.transactionCard}>
            <View style={styles.transactionTop}>
              <View style={styles.productImagePlaceholder}>
                {/* Simulate product image */}
                <Image source={{ uri: 'https://plus.unsplash.com/premium_photo-1678297270385-ad5067126607?q=80&w=250&auto=format&fit=crop' }} style={styles.productImage} />
              </View>
              <View style={styles.transactionInfo}>
                <Text style={styles.bookingId}>Booking ID: {item.bookingId}</Text>
                <View style={styles.dateRow}>
                  <CalendarIcon size={14} color="#666" />
                  <Text style={styles.dateText}>{item.date}</Text>
                </View>
                <Text style={styles.priceText}>₹ {item.price}</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.customerRow}>
              <Image source={{ uri: item.avatar }} style={styles.customerAvatar} />
              <View>
                <Text style={styles.customerLabel}>Customer Name</Text>
                <Text style={styles.customerName}>{item.customer}</Text>
              </View>
            </View>
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
});

export default RevenueScreen;
