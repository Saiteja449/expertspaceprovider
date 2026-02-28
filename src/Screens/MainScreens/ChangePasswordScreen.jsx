import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert,
    ActivityIndicator,
    Modal,
} from 'react-native';
import CustomHeader from '../../components/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import apiService from '../../api/apiService';
import { font } from '../../utils/fontFamilies';
import { LockIcon, EyeIcon, EyeOffIcon } from '../../Icons/MoreScreenIcons';

const ChangePasswordScreen = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const [form, setForm] = useState({
        old_password: '',
        new_password: '',
        confirm_password: '',
    });

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [errors, setErrors] = useState({});

    const handleChange = (name, value) => {
        setForm({ ...form, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: null });
        }
    };

    const validate = () => {
        let valid = true;
        let newErrors = {};

        if (!form.old_password) {
            newErrors.old_password = 'Old password is required';
            valid = false;
        }
        if (!form.new_password) {
            newErrors.new_password = 'New password is required';
            valid = false;
        } else if (form.new_password.length < 6) {
            newErrors.new_password = 'Password must be at least 6 characters';
            valid = false;
        }
        if (!form.confirm_password) {
            newErrors.confirm_password = 'Confirm password is required';
            valid = false;
        } else if (form.new_password !== form.confirm_password) {
            newErrors.confirm_password = 'Passwords do not match';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async () => {
        if (!validate()) return;
        if (loading) return;

        setLoading(true);
        try {
            const response = await apiService.put('provider/changePassword', form);
            if (response?.data?.success) {
                setShowSuccessModal(true);
            } else {
                Alert.alert('Error', response?.data?.message || 'Failed to change password');
            }
        } catch (error) {
            console.error('Change Password Error:', error);
            const errorMessage = error.response?.data?.message || 'Something went wrong. Please try again.';
            Alert.alert('Error', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.safeArea}
        >
            <CustomHeader
                variant="internal"
                title="Change Password"
                onLeftPress={() => navigation.goBack()}
                hideRightIcon={true}
            />
            <ScrollView
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
            >
                {/* <View style={styles.iconHeader}>
                    <View style={styles.iconCircle}>
                        <LockIcon size={40} color="#FF5722" />
                    </View>
                    <Text style={styles.headerSubtitle}>
                        Your new password must be different from previous passwords.
                    </Text>
                </View> */}

                <View style={styles.form}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Old Password</Text>
                        <View style={[styles.inputContainer, errors.old_password && styles.inputError]}>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter old password"
                                secureTextEntry={!showOldPassword}
                                value={form.old_password}
                                onChangeText={(text) => handleChange('old_password', text)}
                            />
                            <TouchableOpacity
                                style={styles.eyeBtn}
                                onPress={() => setShowOldPassword(!showOldPassword)}
                            >
                                {showOldPassword ? <EyeIcon size={20} color="#7F8C8D" /> : <EyeOffIcon size={20} color="#7F8C8D" />}
                            </TouchableOpacity>
                        </View>
                        {errors.old_password && <Text style={styles.errorText}>{errors.old_password}</Text>}
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>New Password</Text>
                        <View style={[styles.inputContainer, errors.new_password && styles.inputError]}>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter new password"
                                secureTextEntry={!showNewPassword}
                                value={form.new_password}
                                onChangeText={(text) => handleChange('new_password', text)}
                            />
                            <TouchableOpacity
                                style={styles.eyeBtn}
                                onPress={() => setShowNewPassword(!showNewPassword)}
                            >
                                {showNewPassword ? <EyeIcon size={20} color="#7F8C8D" /> : <EyeOffIcon size={20} color="#7F8C8D" />}
                            </TouchableOpacity>
                        </View>
                        {errors.new_password && <Text style={styles.errorText}>{errors.new_password}</Text>}
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Confirm New Password</Text>
                        <View style={[styles.inputContainer, errors.confirm_password && styles.inputError]}>
                            <TextInput
                                style={styles.input}
                                placeholder="Confirm new password"
                                secureTextEntry={!showConfirmPassword}
                                value={form.confirm_password}
                                onChangeText={(text) => handleChange('confirm_password', text)}
                            />
                            <TouchableOpacity
                                style={styles.eyeBtn}
                                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <EyeIcon size={20} color="#7F8C8D" /> : <EyeOffIcon size={20} color="#7F8C8D" />}
                            </TouchableOpacity>
                        </View>
                        {errors.confirm_password && <Text style={styles.errorText}>{errors.confirm_password}</Text>}
                    </View>

                    <TouchableOpacity
                        style={[styles.submitButton, loading && styles.submitButtonDisabled]}
                        onPress={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#FFF" />
                        ) : (
                            <Text style={styles.submitButtonText}>Update Password</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Success Modal */}
            <Modal
                visible={showSuccessModal}
                transparent
                animationType="fade"
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.successIconCircle}>
                            <LockIcon size={40} color="#4CAF50" />
                        </View>
                        <Text style={styles.modalTitle}>Update Successful!</Text>
                        <Text style={styles.modalSubtitle}>
                            Your password has been changed successfully. Please keep it safe.
                        </Text>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => {
                                setShowSuccessModal(false);
                                navigation.goBack();
                            }}
                        >
                            <Text style={styles.modalButtonText}>Okay</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F8F9FE',
    },
    container: {
        padding: 24,
    },
    iconHeader: {
        alignItems: 'center',
        marginBottom: 32,
    },
    iconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#FFF0EB',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#7F8C8D',
        textAlign: 'center',
        fontFamily: font.REGULAR,
        paddingHorizontal: 20,
        lineHeight: 20,
    },
    form: {
        // backgroundColor: '#FFFFFF',
        // borderRadius: 16,
        // padding: 20,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 1 },
        // shadowOpacity: 0.05,
        // shadowRadius: 5,
        // elevation: 2,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        color: '#333',
        marginBottom: 8,
        fontFamily: font.BOLD,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#EAEAEA',
    },
    input: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 14,
        fontFamily: font.REGULAR,
        color: '#1E1E1E',
    },
    eyeBtn: {
        padding: 12,
    },
    inputError: {
        borderColor: '#FF5722',
    },
    errorText: {
        color: '#FF5722',
        fontSize: 12,
        marginTop: 4,
        fontFamily: font.REGULAR,
    },
    submitButton: {
        backgroundColor: '#FF5722',
        borderRadius: 30,
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    submitButtonDisabled: {
        backgroundColor: '#FFA285',
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: font.BOLD,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 32,
        width: '100%',
        alignItems: 'center',
    },
    successIconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#E8F5E9',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1E1E1E',
        marginBottom: 12,
        fontFamily: font.BOLD,
    },
    modalSubtitle: {
        fontSize: 14,
        color: '#7F8C8D',
        textAlign: 'center',
        marginBottom: 32,
        fontFamily: font.REGULAR,
        lineHeight: 20,
    },
    modalButton: {
        backgroundColor: '#1E1E1E',
        paddingVertical: 14,
        paddingHorizontal: 48,
        borderRadius: 30,
    },
    modalButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: font.BOLD,
    },
});

export default ChangePasswordScreen;
