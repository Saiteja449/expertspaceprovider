import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { styles as globalStyles } from '../../Globalcss/Globalcss';
import { BackArrowIcon } from '../../Icons/DashboardIcons';
import Svg, { Path } from 'react-native-svg';

const AddProductScreen = ({ navigation }) => {
  const [step, setStep] = useState(1);

  // Form Stats
  const [formData, setFormData] = useState({
    category: '',
    subCategory: '',
    brand: '',
    sku: '',
    productName: '',
    description: '',
    material: '',
    color: '',
    length: '',
    width: '',
    height: '',
    finishType: '',
    stock: '',
    weight: '',
    status: '',
    sellingPrice: '',
    mrp: '',
  });

  const handleNext = () => {
    setStep(2);
  };

  const handlePublish = () => {
    // Here you would define your API call or logic to save the product
    navigation.navigate('ProductAddedSuccessScreen');
  };

  return (
    <View style={globalStyles.screenContainer}>
      {/* Header */}
      <View style={globalStyles.headerContainer}>
        <TouchableOpacity
          onPress={() => (step === 1 ? navigation.goBack() : setStep(1))}
          style={{ padding: 4 }}
        >
          <BackArrowIcon size={24} />
        </TouchableOpacity>
        <Text style={globalStyles.headerTitle}>Add Product</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 50 }}>
        {step === 1 ? (
          <>
            {/* Step 1 Form */}
            <InputLabel label="Select category" />
            <DropdownPlaceholder placeholder="Select" />

            <InputLabel label="Select Sub category" />
            <DropdownPlaceholder placeholder="Select" />

            <InputLabel label="Brand" />
            <DropdownPlaceholder placeholder="Select Brand" />

            <InputLabel label="SKU" />
            <View style={globalStyles.inputContainer}>
              <TextInput
                style={globalStyles.inputField}
                placeholder="Enter SKU"
                placeholderTextColor="#9E9E9E"
              />
            </View>

            <InputLabel label="Upload Primary Image" />
            <UploadBox
              label="Upload file here"
              subLabel="Minimum file size 50mb, jpeg,png,mp4"
              isPrimary={true}
            />

            <InputLabel label="Upload Other Images" />
            <UploadBox
              label="Upload file here"
              subLabel="Minimum file size 50mb, jpeg,png,mp4"
            />

            <InputLabel label="Product Name" />
            <View style={globalStyles.inputContainer}>
              <TextInput
                style={globalStyles.inputField}
                placeholder="Enter name"
                placeholderTextColor="#9E9E9E"
              />
            </View>

            <InputLabel label="Product Description" />
            <View style={[globalStyles.inputContainer, { height: 150 }]}>
              <TextInput
                style={[
                  globalStyles.inputField,
                  { height: 150, textAlignVertical: 'top', paddingTop: 20 },
                ]}
                placeholder="Description enter here..."
                placeholderTextColor="#9E9E9E"
                multiline={true}
              />
              <Text
                style={{
                  position: 'absolute',
                  bottom: 15,
                  right: 20,
                  color: '#9E9E9E',
                  fontSize: 12,
                }}
              >
                0/1000
              </Text>
            </View>

            <TouchableOpacity
              style={globalStyles.primaryButton}
              onPress={handleNext}
            >
              <Text style={globalStyles.primaryButtonText}>Next</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {/* Step 2 Form */}
            <InputLabel label="Material" />
            <DropdownPlaceholder placeholder="Select" />

            <InputLabel label="Color Option" />
            <DropdownPlaceholder placeholder="Select" />

            <InputLabel label="Dimensions" />
            <View
              style={[globalStyles.dimensionContainer, { marginBottom: 20 }]}
            >
              <TextInput
                style={globalStyles.dimensionInput}
                placeholder="Length"
                placeholderTextColor="#9E9E9E"
              />
              <TextInput
                style={globalStyles.dimensionInput}
                placeholder="Width"
                placeholderTextColor="#9E9E9E"
              />
              <TextInput
                style={globalStyles.dimensionInput}
                placeholder="Height"
                placeholderTextColor="#9E9E9E"
              />
            </View>

            <InputLabel label="Finish Type" />
            <DropdownPlaceholder placeholder="Select" />

            <InputLabel label="Stock" />
            <View style={globalStyles.inputContainer}>
              <TextInput
                style={globalStyles.inputField}
                placeholder="Enter Stock"
                placeholderTextColor="#9E9E9E"
              />
            </View>

            <InputLabel label="Item Weight" />
            <View style={globalStyles.inputContainer}>
              <TextInput
                style={globalStyles.inputField}
                placeholder="80kg"
                placeholderTextColor="#9E9E9E"
              />
            </View>

            <InputLabel label="Status" />
            <DropdownPlaceholder placeholder="In Stock" />

            <InputLabel label="Selling Price" />
            <View style={globalStyles.inputContainer}>
              <TextInput
                style={globalStyles.inputField}
                placeholder="Enter Selling Price"
                placeholderTextColor="#9E9E9E"
              />
            </View>

            <InputLabel label="Actual MRP" />
            <View style={globalStyles.inputContainer}>
              <TextInput
                style={globalStyles.inputField}
                placeholder="Enter Actual MRP"
                placeholderTextColor="#9E9E9E"
              />
            </View>

            <TouchableOpacity
              style={globalStyles.primaryButton}
              onPress={handlePublish}
            >
              <Text style={globalStyles.primaryButtonText}>
                Publish Product
              </Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const InputLabel = ({ label }) => (
  <Text
    style={[
      globalStyles.inputLabel,
      { marginLeft: 0, marginBottom: 10, fontSize: 16 },
    ]}
  >
    {label}
  </Text>
);

const DropdownPlaceholder = ({ placeholder }) => (
  <View
    style={[
      globalStyles.inputField,
      {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
      },
    ]}
  >
    <Text style={{ color: '#9E9E9E' }}>{placeholder}</Text>
    <Svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#9E9E9E"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M6 9l6 6 6-6" />
    </Svg>
  </View>
);

const UploadBox = ({ label, subLabel, isPrimary }) => (
  <View style={{ marginBottom: 20 }}>
    <View
      style={[
        globalStyles.dashBorderContainer,
        isPrimary ? { borderColor: '#FF5722' } : { borderColor: '#FF5722' },
      ]}
    >
      <View style={globalStyles.uploadIconCircle}>
        <Svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FF5722"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <Path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <Path d="M17 8l-5-5-5 5" />
          <Path d="M12 3v12" />
        </Svg>
      </View>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ color: '#9E9E9E', fontSize: 14 }}>{label}</Text>
        <Text style={{ color: '#FF5722', fontWeight: '700', fontSize: 14 }}>
          Select file
        </Text>
      </View>
    </View>
    <Text style={{ fontSize: 12, color: '#9E9E9E', marginTop: 8 }}>
      {subLabel}
    </Text>
  </View>
);

export default AddProductScreen;
