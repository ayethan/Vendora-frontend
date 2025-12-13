import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../../../components/ProductCard';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setCart } from '../../../store/userSlice.ts';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/product/${id}`);
        setProduct(response.data);

        if (response.data.image && response.data.image.length > 0) {
          setMainImage(response.data.image[0]);
        } else if (response.data.featured_image) {
          setMainImage(response.data.featured_image);
        }

        // Fetch related products
        if (response.data.category && response.data._id) {
          const relatedResponse = await axios.get(`/product/related/${response.data.category}/${response.data._id}`);
          setRelatedProducts(relatedResponse.data || []);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please login to add items to your cart.");
      navigate('/signin');
      return;
    }
    try {
      const response = await axios.post('/cart/add', {
        productId: product._id,
        quantity: quantity,
      });
      if (response.data && response.data.success) {
        toast.success(response.data.message || 'Added to cart');
        dispatch(setCart(response.data.cart));
      } else {
        toast.error(response.data.message || 'Failed to add to cart.');
      }
    } catch (err) {
      toast.error("Failed to add to cart.");
      console.error(err);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><div className="text-xl font-semibold">Loading product details...</div></div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen"><div className="text-xl font-semibold text-red-500">Error: {error.message}</div></div>;
  }

  if (!product) {
    return <div className="flex justify-center items-center h-screen"><div className="text-xl font-semibold">Product not found.</div></div>;
  }

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-6" aria-label="Breadcrumb">
          <ol className="list-none p-0 inline-flex items-center space-x-2">
            <li>
              <Link to="/" className="text-blue-600 hover:text-blue-800 transition-colors">Home</Link>
            </li>
            <li><span className="mx-2">/</span></li>
            <li>
              <Link to="/product" className="text-blue-600 hover:text-blue-800 transition-colors">Products</Link>
            </li>
            <li><span className="mx-2">/</span></li>
            <li className="text-gray-500" aria-current="page">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

            {/* Image Gallery */}
            <div className="flex flex-col gap-4">
              <div className="aspect-w-1 aspect-h-1 w-full bg-gray-100 rounded-xl overflow-hidden shadow-inner">
                <img
                  src={mainImage || product.featured_image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
              {(product.image && product.image.length > 1) && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {product.image.map((img, index) => (
                    <div
                      key={index}
                      className={`flex-shrink-0 w-24 h-24 rounded-lg cursor-pointer overflow-hidden border-2 transition-all ${mainImage === img ? 'border-blue-500 scale-105' : 'border-transparent hover:border-gray-300'}`}
                      onClick={() => handleThumbnailClick(img)}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{product.name}</h1>
              {product.brand && (
                <p className="text-md text-gray-500 mb-4">Brand: <span className="font-medium text-gray-700">{product.brand}</span></p>
              )}

              <div className="flex items-center mb-5">
                {/* Placeholder for ratings */}
                <div className="flex items-center">
                  <span className="text-yellow-500 text-lg">★★★★☆</span>
                  <span className="ml-2 text-sm text-gray-500">(Based on 25 reviews)</span>
                </div>
              </div>

              <div className="price-section mb-6 flex items-baseline gap-3">
                {product.selling_price && product.selling_price > product.price ? (
                  <>
                    <p className="text-2xl text-gray-400 line-through">${product.selling_price.toFixed(2)}</p>
                    <p className="text-4xl font-extrabold text-red-600">${product.price.toFixed(2)}</p>
                  </>
                ) : (
                  <p className="text-4xl font-extrabold text-gray-900">${product.price.toFixed(2)}</p>
                )}
              </div>

              {product.stock !== undefined && (
                <p className="text-sm font-medium text-gray-600 mb-6">
                  Availability: <span className={`${product.stock > 0 ? 'text-green-600' : 'text-red-600'} font-semibold`}>
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </span>
                </p>
              )}

              <div className="flex items-center gap-4 mb-6">
                <label htmlFor="quantity" className="text-md font-medium text-gray-700">Quantity:</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-24 p-2 border-gray-300 border rounded-lg text-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
              >
                Add to Cart
              </button>

            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-10 bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Product Description</h3>
          <div className="prose max-w-none text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: product.description }}></div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related Products</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => (
                <ProductCard key={relatedProduct._id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;