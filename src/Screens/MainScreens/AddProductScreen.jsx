import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary } from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from '../../Globalcss/Globalcss';
import { font } from '../../utils/fontFamilies';
import CustomHeader from '../../components/CustomHeader';
import GradientButton from '../../components/GradientButton';
import { getMaterialsForSubCategory } from '../../utils/materialsConstant';
import { ArrowDownIcon } from '../../Icons/ArrowDownIcon';
import { useProduct } from '../../context/ProductContext';

// SVG Icons
import UploadIcon from '../../../assets/images/upload.svg';
import PlusIcon from '../../../assets/images/plusIcon.svg';

const COMMON_COLORS = [
  { name: 'Red', code: '#FF0000' },
  { name: 'Blue', code: '#0000FF' },
  { name: 'Green', code: '#008000' },
  { name: 'Yellow', code: '#FFFF00' },
  { name: 'Black', code: '#000000' },
  { name: 'White', code: '#FFFFFF' },
  { name: 'Grey', code: '#808080' },
  { name: 'Brown', code: '#A52A2A' },
  { name: 'Beige', code: '#F5F5DC' },
  { name: 'Silver', code: '#C0C0C0' },
  { name: 'Gold', code: '#FFD700' },
  { name: 'Orange', code: '#FFA500' },
  { name: 'Pink', code: '#FFC0CB' },
  { name: 'Purple', code: '#800080' },
  { name: 'Cyan', code: '#00FFFF' },
  { name: 'Magenta', code: '#FF00FF' },
  { name: 'Teal', code: '#008080' },
  { name: 'Lavender', code: '#E6E6FA' },
  { name: 'Olive', code: '#808000' },
  { name: 'Maroon', code: '#800000' },
  { name: 'Navy', code: '#000080' },
];

