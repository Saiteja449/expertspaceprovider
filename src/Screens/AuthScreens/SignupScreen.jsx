import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Image,
  BackHandler,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import SplashLogo from '../../../assets/images/SplashLogo.svg';
import Upload from '../../../assets/images/upload.svg';
import { styles } from '../../Globalcss/Globalcss';
import GradientButton from '../../components/GradientButton';
import BottomModal from '../../components/BottomModal';
import { ArrowDownIcon } from '../../Icons/ArrowDownIcon';
import { font } from '../../utils/fontFamilies';
import { CommonActions } from '@react-navigation/native';
import { useUser } from '../../context/UserContext';

const Step1 = ({ formData, updateField }) => (
  <View style={{ width: '100%' }}>
    <Text style={styles.sectionTitle}>Business Details</Text>
    <Text style={styles.loginSubtitle}>
      Provide your business details to create your supplier account and get
      started with us.
    </Text>

    <View style={[styles.inputContainer, { marginTop: 16 }]}>
      <Text style={styles.inputLabel}>Business Name</Text>
      <TextInput
        style={styles.inputField}
        value={formData.businessName}
        onChangeText={text => updateField('businessName', text)}
        placeholder="Enter Business Name"
        placeholderTextColor="#A0A0A0"
      />
    </View>

    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Owner Name</Text>
      <TextInput
        style={styles.inputField}
        value={formData.ownerName}
        onChangeText={text => updateField('ownerName', text)}
        placeholder="Enter Owner Name"
        placeholderTextColor="#A0A0A0"
      />
    </View>
  </View>
);

const Step2 = ({ formData, updateField }) => (
  <View style={{ width: '100%' }}>
    <Text style={styles.sectionTitle}>Personal Information</Text>
    <Text style={styles.loginSubtitle}>
      Enter your contact details so we can communicate and manage your account
      smoothly.
    </Text>

    <View style={[styles.inputContainer, { marginTop: 16 }]}>
      <Text style={styles.inputLabel}>Phone</Text>
      <TextInput
        style={styles.inputField}
        value={formData.phone}
        onChangeText={text => updateField('phone', text)}
        placeholder="Enter Phone Number"
        placeholderTextColor="#A0A0A0"
        keyboardType="phone-pad"
      />
    </View>

    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>E-mail</Text>
      <TextInput
        style={styles.inputField}
        value={formData.email}
        onChangeText={text => updateField('email', text)}
        placeholder="Enter Email"
        placeholderTextColor="#A0A0A0"
        keyboardType="email-address"
        autoCapitalize="none"
      />
    </View>

    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Business Address</Text>
      <TextInput
        style={styles.inputField}
        value={formData.businessAddress}
        onChangeText={text => updateField('businessAddress', text)}
        placeholder="Enter Business Address"
        placeholderTextColor="#A0A0A0"
      />
    </View>

    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Password</Text>
      <TextInput
        style={styles.inputField}
        value={formData.password}
        onChangeText={text => updateField('password', text)}
        placeholder="Enter Password"
        placeholderTextColor="#A0A0A0"
        secureTextEntry
      />
    </View>

    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Confirm Password</Text>
      <TextInput
        style={styles.inputField}
        value={formData.confirmPassword}
        onChangeText={text => updateField('confirmPassword', text)}
        placeholder="Confirm Password"
        placeholderTextColor="#A0A0A0"
        secureTextEntry
      />
    </View>
  </View>
);

