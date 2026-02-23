import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    ActivityIndicator,
} from 'react-native';
import { styles } from '../../Globalcss/Globalcss';
import CustomHeader from '../../components/CustomHeader';
import apiService from '../../api/apiService';
import { BASE_URL } from '../../utils/constant';

// SVG Icons
import CalenderIcon from '../../../assets/images/calenderIcon.svg';
import LocationIcon from '../../../assets/images/locationIcon.svg';
import SofaIcon from '../../../assets/images/sofasvg.svg';
import DummyProfile from '../../../assets/images/dummyProfile.svg';

const OrderDetailScreen = ({ route, navigation }) => {
    const { orderId } = route.params;
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrderDetails();
    }, [orderId]);

    const fetchOrderDetails = async () => {
        try {
            setLoading(true);
            const response = await apiService.get(`provider/getOrderRequestsByIdForProvider/${orderId}`);
            if (response?.data?.success) {
                setOrderDetails(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching order details:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
                <CustomHeader variant="internal" title="Order Details" hideRightIcon={true} />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#F83336" />
                </View>
            </View>
        );
    }

    if (!orderDetails) {
        return (
            <View style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
                <CustomHeader variant="internal" title="Order Details" hideRightIcon={true} />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'Inter-Medium', color: '#7F8C8D' }}>Order not found.</Text>
                </View>
            </View>
        );
    }

    const {
        sub_order_number,
        sub_order_status,
        subtotal,
        main_order,
        customer,
        shipping_address,
        items,
    } = orderDetails;

    const formattedDate = main_order?.order_date ? new Date(main_order.order_date).toLocaleString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
    }) : '';

    const customerProfileUrl = customer?.profile ? `${BASE_URL}public/uploads/users/${customer.profile}` : null;
    // Wait, the new API has `profile: "user_5_1771302499293.png"` only? Earlier it was `public/uploads/users/user_5_...png`. 
    // Wait, let's just do `${BASE_URL}${customer.profile}` if it includes public, else the whole path.
    // Actually, earlier: "profile": "public/uploads/users/user_5_1771302499293.png". The new JSON has `"profile": "user_5_1771302499293.png"`. 
    // So assuming I need to check if it starts with 'public' or not.
    const profilePath = customer?.profile?.startsWith('public') ? customer.profile : `public/uploads/users/${customer?.profile}`;
    const profileFinalUrl = customer?.profile ? `${BASE_URL}${profilePath}` : null;


    return (
        <View style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
            <CustomHeader variant="internal" title="Order Details" hideRightIcon={true} />

            <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>

                {/* Order IDs & Status */}
                <View style={[styles.orderCard, { padding: 16, marginBottom: 16 }]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 16, color: '#333' }}>
                            Order ID: #{sub_order_number || main_order?.order_number}
                        </Text>
                        <View style={[styles.pendingTag, { backgroundColor: sub_order_status?.toLowerCase() === 'pending' ? '#FFF5E5' : (sub_order_status?.toLowerCase() === 'cancelled' || sub_order_status?.toLowerCase() === 'rejected') ? '#FFEBEE' : '#E8F5E9' }]}>
                            <Text style={[styles.pendingTagText, { color: sub_order_status?.toLowerCase() === 'pending' ? '#FFA500' : (sub_order_status?.toLowerCase() === 'cancelled' || sub_order_status?.toLowerCase() === 'rejected') ? '#F44336' : '#4CAF50', textTransform: 'capitalize' }]}>{sub_order_status}</Text>
                        </View>
                    </View>

                    <View style={[styles.orderDateRow, { marginBottom: 4 }]}>
                        <CalenderIcon width={16} height={16} />
                        <Text style={styles.orderDetailText}>Placed on: {formattedDate}</Text>
                    </View>
                    <View style={styles.orderDateRow}>
                        <Text style={{ fontFamily: 'Inter-Medium', color: '#7F8C8D', fontSize: 13 }}>
                            Payment: <Text style={{ color: '#333', textTransform: 'capitalize' }}>{main_order?.payment_method?.replace('_', ' ')}</Text> ({main_order?.payment_status})
                        </Text>
                    </View>
                </View>

                {/* Customer Info */}
                <View style={[styles.orderCard, { padding: 16, marginBottom: 16 }]}>
                    <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 16, color: '#333', marginBottom: 12 }}>Customer Details</Text>
                    <View style={styles.customerRow}>
                        <View style={styles.customerAvatar}>
                            {profileFinalUrl ? (
                                <Image source={{ uri: profileFinalUrl }} style={{ width: 40, height: 40, borderRadius: 20 }} />
                            ) : (
                                <DummyProfile width={40} height={40} />
                            )}
                        </View>
                        <View style={styles.customerInfo}>
                            <Text style={styles.customerName}>{customer?.name}</Text>
                            {customer?.phone && <Text style={{ fontFamily: 'Inter-Regular', fontSize: 13, color: '#7F8C8D', marginTop: 2 }}>+91 {customer.phone}</Text>}
                            {customer?.email && <Text style={{ fontFamily: 'Inter-Regular', fontSize: 13, color: '#7F8C8D', marginTop: 2 }}>{customer.email}</Text>}
                        </View>
                    </View>
                </View>

                {/* Shipping Address */}
                <View style={[styles.orderCard, { padding: 16, marginBottom: 16 }]}>
                    <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 16, color: '#333', marginBottom: 12 }}>Shipping Address</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                        <View style={{ marginTop: 2, marginRight: 8 }}>
                            <LocationIcon width={16} height={16} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontFamily: 'Inter-Medium', fontSize: 14, color: '#333', marginBottom: 4 }}>
                                {shipping_address?.label || 'Home'}
                            </Text>
                            <Text style={{ fontFamily: 'Inter-Regular', fontSize: 13, color: '#7F8C8D', lineHeight: 20 }}>
                                {shipping_address?.address_line1} {shipping_address?.address_line2}
                                {'\n'}{shipping_address?.city}, {shipping_address?.state} - {shipping_address?.pincode}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Items */}
                <View style={[styles.orderCard, { padding: 16, marginBottom: 16 }]}>
                    <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 16, color: '#333', marginBottom: 12 }}>Order Items ({items?.length || 0})</Text>

                    {items?.map((item, index) => (
                        <View key={index} style={{ flexDirection: 'row', marginBottom: 16, borderBottomWidth: index === items.length - 1 ? 0 : 1, borderBottomColor: '#F0F0F0', paddingBottom: index === items.length - 1 ? 0 : 16 }}>
                            <View style={styles.orderProductImage}>
                                {item.image_url ? (
                                    <Image source={{ uri: `${BASE_URL}${item.image_url}` }} style={{ width: 75, height: 75, borderRadius: 8 }} />
                                ) : (
                                    <SofaIcon width={75} height={75} />
                                )}
                            </View>
                            <View style={{ flex: 1, marginLeft: 12, justifyContent: 'center' }}>
                                <Text style={{ fontFamily: 'Inter-Medium', fontSize: 15, color: '#333', marginBottom: 4 }}>{item.product_name}</Text>
                                {item.color && (
                                    <Text style={{ fontFamily: 'Inter-Regular', fontSize: 13, color: '#7F8C8D', marginBottom: 4 }}>Color: {item.color}</Text>
                                )}
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={{ fontFamily: 'Inter-Regular', fontSize: 13, color: '#7F8C8D' }}>Qty: {item.quantity}</Text>
                                    <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 15, color: '#333' }}>₹ {item.price}</Text>
                                </View>
                            </View>
                        </View>
                    ))}

                    <View style={{ borderTopWidth: 1, borderTopColor: '#F0F0F0', paddingTop: 16, marginTop: 4, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 16, color: '#333' }}>Subtotal</Text>
                        <Text style={{ fontFamily: 'Inter-Bold', fontSize: 18, color: '#F83336' }}>₹ {subtotal}</Text>
                    </View>
                </View>

            </ScrollView>
        </View>
    );
};

export default OrderDetailScreen;
