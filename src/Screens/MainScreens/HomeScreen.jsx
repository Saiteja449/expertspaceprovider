import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { styles as globalStyles } from '../../Globalcss/Globalcss';
import {
  PendingOrderIcon,
  OutOfStockIcon,
  TotalProductsIcon,
  TotalRevenueIcon,
  NotificationIcon,
  MessageIcon,
} from '../../Icons/DashboardIcons';
import { LineChart } from 'react-native-gifted-charts';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  // Dummy Data for Chart
  const lineData = [
    { value: 5000, label: 'Jan' },
    { value: 8000, label: 'Feb' },
    { value: 20000, label: 'Mar' },
    { value: 8000, label: 'Apr' },
    { value: 6000, label: 'May' },
    { value: 4000, label: 'Jun' },
    { value: 6000, label: 'Jul' },
    { value: 5000, label: 'Aug' },
    { value: 9000, label: 'Sep' },
    { value: 6000, label: 'Oct' },
  ];

  return (
    <View style={globalStyles.container}>
      {/* Header */}
      <View style={localStyles.header}>
        <View>
          <Text style={localStyles.welcomeText}>
            Welcome Back!{' '}
            <Text style={{ fontWeight: '400' }}>TONY'S HOUSE</Text>
          </Text>
          <Text style={localStyles.subtitle}>
            Manage and grow your business
          </Text>
        </View>
        <View style={localStyles.headerIcons}>
          <TouchableOpacity style={{ marginRight: 15 }}>
            <MessageIcon size={24} hasBadge={true} />
          </TouchableOpacity>
          <TouchableOpacity>
            <NotificationIcon size={24} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={localStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats Grid */}
        <View style={globalStyles.statsGrid}>
          <StatsCard
            icon={<PendingOrderIcon size={22} />}
            label="Pending Order"
            value="12"
            bgColor="#FFF0E6"
          />
          <StatsCard
            icon={<OutOfStockIcon size={22} />}
            label="Out of Stock"
            value="34"
            bgColor="#FFF0E6"
          />

          <StatsCard
            icon={<TotalProductsIcon size={22} />}
            label="Total Products"
            value="128"
            bgColor="#FFF0E6"
          />
          <StatsCard
            icon={<TotalRevenueIcon size={22} />}
            label="Total Revenue"
            value="₹ 02,12,235"
            bgColor="#FFF0E6"
          />

          <StatsCard
            icon={<TotalProductsIcon size={22} />} // Reuse or change if new icon needed
            label="Completed Order"
            value="12"
            bgColor="#FFF0E6"
          />
          <StatsCard
            icon={<OutOfStockIcon size={22} />} // Reuse or change if new icon needed
            label="Return Order"
            value="34"
            bgColor="#FFF0E6"
          />
        </View>

        {/* Business Insights */}
        <View style={globalStyles.chartContainer}>
          <View style={globalStyles.chartHeader}>
            <Text style={globalStyles.chartTitle}>Business Insights</Text>
          </View>

          {/* Time Filters */}
          <View style={{ flexDirection: 'row', marginBottom: 20 }}>
            <TouchableOpacity
              style={[
                globalStyles.filterButton,
                globalStyles.activeFilterButton,
              ]}
            >
              <Text
                style={[globalStyles.filterText, globalStyles.activeFilterText]}
              >
                Weekly
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={globalStyles.filterButton}>
              <Text style={globalStyles.filterText}>Monthly</Text>
            </TouchableOpacity>
            <TouchableOpacity style={globalStyles.filterButton}>
              <Text style={globalStyles.filterText}>Yearly</Text>
            </TouchableOpacity>
          </View>

          {/* Chart */}
          <LineChart
            data={lineData}
            color="#FF5722"
            thickness={3}
            dataPointsColor="#FF5722"
            startFillColor="#FF5722"
            endFillColor="#FF5722"
            startOpacity={0.2}
            endOpacity={0.05}
            initialSpacing={0}
            noOfSections={5}
            yAxisTextStyle={{ color: 'gray', fontSize: 10 }}
            xAxisLabelTextStyle={{ color: 'gray', fontSize: 10 }}
            rulesColor="lightgray"
            rulesType="solid"
            height={200}
            curved
            adjustToWidth
          />
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

const StatsCard = ({ icon, label, value, bgColor }) => (
  <View style={globalStyles.statsCard}>
    <View
      style={[globalStyles.statsIconContainer, { backgroundColor: bgColor }]}
    >
      {icon}
    </View>
    <View style={globalStyles.statsContent}>
      <Text style={globalStyles.statsLabel}>{label}</Text>
      <Text style={globalStyles.statsValue}>{value}</Text>
    </View>
  </View>
);

const localStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#F8F9FE', // Match bg
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 4,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: 20,
  },
});

export default HomeScreen;
