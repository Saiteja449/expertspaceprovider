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
import Upload from '../../../assets/images/upload.svg';
import { styles } from '../../Globalcss/Globalcss';
import GradientButton from '../../components/GradientButton';
import { ArrowDownIcon } from '../../Icons/ArrowDownIcon';
import { font } from '../../utils/fontFamilies';

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
  </View>
);

const Step3 = ({ formData, updateField }) => (
  <View style={{ width: '100%' }}>
    <Text style={styles.sectionTitle}>Business Verification</Text>
    <Text style={styles.loginSubtitle}>
      Upload required documents to verify your business and ensure secure
      transactions.
    </Text>

    <View style={{ marginTop: 16, width: '100%' }}>
      <Text style={styles.inputLabel}>Upload Pan Card</Text>
      <TouchableOpacity style={styles.uploadContainer} activeOpacity={0.7}>
        <Upload />
        <View style={styles.uploadTextContainer}>
          <Text style={styles.uploadMainText}>Upload file here</Text>
          <Text style={styles.uploadSelectText}>Select file</Text>
        </View>
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
      {/* Simulating Dropdown with Touchable View */}
      <TouchableOpacity style={[styles.inputField, styles.dropdownField]}>
        <Text
          style={{
            color: formData.bank ? '#000' : '#A0A0A0',
            fontFamily: font.REGULAR,
          }}
        >
          {formData.bank || 'Select'}
        </Text>
        <ArrowDownIcon size={20} color="#757575" />
      </TouchableOpacity>
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
  const [currentStep, setCurrentStep] = useState(4);
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    businessName: "TONY'S HOUSE",
    ownerName: 'Warren',
    phone: '+91 84602 98786',
    email: 'demo1234@gmail.com',
    businessAddress: '12/12/2002',
    gstNo: '',
    beneficiaryName: '',
    accountNo: '',
    bank: '',
    ifscCode: '',
  });

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log('Submit Form', formData);
      // navigation.navigate('Dashboard');
    }
  };

  const handleLogin = () => {
    console.log('Navigate to Login');
    navigation.navigate('LoginScreen');
  };

  const updateField = (key, value) => {
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
            <GradientButton
              title={currentStep === totalSteps ? 'Submit' : 'Next'}
              onPress={handleNext}
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
    </View>
  );
};

export default SignupScreen;