const AddProductScreen = ({ navigation }) => {
  const {
    categories,
    subCategories,
    childSubCategories,
    fetchCategories,
    fetchSubCategories,
    fetchChildSubCategories,
    createProduct,
    createLoading,
  } = useProduct();
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});

  // Form State
  const [formData, setFormData] = useState({
    category_id: '',
    sub_category_id: '',
    child_sub_category_id: '',
    brand: '',
    sku: '',
    name: '',
    description: '',
    material: '',
    dimensions: { length: '', width: '', height: '' },
    // finishType: '',
    stock: '',
    weight: '',
    stock_status: 'in_stock',
    price: '',
    mrp: '',
    main_image: null,
    main_extra_images: [],
  });

  const [colorVariants, setColorVariants] = useState([
    {
      id: Date.now(),
      color_name: '',
      color_code: '',
      stock: '',
      price_adjustment: '',
      is_default: true,
      images: [],
    },
  ]);

  useEffect(() => {
    fetchCategories();

    const backAction = () => {
      if (step === 2) {
        setStep(1);
        return true; // Prevent default behavior (exit)
      }
      return false; // Default behavior
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [step]);

  const handleSelectPrimaryImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });

    if (result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      const imageFile = {
        uri: asset.uri,
        type: asset.type,
        name: asset.fileName,
        image_type: 'primary',
      };
      setFormData({ ...formData, main_image: imageFile });
    }
  };

  const handleRemovePrimaryImage = () => {
    setFormData({ ...formData, main_image: null });
  };

  const handleSelectGalleryImages = async () => {
    const currentImages = formData.main_extra_images || [];
    const limit = 3 - currentImages.length;

    if (limit <= 0) return;

    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: limit,
    });

    if (result.assets && result.assets.length > 0) {
      const newImages = result.assets.map(asset => ({
        uri: asset.uri,
        type: asset.type,
        name: asset.fileName,
        image_type: 'gallery',
      }));
      setFormData({
        ...formData,
        main_extra_images: [...currentImages, ...newImages],
      });
    }
  };

  const handleRemoveGalleryImage = index => {
    const updated = [...(formData.main_extra_images || [])];
    updated.splice(index, 1);
    setFormData({ ...formData, main_extra_images: updated });
  };

  const addColorVariant = () => {
    setColorVariants([
      ...colorVariants,
      {
        id: Date.now(),
        color_name: '',
        color_code: '',
        stock: '',
        price_adjustment: '',
        is_default: false,
        images: [],
      },
    ]);
  };

  const removeColorVariant = id => {
    if (colorVariants.length > 1) {
      const filtered = colorVariants.filter(v => v.id !== id);
      if (!filtered.some(v => v.is_default)) {
        filtered[0].is_default = true;
      }
      setColorVariants(filtered);
    }
  };

  const updateColorVariant = (id, field, value) => {
    setColorVariants(
      colorVariants.map(v => {
        if (v.id === id) {
          if (typeof field === 'object') {
            return { ...v, ...field };
          }
          if (field === 'is_default' && value === true) {
            // Set all others to false if this one is set to true
            return { ...v, [field]: value };
          }
          return { ...v, [field]: value };
        }
        if (field === 'is_default' && value === true) {
          return { ...v, is_default: false };
        }
        return v;
      }),
    );
  };

  const handleSelectVariantImages = async variantId => {
    const variant = colorVariants.find(v => v.id === variantId);
    const currentImages = variant.images || [];
    const limit = 4 - currentImages.length;

    if (limit <= 0) return;

    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: limit,
    });

    if (result.assets && result.assets.length > 0) {
      const newImages = result.assets.map(asset => ({
        uri: asset.uri,
        type: asset.type,
        name: asset.fileName,
        image_type: 'color_variant',
      }));
      setColorVariants(
        colorVariants.map(v =>
          v.id === variantId
            ? { ...v, images: [...currentImages, ...newImages] }
            : v,
        ),
      );
    }
  };

  const handleRemoveVariantImage = (variantId, imageIndex) => {
    setColorVariants(
      colorVariants.map(v => {
        if (v.id === variantId) {
          const updatedImages = [...v.images];
          updatedImages.splice(imageIndex, 1);
          return { ...v, images: updatedImages };
        }
        return v;
      }),
    );
  };

  const handleNext = () => {
    const newErrors = {};
    if (!formData.category_id) newErrors.category_id = true;
    if (!formData.sub_category_id) newErrors.sub_category_id = true;
    if (!formData.sku) newErrors.sku = true;
    if (!formData.main_image) newErrors.main_image = true;
    if (formData.category_id == 1 && (!formData.main_extra_images || formData.main_extra_images.length === 0)) {
      newErrors.main_extra_images = true;
    }
    if (!formData.name) newErrors.name = true;
    if (!formData.description) newErrors.description = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Optional: scroll to top or vibrate
      return;
    }
    setErrors({});
    setStep(2);
  };



  const handlePublish = async () => {
    const isCategoryOne = formData.category_id == 1;

    // Validation
    const newErrors = {};
    if (!formData.material) newErrors.material = true;
    if (!formData.weight) newErrors.weight = true;
    if (!formData.price) newErrors.price = true;
    if (!formData.mrp) newErrors.mrp = true;

    if (isCategoryOne) {
      if (!formData.stock) newErrors.stock = true;
    } else {
      if (!formData.dimensions.length) newErrors.dim_length = true;
      if (!formData.dimensions.width) newErrors.dim_width = true;
      if (!formData.dimensions.height) newErrors.dim_height = true;

      // Color variants validation
      const variantErrors = {};
      colorVariants.forEach((v, index) => {
        const vErr = {};
        if (!v.color_code) vErr.color_code = true;
        if (!v.stock) vErr.stock = true;
        if (!v.images || v.images.length === 0) vErr.images = true;
        if (Object.keys(vErr).length > 0) {
          variantErrors[index] = vErr;
        }
      });
      if (Object.keys(variantErrors).length > 0) {
        newErrors.colorVariants = variantErrors;
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert('Please fill all required fields');
      return;
    }

    // Base payload
    const finalPayload = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      mrp: parseFloat(formData.mrp) || 0,
      stock: parseInt(formData.stock) || 0,
      weight: parseFloat(formData.weight) || 0,
      has_color_variants: !isCategoryOne,
      main_extra_images: isCategoryOne ? formData.main_extra_images : [],
    };

    if (!isCategoryOne) {
      finalPayload.color_variants = colorVariants.map(v => ({
        color_name: v.color_name,
        color_code: v.color_code || '#000000',
        stock: parseInt(v.stock) || 0,
        price_adjustment: parseFloat(v.price_adjustment) || 0,
        is_default: v.is_default,
      }));

      colorVariants.forEach((v, index) => {
        if (v.images && v.images.length > 0) {
          finalPayload[`color_variant_${index}`] = v.images;
        }
      });
    }

    try {
      console.log('Publishing Product:', finalPayload);
      const res = await createProduct(finalPayload);
      if (res.success === true) {
        navigation.navigate('ProductAddedSuccessScreen');
      } else {
        alert(res.message || 'Failed to create product');
      }
    } catch (err) {
      alert('Something went wrong. Please try again.');
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else {
      navigation.goBack();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.screenContainer}
    >
      <CustomHeader
        variant="internal"
        title="Add Product"
        onLeftPress={handleBack}
        onRightPress={() => { }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {step === 1 ? (
          <Step1
            formData={formData}
            setFormData={setFormData}
            categories={categories}
            subCategories={subCategories}
            childSubCategories={childSubCategories}
            fetchSubCategories={fetchSubCategories}
            fetchChildSubCategories={fetchChildSubCategories}
            handleNext={handleNext}
            handleSelectPrimaryImage={handleSelectPrimaryImage}
            handleRemovePrimaryImage={handleRemovePrimaryImage}
            handleSelectGalleryImages={handleSelectGalleryImages}
            handleRemoveGalleryImage={handleRemoveGalleryImage}
            handlePublish={handlePublish}
            errors={errors}
          />
        ) : (
          <Step2
            formData={formData}
            setFormData={setFormData}
            colorVariants={colorVariants}
            addColorVariant={addColorVariant}
            removeColorVariant={removeColorVariant}
            updateColorVariant={updateColorVariant}
            handleSelectVariantImages={handleSelectVariantImages}
            handleRemoveVariantImage={handleRemoveVariantImage}
            handlePublish={handlePublish}
            apiLoading={createLoading}
            subCategories={subCategories}
            errors={errors}
          />
        )}
        <View style={{ height: 40 }} />
      </ScrollView>

      {createLoading && (
        <View style={{
          ...styles.screenContainer,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255,255,255,0.7)',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 999,
        }}>
          <ActivityIndicator size="large" color="#F83336" />
          <Text style={{ marginTop: 10, color: '#F83336', fontFamily: styles.addColorText.fontFamily }}>
            Creating Product...
          </Text>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

// Step Components
const Step1 = ({
  formData,
  setFormData,
  categories,
  subCategories,
  childSubCategories,
  fetchSubCategories,
  fetchChildSubCategories,
  handleNext,
  handleSelectPrimaryImage,
  handleRemovePrimaryImage,
  handleSelectGalleryImages,
  handleRemoveGalleryImage,
  handlePublish, // Added handlePublish
  errors = {},
}) => (
  <View style={{ padding: 16 }}>
    <Label text="Select category" />
    <CustomPicker
      selectedValue={formData.category_id}
      onValueChange={(val) => {
        setFormData({ ...formData, category_id: val, sub_category_id: '', child_sub_category_id: '' });
        if (val) fetchSubCategories(val);
      }}
      items={categories}
      placeholder="Select Category"
      hasError={errors.category_id}
    />

    <Label text="Select Sub category" />
    <CustomPicker
      selectedValue={formData.sub_category_id}
      onValueChange={val => {
        setFormData({ ...formData, sub_category_id: val, child_sub_category_id: '' });
        if (val && formData.category_id) fetchChildSubCategories(formData.category_id, val);
      }}
      items={subCategories}
      placeholder="Select Sub Category"
      enabled={!!formData.category_id}
      hasError={errors.sub_category_id}
    />

    <Label text="Select Child Sub category" />
    <CustomPicker
      selectedValue={formData.child_sub_category_id}
      onValueChange={val => setFormData({ ...formData, child_sub_category_id: val })}
      items={childSubCategories}
      placeholder="Select Child Sub Category"
      enabled={!!formData.sub_category_id}
    />

    <Label text="SKU" />
    <TextInput
      style={[styles.addProductInput, errors.sku && { borderColor: '#F83336' }]}
      placeholder="Enter SKU"
      placeholderTextColor="#9E9E9E"
      value={formData.sku}
      onChangeText={val => setFormData({ ...formData, sku: val })}
    />

    <Label text="Upload Primary Image" />
    {formData.main_image ? (
      <ImagePreview
        file={formData.main_image}
        onRemove={handleRemovePrimaryImage}
      />
    ) : (
      <UploadBox onPress={handleSelectPrimaryImage} hasError={errors.main_image} />
    )}

    {formData.category_id == 1 && (
      <>
        <Label text="Upload Other Images (Max 3)" />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
          {formData.main_extra_images &&
            formData.main_extra_images.map((img, index) => (
              <View key={index} style={styles.imagePreviewContainer}>
                <Image source={{ uri: img.uri }} style={styles.imagePreview} />
                <TouchableOpacity
                  style={styles.removeImageBtn}
                  onPress={() => handleRemoveGalleryImage(index)}
                >
                  <Text style={styles.removeImageText}>X</Text>
                </TouchableOpacity>
              </View>
            ))}
        </View>

        {(!formData.main_extra_images ||
          formData.main_extra_images.length < 3) && (
            <UploadBox
              onPress={handleSelectGalleryImages}
              hint="Upload up to 3 gallery images"
              hasError={errors.main_extra_images}
            />
          )}
      </>
    )}

    <Label text="Product Name" />
    <TextInput
      style={[styles.addProductInput, errors.name && { borderColor: '#F83336' }]}
      placeholder="Enter name"
      placeholderTextColor="#9E9E9E"
      value={formData.name}
      onChangeText={val => setFormData({ ...formData, name: val })}
    />

    <Label text="Product Description" />
    <View style={[styles.addProductDescriptionContainer, errors.description && { borderColor: '#F83336' }]}>
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
      title={'Next'}
      onPress={handleNext}
      style={{ marginTop: 24, marginBottom: 40 }}
    />
  </View>
);

const Step2 = ({
  formData,
  setFormData,
  colorVariants,
  addColorVariant,
  removeColorVariant,
  updateColorVariant,
  handleSelectVariantImages,
  handleRemoveVariantImage,
  handlePublish,
  apiLoading,
  subCategories,
  errors = {},
}) => {
  const statuses = [
    { id: 'in_stock', name: 'In Stock' },
    { id: 'out_of_stock', name: 'Out of Stock' },
    { id: 'low_stock', name: 'Low Stock' },
  ];

  return (
    <View style={{ padding: 16 }}>
      <Label text="Material" />
      <TextInput
        style={[styles.addProductInput, errors.material && { borderColor: '#F83336' }]}
        placeholder="Enter Material"
        placeholderTextColor="#9E9E9E"
        value={formData.material}
        onChangeText={val => setFormData({ ...formData, material: val })}
      />

      {formData.category_id != 1 && (
        <>
          <Label text="Color Option" />
          {colorVariants.map((variant, index) => (
            <View key={variant.id} style={styles.colorOptionCard}>
              <View style={styles.colorOptionHeader}>
                <Text style={styles.colorOptionTitle}>
                  Color Variant {index + 1}
                </Text>
                {colorVariants.length > 1 && (
                  <TouchableOpacity
                    onPress={() => removeColorVariant(variant.id)}
                  >
                    <Text style={styles.removeColorText}>Remove</Text>
                  </TouchableOpacity>
                )}
              </View>

              <Label text="Select Color" />
              <ColorSelector
                selectedColor={variant.color_code}
                onSelect={(colorObj) =>
                  updateColorVariant(variant.id, colorObj)
                }
                hasError={errors.colorVariants?.[index]?.color_code}
              />

              <View style={{ flexDirection: 'row', gap: 12, }}>
                <View style={{ flex: 1 }}>
                  <Label text="Stock" />
                  <TextInput
                    style={[styles.addProductInput, errors.colorVariants?.[index]?.stock && { borderColor: '#F83336' }]}
                    placeholder="10"
                    placeholderTextColor="#9E9E9E"
                    keyboardType="numeric"
                    value={variant.stock.toString()}
                    onChangeText={val => updateColorVariant(variant.id, 'stock', val)}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Label text="Price Adjust" />
                  <TextInput
                    style={styles.addProductInput}
                    placeholder="0"
                    placeholderTextColor="#9E9E9E"
                    keyboardType="numeric"
                    value={variant.price_adjustment.toString()}
                    onChangeText={val => updateColorVariant(variant.id, 'price_adjustment', val)}
                  />
                </View>
              </View>

              <TouchableOpacity
                style={[styles.rememberContainer, { marginTop: 16 }]}
                onPress={() => updateColorVariant(variant.id, 'is_default', true)}
              >
                <View style={[styles.checkbox, variant.is_default && styles.checkboxChecked]}>
                  {variant.is_default && <Text style={{ color: '#FFF' }}>✓</Text>}
                </View>
                <Text style={styles.rememberText}>Set as Default</Text>
              </TouchableOpacity>

              <Label text="Variant Images (Max 4)" />
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                {variant.images.map((img, imgIdx) => (
                  <View key={imgIdx} style={styles.imagePreviewContainer}>
                    <Image source={{ uri: img.uri }} style={styles.imagePreview} />
                    <TouchableOpacity
                      style={styles.removeImageBtn}
                      onPress={() => handleRemoveVariantImage(variant.id, imgIdx)}
                    >
                      <Text style={styles.removeImageText}>X</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>

              {variant.images.length < 4 && (
                <View style={{}}>
                  <UploadBox
                    onPress={() => handleSelectVariantImages(variant.id)}
                    hint="Upload up to 4 variant images"
                    hasError={errors.colorVariants?.[index]?.images}
                  />
                </View>
              )}
            </View>
          ))}

          <TouchableOpacity
            style={styles.addColorBtn}
            onPress={addColorVariant}
          >
            <PlusIcon width={16} height={16} />
            <Text style={styles.addColorText}>Add color variant</Text>
          </TouchableOpacity>
        </>
      )
      }

      {
        formData.category_id != 1 && (
          <>
            <Label text="Dimensions" />
            <View style={styles.addProductDimensionRow}>
              <TextInput
                style={[styles.addProductDimensionInput, errors.dim_length && { borderColor: '#F83336' }]}
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
                style={[styles.addProductDimensionInput, errors.dim_width && { borderColor: '#F83336' }]}
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
                style={[styles.addProductDimensionInput, errors.dim_height && { borderColor: '#F83336' }]}
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
          </>
        )
      }

      {/* <Label text="Finish Type" />
      <CustomPicker
        selectedValue={formData.finishType}
        onValueChange={val => setFormData({ ...formData, finishType: val })}
        items={finishes}
        placeholder="Select Finish Type"
      /> */}

      {
        formData.category_id == 1 && (
          <>
            <Label text="Stock" />
            <TextInput
              style={[styles.addProductInput, errors.stock && { borderColor: '#F83336' }]}
              placeholder="Enter Stock"
              placeholderTextColor="#9E9E9E"
              keyboardType="numeric"
              value={formData.stock}
              onChangeText={val => setFormData({ ...formData, stock: val })}
            />
          </>
        )
      }

      <Label text="Item Weight" />
      <TextInput
        style={[styles.addProductInput, errors.weight && { borderColor: '#F83336' }]}
        placeholder="Enter Weight (kg)"
        placeholderTextColor="#9E9E9E"
        keyboardType="numeric"
        value={formData.weight}
        onChangeText={val => setFormData({ ...formData, weight: val })}
      />

      <Label text="Status" />
      <CustomPicker
        selectedValue={formData.stock_status}
        onValueChange={val => setFormData({ ...formData, stock_status: val })}
        items={statuses}
        placeholder="Select Status"
      />

      <Label text="Selling Price" />
      <TextInput
        style={[styles.addProductInput, errors.price && { borderColor: '#F83336' }]}
        placeholder="Enter Selling Price"
        placeholderTextColor="#9E9E9E"
        keyboardType="numeric"
        value={formData.price}
        onChangeText={val => setFormData({ ...formData, price: val })}
      />

      <Label text="Actual MRP" />
      <TextInput
        style={[styles.addProductInput, errors.mrp && { borderColor: '#F83336' }]}
        placeholder="Enter Actual MRP"
        placeholderTextColor="#9E9E9E"
        keyboardType="numeric"
        value={formData.mrp}
        onChangeText={val => setFormData({ ...formData, mrp: val })}
      />

      <GradientButton
        title={apiLoading ? "Publishing..." : "Publish Product"}
        onPress={handlePublish}
        disabled={apiLoading}
        style={{ marginTop: 24, marginBottom: 40, opacity: apiLoading ? 0.7 : 1 }}
      />
    </View >
  );
};

// Sub-components
const Label = ({ text }) => <Text style={styles.addProductLabel}>{text}</Text>;

const CustomPicker = ({
  selectedValue,
  onValueChange,
  items,
  placeholder = 'Select',
  enabled = true,
  hasError = false,
}) => {
  let displayLabel = placeholder;
  if (selectedValue && selectedValue !== '') {
    const found = items.find(i =>
      typeof i === 'object' ? i.id === selectedValue : i === selectedValue,
    );
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
    <View style={[
      styles.pickerContainer,
      !enabled && { opacity: 0.6 },
      hasError && { borderColor: '#F83336' }
    ]}>
      <Text
        numberOfLines={1}
        style={
          !selectedValue || selectedValue === '' || displayLabel === placeholder
            ? styles.pickerPlaceholderText
            : styles.pickerValueText
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

const ImagePreview = ({ file, onRemove }) => (
  <View style={styles.imagePreviewContainer}>
    <Image source={{ uri: file.uri }} style={styles.imagePreview} />
    <TouchableOpacity style={styles.removeImageBtn} onPress={onRemove}>
      <Text style={styles.removeImageText}>X</Text>
    </TouchableOpacity>
  </View>
);

const UploadBox = ({ hint = 'Minimum file size 50mb, jpeg,png,mp4', onPress, selectedFile, hasError = false }) => (
  <View style={{ marginBottom: 4 }}>
    <TouchableOpacity
      style={[styles.addProductUploadContainer, hasError && { borderColor: '#F83336' }]}
      onPress={onPress}
    >
      <View style={styles.addProductUploadRow}>
        <UploadIcon width={41} height={41} />
        <View>
          <Text style={styles.uploadLabelText}>
            {selectedFile ? selectedFile.name : 'Upload file here'}
          </Text>
          <Text style={styles.uploadSelectText}>
            {selectedFile ? 'Change file' : 'Select file'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
    <Text style={styles.uploadHintText}>{hint}</Text>
  </View>
);
const ColorSelector = ({ selectedColor, onSelect, hasError = false }) => {
  const [customColor, setCustomColor] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  return (
    <View style={[{ marginBottom: 8, padding: 4, borderRadius: 24 }, hasError && { borderWidth: 1, borderColor: '#F83336' }]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10, paddingRight: 20 }}>
        {COMMON_COLORS.map(color => (
          <TouchableOpacity
            key={color.code}
            onPress={() => onSelect({ color_name: color.name, color_code: color.code })}
            style={[
              {
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: color.code,
                borderWidth: 1,
                borderColor: '#E6EAF1',
                justifyContent: 'center',
                alignItems: 'center',
              },
              selectedColor === color.code && {
                borderColor: '#F83336',
                borderWidth: 2,
              }
            ]}
          >
            {selectedColor === color.code && (
              <Text style={{ color: color.code === '#FFFFFF' || color.code === '#E6E6FA' || color.code === '#F5F5DC' || color.code === '#FFFF00' ? '#000' : '#FFF', fontSize: 12, fontWeight: 'bold' }}>✓</Text>
            )}
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          onPress={() => setShowCustomInput(!showCustomInput)}
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: '#F3F4F6',
            borderWidth: 1,
            borderColor: '#FB923C',
            borderStyle: 'dashed',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#F76627', fontSize: 20, fontWeight: 'bold' }}>+</Text>
        </TouchableOpacity>
      </ScrollView>

      {showCustomInput && (
        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', marginTop: 12 }}>
          <TextInput
            style={{
              flex: 1,
              backgroundColor: '#FFFFFF',
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#E6EAF1',
              paddingHorizontal: 12,
              height: 44,
              fontSize: 14,
              fontFamily: font.REGULAR,
              color: '#000000',
            }}
            placeholder="#HEX Code"
            placeholderTextColor="#9E9E9E"
            value={customColor}
            onChangeText={(val) => {
              setCustomColor(val);
              if (val.length === 7 && val.startsWith('#')) {
                onSelect({ color_name: 'Custom', color_code: val });
              }
            }}
          />
          <TouchableOpacity
            onPress={() => {
              if (customColor.length >= 4) {
                onSelect({ color_name: 'Custom', color_code: customColor });
              }
            }}
            style={{
              backgroundColor: '#F83336',
              paddingHorizontal: 16,
              height: 44,
              borderRadius: 12,
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: '#FFF', fontFamily: font.SEMI_BOLD }}>Apply</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default AddProductScreen;
