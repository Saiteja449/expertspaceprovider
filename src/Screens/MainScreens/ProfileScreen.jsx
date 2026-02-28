import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    Dimensions,
    Platform,
    KeyboardAvoidingView,
} from 'react-native';
import CustomHeader from '../../components/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../../context/UserContext';
import { font } from '../../utils/fontFamilies';
import { BASE_URL } from '../../utils/constant';

const { width } = Dimensions.get('window');

const ProfileScreen = () => {
    const navigation = useNavigation();
    const { user } = useUser();

    // The API response nests provider info under user.provider
    const provider = user?.provider || {};
    const providerDetails = provider?.providerDetails || {};

    const InfoRow = ({ label, value }) => (
        <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{label}</Text>
            <Text style={styles.infoValue}>{value || 'N/A'}</Text>
        </View>
    );

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.safeArea}
        >
            <CustomHeader
                variant="internal"
                title="Profile Details"
                onLeftPress={() => navigation.goBack()}
                hideRightIcon={true}
            />
            <ScrollView
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Basic Information</Text>
                    <View style={styles.card}>
                        <InfoRow label="Name" value={provider?.name} />
                        <InfoRow label="Email" value={provider?.email} />
                        <InfoRow label="Phone" value={provider?.phone} />
                        <InfoRow label="Rating" value={provider?.rating} />
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Status</Text>
                            <View style={[styles.statusBadge, { backgroundColor: provider?.status === 'active' ? '#E8F5E9' : '#FFEBEE' }]}>
                                <Text style={[styles.statusText, { color: provider?.status === 'active' ? '#2E7D32' : '#C62828' }]}>
                                    {provider?.status}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Business Details</Text>
                    <View style={styles.card}>
                        <InfoRow label="Business Name" value={providerDetails.business_name} />
                        <InfoRow label="Owner Name" value={providerDetails.owner_name} />
                        <InfoRow label="Address" value={providerDetails.business_address} />
                        <InfoRow label="PAN Number" value={providerDetails.pan_number} />
                        <InfoRow label="GST Number" value={providerDetails.gst_number} />
                    </View>
                </View>

                {providerDetails.pan_image && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Verification Documents</Text>
                        <View style={styles.card}>
                            <Text style={styles.infoLabel}>PAN Card Image</Text>
                            <Image
                                source={{ uri: `${BASE_URL}${providerDetails.pan_image}` }}
                                style={styles.documentImage}
                                resizeMode="contain"
                            />
                        </View>
                    </View>
                )}

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
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontFamily: font.BOLD,
        color: '#1E1E1E',
        marginBottom: 12,
        marginLeft: 4,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    infoLabel: {
        fontSize: 14,
        fontFamily: font.REGULAR,
        color: '#666',
    },
    infoValue: {
        fontSize: 14,
        fontFamily: font.MEDIUM,
        color: '#1E1E1E',
        textAlign: 'right',
        flex: 1,
        marginLeft: 20,
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 8,
    },
    statusText: {
        fontSize: 12,
        fontFamily: font.BOLD,
        textTransform: 'capitalize',
    },
    documentImage: {
        width: '100%',
        height: 200,
        marginTop: 12,
        borderRadius: 8,
        backgroundColor: '#F5F5F5',
    },
});

export default ProfileScreen;
