import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Check, AlertCircle } from 'lucide-react';

// MealCustomization component
const MealCustomization = () => {
  const navigate = useNavigate();
  const [baseSelected, setBaseSelected] = useState('poha');
  const [selectedProteins, setSelectedProteins] = useState([]);
  const [selectedVeggies, setSelectedVeggies] = useState([]);
  const [selectedSpices, setSelectedSpices] = useState(['cumin']); // Default spice
  const [selectedToppings, setSelectedToppings] = useState([]);

  // Nutrition totals state
  const [totalCalories, setTotalCalories] = useState(0); // Will be calculated by useEffect
  const [totalCarbs, setTotalCarbs] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalFiber, setTotalFiber] = useState(0);
  const [totalFat, setTotalFat] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0); // Added state for price
  const [glycemicImpact, setGlycemicImpact] = useState('Low');

  // Data Arrays (unchanged)
  const bases = [
    { id: 'poha', name: 'Poha (Flattened Rice)', calories: 180, carbs: 30, protein: 4, fiber: 3, fat: 2, price: 100, glycemicImpact: 'Medium' },
    { id: 'upma', name: 'Jowar Upma Base', calories: 160, carbs: 25, protein: 5, fiber: 4, fat: 3, price: 110, glycemicImpact: 'Low' },
    { id: 'oats', name: 'Steel-Cut Oats', calories: 150, carbs: 26, protein: 6, fiber: 4, fat: 2, price: 120, glycemicImpact: 'Low' },
    { id: 'milletrice', name: 'Millet Rice Base', calories: 170, carbs: 32, protein: 4, fiber: 5, fat: 2, price: 115, glycemicImpact: 'Low' },
  ];

  const proteins = [
    { id: 'paneer', name: 'Paneer Cubes', calories: 80, carbs: 2, protein: 8, fiber: 0, fat: 6, glycemicImpact: 'Low', price: 40 },
    { id: 'tofu', name: 'Tofu Cubes', calories: 70, carbs: 1, protein: 8, fiber: 1, fat: 4, glycemicImpact: 'Low', price: 35 },
    { id: 'sprouts', name: 'Mixed Sprouts', calories: 60, carbs: 8, protein: 6, fiber: 4, fat: 1, glycemicImpact: 'Low', price: 30 },
    { id: 'lentils', name: 'Spiced Lentils', calories: 90, carbs: 12, protein: 7, fiber: 5, fat: 1, glycemicImpact: 'Low', price: 35 },
  ];

  const vegetables = [
    { id: 'carrots', name: 'Grated Carrots', calories: 25, carbs: 6, protein: 1, fiber: 2, fat: 0, glycemicImpact: 'Low', price: 10 },
    { id: 'peas', name: 'Green Peas', calories: 40, carbs: 7, protein: 3, fiber: 2, fat: 0, glycemicImpact: 'Medium', price: 15 },
    { id: 'spinach', name: 'Chopped Spinach', calories: 15, carbs: 2, protein: 2, fiber: 2, fat: 0, glycemicImpact: 'Low', price: 10 },
    { id: 'tomatoes', name: 'Diced Tomatoes', calories: 20, carbs: 4, protein: 1, fiber: 1, fat: 0, glycemicImpact: 'Low', price: 10 },
    { id: 'onion', name: 'Finely Chopped Onion', calories: 30, carbs: 7, protein: 1, fiber: 1, fat: 0, glycemicImpact: 'Medium', price: 10 },
    { id: 'beans', name: 'French Beans', calories: 25, carbs: 5, protein: 1, fiber: 2, fat: 0, glycemicImpact: 'Low', price: 15 },
  ];

  const spices = [
    { id: 'cumin', name: 'Roasted Cumin', calories: 5, carbs: 1, protein: 0, fiber: 0, fat: 0, glycemicImpact: 'None', price: 5 },
    { id: 'mustard', name: 'Mustard Seeds', calories: 5, carbs: 1, protein: 0, fiber: 0, fat: 0, glycemicImpact: 'None', price: 5 },
    { id: 'turmeric', name: 'Turmeric Powder', calories: 5, carbs: 1, protein: 0, fiber: 0, fat: 0, glycemicImpact: 'None', price: 5 },
    { id: 'ginger', name: 'Ginger-Green Chili Paste', calories: 10, carbs: 2, protein: 0, fiber: 0, fat: 0, glycemicImpact: 'None', price: 10 },
    { id: 'curry', name: 'Curry Leaves', calories: 5, carbs: 1, protein: 0, fiber: 0, fat: 0, glycemicImpact: 'None', price: 5 },
  ];

  const toppings = [
    { id: 'coriander', name: 'Fresh Coriander', calories: 5, carbs: 1, protein: 0, fiber: 0, fat: 0, glycemicImpact: 'None', price: 5 },
    { id: 'lemon', name: 'Lemon Juice', calories: 5, carbs: 1, protein: 0, fiber: 0, fat: 0, glycemicImpact: 'None', price: 5 },
    { id: 'nuts', name: 'Roasted Peanuts', calories: 80, carbs: 3, protein: 4, fiber: 1, fat: 7, glycemicImpact: 'Low', price: 20 },
    { id: 'flaxseed', name: 'Flaxseed Powder', calories: 30, carbs: 1, protein: 1, fiber: 2, fat: 2, glycemicImpact: 'Low', price: 15 },
    { id: 'sesame', name: 'Roasted Sesame Seeds', calories: 40, carbs: 2, protein: 2, fiber: 1, fat: 3, glycemicImpact: 'Low', price: 15 },
  ];

  // *** CORRECTED useEffect Hook ***
  useEffect(() => {
    // Moved calculation logic into a function inside useEffect
    const calculateNutritionAndPrice = () => {
      const base = bases.find(b => b.id === baseSelected) || bases[0]; // Fallback to first base if not found

      // Initialize accumulators with base values
      let currentCalories = base.calories;
      let currentCarbs = base.carbs;
      let currentProtein = base.protein; // Renamed accumulator
      let currentFiber = base.fiber;
      let currentFat = base.fat;
      let currentPrice = base.price;
      let glycemicImpacts = [base.glycemicImpact || 'Low']; // Start with base's GI

      // Add nutrition/price from selected proteins
      selectedProteins.forEach(id => {
        const proteinItem = proteins.find(p => p.id === id);
        if (proteinItem) {
          currentCalories += proteinItem.calories;
          currentCarbs += proteinItem.carbs;
          currentProtein += proteinItem.protein; // Correctly add to accumulator
          currentFiber += proteinItem.fiber;
          currentFat += proteinItem.fat;
          currentPrice += proteinItem.price;
          glycemicImpacts.push(proteinItem.glycemicImpact);
        }
      });

      // Add nutrition/price from selected veggies
      selectedVeggies.forEach(id => {
        const veggie = vegetables.find(v => v.id === id);
        if (veggie) {
          currentCalories += veggie.calories;
          currentCarbs += veggie.carbs;
          currentProtein += veggie.protein;
          currentFiber += veggie.fiber;
          currentFat += veggie.fat;
          currentPrice += veggie.price;
          glycemicImpacts.push(veggie.glycemicImpact);
        }
      });

      // Add nutrition/price from selected spices
      selectedSpices.forEach(id => {
        const spice = spices.find(s => s.id === id);
        if (spice) {
          currentCalories += spice.calories;
          currentCarbs += spice.carbs;
          currentProtein += spice.protein;
          currentFiber += spice.fiber;
          currentFat += spice.fat;
          currentPrice += spice.price;
          // Spices generally don't significantly impact GI, added push just in case
          if (spice.glycemicImpact && spice.glycemicImpact !== 'None') {
             glycemicImpacts.push(spice.glycemicImpact);
          }
        }
      });

      // Add nutrition/price from selected toppings
      selectedToppings.forEach(id => {
        const topping = toppings.find(t => t.id === id);
        if (topping) {
          currentCalories += topping.calories;
          currentCarbs += topping.carbs;
          currentProtein += topping.protein;
          currentFiber += topping.fiber;
          currentFat += topping.fat;
          currentPrice += topping.price;
          glycemicImpacts.push(topping.glycemicImpact);
        }
      });

      // Determine overall glycemic impact
      const impactCounts = glycemicImpacts.reduce((acc, impact) => {
        if(impact && impact !== 'None') { // Ignore 'None' impacts
            acc[impact] = (acc[impact] || 0) + 1;
        }
        return acc;
      }, {});

      const calculatedImpact = impactCounts['High'] > 0 ? 'High' :
                             impactCounts['Medium'] > 0 ? 'Medium' : 'Low';

      // Update all state variables at once
      setTotalCalories(currentCalories);
      setTotalCarbs(currentCarbs);
      setTotalProtein(currentProtein);
      setTotalFiber(currentFiber);
      setTotalFat(currentFat);
      setTotalPrice(currentPrice); // Set the calculated price state
      setGlycemicImpact(calculatedImpact);
    };

    calculateNutritionAndPrice(); // Run the calculation function

  }, [baseSelected, selectedProteins, selectedVeggies, selectedSpices, selectedToppings, bases, proteins, vegetables, spices, toppings]); // Added data arrays to dependencies - technically correct, though unlikely to change in this component


  // Toggle functions (unchanged)
  const toggleProtein = (id) => {
    setSelectedProteins(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleVeggie = (id) => {
    if (selectedVeggies.includes(id)) {
      setSelectedVeggies(prev => prev.filter(item => item !== id));
    } else if (selectedVeggies.length < 4) { // Limit to 4 veggies
      setSelectedVeggies(prev => [...prev, id]);
    }
  };

  const toggleSpice = (id) => {
    setSelectedSpices(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleTopping = (id) => {
    setSelectedToppings(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Helper function for calorie color (unchanged)
  const getCalorieColor = (calories) => {
    if (calories <= 300) return 'text-green-700 bg-green-100';
    if (calories <= 450) return 'text-yellow-700 bg-yellow-100';
    return 'text-red-700 bg-red-100';
  };

  // JSX Structure (unchanged, except Add to Cart button uses totalPrice state)
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="bg-emerald-700 text-white p-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center">
          <button className="mr-2" onClick={() => navigate('/')}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-bold text-lg">Create Your Own Meal</h1>
        </div>
        <div>
          <button className="relative" onClick={() => navigate('/cart')}>
            <ShoppingCart className="w-6 h-6" />
            {/* Placeholder cart count */}
            <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              ?
            </span>
          </button>
        </div>
      </header>

      {/* Current Nutrition Panel */}
      <div className="bg-white p-4 shadow-sm sticky top-[68px] z-10"> {/* Adjusted top position if header height changes */}
        <h2 className="font-bold text-gray-700 text-sm mb-2">Current Nutrition Profile</h2>
        <div className="flex justify-between items-center text-center flex-wrap gap-y-2">
          {/* Nutrition details */}
          <div className="flex flex-col items-center min-w-[50px]">
             <span className={`px-2 py-1 rounded-full text-sm font-medium ${getCalorieColor(totalCalories)}`}>
               {totalCalories}
             </span>
             <span className="text-xs text-gray-500 mt-1">Cal</span>
           </div>
           <div className="flex flex-col items-center min-w-[50px]">
             <span className="px-2 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700">
               {totalCarbs}g
             </span>
             <span className="text-xs text-gray-500 mt-1">Carbs</span>
           </div>
           <div className="flex flex-col items-center min-w-[50px]">
             <span className="px-2 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
               {totalProtein}g
             </span>
             <span className="text-xs text-gray-500 mt-1">Protein</span>
           </div>
           <div className="flex flex-col items-center min-w-[50px]">
             <span className="px-2 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
               {totalFiber}g
             </span>
             <span className="text-xs text-gray-500 mt-1">Fiber</span>
           </div>
           <div className="flex flex-col items-center min-w-[50px]">
             <span className="px-2 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-700">
               {totalFat}g
             </span>
             <span className="text-xs text-gray-500 mt-1">Fat</span>
           </div>
        </div>
        {/* Glycemic Impact */}
        <div className="flex items-center mt-3">
           <span className="text-sm font-medium mr-2">Glycemic Impact:</span>
           <span className={`px-2 py-1 rounded-full text-sm font-medium ${
             glycemicImpact === 'High' ? 'bg-red-100 text-red-700' :
             glycemicImpact === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
             'bg-green-100 text-green-700'
           }`}>
             {glycemicImpact}
           </span>
           {glycemicImpact === 'High' && (
             <div className="ml-2 flex items-center text-red-600 text-xs">
               <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
               <span className="leading-tight">High impact</span>
             </div>
           )}
        </div>
      </div>


      {/* Base Selection */}
      <div className="bg-white p-4 mt-2 shadow-sm">
        <h2 className="font-bold text-gray-700 mb-3">1. Choose Your Base</h2>
        <div className="space-y-2">
          {bases.map(base => (
            <div
              key={base.id}
              className={`p-3 rounded-lg border cursor-pointer transition-colors duration-150 ${
                baseSelected === base.id ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:bg-gray-50'
              }`}
              onClick={() => setBaseSelected(base.id)}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 flex-shrink-0 ${
                    baseSelected === base.id ? 'border-emerald-500 bg-emerald-500' : 'border-gray-300'
                  }`}>
                    {baseSelected === base.id && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <div>
                    <h3 className="font-medium">{base.name}</h3>
                    {/* Base nutrition details */}
                    <div className="flex items-center space-x-2 mt-1 flex-wrap">
                      <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">
                        {base.calories} Cal
                      </span>
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded">
                        {base.carbs}g Carbs
                      </span>
                      <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">
                        {base.protein}g Protein
                      </span>
                    </div>
                  </div>
                </div>
                 <span className="text-sm font-medium text-gray-700">₹{base.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Protein Selection */}
      <div className="bg-white p-4 mt-2 shadow-sm">
         <h2 className="font-bold text-gray-700 mb-3">2. Add Protein <span className="text-sm font-normal text-gray-500">(Optional)</span></h2>
         <div className="space-y-2">
           {proteins.map(protein => (
             <div
               key={protein.id}
               className={`p-3 rounded-lg border cursor-pointer transition-colors duration-150 ${
                 selectedProteins.includes(protein.id) ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:bg-gray-50'
               }`}
               onClick={() => toggleProtein(protein.id)}
             >
               <div className="flex justify-between items-center">
                 <div className="flex items-center">
                   <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mr-3 flex-shrink-0 ${
                     selectedProteins.includes(protein.id) ? 'border-emerald-500 bg-emerald-500' : 'border-gray-300'
                   }`}>
                     {selectedProteins.includes(protein.id) && <Check className="w-3 h-3 text-white" />}
                   </div>
                   <div>
                     <h3 className="font-medium">{protein.name}</h3>
                      <div className="flex items-center space-x-2 mt-1 flex-wrap">
                       <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">
                         {protein.calories} Cal
                       </span>
                       <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">
                         {protein.protein}g Protein
                       </span>
                     </div>
                   </div>
                 </div>
                 <span className="text-sm font-medium text-gray-700">+ ₹{protein.price}</span>
               </div>
             </div>
           ))}
         </div>
       </div>

      {/* Vegetables Selection */}
      <div className="bg-white p-4 mt-2 shadow-sm">
        <h2 className="font-bold text-gray-700 mb-1">3. Add Vegetables</h2>
        <p className="text-sm text-gray-500 mb-3">Select up to 4 (+₹{vegetables[0].price} - ₹{vegetables[1].price} each)</p>
        <div className="grid grid-cols-2 gap-3"> {/* Increased gap */}
          {vegetables.map(veggie => (
            <div
              key={veggie.id}
              className={`p-3 rounded-lg border cursor-pointer transition-colors duration-150 ${
                selectedVeggies.includes(veggie.id)
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-gray-200 hover:bg-gray-50'
              } ${selectedVeggies.length >= 4 && !selectedVeggies.includes(veggie.id) ? 'opacity-60 cursor-not-allowed' : ''}`}
              onClick={() => toggleVeggie(veggie.id)}
              aria-disabled={selectedVeggies.length >= 4 && !selectedVeggies.includes(veggie.id)}
            >
              <div className="flex items-center">
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mr-2 flex-shrink-0 ${
                  selectedVeggies.includes(veggie.id) ? 'border-emerald-500 bg-emerald-500' : 'border-gray-300'
                }`}>
                  {selectedVeggies.includes(veggie.id) && <Check className="w-3 h-3 text-white" />}
                </div>
                <div>
                  <h3 className="font-medium text-sm leading-tight">{veggie.name}</h3>
                  <div className="flex items-center mt-1">
                    <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">
                       {veggie.calories} Cal
                     </span>
                      <span className="text-xs text-emerald-700 font-medium ml-2"> + ₹{veggie.price}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Spices Selection */}
      <div className="bg-white p-4 mt-2 shadow-sm">
         <h2 className="font-bold text-gray-700 mb-3">4. Add Spices & Flavors <span className="text-sm font-normal text-gray-500">(+₹{spices[0].price} - ₹{spices[3].price} each)</span></h2>
         <div className="grid grid-cols-2 gap-3">
           {spices.map(spice => (
             <div
               key={spice.id}
               className={`p-3 rounded-lg border cursor-pointer transition-colors duration-150 ${
                 selectedSpices.includes(spice.id) ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:bg-gray-50'
               }`}
               onClick={() => toggleSpice(spice.id)}
             >
               <div className="flex justify-between items-center">
                 <div className="flex items-center">
                   <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mr-2 flex-shrink-0 ${
                     selectedSpices.includes(spice.id) ? 'border-emerald-500 bg-emerald-500' : 'border-gray-300'
                   }`}>
                     {selectedSpices.includes(spice.id) && <Check className="w-3 h-3 text-white" />}
                   </div>
                   <h3 className="font-medium text-sm leading-tight">{spice.name}</h3>
                 </div>
                 <span className="text-xs text-emerald-700 font-medium">+ ₹{spice.price}</span>
               </div>
             </div>
           ))}
         </div>
       </div>

      {/* Toppings Selection */}
      <div className="bg-white p-4 mt-2 shadow-sm">
        <h2 className="font-bold text-gray-700 mb-3">5. Add Toppings <span className="text-sm font-normal text-gray-500">(Optional, +₹{toppings[0].price} - ₹{toppings[2].price} each)</span></h2>
        <div className="grid grid-cols-2 gap-3">
          {toppings.map(topping => (
            <div
              key={topping.id}
              className={`p-3 rounded-lg border cursor-pointer transition-colors duration-150 ${
                selectedToppings.includes(topping.id) ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:bg-gray-50'
              }`}
              onClick={() => toggleTopping(topping.id)}
            >
              <div className="flex justify-between items-center">
                 <div className="flex items-center">
                   <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mr-2 flex-shrink-0 ${
                     selectedToppings.includes(topping.id) ? 'border-emerald-500 bg-emerald-500' : 'border-gray-300'
                   }`}>
                     {selectedToppings.includes(topping.id) && <Check className="w-3 h-3 text-white" />}
                   </div>
                   <div>
                     <h3 className="font-medium text-sm leading-tight">{topping.name}</h3>
                     {topping.calories > 10 && ( // Show calories only if significant
                      <div className="flex items-center mt-1">
                         <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">
                           {topping.calories} Cal
                         </span>
                       </div>
                     )}
                   </div>
                 </div>
                 <span className="text-xs text-emerald-700 font-medium">+ ₹{topping.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="sticky bottom-0 p-4 bg-white border-t border-gray-200 mt-auto">
        <button
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg py-3 font-semibold flex items-center justify-center transition-colors duration-200"
          onClick={() => {
            // Add logic to actually add the customized item to the cart state/context
            console.log("Adding to cart:", {
              base: baseSelected,
              proteins: selectedProteins,
              veggies: selectedVeggies,
              spices: selectedSpices,
              toppings: selectedToppings,
              totalPrice: totalPrice, // Use price from state
              totalCalories: totalCalories,
              // Add other nutrition details if needed
            });
            navigate('/cart');
          }}
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          {/* Use the totalPrice state for the button text */}
          Add Customized Meal - ₹{totalPrice}
        </button>
        <p className="text-center text-xs text-gray-500 mt-2">
          Your customized meal will be prepared fresh upon order
        </p>
      </div>
    </div>
  );
};

export default MealCustomization;