import { CardElement, PaymentRequestButtonElement } from '@stripe/react-stripe-js'
import React from 'react'

function CheckoutPage({
  user,
  cart,
  paymentRequest,
  stripe,
  loading,
  handleSubmit

}) {

  return (
    <div className="checkout-page">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Checkout</h1>

      <div className="container mx-auto max-w-screen-xl p-4 md:flex md:space-x-8">
        {/* Left Column: User Information */}
        <div className="md:w-3/5 mb-8 md:mb-0">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-gray-700">Shipping Information</h2>
            {user && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="userName" className="block text-gray-700 text-sm font-medium mb-1">Name:</label>
                  <input
                    id="userName"
                    type="text"
                    value={user.name || ''}
                    readOnly
                    className="p-3 border border-gray-300 rounded-md bg-gray-100 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out"
                  />
                </div>
                <div>
                  <label htmlFor="userEmail" className="block text-gray-700 text-sm font-medium mb-1">Email:</label>
                  <input
                    id="userEmail"
                    type="text"
                    value={user.email || ''}
                    readOnly
                    className="p-3 border border-gray-300 rounded-md bg-gray-100 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out"
                  />
                </div>
                <div>
                  <label htmlFor="userAddress" className="block text-gray-700 text-sm font-medium mb-1">Address:</label>
                  <input
                    id="userAddress"
                    type="text"
                    value={user.address || ''}
                    readOnly
                    className="p-3 border border-gray-300 rounded-md bg-gray-100 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out"
                  />
                </div>
                <div>
                  <label htmlFor="userCity" className="block text-gray-700 text-sm font-medium mb-1">City:</label>
                  <input
                    id="userCity"
                    type="text"
                    value={user.city || ''}
                    readOnly
                    className="p-3 border border-gray-300 rounded-md bg-gray-100 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out"
                  />
                </div>
                <div>
                  <label htmlFor="userCountry" className="block text-gray-700 text-sm font-medium mb-1">Country:</label>
                  <input
                    id="userCountry"
                    type="text"
                    value={user.country || ''}
                    readOnly
                    className="p-3 border border-gray-300 rounded-md bg-gray-100 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out"
                  />
                </div>
                <div>
                  <label htmlFor="userPhone" className="block text-gray-700 text-sm font-medium mb-1">Phone:</label>
                  <input
                    id="userPhone"
                    type="text"
                    value={user.phone || ''}
                    readOnly
                    className="p-3 border border-gray-300 rounded-md bg-gray-100 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out"
                  />
                </div>
              </div>
            )}
            {!user && <p className="text-gray-600">Please sign in to view your shipping information.</p>}
          </div>
        </div>

        {/* Right Column: Order Summary and Payment */}
        <div className="md:w-2/5">
          {/* Order Summary */}
          <div className="bg-white p-8 rounded-lg shadow-lg mb-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-700">Order Summary</h2>
            {cart && cart.items && cart.items.length > 0 ? (
              <div>
                {cart.items.map((item) => (
                  <div key={item.productId._id} className="flex justify-between items-center mb-3 pb-2 border-b border-gray-200 last:border-b-0 last:pb-0">
                    <span className="text-gray-800">{item.productId.name} (x{item.quantity})</span>
                    <span className="text-gray-800 font-medium">${(item.productId?.selling_price || item.productId?.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t border-gray-300 pt-4 mt-4 flex justify-between font-bold text-xl text-gray-800">
                  <span>Total:</span>
                  <span>${cart.total ? cart.total.toFixed(2) : '0.00'}</span>
                </div>
              </div>
            ) : (
              <p className="text-gray-600">Your cart is empty.</p>
            )}
          </div>

          {/* Digital Wallets */}
          {paymentRequest && (
            <div className="bg-white p-8 rounded-lg shadow-lg mb-6">
              <h2 className="text-2xl font-semibold mb-6 text-gray-700 text-center bg-blue-600 text-white p-3 rounded-md">Pay with Digital Wallets</h2>
              <div className="my-4">
                <PaymentRequestButtonElement options={{ paymentRequest }} className="StripeElement" />
              </div>
            </div>
          )}

          {/* Card Payment Form */}
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg mb-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-700">Card Payment</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="card-element">
                Credit or debit card
              </label>
              <div className="border border-gray-300 p-3 rounded-md">
                <CardElement id="card-element" className="w-full" />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:shadow-outline transition-all duration-200 ease-in-out"
              disabled={!stripe || loading}
            >
              {loading ? 'Processing...' : 'Pay Now'}
            </button>
          </form>
        </div>
      </div>

      <p className="mt-4 text-center">This is the checkout page content.</p>
    </div>
  )
}

export default CheckoutPage
