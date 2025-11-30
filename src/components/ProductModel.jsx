import React from 'react'
import { FiShoppingCart } from 'react-icons/fi';

function ProductModel({show, onClose, product}) {
  // console.log("Product Model:", show, onClose, product);
  return (
    show && <div key={product.name} className="fixed w-full h-full bg-gray-900/50 bg-opacity-35 top-0 left-0 right-0 bottom-0 z-50 overflow-auto" aria-modal="true" role="dialog" tabIndex="-1">
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl font-bold cursor-pointer" aria-label="Close">&times;</button>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <img src={product.featured_image} alt={product.name} className="w-full h-auto object-cover rounded" />
          </div>
          <div className="md:w-1/2 md:pl-6 mt-4 md:mt-0">
            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
            <div className="flex items-center mb-4">
              <p className={product.selling_price ? 'text-red-400 text-xl line-through': 'text-red-600 font-semibold text-xl'}> ${product.price.toFixed(2)} </p>
              <p className="text-gray-600 font-semibold text-xl ml-4">${product.selling_price.toFixed(2)}</p>
            </div>
            <div className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: product.description }}></div>
            <button className="bg-red-600 text-white text-sm font-semibold lex px-4 py-2 rounded hover:bg-gray-500 transition-colors cursor-pointer">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>

    </div>
  )
}

export default ProductModel
