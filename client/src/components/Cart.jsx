import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, Check, MapPin, CreditCard } from 'lucide-react';

// Cart component
const Cart = () => {
  const navigate = useNavigate();
  const [deliveryOption, setDeliveryOption] = useState('delivery');
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Ragi Vegetable Chilla',
      qty: 2,
      price: 120,
      calories: 320,
      glycemicIndex: 'Low',
      image: './images/ragi_chilla_small.jpg',
    },
    {
      id: 2,
      name: 'Mint Chutney',
      qty: 1,
      price: 30,
      calories: 30,
      glycemicIndex: 'Low',
      image: './images/mint_chutney_small.jpg',
    },
    {
      id: 3,
      name: 'Amla-Ginger Immunity Booster',
      qty: 1,
      price: 60,
      calories: 75,
      glycemicIndex: 'Low',
      image: './images/amla_ginger_small.jpg',
    },
  ]);

  const updateQuantity = (id, change) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + change) } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const deliveryFee = deliveryOption === 'delivery' ? 40 : 0;
  const packagingFee = 20;
  const taxes = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + packagingFee + taxes;

  const totalCalories = cartItems.reduce((sum, item) => sum + item.calories * item.qty, 0);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="bg-emerald-700 text-white p-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center">
          <button className="mr-2" onClick={() => navigate('/')}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-bold text-lg">Your Cart</h1>
        </div>
        <div className="text-sm">
          {cartItems.reduce((sum, item) => sum + item.qty, 0)} Items
        </div>
      </header>

      {/* Empty Cart State */}
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-grow p-4 text-center">
          <h2 className="text-xl font-bold text-gray-700 mb-2">Your Cart is Empty</h2>
          <p className="text-gray-500 mb-4">Add some delicious meals to get started!</p>
          <button
            className="bg-emerald-600 text-white rounded-lg px-6 py-3 font-medium"
            onClick={() => navigate('/')}
          >
            Browse Menu
          </button>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="bg-white p-4 shadow-sm">
            <h2 className="font-bold text-gray-700 mb-3">Order Summary</h2>
            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center border-b border-gray-100 pb-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                    onError={(e) =>
                      (e.target.src = `https://via.placeholder.com/80x80?text=${encodeURIComponent(
                        item.name
                      )}`)
                    }
                  />
                  <div className="ml-3 flex-grow">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{item.name}</h3>
                      <button
                        className="text-red-600 text-xs"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                        {item.calories} Cal
                      </span>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                        GI: {item.glycemicIndex}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-bold">₹{item.price * item.qty}</span>
                      <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                        <button
                          className="px-2 py-1 bg-gray-100 text-gray-600"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <div className="px-3 py-1 bg-white text-sm">{item.qty}</div>
                        <button
                          className="px-2 py-1 bg-gray-100 text-gray-600"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Nutrition Summary */}
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-2">Nutrition Summary</h3>
              <div className="flex items-center">
                <div className="mr-3">
                  <span className="text-sm font-medium">Total Calories:</span>
                </div>
                <div className="px-2 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                  {totalCalories} Cal
                </div>
                <div className="ml-auto px-2 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                  Diabetes-Friendly
                </div>
              </div>
            </div>
          </div>

          {/* Coupon Code */}
          <div className="bg-white p-4 mt-2 shadow-sm">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Enter promo code"
                className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button className="bg-emerald-600 text-white px-4 py-2 rounded-r-lg">
                Apply
              </button>
            </div>
          </div>

          {/* Delivery Options */}
          <div className="bg-white p-4 mt-2 shadow-sm">
            <h2 className="font-bold text-gray-700 mb-3">Delivery Options</h2>
            <div className="space-y-3">
              <div
                className={`p-3 rounded-lg border cursor-pointer ${
                  deliveryOption === 'delivery' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'
                }`}
                onClick={() => setDeliveryOption('delivery')}
              >
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                      deliveryOption === 'delivery' ? 'border-emerald-500 bg-emerald-500' : 'border-gray-300'
                    }`}
                  >
                    {deliveryOption === 'delivery' && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium">Home Delivery</h3>
                    <p className="text-sm text-gray-500">Deliver to your doorstep</p>
                  </div>
                  <div className="text-right">
                    <span className="font-medium">₹40</span>
                    <p className="text-xs text-gray-500">30-40 min</p>
                  </div>
                </div>
              </div>
              <div
                className={`p-3 rounded-lg border cursor-pointer ${
                  deliveryOption === 'pickup' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'
                }`}
                onClick={() => setDeliveryOption('pickup')}
              >
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                      deliveryOption === 'pickup' ? 'border-emerald-500 bg-emerald-500' : 'border-gray-300'
                    }`}
                  >
                    {deliveryOption === 'pickup' && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium">Self Pickup</h3>
                    <p className="text-sm text-gray-500">Pickup from our outlet</p>
                  </div>
                  <div className="text-right">
                    <span className="font-medium">Free</span>
                    <p className="text-xs text-gray-500">15-20 min</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Delivery Address */}
            {deliveryOption === 'delivery' && (
              <div className="mt-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Delivery Address</h3>
                  <button className="text-emerald-600 text-sm font-medium">Change</button>
                </div>
                <div className="mt-2 p-3 bg-gray-50 rounded-lg flex items-start">
                  <MapPin className="text-emerald-600 mr-2 flex-shrink-0 mt-1 w-5 h-5" />
                  <div>
                    <h4 className="font-medium">Home</h4>
                    <p className="text-sm text-gray-600">
                      123 Park Street, Ballygunge, Kolkata - 700019
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Payment Method */}
          <div className="bg-white p-4 mt-2 shadow-sm">
            <h2 className="font-bold text-gray-700 mb-3">Payment Method</h2>
            <div className="space-y-3">
              <div
                className={`p-3 rounded-lg border cursor-pointer ${
                  paymentMethod === 'online' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'
                }`}
                onClick={() => setPaymentMethod('online')}
              >
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                      paymentMethod === 'online' ? 'border-emerald-500 bg-emerald-500' : 'border-gray-300'
                    }`}
                  >
                    {paymentMethod === 'online' && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium">Online Payment</h3>
                    <p className="text-sm text-gray-500">UPI, Cards, Netbanking</p>
                  </div>
                  <CreditCard className="text-gray-400 w-5 h-5" />
                </div>
              </div>
              <div
                className={`p-3 rounded-lg border cursor-pointer ${
                  paymentMethod === 'cod' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'
                }`}
                onClick={() => setPaymentMethod('cod')}
              >
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                      paymentMethod === 'cod' ? 'border-emerald-500 bg-emerald-500' : 'border-gray-300'
                    }`}
                  >
                    {paymentMethod === 'cod' && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium">Cash on Delivery</h3>
                    <p className="text-sm text-gray-500">Pay when your order arrives</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white p-4 mt-2 shadow-sm">
            <h2 className="font-bold text-gray-700 mb-3">Bill Details</h2>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Item Total</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Delivery Fee</span>
                <span>{deliveryFee === 0 ? 'Free' : `₹${deliveryFee}`}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Packaging Fee</span>
                <span>₹{packagingFee}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Taxes (5%)</span>
                <span>₹{taxes}</span>
              </div>
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="flex justify-between items-center font-bold">
                  <span>Grand Total</span>
                  <span>₹{total}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Place Order Button */}
          <div className="sticky bottom-0 p-4 bg-white border-t border-gray-200 mt-4">
            <div className="flex justify-between items-center mb-3">
              <div>
                <p className="text-gray-600">Total Amount</p>
                <p className="font-bold text-lg">₹{total}</p>
              </div>
              <button
                className="bg-emerald-600 text-white rounded-lg px-6 py-3 font-medium"
                onClick={() => navigate('/checkout')}
              >
                Place Order
              </button>
            </div>
            <p className="text-xs text-center text-gray-500">
              By placing your order, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;