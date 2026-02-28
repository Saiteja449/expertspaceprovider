import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    Modal,
    Image,
} from 'react-native';
import { styles } from '../../Globalcss/Globalcss';
import { font } from '../../utils/fontFamilies';
import CustomHeader from '../../components/CustomHeader';
import GradientButton from '../../components/GradientButton';
import { ArrowDownIcon } from '../../Icons/ArrowDownIcon';
import { useProduct } from '../../context/ProductContext';
import { Picker } from '@react-native-picker/picker';
import StatusModal from '../../components/StatusModal';
import LinearGradient from 'react-native-linear-gradient';

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

const EditProductScreen = ({ route, navigation }) => {
    const { productId } = route.params;
    const {
        getProductById,
        updateProduct,
        loading: contextLoading,
    } = useProduct();

    const [loading, setLoading] = useState(true);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        mrp: '',
        stock: '',
        dimensions: { length: '', width: '', height: '' },
        is_active: true,
        color_variants: [],
    });
    const [initialData, setInitialData] = useState(null);
    const [errors, setErrors] = useState({});
    const [modalConfig, setModalConfig] = useState({
        visible: false,
        status: 'processing', // 'processing' | 'success' | 'error'
        message: '',
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const product = await getProductById(productId);
                if (product) {
                    const mappedData = {
                        name: product.name || '',
                        description: product.description || '',
                        price: product.price?.toString() || '',
                        mrp: product.mrp?.toString() || '',
                        dimensions: product.dimensions
                            ? typeof product.dimensions === 'string'
                                ? JSON.parse(product.dimensions)
                                : product.dimensions
                            : { length: '', width: '', height: '' },
                        is_active: !!product.is_active,
                        color_variants: product.colorVariants || [],
                        stock: product.stock?.toString() || '',
                    };
                    setFormData(mappedData);
                    setInitialData(JSON.parse(JSON.stringify(mappedData))); // Deep clone for comparison
                }
            } catch (err) {
                Alert.alert('Error', 'Failed to fetch product details');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productId]);

    const handleUpdate = async () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = true;
        if (!formData.description) newErrors.description = true;
        if (!formData.price) newErrors.price = true;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setUpdateLoading(true);
        setModalConfig({
            visible: true,
            status: 'processing',
            message: 'Updating product details...',
        });

        try {
            const payload = {};

            // Compare top-level fields
            if (formData.name !== initialData.name) payload.name = formData.name;
            if (formData.description !== initialData.description)
                payload.description = formData.description;
            if (formData.price !== initialData.price)
                payload.price = parseFloat(formData.price);
            if (formData.mrp !== initialData.mrp)
                payload.mrp = parseFloat(formData.mrp);
            if (formData.is_active !== initialData.is_active)
                payload.is_active = formData.is_active;
            if (formData.stock !== initialData.stock)
                payload.stock = parseInt(formData.stock);

            // Compare dimensions
            const dimChanged =
                formData.dimensions.length !== initialData.dimensions.length ||
                formData.dimensions.width !== initialData.dimensions.width ||
                formData.dimensions.height !== initialData.dimensions.height;

            if (dimChanged) {
                payload.dimensions = formData.dimensions;
            }

            // Compare color variants
            const variantsChanged =
                JSON.stringify(formData.color_variants) !==
                JSON.stringify(initialData.color_variants);
            if (variantsChanged) {
                payload.color_variants = formData.color_variants;
            }

            if (Object.keys(payload).length === 0) {
                setModalConfig({
                    visible: true,
                    status: 'error',
                    message: 'No fields were modified.',
                });
                setUpdateLoading(false);
                return;
            }

            const res = await updateProduct(productId, payload);
            if (res.success) {
                setModalConfig({
                    visible: true,
                    status: 'success',
                    message: 'Product details updated successfully!',
                });
                // Initial data sync for further edits without reload
                setInitialData(JSON.parse(JSON.stringify(formData)));
            } else {
                setModalConfig({
                    visible: true,
                    status: 'error',
                    message: res.message || 'Failed to update product',
                });
            }
        } catch (err) {
            setModalConfig({
                visible: true,
                status: 'error',
                message: 'Something went wrong while updating.',
            });
        } finally {
            setUpdateLoading(false);
        }
    };

    const updateColorVariant = (id, field, value) => {
        setFormData(prev => ({
            ...prev,
            color_variants: prev.color_variants.map(v => {
                if (v.id === id) {
                    if (typeof field === 'object') {
                        return { ...v, ...field };
                    }
                    return { ...v, [field]: value };
                }
                // If another variant is being set as default, ensure others are not default
                if (field === 'is_default' && value === true) {
                    return { ...v, is_default: false };
                }
                return v;
            }),
        }));
    };

    if (loading) {
        return (
            <View
                style={[
                    styles.screenContainer,
                    { justifyContent: 'center', alignItems: 'center' },
                ]}
            >
                <ActivityIndicator size="large" color="#F83336" />
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.screenContainer}
        >
            <CustomHeader
                variant="internal"
                title="Edit Product"
                onLeftPress={() => navigation.goBack()}
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 16 }}
            >
                <Label text="Product Name" />
                <TextInput
                    style={[
                        styles.addProductInput,
                        errors.name && { borderColor: '#F83336' },
                    ]}
                    placeholder="Enter name"
                    placeholderTextColor="#9E9E9E"
                    value={formData.name}
                    onChangeText={val => setFormData({ ...formData, name: val })}
                />

                <Label text="Product Description" />
                <View
                    style={[
                        styles.addProductDescriptionContainer,
                        errors.description && { borderColor: '#F83336' },
                    ]}
                >
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

                <Label text="Selling Price" />
                <TextInput
                    style={[
                        styles.addProductInput,
                        errors.price && { borderColor: '#F83336' },
                    ]}
                    placeholder="Enter Selling Price"
                    placeholderTextColor="#9E9E9E"
                    keyboardType="numeric"
                    value={formData.price}
                    onChangeText={val => setFormData({ ...formData, price: val })}
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

                <Label text="Stock" />
                <TextInput
                    style={[
                        styles.addProductInput,
                        errors.stock && { borderColor: '#F83336' },
                    ]}
                    placeholder="Enter Stock"
                    placeholderTextColor="#9E9E9E"
                    keyboardType="numeric"
                    value={formData.stock}
                    onChangeText={val => setFormData({ ...formData, stock: val })}
                />

                <Label text="Dimensions" />
                <View style={styles.addProductDimensionRow}>
                    <TextInput
                        style={styles.addProductDimensionInput}
                        placeholder="Length"
                        placeholderTextColor="#9E9E9E"
                        value={formData.dimensions.length?.toString()}
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
                        value={formData.dimensions.width?.toString()}
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
                        value={formData.dimensions.height?.toString()}
                        onChangeText={val =>
                            setFormData({
                                ...formData,
                                dimensions: { ...formData.dimensions, height: val },
                            })
                        }
                    />
                </View>

                {formData.color_variants && formData.color_variants.length > 0 && (
                    <>
                        <Label text="Color Options" />
                        {formData.color_variants.map((variant, index) => (
                            <View
                                key={variant.id}
                                style={[styles.colorOptionCard, { marginBottom: 16 }]}
                            >
                                <Text style={[styles.colorOptionTitle, { marginBottom: 10 }]}>
                                    Variant {index + 1}
                                </Text>

                                <Label text="Select Color" />
                                <ColorSelector
                                    selectedColor={variant.color_code}
                                    onSelect={(colorObj) =>
                                        updateColorVariant(variant.id, colorObj)
                                    }
                                />

                                <View style={{ flexDirection: 'row', gap: 12, marginTop: 10 }}>
                                    <View style={{ flex: 1 }}>
                                        <Label text="Stock" />
                                        <TextInput
                                            style={styles.addProductInput}
                                            placeholder="10"
                                            placeholderTextColor="#9E9E9E"
                                            keyboardType="numeric"
                                            value={variant.stock?.toString()}
                                            onChangeText={val =>
                                                updateColorVariant(variant.id, 'stock', val)
                                            }
                                        />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Label text="Price Adjust" />
                                        <TextInput
                                            style={styles.addProductInput}
                                            placeholder="0"
                                            placeholderTextColor="#9E9E9E"
                                            keyboardType="numeric"
                                            value={variant.price_adjustment?.toString()}
                                            onChangeText={val =>
                                                updateColorVariant(variant.id, 'price_adjustment', val)
                                            }
                                        />
                                    </View>
                                </View>

                                <TouchableOpacity
                                    style={[styles.rememberContainer, { marginTop: 16 }]}
                                    onPress={() =>
                                        updateColorVariant(variant.id, 'is_default', true)
                                    }
                                >
                                    <View
                                        style={[
                                            styles.checkbox,
                                            variant.is_default && styles.checkboxChecked,
                                        ]}
                                    >
                                        {variant.is_default && (
                                            <Text style={{ color: '#FFF' }}>✓</Text>
                                        )}
                                    </View>
                                    <Text style={styles.rememberText}>Set as Default</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </>
                )}

                <GradientButton
                    title={updateLoading ? 'Updating...' : 'Update Product'}
                    onPress={handleUpdate}
                    disabled={updateLoading}
                    style={{
                        marginTop: 24,
                        marginBottom: 40,
                        opacity: updateLoading ? 0.7 : 1,
                    }}
                />
            </ScrollView>

            <StatusModal
                visible={modalConfig.visible}
                status={modalConfig.status}
                message={modalConfig.message}
                onClose={() => {
                    if (modalConfig.status === 'success') {
                        setModalConfig({ ...modalConfig, visible: false });
                        navigation.goBack();
                    } else {
                        setModalConfig({ ...modalConfig, visible: false });
                    }
                }}
            />
        </KeyboardAvoidingView>
    );
};

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
            displayLabel = selectedValue;
        }
    }

    if (displayLabel.includes('Select') && displayLabel !== placeholder) {
        displayLabel = placeholder;
    }

    return (
        <View
            style={[
                styles.pickerContainer,
                !enabled && { opacity: 0.6 },
                hasError && { borderColor: '#F83336' },
            ]}
        >
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

const ColorSelector = ({ selectedColor, onSelect }) => {
    const [customColor, setCustomColor] = useState('');
    const [showCustomInput, setShowCustomInput] = useState(false);

    return (
        <View style={{ marginBottom: 8 }}>
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
                            fontFamily: styles.addProductInput.fontFamily,
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
                        <Text style={{ color: '#FFF', fontFamily: styles.addColorText.fontFamily }}>Apply</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

export default EditProductScreen;
