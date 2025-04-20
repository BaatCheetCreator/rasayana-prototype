import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Check, Calendar } from 'lucide-react';

// Subscription component
const Subscription = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('weekly');
  const [mealPreference, setMealPreference] = useState('with');
  const [selectedMeals, setSelectedMeals] = useState({
    breakfast: true,
    lunch: true,
    dinner: false,
  });

  const plans = [
    {
      id: 'weekly',
      name: 'Weekly Plan',
      duration: '7 days',
      price: 1499,
      originalPrice: 1750,
      discount: '14%',
      features: [
        'Freshly prepared meals',
        'Nutritionally balanced',
        'Free delivery',
        'Weekly menu rotation',
      ],
    },
    {
      id: 'monthly',
      name: 'Monthly Plan',
      duration: '30 days',
      price: 5499,
      originalPrice: 7500,
      discount: '27%',
      features: [
        'Freshly prepared meals',
        'Nutritionally balanced',
        'Free delivery',
        'Weekly menu rotation',
        'Free nutritionist consultation',
        'Custom meal planning',
      ],
    },
  ];

  const mealPricing = {
    breakfast: { with: 120, without: 130 },
    lunch: { with: 180, without: 200 },
    dinner: { with: 180, without: 200 },
  };

  const mealTypes = [
    { id: 'breakfast', name: 'Breakfast', icon: '🍳' },
    { id: 'lunch', name: 'Lunch', icon: '🍲' },
    { id: 'dinner', name: 'Dinner', icon: '🍽️' },
  ];

  const calculateTotalMeals = () => {
    const days = selectedPlan === 'weekly' ? 7 : 30;
    let count = 0;
    if (selectedMeals.breakfast) count += days;
    if (selectedMeals.lunch) count += days;
    if (selectedMeals.dinner) count += days;
    return count;
  };

  const calculateTotalPrice = () => {
    const days = selectedPlan === 'weekly' ? 7 : 30;
    let price = 0;

    if (selectedMeals.breakfast) {
      price += days * mealPricing.breakfast[mealPreference];
    }
    if (selectedMeals.lunch) {
      price += days * mealPricing.lunch[mealPreference];
    }
    if (selectedMeals.dinner) {
      price += days * mealPricing.dinner[mealPreference];
    }

    // Apply subscription discount
    const discount = selectedPlan === 'weekly' ? 0.86 : 0.73; // 14% or 27% discount
    return Math.round(price * discount);
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="bg-emerald-700 text-white p-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center">
          <button className="mr-2" onClick={() => navigate('/')}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-bold text-lg">Subscription Plans</h1>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-600 text-white p-6">
        <h2 className="text-2xl font-bold">Diabetes-Friendly Meal Plans</h2>
        <p className="mt-2">Subscribe to regular, nutritionally balanced meals delivered fresh to your doorstep</p>
        <div className="flex items-center mt-4 bg-white bg-opacity-20 p-2 rounded-lg">
          <Calendar className="mr-2 w-5 h-5" />
          <span>Up to 27% savings on subscription plans</span>
        </div>
      </div>

      {/* Plan Selection */}
      <div className="bg-white p-4 shadow-sm">
        <h2 className="font-bold text-gray-700 mb-3">Select Your Plan</h2>
        <div className="grid grid-cols-2 gap-3">
          {plans.map(plan => (
            <div
              key={plan.id}
              className={`p-4 rounded-lg border cursor-pointer ${
                selectedPlan === plan.id ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'
              }`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              <div className="flex flex-col h-full">
                <h3 className="font-bold text-lg">{plan.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{plan.duration}</p>
                <div className="flex items-center mb-3">
                  <span className="font-bold text-xl">₹{plan.price}</span>
                  <span className="text-sm text-gray-500 line-through ml-2">₹{plan.originalPrice}</span>
                  <span className="ml-2 text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                    Save {plan.discount}
                  </span>
                </div>
                <div className="text-sm mb-3 flex-grow">
                  <ul className="space-y-1">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="text-emerald-500 mr-1 flex-shrink-0 mt-0.5 w-4 h-4" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border self-center mt-2 flex items-center justify-center ${
                    selectedPlan === plan.id ? 'border-emerald-500 bg-emerald-500' : 'border-gray-300'
                  }`}
                >
                  {selectedPlan === plan.id && <Check className="w-3 h-3 text-white" />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Meal Preference */}
      <div className="bg-white p-4 mt-2 shadow-sm">
        <h2 className="font-bold text-gray-700 mb-3">Meal Preference</h2>
        <div className="grid grid-cols-2 gap-3">
          <div
            className={`p-3 rounded-lg border cursor-pointer ${
              mealPreference === 'with' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'
            }`}
            onClick={() => setMealPreference('with')}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">With Onion & Garlic</h3>
                <p className="text-xs text-gray-500 mt-1">Regular menu</p>
              </div>
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  mealPreference === 'with' ? 'border-emerald-500 bg-emerald-500' : 'border-gray-300'
                }`}
              >
                {mealPreference === 'with' && <Check className="w-3 h-3 text-white" />}
              </div>
            </div>
          </div>
          <div
            className={`p-3 rounded-lg border cursor-pointer ${
              mealPreference === 'without' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'
            }`}
            onClick={() => setMealPreference('without')}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Without Onion & Garlic</h3>
                <p className="text-xs text-gray-500 mt-1">Sattvic menu</p>
              </div>
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  mealPreference === 'without' ? 'border-emerald-500 bg-emerald-500' : 'border-gray-300'
                }`}
              >
                {mealPreference === 'without' && <Check className="w-3 h-3 text-white" />}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Meal Selection */}
      <div className="bg-white p-4 mt-2 shadow-sm">
        <h2 className="font-bold text-gray-700 mb-3">Select Meals</h2>
        <div className="space-y-3">
          {mealTypes.map(meal => (
            <div
              key={meal.id}
              className={`p-3 rounded-lg border cursor-pointer ${
                selectedMeals[meal.id] ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'
              }`}
              onClick={() => setSelectedMeals({ ...selectedMeals, [meal.id]: !selectedMeals[meal.id] })}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{meal.icon}</span>
                  <div>
                    <h3 className="font-medium">{meal.name}</h3>
                    <p className="text-sm text-gray-500">₹{mealPricing[meal.id][mealPreference]} per meal</p>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded border flex items-center justify-center ${
                    selectedMeals[meal.id] ? 'border-emerald-500 bg-emerald-500' : 'border-gray-300'
                  }`}
                >
                  {selectedMeals[meal.id] && <Check className="w-3 h-3 text-white" />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sample Menu */}
      <div className="bg-white p-4 mt-2 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold text-gray-700">Sample Menu</h2>
          <button className="text-emerald-600 text-sm font-medium">View Full Menu</button>
        </div>
        <div className="space-y-4">
          {selectedMeals.breakfast && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Breakfast Options</h3>
              <div className="flex overflow-x-auto pb-2 gap-3">
                {[
                  {
                    src: './images/ragi_chilla_sample.jpg',
                    alt: 'Ragi Chilla',
                    name: 'Ragi Vegetable Chilla',
                    gi: 'Low',
                    calories: 320,
                  },
                  {
                    src: './images/oats_idli_sample.jpg',
                    alt: 'Oats Idli',
                    name: 'Oats Idli',
                    gi: 'Low',
                    calories: 150,
                  },
                  {
                    src: './images/jowar_upma_sample.jpg',
                    alt: 'Jowar Upma',
                    name: 'Jowar Vegetable Upma',
                    gi: 'Low',
                    calories: 200,
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-44 bg-gray-50 rounded-lg overflow-hidden border border-gray-100"
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-24 object-cover"
                      onError={(e) =>
                        (e.target.src = `https://via.placeholder.com/176x100?text=${item.alt.replace(' ', '+')}`)
                      }
                    />
                    <div className="p-2">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-green-700">GI: {item.gi}</span>
                        <span className="text-xs text-blue-700">Cal: {item.calories}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {selectedMeals.lunch && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Lunch Options</h3>
              <div className="flex overflow-x-auto pb-2 gap-3">
                {[
                  {
                    src: './images/bajra_thali.jpg',
                    alt: 'Bajra Thali',
                    name: 'Bajra Roti Thali',
                    gi: 'Low',
                    calories: 450,
                  },
                  {
                    src: './images/dal_khichdi.jpg',
                    alt: 'Dal Khichdi',
                    name: 'Mixed Dal Khichdi',
                    gi: 'Medium',
                    calories: 380,
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-44 bg-gray-50 rounded-lg overflow-hidden border border-gray-100"
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-24 object-cover"
                      onError={(e) =>
                        (e.target.src = `https://via.placeholder.com/176x100?text=${item.alt.replace(' ', '+')}`)
                      }
                    />
                    <div className="p-2">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-green-700">GI: {item.gi}</span>
                        <span className="text-xs text-blue-700">Cal: {item.calories}</span>
                      </div>
                    </div>
                  </div>
                  ))}
                </div>
              </div>
            )}
            {selectedMeals.dinner && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Dinner Options</h3>
                <div className="flex overflow-x-auto pb-2 gap-3">
                  {[
                    {
                      src: './images/veg_thali.jpg',
                      alt: 'Veg Thali',
                      name: 'Vegetable Thali',
                      gi: 'Low',
                      calories: 400,
                    },
                    {
                      src: './images/quinoa_salad.jpg',
                      alt: 'Quinoa Salad',
                      name: 'Quinoa Veggie Salad',
                      gi: 'Low',
                      calories: 350,
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 w-44 bg-gray-50 rounded-lg overflow-hidden border border-gray-100"
                    >
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="w-full h-24 object-cover"
                        onError={(e) =>
                          (e.target.src = `https://via.placeholder.com/176x100?text=${item.alt.replace(' ', '+')}`)
                        }
                      />
                      <div className="p-2">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs text-green-700">GI: {item.gi}</span>
                          <span className="text-xs text-blue-700">Cal: {item.calories}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

      {/* Subscription Summary */}
      <div className="bg-white p-4 mt-2 shadow-sm">
        <h2 className="font-bold text-gray-700 mb-3">Subscription Summary</h2>
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Plan Type</span>
            <span className="font-medium">{selectedPlan === 'weekly' ? 'Weekly Plan' : 'Monthly Plan'}</span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-gray-600">Meal Preference</span>
            <span className="font-medium">
              {mealPreference === 'with' ? 'With Onion & Garlic' : 'Without Onion & Garlic'}
            </span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-gray-600">Selected Meals</span>
            <span className="font-medium">
              {Object.entries(selectedMeals)
                .filter(([_, selected]) => selected)
                .map(([meal]) => meal.charAt(0).toUpperCase() + meal.slice(1))
                .join(', ') || 'None'}
            </span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-gray-600">Total Meals</span>
            <span className="font-medium">{calculateTotalMeals()} meals</span>
          </div>
          <div className="border-t border-gray-200 mt-3 pt-3">
            <div className="flex justify-between items-center">
              <span className="font-bold">Total Amount</span>
              <span className="font-bold">₹{calculateTotalPrice()}</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {selectedPlan === 'weekly' ? '14%' : '27%'} discount applied
            </div>
          </div>
        </div>
      </div>

      {/* Subscribe Button */}
      <div className="sticky bottom-0 p-4 bg-white border-t border-gray-200 mt-auto">
        <button
          className="w-full bg-emerald-600 text-white rounded-lg py-3 font-medium flex items-center justify-center"
          onClick={() => navigate('/checkout')}
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Subscribe Now - ₹{calculateTotalPrice()}
        </button>
        <p className="text-center text-xs text-gray-500 mt-2">
          Your subscription will start within 24 hours of payment
        </p>
      </div>
    </div>
  );
};

export default Subscription;