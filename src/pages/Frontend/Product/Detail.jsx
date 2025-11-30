import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/product/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="text-center py-8">Loading product details...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error.message}</div>;
  }

  if (!product) {
    return <div className="text-center py-8">Product not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <img src={product.featured_image} alt={product.name} className="w-1/2 h-auto object-cover mb-4" />
      <p className="text-xl text-gray-800 mb-2">${product.price.toFixed(2)}</p>
      {product.selling_price && (
        <p className="text-lg text-red-500 line-through mb-2">${product.selling_price.toFixed(2)}</p>
      )}
      <p className="text-gray-700">{product.description}</p>
      {/* Add more product details here */}
    </div>
  );
}

export default ProductDetail;
