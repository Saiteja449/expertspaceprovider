import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Platform,
    KeyboardAvoidingView,
} from 'react-native';
import CustomHeader from '../../components/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../../context/UserContext';
import { font } from '../../utils/fontFamilies';

const BankInfoScreen = () => {
    const navigation = useNavigation();
    const { user } = useUser();
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
                title="Bank Information"
                onLeftPress={() => navigation.goBack()}
                hideRightIcon={true}
            />
            <ScrollView
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Account Details</Text>
                    <InfoRow label="Beneficiary Name" value={providerDetails.beneficiary_name} />
                    <InfoRow label="Bank Name" value={providerDetails.bank_name} />
                    <InfoRow label="Account Number" value={providerDetails.account_number} />
                    <InfoRow label="IFSC Code" value={providerDetails.ifsc_code} />
                </View>

                <View style={styles.noticeCard}>
                    <Text style={styles.noticeTitle}>Bank Account Notice</Text>
                    <Text style={styles.noticeText}>
                        Your payments will be processed to this account. Ensure all details are correct.
                        Contact support if you need to update your bank information.
                    </Text>
                </View>

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
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
        marginBottom: 20,
    },
    cardTitle: {
        fontSize: 16,
        fontFamily: font.BOLD,
        color: '#1E1E1E',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        paddingBottom: 12,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    infoLabel: {
        fontSize: 14,
        fontFamily: font.REGULAR,
        color: '#666',
    },
    infoValue: {
        fontSize: 15,
        fontFamily: font.BOLD,
        color: '#1E1E1E',
        textAlign: 'right',
        flex: 1,
        marginLeft: 20,
    },
    noticeCard: {
        backgroundColor: '#FFF3E0',
        borderRadius: 12,
        padding: 16,
        borderLeftWidth: 4,
        borderLeftColor: '#EF6C00',
    },
    noticeTitle: {
        fontSize: 14,
        fontFamily: font.BOLD,
        color: '#E65100',
        marginBottom: 6,
    },
    noticeText: {
        fontSize: 13,
        fontFamily: font.REGULAR,
        color: '#666',
        lineHeight: 18,
    },
});

export default BankInfoScreen;
