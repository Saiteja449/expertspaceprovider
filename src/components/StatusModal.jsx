import React from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    Platform,
    StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SuccessIcon from '../Icons/SuccessIcon';
import ErrorIcon from '../Icons/ErrorIcon';
import ProcessingIcon from '../Icons/ProcessingIcon';
import { font } from '../utils/fontFamilies';

const StatusModal = ({ visible, status, message, onClose }) => {
    const isProcessing = status === 'processing';
    const isSuccess = status === 'success';

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={isProcessing ? null : onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <View style={styles.handle} />

                    <View style={styles.iconContainer}>
                        {status === 'processing' ? (
                            <ProcessingIcon size={100} />
                        ) : status === 'success' ? (
                            <SuccessIcon size={100} />
                        ) : (
                            <ErrorIcon size={100} />
                        )}
                    </View>

                    <Text style={styles.title}>
                        {status === 'processing'
                            ? 'Processing...'
                            : status === 'success'
                                ? 'Success!'
                                : 'Oops!'}
                    </Text>

                    <Text style={styles.message}>{message}</Text>

                    {!isProcessing && (
                        <TouchableOpacity onPress={onClose} style={styles.buttonWrapper}>
                            <LinearGradient
                                colors={['#F83336', '#F76627']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.button}
                            >
                                <Text style={styles.buttonText}>
                                    {isSuccess ? 'Continue' : 'Try Again'}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    container: {
        backgroundColor: '#FFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        alignItems: 'center',
        paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    },
    handle: {
        width: 40,
        height: 4,
        backgroundColor: '#E5E7EB',
        borderRadius: 2,
        marginBottom: 24,
    },
    iconContainer: {
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontFamily: font.BOLD,
        color: '#111827',
        textAlign: 'center',
        marginBottom: 12,
    },
    message: {
        fontSize: 16,
        fontFamily: font.REGULAR,
        color: '#6B7280',
        textAlign: 'center',
        marginBottom: 32,
        paddingHorizontal: 20,
        lineHeight: 24,
    },
    buttonWrapper: {
        width: '100%',
    },
    button: {
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontFamily: font.BOLD,
    },
});

export default StatusModal;
