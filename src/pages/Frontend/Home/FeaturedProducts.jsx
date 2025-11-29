import React from 'react';
import ProductCard from '../../../components/ProductCard';

const productsData = Array.from({ length: 12 }).map((_, index) => ({
    id: index,
    name: `Product ${index + 1}`,
    price: (index + 1) * 11,
    selling_price: (index + 1) * 10,
    image: `/img/steven-lozano-m56XrhM9a_4-unsplash.jpg`,
    description: `This is a brief description of Product ${index + 1}. It is a high-quality item that meets your needs and expectations.
    This product is designed with care and precision to ensure customer satisfaction. Thank you for considering Product ${index + 1} for your purchase!`,
}));

const FeaturedProducts = () => (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Featured Products</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
        {productsData.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
);

export default FeaturedProducts;