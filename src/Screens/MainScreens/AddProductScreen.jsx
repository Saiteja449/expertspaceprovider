import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from '../../Globalcss/Globalcss';
import CustomHeader from '../../components/CustomHeader';
import GradientButton from '../../components/GradientButton';
import { ArrowDownIcon } from '../../Icons/ArrowDownIcon';
import apiService from '../../api/apiService';

// SVG Icons
import UploadIcon from '../../../assets/images/upload.svg';
import PlusIcon from '../../../assets/images/plusIcon.svg';

const AddProductScreen = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  // Form State
  const [formData, setFormData] = useState({
    category: '',
    subCategory: '',
    brand: '',
    sku: '',
    productName: '',
    description: '',
    material: '',
    dimensions: { length: '', width: '', height: '' },
    finishType: '',
    stock: '',
    weight: '80kg',
    status: 'In Stock',
    sellingPrice: '',
    mrp: '',
  });

  const [colorVariants, setColorVariants] = useState([
    { id: 1, color: '', images: [] },
  ]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await apiService.get('provider/getAllCategoriesForProvider');
      if (response.data.success) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchSubCategories = async (categoryId) => {
    try {
      const response = await apiService.get(`provider/getAllSubCategoriesByIdForProvider/${categoryId}`);
      if (response.data.success) {
        setSubCategories(response.data.data);
      } else {
        setSubCategories([]);
      }
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      setSubCategories([]);
    }
  };

  const addColorVariant = () => {
    setColorVariants([
      ...colorVariants,
      { id: Date.now(), color: '', images: [] },
    ]);
  };

  const removeColorVariant = id => {
    if (colorVariants.length > 1) {
      setColorVariants(colorVariants.filter(v => v.id !== id));
    }
  };

  const updateColorVariant = (id, field, value) => {
    setColorVariants(
      colorVariants.map(v => (v.id === id ? { ...v, [field]: value } : v)),
    );
  };

  const handleNext = () => {
    setStep(2);
  };

  const handlePublish = () => {
    console.log('Publishing Product:', { ...formData, colorVariants });
    navigation.navigate('ProductAddedSuccessScreen');
  };

  // Static Data
  // const categories = ['Select', 'Furniture', 'Electronics', 'Clothing']; // Now coming from API
  // const subCategories = ['Select', 'Sofa', 'Table', 'Chair']; // Now coming from API
  const brands = ['Brand A', 'Brand B', 'Brand C'];
  const materials = ['Teak Wood', 'Rosewood', 'Metal', 'MDF'];
  const colors = ['Beige', 'Black', 'Brown', 'Grey', 'Red'];
  const finishes = ['Glossy', 'Matte', 'Natural'];
  const statuses = ['In Stock', 'Out of Stock'];

  const renderStep1 = () => (
    <View style={{ padding: 16 }}>
      <Label text="Select category" />
      <CustomPicker
        selectedValue={formData.category}
        onValueChange={(val) => {
          setFormData({ ...formData, category: val, subCategory: '' });
          if (val) fetchSubCategories(val);
          else setSubCategories([]);
        }}
        items={categories}
        placeholder="Select Category"
      />

      <Label text="Select Sub category" />
      <CustomPicker
        selectedValue={formData.subCategory}
        onValueChange={val => setFormData({ ...formData, subCategory: val })}
        items={subCategories}
        placeholder="Select Sub Category"
        enabled={!!formData.category}
      />

      <Label text="Brand" />
      <CustomPicker
        selectedValue={formData.brand}
        onValueChange={val => setFormData({ ...formData, brand: val })}
        items={brands}
        placeholder="Select Brand"
      />

      <Label text="SKU" />
      <TextInput
        style={styles.addProductInput}
        placeholder="Enter SKU"
        placeholderTextColor="#9E9E9E"
        value={formData.sku}
        onChangeText={val => setFormData({ ...formData, sku: val })}
      />

      <Label text="Upload Primary Image" />
      <UploadBox />

      <Label text="Upload Other Images" />
      <UploadBox />

      <Label text="Product Name" />
      <TextInput
        style={styles.addProductInput}
        placeholder="Enter name"
        placeholderTextColor="#9E9E9E"
        value={formData.productName}
        onChangeText={val => setFormData({ ...formData, productName: val })}
      />

      <Label text="Product Description" />
      <View style={styles.addProductDescriptionContainer}>
        <TextInput
          style={styles.addProductDescriptionInput}
          placeholder="Description enter here..."
          placeholderTextColor="#9E9E9E"
          multiline
          maxLength={1000}
          value={formData.description}
          onChangeText={val => setFormData({ ...formData, description: val })}
        />
        <Text style={styles.addProductCharCount}>
          {formData.description.length}/1000
        </Text>
      </View>

      <GradientButton
        title="Next"
        onPress={handleNext}
        style={{ marginTop: 24, marginBottom: 40 }}
      />
    </View>
  );

  const renderStep2 = () => (
    <View style={{ padding: 16 }}>
      <Label text="Material" />
      <CustomPicker
        selectedValue={formData.material}
        onValueChange={val => setFormData({ ...formData, material: val })}
        items={materials}
        placeholder="Select Material"
      />

      <Label text="Color Option" />
      {colorVariants.map((variant, index) => (
        <View key={variant.id} style={styles.colorOptionCard}>
          <View style={styles.colorOptionHeader}>
            <Text style={styles.colorOptionTitle}>
              Color Variant {index + 1}
            </Text>
            {colorVariants.length > 1 && (
              <TouchableOpacity onPress={() => removeColorVariant(variant.id)}>
                <Text style={styles.removeColorText}>Remove</Text>
              </TouchableOpacity>
            )}
          </View>

          <CustomPicker
            selectedValue={variant.color}
            onValueChange={val => updateColorVariant(variant.id, 'color', val)}
            items={colors}
            placeholder="Select Color"
          />

          <View style={{ marginTop: 12 }}>
            <UploadBox hint="Upload images for this color" />
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.addColorBtn} onPress={addColorVariant}>
        <PlusIcon width={16} height={16} />
        <Text style={styles.addColorText}>Add color variant</Text>
      </TouchableOpacity>

      <Label text="Dimensions" />
      <View style={styles.addProductDimensionRow}>
        <TextInput
          style={styles.addProductDimensionInput}
          placeholder="Length"
          placeholderTextColor="#9E9E9E"
          value={formData.dimensions.length}
          onChangeText={val =>
            setFormData({
              ...formData,
              dimensions: { ...formData.dimensions, length: val },
            })
          }
        />
        <TextInput
          style={styles.addProductDimensionInput}
          placeholder="Width"
          placeholderTextColor="#9E9E9E"
          value={formData.dimensions.width}
          onChangeText={val =>
            setFormData({
              ...formData,
              dimensions: { ...formData.dimensions, width: val },
            })
          }
        />
        <TextInput
          style={styles.addProductDimensionInput}
          placeholder="Height"
          placeholderTextColor="#9E9E9E"
          value={formData.dimensions.height}
          onChangeText={val =>
            setFormData({
              ...formData,
              dimensions: { ...formData.dimensions, height: val },
            })
          }
        />
      </View>

      <Label text="Finish Type" />
      <CustomPicker
        selectedValue={formData.finishType}
        onValueChange={val => setFormData({ ...formData, finishType: val })}
        items={finishes}
        placeholder="Select Finish Type"
      />

      <Label text="Stock" />
      <TextInput
        style={styles.addProductInput}
        placeholder="Enter Stock"
        placeholderTextColor="#9E9E9E"
        keyboardType="numeric"
        value={formData.stock}
        onChangeText={val => setFormData({ ...formData, stock: val })}
      />

      <Label text="Item Weight" />
      <TextInput
        style={styles.addProductInput}
        placeholder="80kg"
        placeholderTextColor="#9E9E9E"
        value={formData.weight}
        onChangeText={val => setFormData({ ...formData, weight: val })}
      />

      <Label text="Status" />
      <CustomPicker
        selectedValue={formData.status}
        onValueChange={val => setFormData({ ...formData, status: val })}
        items={statuses}
        placeholder="Select Status"
      />

      <Label text="Selling Price" />
      <TextInput
        style={styles.addProductInput}
        placeholder="Enter Selling Price"
        placeholderTextColor="#9E9E9E"
        keyboardType="numeric"
        value={formData.sellingPrice}
        onChangeText={val => setFormData({ ...formData, sellingPrice: val })}
      />

      <Label text="Actual MRP" />
      <TextInput
        style={styles.addProductInput}
        placeholder="Enter Actual MRP"
        placeholderTextColor="#9E9E9E"
        keyboardType="numeric"
        value={formData.mrp}
        onChangeText={val => setFormData({ ...formData, mrp: val })}
      />

      <GradientButton
        title="Publish Product"
        onPress={handlePublish}
        style={{ marginTop: 24, marginBottom: 40 }}
      />
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.screenContainer}
    >
      <CustomHeader
        variant="internal"
        title="Add Product"
        onRightPress={() => { }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {step === 1 ? renderStep1() : renderStep2()}
        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// Sub-components
const Label = ({ text }) => <Text style={styles.addProductLabel}>{text}</Text>;

const CustomPicker = ({ selectedValue, onValueChange, items, placeholder = 'Select', enabled = true }) => {
  let displayLabel = placeholder;
  if (selectedValue && selectedValue !== '') {
    const found = items.find(i => (typeof i === 'object' ? i.id === selectedValue : i === selectedValue));
    if (found) {
      displayLabel = typeof found === 'object' ? found.name : found;
    } else {
      // Fallback for string items if not in list or if simply a value
      displayLabel = selectedValue;
    }
  }

  // Handle case where initial values might include "Select" or "Select Brand" from old state usage
  if (displayLabel.includes('Select') && displayLabel !== placeholder) {
    displayLabel = placeholder;
  }

  return (
    <View style={[styles.pickerContainer, !enabled && { opacity: 0.6 }]}>
      <Text
        numberOfLines={1}
        style={
          !selectedValue || selectedValue === '' || displayLabel === placeholder ? styles.pickerPlaceholderText : styles.pickerValueText
        }
      >
        {displayLabel}
      </Text>

      <View style={styles.pickerIconContainer}>
        <ArrowDownIcon size={16} color="#9E9E9E" />
      </View>

      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={styles.pickerStyle}
        dropdownIconColor="transparent"
        enabled={enabled}
      >
        <Picker.Item label={placeholder} value="" color="#9E9E9E" />
        {items.map((item, index) => {
          const label = typeof item === 'object' ? item.name : item;
          const value = typeof item === 'object' ? item.id : item;
          return <Picker.Item key={index} label={label} value={value} />;
        })}
      </Picker>
    </View>
  );
};

const UploadBox = ({ hint = 'Minimum file size 50mb, jpeg,png,mp4' }) => (
  <View style={{ marginBottom: 4 }}>
    <TouchableOpacity style={styles.addProductUploadContainer}>
      <View style={styles.addProductUploadRow}>
        <UploadIcon width={41} height={41} />
        <View>
          <Text style={styles.uploadLabelText}>Upload file here</Text>
          <Text style={styles.uploadSelectText}>Select file</Text>
        </View>
      </View>
    </TouchableOpacity>
    <Text style={styles.uploadHintText}>{hint}</Text>
  </View>
);

export default AddProductScreen;
