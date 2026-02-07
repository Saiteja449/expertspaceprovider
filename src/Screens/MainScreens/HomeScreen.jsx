import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { styles } from '../../Globalcss/Globalcss';
import { font } from '../../utils/fontFamilies';
import CustomHeader from '../../components/CustomHeader';
import PendingOrderIcon from '../../../assets/images/pendingOrderIcon.svg';
import OutOfStockIcon from '../../../assets/images/outOfStockIcon.svg';
import TotalProductsIcon from '../../../assets/images/totalProducts.svg';
import TotalRevenueIcon from '../../../assets/images/totalreve.svg'; // Using this as placeholder
import CompletedOrderIcon from '../../../assets/images/completedOrderIcon.svg';
import ReturnOrderIcon from '../../../assets/images/returnOrderIcon.svg';
import { LineChart } from 'react-native-gifted-charts';
const { width } = Dimensions.get('window');
const HomeScreen = () => {
  const lineData = [
    { value: 6.5, label: 'Jan' },
    { value: 6.2, label: '' },
    { value: 8, label: 'Feb' },
    { value: 9.5, label: '' },
    { value: 20, label: 'Mar' },
    { value: 9, label: '' },
    { value: 6, label: 'Apr' },
    { value: 4.5, label: '' },
    { value: 6, label: 'May' },
    { value: 8, label: '' },
    { value: 4, label: 'Jun' },
    { value: 4.2, label: '' },
    { value: 6, label: 'Jul' },
    { value: 5, label: '' },
    { value: 6, label: 'Aug' },
    { value: 9, label: '' },
    { value: 7, label: 'Sep' },
    { value: 6, label: '' },
  ];

  return (
    <View style={styles.screenContainer}>
      <CustomHeader />
      <ScrollView
        contentContainerStyle={styles.dashboardScrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.customHeaderWelcomeContainer}>
          <Text style={styles.customHeaderWelcomeText}>
            Welcome Back!{' '}
            <Text style={styles.customHeaderBrandName}>TONY’S HOUSE</Text>
          </Text>
          <Text style={styles.customHeaderSubtitle}>
            Manage and grow your business
          </Text>
        </View>
        <View style={styles.statsGrid}>
          <StatsCard
            icon={<PendingOrderIcon width={24} height={24} />}
            label="Pending Order"
            value="12"
            bgColor="#FFF0E6"
          />
          <StatsCard
            icon={<OutOfStockIcon width={24} height={24} />}
            label="Out of Stock"
            value="34"
            bgColor="#FFF0E6"
          />
          <StatsCard
            icon={<TotalProductsIcon width={24} height={24} />}
            label="Total Products"
            value="128"
            bgColor="#FFF0E6"
          />
          <StatsCard
            icon={<TotalRevenueIcon width={24} height={24} />}
            label="Total Revenue"
            value="₹ 02,12,235"
            bgColor="#FFF0E6"
          />

          <StatsCard
            icon={<CompletedOrderIcon width={24} height={24} />}
            label="Completed Order"
            value="12"
            bgColor="#FFF0E6"
          />
          <StatsCard
            icon={<ReturnOrderIcon width={24} height={24} />}
            label="Return Order"
            value="34"
            bgColor="#FFF0E6"
          />
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Business Insights</Text>
          <View style={styles.filterRow}>
            <TouchableOpacity
              style={[styles.filterButton, styles.activeFilterButton]}
            >
              <Text style={[styles.filterText, styles.activeFilterText]}>
                Weekly
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterText}>Monthly</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterText}>Yearly</Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginLeft: -16 }}>
            <LineChart
              data={lineData}
              color="#FF5722"
              thickness={3}
              startFillColor="#FF5722"
              endFillColor="#FF5722"
              startOpacity={0}
              endOpacity={0}
              initialSpacing={10}
              noOfSections={4}
              maxValue={25} // Scaled to matches data (25000 -> 25)
              yAxisTextStyle={{
                color: '#9E9E9E',
                fontSize: 10,
                fontFamily: font.REGULAR,
              }}
              xAxisLabelTextStyle={{
                color: '#9E9E9E',
                fontSize: 10,
                fontFamily: font.REGULAR,
              }}
              rulesColor="#F0F0F0"
              rulesType="solid"
              height={220}
              width={width - 84}
              curved
              hideDataPoints
              yAxisLabelSuffix="k"
            />
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

const StatsCard = ({ icon, label, value, bgColor }) => (
  <View style={styles.statsCard}>
    <View style={[styles.statsIconContainer, { backgroundColor: bgColor }]}>
      {icon}
    </View>
    <View style={styles.statsContent}>
      <Text style={styles.statsLabel}>{label}</Text>
      <Text style={styles.statsValue}>{value}</Text>
    </View>
  </View>
);

export default HomeScreen;