const Step3 = ({ formData, updateField }) => {
  const handleImagePick = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      quality: 0.5,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const source = response.assets[0];
        const imageUri = `data:${source.type};base64,${source.base64}`;
        updateField('panImage', imageUri);
      }
    });
  };

  return (
    <View style={{ width: '100%' }}>
      <Text style={styles.sectionTitle}>Business Verification</Text>
      <Text style={styles.loginSubtitle}>
        Upload required documents to verify your business and ensure secure
        transactions.
      </Text>

      <View style={[styles.inputContainer, { marginTop: 16 }]}>
        <Text style={styles.inputLabel}>PAN Number</Text>
        <TextInput
          style={styles.inputField}
          value={formData.panNumber}
          onChangeText={text => updateField('panNumber', text)}
          placeholder="Enter PAN Number"
          placeholderTextColor="#A0A0A0"
          autoCapitalize="characters"
        />
      </View>

      <View style={{ marginTop: 16, width: '100%' }}>
        <Text style={styles.inputLabel}>Upload Pan Card</Text>
        <TouchableOpacity
          style={styles.uploadContainer}
          activeOpacity={0.7}
          onPress={handleImagePick}
        >
          {formData.panImage ? (
            <Image
              source={{ uri: formData.panImage }}
              style={{ width: '100%', height: 150, borderRadius: 8 }}
              resizeMode="cover"
            />
          ) : (
            <>
              <Upload />
              <View style={styles.uploadTextContainer}>
                <Text style={styles.uploadMainText}>Upload file here</Text>
                <Text style={styles.uploadSelectText}>Select form Gallery</Text>
              </View>
            </>
          )}
        </TouchableOpacity>
        <Text style={styles.uploadSubText}>Minimum file size jpeg,png</Text>
      </View>

      <View style={[styles.inputContainer, { marginTop: 16 }]}>
        <Text style={styles.inputLabel}>GST No.</Text>
        <TextInput
          style={styles.inputField}
          value={formData.gstNo}
          onChangeText={text => updateField('gstNo', text)}
          placeholder="Enter GST No."
          placeholderTextColor="#A0A0A0"
        />
      </View>
    </View>
  );
};

const Step4 = ({ formData, updateField }) => (
  <View style={{ width: '100%' }}>
    <Text style={styles.sectionTitle}>Payment Information</Text>
    <Text style={styles.loginSubtitle}>
      Add your bank details to receive payments and manage payouts without
      hassle.
    </Text>

    <View style={[styles.inputContainer, { marginTop: 16 }]}>
      <Text style={styles.inputLabel}>Beneficiary Name</Text>
      <TextInput
        style={styles.inputField}
        value={formData.beneficiaryName}
        onChangeText={text => updateField('beneficiaryName', text)}
        placeholder="Enter"
        placeholderTextColor="#A0A0A0"
      />
    </View>

    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Account No.</Text>
      <TextInput
        style={styles.inputField}
        value={formData.accountNo}
        onChangeText={text => updateField('accountNo', text)}
        placeholder="Enter"
        placeholderTextColor="#A0A0A0"
        keyboardType="numeric"
      />
    </View>

    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Select Bank</Text>
      <TextInput
        style={styles.inputField}
        value={formData.bank}
        onChangeText={text => updateField('bank', text)}
        placeholder="Enter Bank Name"
        placeholderTextColor="#A0A0A0"
      />
    </View>

    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>IFSC code</Text>
      <TextInput
        style={styles.inputField}
        value={formData.ifscCode}
        onChangeText={text => updateField('ifscCode', text)}
        placeholder="Enter"
        placeholderTextColor="#A0A0A0"
      />
    </View>
  </View>
);

