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

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('demo1234@gmail.com');
  const [password, setPassword] = useState('********');
  const [rememberMe, setRememberMe] = useState(true);

  return (
    <View style={styles.loginContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FE" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.loginScrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.loginHeader}>
            <View style={{ marginBottom: 20 }}>
              <SplashLogo width={180} height={60} />
            </View>
            <Text style={styles.welcomeText}>Welcome Back</Text>
            <Text style={styles.loginSubtitle}>
              Sign in to continue managing your supplier account.
            </Text>
            <Text
              style={[
                styles.loginSubtitle,
                { fontSize: 13, color: '#777', marginTop: 8 },
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
              onChangeText={setEmail}
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
              onChangeText={setPassword}
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

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => console.log('Login Pressed')}
            activeOpacity={0.8}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => console.log('Create Account')}
              activeOpacity={0.7}
            >
              <Text style={styles.createAccountText}>Create Account</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;
