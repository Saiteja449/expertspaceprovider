import React, { createContext, useState, useContext } from 'react';
import apiService from '../api/apiService';

const ProductContext = createContext();

export const useProduct = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [childSubCategories, setChildSubCategories] = useState([]);
  const [products, setProducts] = useState([]);
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
    setSubCategories([]);
    setChildSubCategories([]);
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

  const fetchChildSubCategories = async (categoryId, subCategoryId) => {
    setLoading(true);
    setError(null);
    setChildSubCategories([]);
    try {
      const response = await apiService.get(
        `provider/getAllChildSubCategoriesForProvider/${categoryId}/${subCategoryId}`,
      );
      if (response.data.success) {
        setChildSubCategories(response.data.data);
      } else {
        setChildSubCategories([]);
      }
    } catch (err) {
      console.error('Error fetching child subcategories:', err);
      setChildSubCategories([]);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.get('provider/getProducts');
      if (response.data.success === true) {
        setProducts(response.data.data);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const getProductById = async productId => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.get(`provider/getProductById/${productId}`);
      if (response.data.success === true) {
        return response.data.data;
      }
      return null;
    } catch (err) {
      console.error('Error fetching product by ID:', err);
      setError(err);
      return null;
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

  const deleteProductImage = async imageId => {
    setLoading(true);
    setError(null);
    console.log('Deleting product image:', imageId);
    try {
      const response = await apiService.delete(`provider/deleteProductImageById`, {
        image_id: imageId,
      });
      return response.data;
    } catch (err) {
      console.error('Error deleting product image:', err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (productId, payload) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.put(`provider/updateProduct/${productId}`, payload);
      return response.data;
    } catch (err) {
      console.error('Error updating product:', err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addProductImages = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('image_type', payload.image_type);

      if (payload.product_id) {
        formData.append('product_id', payload.product_id);
      }
      if (payload.color_variant_id) {
        formData.append('color_variant_id', payload.color_variant_id);
      }

      if (payload.images && payload.images.length > 0) {
        payload.images.forEach((img, index) => {
          formData.append('images', {
            uri: img.uri,
            type: img.type || 'image/jpeg',
            name: img.name || `image_${index}.jpg`,
          });
        });
      }

      const response = await apiService.post('provider/addProductImages', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (err) {
      console.error('Error adding product images:', err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    categories,
    subCategories,
    childSubCategories,
    loading,
    error,
    fetchCategories,
    fetchSubCategories,
    fetchChildSubCategories,
    createProduct,
    createLoading,
    products,
    fetchProducts,
    getProductById,
    deleteProductImage,
    addProductImages,
    updateProduct,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export default ProductContext;
