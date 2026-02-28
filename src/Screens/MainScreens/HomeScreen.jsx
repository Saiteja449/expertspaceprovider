import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { styles } from '../../Globalcss/Globalcss';
import { font } from '../../utils/fontFamilies';
import CustomHeader from '../../components/CustomHeader';
import { useUser } from '../../context/UserContext';
import PendingOrderIcon from '../../../assets/images/pendingOrderIcon.svg';
import OutOfStockIcon from '../../../assets/images/outOfStockIcon.svg';
import TotalProductsIcon from '../../../assets/images/totalProducts.svg';
import TotalRevenueIcon from '../../../assets/images/totalreve.svg'; // Using this as placeholder
import CompletedOrderIcon from '../../../assets/images/completedOrderIcon.svg';
import ReturnOrderIcon from '../../../assets/images/returnOrderIcon.svg';
import { LineChart } from 'react-native-gifted-charts';
const { width } = Dimensions.get('window');
const HomeScreen = () => {
  const { user, fetchProviderProfile, loading } = useUser();
  const [activeFilter, setActiveFilter] = React.useState('Weekly');
  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
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

  const lineData = getChartData();
  const dashboardStats = user?.dashboardStats || {};
  const provider = user?.provider || {};
  const providerDetails = provider?.providerDetails || {};

  return (
    <View style={styles.screenContainer}>
      <CustomHeader />
      <ScrollView
        contentContainerStyle={styles.dashboardScrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadData} />
        }
      >
        <View style={styles.customHeaderWelcomeContainer}>
          <Text style={styles.customHeaderWelcomeText}>
            Welcome Back!{' '}
            <Text style={styles.customHeaderBrandName}>
              {providerDetails.business_name || provider?.name || 'TONY’S HOUSE'}
            </Text>
          </Text>
          <Text style={styles.customHeaderSubtitle}>
            Manage and grow your business
          </Text>
        </View>
        <View style={styles.statsGrid}>
          <StatsCard
            icon={<PendingOrderIcon width={24} height={24} />}
            label="Pending Order"
            value={dashboardStats.pendingOrders?.toString() || '0'}
            bgColor="#FFF0E6"
          />
          <StatsCard
            icon={<OutOfStockIcon width={24} height={24} />}
            label="Out of Stock"
            value={dashboardStats.outOfStock?.toString() || '0'}
            bgColor="#FFF0E6"
          />
          <StatsCard
            icon={<TotalProductsIcon width={24} height={24} />}
            label="Total Products"
            value={dashboardStats.totalProducts?.toString() || '0'}
            bgColor="#FFF0E6"
          />
          <StatsCard
            icon={<TotalRevenueIcon width={24} height={24} />}
            label="Total Revenue"
            value={`₹ ${dashboardStats.totalRevenue || '0'}`}
            bgColor="#FFF0E6"
          />

          <StatsCard
            icon={<CompletedOrderIcon width={24} height={24} />}
            label="Completed Order"
            value={dashboardStats.completedOrders?.toString() || '0'}
            bgColor="#FFF0E6"
          />
          <StatsCard
            icon={<ReturnOrderIcon width={24} height={24} />}
            label="Cancelled Order"
            value={dashboardStats.cancelledOrders?.toString() || '0'}
            bgColor="#FFF0E6"
          />
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Business Insights</Text>
          <View style={styles.filterRow}>
            <TouchableOpacity
              onPress={() => setActiveFilter('Weekly')}
              style={[
                styles.filterButton,
                activeFilter === 'Weekly' && styles.activeFilterButton,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === 'Weekly' && styles.activeFilterText,
                ]}
              >
                Weekly
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveFilter('Monthly')}
              style={[
                styles.filterButton,
                activeFilter === 'Monthly' && styles.activeFilterButton,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === 'Monthly' && styles.activeFilterText,
                ]}
              >
                Monthly
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => setActiveFilter('Yearly')}
              style={[
                styles.filterButton,
                activeFilter === 'Yearly' && styles.activeFilterButton,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === 'Yearly' && styles.activeFilterText,
                ]}
              >
                Yearly
              </Text>
            </TouchableOpacity> */}
          </View>

          <View style={{ marginLeft: -20, marginTop: 10 }}>
            {lineData.length > 0 ? (
              <LineChart
                areaChart
                curved
                data={lineData}
                height={220}
                width={width - 100}
                initialSpacing={30}
                spacing={(width - 130) / (lineData.length > 1 ? lineData.length - 1 : 1)}
                color="#FF5722"
                thickness={4}
                startFillColor="rgba(255, 87, 34, 0.3)"
                endFillColor="rgba(255, 87, 34, 0.05)"
                startOpacity={0.4}
                endOpacity={0.1}
                noOfSections={4}
                yAxisThickness={0}
                xAxisThickness={1}
                xAxisColor="#E0E0E0"
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
                hideDataPoints={false}
                dataPointsColor="#FF5722"
                dataPointsRadius={4}
                dataPointsWidth={10}
                showVerticalLines={false}
                pointerConfig={{
                  pointerStripColor: '#FF5722',
                  pointerStripWidth: 2,
                  pointerColor: '#FF5722',
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
              <View
                style={{
                  height: 220,
                  width: width - 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontFamily: font.REGULAR, color: '#9E9E9E' }}>
                  No data available
                </Text>
              </View>
            )}
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
