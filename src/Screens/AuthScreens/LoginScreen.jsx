import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';
import SplashLogo from '../../../assets/images/SplashLogo.svg';
import { styles } from '../../Globalcss/Globalcss';
import GradientButton from '../../components/GradientButton';
import BottomModal from '../../components/BottomModal';
import LinearGradient from 'react-native-linear-gradient';
import { useUser } from '../../context/UserContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({
    title: '',
    message: '',
    type: 'error',
    actionButtonText: 'OK',
    onActionPress: null,
  });
  const { login, loading } = useUser();

  const showModal = (title, message, type = 'error', onActionPress = null) => {
    setModalData({
      title,
      message,
      type,
      actionButtonText: 'OK',
      onActionPress,
    });
    setModalVisible(true);
  };

  const handleLogin = async () => {
    setErrors({});
    let newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const result = await login(email, password);
      if (result.success === true) {
        showModal('Success', 'Login successful!', 'success', () => {
          setModalVisible(false);
          navigation.navigate('MainTabs');
        });
      } else {
        showModal('Login Failed', result.message || 'An error occurred', 'error');
      }
    } catch (error) {
      showModal('Login Error', error.message || 'Something went wrong', 'error');
    }
  };

  return (
    <View style={styles.loginContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.loginScrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={[styles.loginHeader]}>
            <LinearGradient
              colors={[
                'rgba(255,255,255,0)',
                'rgba(255,140,0,0.1)',
                'rgba(255,140,0,0.2)',
              ]}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                height: 100,
                zIndex: -1,
                marginHorizontal: -16,
                borderBottomLeftRadius: 30,
                borderBottomRightRadius: 30,
                paddingBottom: 24,
              }}
            />
            <View style={{ marginBottom: 16 }}>
              <SplashLogo width={180} height={60} />
            </View>
            <Text style={styles.welcomeText}>Welcome Back</Text>
            <Text style={styles.loginSubtitle}>
              Sign in to continue managing your supplier account.
            </Text>
            <Text
              style={[
                styles.loginSubtitle,
                { fontSize: 13, color: '#777', marginBottom: 24 },
              ]}
            >
              Access your supplier dashboard to track orders, manage inventory,
              and monitor earnings in real time.
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.inputField}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) setErrors({ ...errors, email: '' });
              }}
              placeholder="Enter your email"
              placeholderTextColor="#A0A0A0"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              style={styles.inputField}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password) setErrors({ ...errors, password: '' });
              }}
              placeholder="Enter your password"
              placeholderTextColor="#A0A0A0"
              secureTextEntry
            />
          </View>

          <View style={styles.rowContainer}>
            <TouchableOpacity
              style={styles.rememberContainer}
              onPress={() => setRememberMe(!rememberMe)}
              activeOpacity={0.7}
            >
              <View
                style={[styles.checkbox, rememberMe && styles.checkboxChecked]}
              >
                {rememberMe && (
                  <Text
                    style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}
                  >
                    ✓
                  </Text>
                )}
              </View>
              <Text style={styles.rememberText}>Remember me</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => console.log('Forgot Password')}
              activeOpacity={0.7}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {errors.email && (
            <Text style={{ color: 'red', marginBottom: 5, marginLeft: 5 }}>
              {errors.email}
            </Text>
          )}
          {errors.password && (
            <Text style={{ color: 'red', marginBottom: 10, marginLeft: 5 }}>
              {errors.password}
            </Text>
          )}

          <GradientButton
            title="Login"
            onPress={handleLogin}
            isLoading={loading}
            colors={['#FF1744', '#FF8C00']}
          />

          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignupScreen')}
              activeOpacity={0.7}
            >
              <Text style={styles.createAccountText}>Create Account</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <BottomModal
        visible={modalVisible}
        title={modalData.title}
        message={modalData.message}
        type={modalData.type}
        onClose={() => setModalVisible(false)}
        actionButtonText={modalData.actionButtonText}
        onActionPress={modalData.onActionPress}
      />
    </View>
  );
};

export default LoginScreen;
