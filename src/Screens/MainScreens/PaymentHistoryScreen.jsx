import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Platform,
    KeyboardAvoidingView,
} from 'react-native';
import CustomHeader from '../../components/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../../context/UserContext';
import { font } from '../../utils/fontFamilies';
import { ChevronRightIcon, WalletIcon } from '../../Icons/MoreScreenIcons';

const PaymentHistoryScreen = () => {
    const navigation = useNavigation();
    const { user } = useUser();
    const transactions = user?.recentTransactions || [];

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.transactionCard}
            onPress={() => navigation.navigate('OrderDetailScreen', { orderId: item.id })}
        >
            <View style={styles.iconContainer}>
                <WalletIcon size={24} color="#FF5722" />
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.row}>
                    <Text style={styles.orderNumber}>{item.sub_order_number}</Text>
                    <Text style={styles.amount}>₹ {item.subtotal}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.date}>{formatDate(item.created_at)}</Text>
                    <View style={[styles.statusBadge, {
                        backgroundColor: item.status?.toLowerCase() === 'completed' ? '#E8F5E9' :
                            item.status?.toLowerCase() === 'pending' ? '#FFF3E0' :
                                (item.status?.toLowerCase() === 'accept' || item.status?.toLowerCase() === 'accepted') ? '#E3F2FD' : '#FFEBEE'
                    }]}>
                        <Text style={[styles.statusText, {
                            color: item.status?.toLowerCase() === 'completed' ? '#2E7D32' :
                                item.status?.toLowerCase() === 'pending' ? '#EF6C00' :
                                    (item.status?.toLowerCase() === 'accept' || item.status?.toLowerCase() === 'accepted') ? '#1976D2' : '#C62828'
                        }]}>
                            {item.status}
                        </Text>
                    </View>
                </View>
            </View>
            <ChevronRightIcon size={20} color="#9E9E9E" />
        </TouchableOpacity>
    );

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.safeArea}
        >
            <CustomHeader
                variant="internal"
                title="Recent Transactions"
                onLeftPress={() => navigation.goBack()}
                hideRightIcon={true}
            />
            <View style={styles.container}>
                <FlatList
                    data={transactions}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>No transactions found</Text>
                        </View>
                    }
                />
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F8F9FE',
    },
    container: {
        flex: 1,
    },
    listContent: {
        padding: 16,
        paddingBottom: 40,
    },
    transactionCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#FFF0EB',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    infoContainer: {
        flex: 1,
        marginRight: 8,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    orderNumber: {
        fontSize: 14,
        fontFamily: font.BOLD,
        color: '#1E1E1E',
    },
    amount: {
        fontSize: 15,
        fontFamily: font.BOLD,
        color: '#FF5722',
    },
    date: {
        fontSize: 12,
        fontFamily: font.REGULAR,
        color: '#7F8C8D',
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
    },
    statusText: {
        fontSize: 10,
        fontFamily: font.BOLD,
        textTransform: 'capitalize',
    },
    emptyContainer: {
        marginTop: 100,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        fontFamily: font.MEDIUM,
        color: '#9E9E9E',
    },
});

export default PaymentHistoryScreen;
