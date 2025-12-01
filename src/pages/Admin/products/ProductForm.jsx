import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import ProductFormLayout from './ProductFormLayout';
import uploadImage from '../../../helpers/uploadImage';

function ProductForm({ product, onSubmit, onClose }) {
  const { register, handleSubmit, reset, control, setValue, watch, formState: { errors } } = useForm();

  const productImages = watch('image', product?.image || []);

  const [openFullScreenImage,setOpenFullScreenImage] = useState(false)
  const [fullScreenImage,setFullScreenImage] = useState("")
  const [isUploadingFeaturedImage, setIsUploadingFeaturedImage] = useState(false); // New state for featured image upload


  useEffect(() => {
    console.log('product', product);
    if (product) {
      reset({
        name: product.name || '',
        featured_image: product.featured_image || '',
        category: product.category || '',
        brand: product.brand || '',
        isActive: product.isActive != null ? String(product.isActive) : 'true',
        description: product.description || '',
        price: product.price || '',
        selling_price: product.selling_price || '',
        stock: product.stock || 0,
        image: product.image || [],
        id: product._id
      });
    }
  }, [product, reset]);

  if (!product) {
    return null;
  }

  const onFormSubmit = (data) => {
    onSubmit(data);
  };
  const handleFeaturedImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploadingFeaturedImage(true);
    try {
      const uploadImageCloudinary = await uploadImage(file);
      setValue('featured_image', uploadImageCloudinary.url, { shouldValidate: true });
    } catch (error) {
      console.error('Error uploading featured image:', error);
      // Handle error (e.g., show a notification)
    } finally {
      setIsUploadingFeaturedImage(false);
    }
  }

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadImageCloudinary = await uploadImage(file);
    const currentImages = watch('image') || [];
    setValue('image', [...currentImages, uploadImageCloudinary.url], { shouldValidate: true });
  }

  const isSaveButtonDisabled = isUploadingFeaturedImage;


  return (
    <ProductFormLayout
      product={product}
      onClose={onClose}
      handleSubmit={handleSubmit}
      onFormSubmit={onFormSubmit}
      register={register}
      errors={errors}
      control={control}
      setValue={setValue}
      watch={watch}
      handleFeaturedImageUpload={handleFeaturedImageUpload}
      handleUploadProduct={handleUploadProduct}
      isUploadingFeaturedImage={isUploadingFeaturedImage}
      isSaveButtonDisabled={isSaveButtonDisabled}
      productImages={productImages}
      setOpenFullScreenImage={setOpenFullScreenImage}
      setFullScreenImage={setFullScreenImage}
      openFullScreenImage={openFullScreenImage}
      fullScreenImage={fullScreenImage}
    />
  );
}

export default ProductForm;
