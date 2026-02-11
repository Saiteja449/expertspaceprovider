import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar, BackHandler, StyleSheet } from 'react-native';
import SplashLogo from '../../../assets/images/LogoProvider.svg';
import { font } from '../../utils/fontFamilies';
import GradientButton from '../../components/GradientButton';
import { useContextState } from '../../context/Context';
import { CommonActions } from '@react-navigation/native';

const ApprovalPendingScreen = ({ navigation }) => {
    const { fetchProviderProfile } = useContextState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const backAction = () => {
            // Prevent going back to login or signup if they are in this state
            BackHandler.exitApp();
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, []);

    const handleRefresh = async () => {
        setLoading(true);
        const result = await fetchProviderProfile();
        setLoading(false);

        if (result && result.success) {
            // If approved, proceed to MainTabs
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'MainTabs' }],
                })
            );
        } else {
            // Stay on screen or show toast, handled by API error logs usually
            // But if status is still pending, we just say "Still pending"
            // The fetchProviderProfile will return { success: false, status: 'pending' } (planned update)
            // For now, if result is not success, we assume status didn't change enough to proceed
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            <View style={styles.content}>
                <View style={styles.logoContainer}>
                    <SplashLogo width={200} height={80} />
                </View>

                <Text style={styles.title}>Account Under Review</Text>

                <Text style={styles.message}>
                    Your account is currently under approval. This process typically takes 24-48 hours.
                    Please check back later.
                </Text>

                <View style={styles.buttonContainer}>
                    <GradientButton
                        title={loading ? "Checking..." : "Refresh Status"}
                        onPress={handleRefresh}
                        colors={['#FF1744', '#FF8C00']}
                        isLoading={loading}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        padding: 20,
    },
    content: {
        alignItems: 'center',
        width: '100%',
    },
    logoContainer: {
        marginBottom: 40,
    },
    title: {
        fontFamily: font.BOLD,
        fontSize: 24,
        color: '#333',
        marginBottom: 16,
        textAlign: 'center',
    },
    message: {
        fontFamily: font.REGULAR,
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 40,
        lineHeight: 24,
    },
    buttonContainer: {
        width: '100%',
        maxWidth: 300,
    }
});

export default ApprovalPendingScreen;
