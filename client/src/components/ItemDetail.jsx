import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Minus, Plus, ChevronUp, ChevronDown } from 'lucide-react';

// ItemDetail component
const ItemDetail = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [nutritionExpanded, setNutritionExpanded] = useState(false);
  const [ingredientsExpanded, setIngredientsExpanded] = useState(false);
  const [accompanimentExpanded, setAccompanimentExpanded] = useState(true);

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="bg-emerald-700 text-white p-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center">
          <button className="mr-2" onClick={() => navigate('/')}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-bold text-lg">Item Details</h1>
        </div>
        <div>
          <button className="relative" onClick={() => navigate('/cart')}>
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              2
            </span>
          </button>
        </div>
      </header>

      {/* Product Image */}
      <div className="relative">
        <img
          src="./images/ragi_chilla_large.jpg"
          alt="Ragi Vegetable Chilla"
          className="w-full h-64 object-cover"
          onError={(e) => (e.target.src = 'https://via.placeholder.com/400x300?text=Ragi+Chilla')}
        />
        <div className="absolute top-4 left-4 bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
          GI: Low
        </div>
        <div className="absolute top-4 right-4 bg-amber-100 text-amber-800 px-2 py-1 rounded text-sm font-medium">
          With Onion & Garlic
        </div>
      </div>

      {/* Product Info */}
      <div className="bg-white p-4 shadow-sm">
        <h1 className="text-xl font-bold">Ragi Vegetable Chilla</h1>
        <p className="text-gray-600 text-sm mt-1">North Indian • Breakfast</p>

        <div className="flex items-center mt-3 space-x-2">
          <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">Cal: 320</span>
          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">Protein: 7g</span>
          <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded">Fiber: 6g</span>
          <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded">Carbs: 40g</span>
          <span className="text-xs px-2 py-1 bg-orange-100 text-orange-800 rounded">Fat: 12g</span>
        </div>

        <p className="text-sm mt-3">
          Savory pancakes made from ragi flour and mixed vegetables, designed specifically for
          diabetic-friendly diets with a low glycemic index.
        </p>

        <div className="flex items-center justify-between mt-4">
          <div className="font-bold text-xl">₹120</div>
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <button
              className="px-3 py-1 bg-gray-100 text-gray-600"
              onClick={decrementQuantity}
            >
              <Minus className="w-4 h-4" />
            </button>
            <div className="px-4 py-1 bg-white">{quantity}</div>
            <button
              className="px-3 py-1 bg-gray-100 text-gray-600"
              onClick={incrementQuantity}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Nutritional Information */}
      <div className="bg-white p-4 mt-2 shadow-sm">
        <button
          className="w-full flex justify-between items-center"
          onClick={() => setNutritionExpanded(!nutritionExpanded)}
        >
          <h2 className="font-bold">Nutritional Information</h2>
          {nutritionExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>

        {nutritionExpanded && (
          <div className="mt-3 text-sm">
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-50 p-2 rounded">
                <span className="text-gray-600">Calories</span>
                <div className="font-medium mt-1 text-green-700">320 kcal</div>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <span className="text-gray-600">Carbohydrates</span>
                <div className="font-medium mt-1 text-yellow-700">40g</div>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <span className="text-gray-600">Protein</span>
                <div className="font-medium mt-1 text-blue-700">7g</div>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <span className="text-gray-600">Fat</span>
                <div className="font-medium mt-1 text-orange-700">12g</div>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <span className="text-gray-600">Fiber</span>
                <div className="font-medium mt-1 text-purple-700">6g</div>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <span className="text-gray-600">Glycemic Index</span>
                <div className="font-medium mt-1 text-green-700">50-55</div>
              </div>
            </div>
            <p className="mt-3 text-gray-600">
              The glycemic index is moderated to 50-55 due to added fiber and fat, making this a
              suitable option for diabetic diets.
            </p>
          </div>
        )}
      </div>

      {/* Ingredients */}
      <div className="bg-white p-4 mt-2 shadow-sm">
        <button
          className="w-full flex justify-between items-center"
          onClick={() => setIngredientsExpanded(!ingredientsExpanded)}
        >
          <h2 className="font-bold">Ingredients & Preparation</h2>
          {ingredientsExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>

        {ingredientsExpanded && (
          <div className="mt-3 text-sm">
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Ragi flour – ½ cup (60g)</li>
              <li>Grated carrot – 2 tbsp</li>
              <li>Chopped spinach or methi – 2 tbsp</li>
              <li>Finely chopped onion – 2 tbsp</li>
              <li>Grated zucchini or bottle gourd – 2 tbsp</li>
              <li>Green chili, ginger – to taste</li>
              <li>Cumin seeds – ¼ tsp</li>
              <li>Salt – to taste</li>
              <li>Cold-pressed oil – 2 tsp</li>
            </ul>
            <p className="mt-3 text-gray-600">
              Our chillas are cooked fresh on iron tawa with minimal oil to preserve maximum nutrition.
            </p>
          </div>
        )}
      </div>

      {/* Recommended Accompaniments */}
      <div className="bg-white p-4 mt-2 shadow-sm">
        <button
          className="w-full flex justify-between items-center"
          onClick={() => setAccompanimentExpanded(!accompanimentExpanded)}
        >
          <h2 className="font-bold">Recommended With This</h2>
          {accompanimentExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>

        {accompanimentExpanded && (
          <div className="mt-3">
            <div className="flex overflow-x-auto pb-2 gap-3">
              {[
                {
                  src: './images/mint_chutney.jpg',
                  alt: 'Mint Chutney',
                  name: 'Mint Chutney',
                  calories: 30,
                  price: 30,
                },
                {
                  src: './images/curd.jpg',
                  alt: 'Low-fat Curd',
                  name: 'Low-fat Curd',
                  calories: 60,
                  price: 40,
                },
                {
                  src: './images/cucumber_salad.jpg',
                  alt: 'Cucumber Salad',
                  name: 'Cucumber Salad',
                  calories: 45,
                  price: 50,
                },
                {
                  src: './images/amla_ginger.jpg',
                  alt: 'Amla-Ginger Drink',
                  name: 'Amla-Ginger Drink',
                  calories: 75,
                  price: 60,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-36 bg-gray-50 rounded-lg overflow-hidden border border-gray-100"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-24 object-cover"
                    onError={(e) =>
                      (e.target.src = `https://via.placeholder.com/144x100?text=${item.alt.replace(
                        ' ',
                        '+'
                      )}`)
                    }
                  />
                  <div className="p-2">
                    <h3 className="font-medium text-sm">{item.name}</h3>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-green-700">Cal: {item.calories}</span>
                      <span className="text-sm font-medium">₹{item.price}</span>
                    </div>
                    <button className="w-full mt-2 bg-emerald-600 text-white text-xs rounded px-2 py-1">
                      Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add to Cart Button */}
      <div className="sticky bottom-0 p-4 bg-white border-t border-gray-200 mt-auto">
        <button
          className="w-full bg-emerald-600 text-white rounded-lg py-3 font-medium flex items-center justify-center"
          onClick={() => navigate('/cart')}
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Add to Cart - ₹{120 * quantity}
        </button>
      </div>
    </div>
  );
};

export default ItemDetail;