const SignupScreen = ({ navigation }) => {
  const { signup, loading } = useUser();
  const [currentStep, setCurrentStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({
    title: '',
    message: '',
    type: 'error',
    actionButtonText: 'OK',
    onActionPress: null,
  });
  const totalSteps = 4;

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

  useEffect(() => {
    const backAction = () => {
      if (currentStep > 1) {
        setCurrentStep(currentStep - 1);
        return true;
      }
      return false; // Default behavior (go back)
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [currentStep]);

  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: '',
    phone: '',
    email: '',
    businessAddress: '',
    gstNo: '',
    beneficiaryName: '',
    accountNo: '',
    bank: '',
    ifscCode: '',
    password: '',
    confirmPassword: '',
    panNumber: '',
    panImage: '',
    deviceToken: 'device_token_here',
  });

  const validateStep = () => {
    let isValid = true;
    let error = '';

    // Regex Patterns
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    const accountRegex = /^\d{9,18}$/;

    if (currentStep === 1) {
      if (!formData.businessName) error = 'Business Name is required';
      else if (!formData.ownerName) error = 'Owner Name is required';
    } else if (currentStep === 2) {
      if (!formData.phone) error = 'Phone number is required';
      else if (!phoneRegex.test(formData.phone)) error = 'Invalid Indian Phone Number';
      else if (!formData.email) error = 'Email is required';
      else if (!emailRegex.test(formData.email)) error = 'Invalid Email Address';
      else if (!formData.businessAddress) error = 'Business Address is required';
      else if (!formData.password) error = 'Password is required';
      else if (!formData.confirmPassword) error = 'Confirm Password is required';
      else if (formData.password !== formData.confirmPassword)
        error = 'Passwords do not match';
    } else if (currentStep === 3) {
      if (!formData.panNumber) error = 'PAN Number is required';
      else if (!panRegex.test(formData.panNumber)) error = 'Invalid PAN Number format';
      else if (!formData.panImage) error = 'PAN Image is required';
      else if (!formData.gstNo) error = 'GST Number is required';
      else if (!gstRegex.test(formData.gstNo)) error = 'Invalid GST Number format';
    } else if (currentStep === 4) {
      if (!formData.beneficiaryName) error = 'Beneficiary Name is required';
      else if (!formData.accountNo) error = 'Account Number is required';
      else if (!accountRegex.test(formData.accountNo)) error = 'Invalid Account Number';
      else if (!formData.bank) error = 'Bank Name is required';
      else if (!formData.ifscCode) error = 'IFSC Code is required';
      else if (!ifscRegex.test(formData.ifscCode)) error = 'Invalid IFSC Code format';
    }

    if (error) {
      setErrorMessage(error);
      isValid = false;
    } else {
      setErrorMessage('');
    }

    return isValid;
  };

  const handleNext = async () => {
    if (!validateStep()) return;

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log('Submit Form', formData);

      const payload = {
        name: formData.ownerName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        confirm_password: formData.confirmPassword,
        business_name: formData.businessName,
        owner_name: formData.ownerName,
        business_address: formData.businessAddress,
        pan_number: formData.panNumber,
        pan_image_base64: formData.panImage || '',
        gst_number: formData.gstNo,
        beneficiary_name: formData.beneficiaryName,
        account_number: formData.accountNo,
        bank_name: formData.bank,
        ifsc_code: formData.ifscCode,
        deviceToken: formData.deviceToken,
      };

      console.log('Payload:', payload);

      const result = await signup(payload);

      if (result.success) {
        showModal(
          'Success',
          'Registration successful! Redirecting...',
          'success',
          () => {
            setModalVisible(false);
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: result.navigate }],
              })
            );
          }
        );
      } else {
        showModal('Signup Failed', result.message || 'Registration failed', 'error');
      }
    }
  };

  const handleLogin = () => {
    console.log('Navigate to Login');
    navigation.goBack();
  };

  const updateField = (key, value) => {
    setErrorMessage('');
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const renderProgressBar = () => {
    return (
      <View style={styles.progressContainer}>
        {[1, 2, 3, 4].map(step => (
          <View
            key={step}
            style={[
              styles.progressBar,
              step === currentStep ? styles.activeStep : styles.inactiveStep,
            ]}
          />
        ))}
      </View>
    );
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
          <View style={styles.loginHeader}>
            <View style={{ marginBottom: 10 }}>
              <SplashLogo width={180} height={60} />
            </View>
          </View>

          {renderProgressBar()}

          {currentStep === 1 && (
            <Step1 formData={formData} updateField={updateField} />
          )}
          {currentStep === 2 && (
            <Step2 formData={formData} updateField={updateField} />
          )}
          {currentStep === 3 && (
            <Step3 formData={formData} updateField={updateField} />
          )}
          {currentStep === 4 && (
            <Step4 formData={formData} updateField={updateField} />
          )}

          <View style={{ width: '100%', marginTop: 30 }}>
            {errorMessage ? (
              <Text
                style={{
                  color: 'red',
                  textAlign: 'center',
                  marginBottom: 10,
                  fontFamily: font.REGULAR,
                }}
              >
                {errorMessage}
              </Text>
            ) : null}
            <GradientButton
              title={
                loading
                  ? 'Loading...'
                  : currentStep === totalSteps
                    ? 'Submit'
                    : 'Next'
              }
              onPress={handleNext}
              isLoading={loading}
              colors={['#FF1744', '#FF8C00']}
            />
          </View>

          <View style={[styles.footerContainer, { marginBottom: 20 }]}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <TouchableOpacity onPress={handleLogin} activeOpacity={0.7}>
              <Text style={styles.createAccountText}>Login</Text>
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

export default SignupScreen;
