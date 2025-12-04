import React, { useState, useEffect } from 'react';
import ProductCard from '../../../../components/ProductCard';
import axios from 'axios';

const FeaturedProducts = () => {
  const [productsData, setProductsData] = useState([]);
  useEffect(() => {
      axios.get('/featured-products')
        .then(response => {
          setProductsData(response.data);
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });

      // setProductsData(productsData);
    }, []);

    return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Featured Products</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
        {productsData.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
    )
  };

export default FeaturedProducts;