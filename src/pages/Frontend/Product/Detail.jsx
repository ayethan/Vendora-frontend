import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../../../components/ProductCard';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setCart } from '../../../store/userSlice';

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
    <div className="container mx-auto p-4 my-8 bg-white rounded-lg shadow-md">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600 mb-4" aria-label="Breadcrumb">
        <ol className="list-none p-0 inline-flex">
          <li className="flex items-center">
            <Link to="/" className="text-blue-600 hover:text-blue-800">Home</Link>
            <svg className="fill-current w-3 h-3 mx-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.029c9.373 9.372 9.373 24.568.001 33.942z"/></svg>
          </li>
          <li className="flex items-center">
            <Link to="/product" className="text-blue-600 hover:text-blue-800">Products</Link>
            <svg className="fill-current w-3 h-3 mx-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.029c9.373 9.372 9.373 24.568.001 33.942z"/></svg>
          </li>
          <li className="flex items-center text-gray-800">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-x-6">

        <div className="flex flex-col items-center lg:col-span-2">
          <div className="main-image-container w-full max-w-full bg-white rounded-lg overflow-hidden shadow-sm">
            <img
              src={mainImage || product.featured_image}
              alt={product.name}
              className="w-full h-[36rem] sm:h-[44rem] md:h-[56rem] object-contain"
            />
          </div>
          {(product.image && product.image.length > 0) && (
            <div className="thumbnails flex gap-3 mt-4 overflow-x-auto pb-2">
              {product.image.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index}`}
                  className={`w-28 h-28 md:w-32 md:h-32 object-cover rounded-md cursor-pointer border-2 ${mainImage === img ? 'border-blue-500' : 'border-transparent'}`}
                  onClick={() => handleThumbnailClick(img)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="product-info lg:col-span-2 mt-8 lg:mt-0">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">{product.name}</h1>
          {product.brand && (
            <p className="text-lg text-gray-600 mb-4">Brand: <span className="font-semibold">{product.brand}</span></p>
          )}

          <div className="price-section mb-6">
            {product.selling_price ? (
              <>
                <p className="text-2xl text-gray-500 line-through mr-2">${product.selling_price.toFixed(2)}</p>
                <p className="text-4xl font-bold text-red-600">${product.price.toFixed(2)}</p>
              </>
            ) : (
              <p className="text-4xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
            )}
          </div>

          <div className="flex items-center mb-6">
            <label htmlFor="quantity" className="text-lg font-semibold text-gray-700 mr-4">Quantity:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-24 p-2 border border-gray-300 rounded-md text-center text-lg"
            />
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            Add to Cart
          </button>

          {product.stock !== undefined && (
            <p className="text-md text-gray-600 mt-4">
              Availability: <span className={`${product.stock > 0 ? 'text-green-600' : 'text-red-600'} font-semibold`}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </p>
          )}
        </div>
      </div>

      {/* Product Description */}
      <div className="mt-8 border-t border-gray-200 pt-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Product Description</h3>
        <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: product.description }}></div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-8 border-t border-gray-200 pt-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Related Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => (
              <ProductCard key={relatedProduct._id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;