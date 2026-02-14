import React, { createContext, useState, useContext } from 'react';
import apiService from '../api/apiService';

const ProductContext = createContext();

export const useProduct = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.get(
        'provider/getAllCategoriesForProvider',
      );
      if (response.data.success) {
        setCategories(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubCategories = async categoryId => {
    setLoading(true);
    setError(null);
    setSubCategories([]); // Clear previous subcategories
    try {
      const response = await apiService.get(
        `provider/getAllSubCategoriesByIdForProvider/${categoryId}`,
      );
      if (response.data.success) {
        setSubCategories(response.data.data);
      } else {
        setSubCategories([]);
      }
    } catch (err) {
      console.error('Error fetching subcategories:', err);
      setSubCategories([]);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async payload => {
    setCreateLoading(true);
    setError(null);
    try {
      const formData = new FormData();

      // Basic fields
      Object.keys(payload).forEach(key => {
        const val = payload[key];
        if (
          val !== null &&
          val !== undefined &&
          key !== 'main_image' &&
          key !== 'main_extra_images' &&
          !key.startsWith('color_variant_') &&
          key !== 'color_variants' &&
          key !== 'dimensions'
        ) {
          formData.append(key, val);
        }
      });

      // Dimensions -> send as dimensions_json for backend parsing logic
      if (payload.dimensions) {
        formData.append('dimensions_json', JSON.stringify(payload.dimensions));
        // Also send as dimensions just in case, but dimensions_json takes precedence in backend
        formData.append('dimensions', JSON.stringify(payload.dimensions));
      }

      // Color Variants Metadata
      if (payload.color_variants && payload.color_variants.length > 0) {
        formData.append('color_variants', JSON.stringify(payload.color_variants));
      }

      // Main Image
      if (payload.main_image) {
        formData.append('main_image', {
          uri: payload.main_image.uri,
          type: payload.main_image.type || 'image/jpeg',
          name: payload.main_image.name || 'main_image.jpg',
        });
      }

      // Main Extra Images (Gallery)
      if (payload.main_extra_images && payload.main_extra_images.length > 0) {
        payload.main_extra_images.forEach((img, index) => {
          formData.append(`main_extra_images`, {
            uri: img.uri,
            type: img.type || 'image/jpeg',
            name: img.name || `extra_${index}.jpg`,
          });
        });
      }

      // Color Variant Images
      // In backend, it looks for color_variant_0, color_variant_1, etc.
      Object.keys(payload).forEach(key => {
        if (key.startsWith('color_variant_')) {
          const images = payload[key];
          if (Array.isArray(images)) {
            images.forEach((img, index) => {
              formData.append(key, {
                uri: img.uri,
                type: img.type || 'image/jpeg',
                name: img.name || `${key}_${index}.jpg`,
              });
            });
          }
        }
      });

      const response = await apiService.post('provider/createProduct', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (err) {
      console.error('Error creating product:', err.response?.data || err.message);
      setError(err);
      throw err;
    } finally {
      setCreateLoading(false);
    }
  };

  const value = {
    categories,
    subCategories,
    loading,
    error,
    fetchCategories,
    fetchSubCategories,
    createProduct,
    createLoading,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export default ProductContext;
