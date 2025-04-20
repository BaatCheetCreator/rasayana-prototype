import React, { useState } from 'react'; // Removed unused useEffect
import { useNavigate } from 'react-router-dom'; 
import { 
  ShoppingCart, User, Search, Coffee, BookOpen, Zap, Calendar, ArrowRight, Home, Heart, Leaf, ShieldCheck 
} from 'lucide-react'; 

// --- Sample Data (Placed directly in component for prototype) ---
const sampleMenuItems = [
   {
      id: 'clv9sample1', 
      name: 'Ragi Vegetable Chilla', description: 'Savory pancakes made from ragi flour and mixed vegetables.',
      price: 12000, category: 'Breakfast', cuisineRegion: 'North Indian', mealType: 'Chilla', dietType: 'With Onion/Garlic', 
      isVeg: true, calories: 320, protein: 7, carbs: 40, fat: 12, fiber: 6, glycemicIndex: 'Low',
      isHighProtein: false, isHighFiber: true, isHeartHealthy: true, 
      imageUrl: 'https://via.placeholder.com/180x180/10B981/FFFFFF?text=Ragi+Chilla',
      isFeatured: true, standardIngredients: 'Ragi flour, Grated carrot, Chopped spinach/methi, Finely chopped onion, Green chili, ginger, Cumin seeds, Salt, Cold-pressed oil',
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), 
    },
    {
      id: 'clv9sample2', name: 'Oats Idli', description: 'Steamed savory cakes made with oats and urad dal.',
      price: 10000, category: 'Breakfast', cuisineRegion: 'South Indian', mealType: 'Idli', dietType: 'Without Onion/Garlic', 
      isVeg: true, calories: 150, protein: 7, carbs: 22, fat: 3, fiber: 5, glycemicIndex: 'Low',
      isHighProtein: false, isHighFiber: true, isHeartHealthy: true, 
      imageUrl: 'https://via.placeholder.com/180x180/10B981/FFFFFF?text=Oats+Idli',
      isFeatured: true, standardIngredients: 'Ground oats, Urad dal, Grated carrot, Chopped coriander, Curry leaves, Green chilies, Ginger, Eno fruit salt, Salt',
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    },
    {
      id: 'clv9sample3', name: 'Moong Dal Paneer Cheela', description: 'Protein-rich savory pancakes made from split yellow moong dal with paneer filling.',
      price: 16000, category: 'Breakfast', cuisineRegion: 'North Indian', mealType: 'Cheela', dietType: 'With Onion/Garlic', 
      isVeg: true, calories: 280, protein: 20, carbs: 25, fat: 10, fiber: 8, glycemicIndex: 'Low',
      isHighProtein: true, isHighFiber: true, isHeartHealthy: true,
      imageUrl: 'https://via.placeholder.com/180x180/10B981/FFFFFF?text=Moong+Dal+Cheela',
      isFeatured: true, standardIngredients: 'Split yellow moong dal, Grated paneer, Finely chopped onion, Chopped spinach, Green chilies, Ginger, Cumin powder, Coriander powder, Salt, Cold-pressed mustard oil',
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    },
    // Added the 4th item back but marked as not featured
     {
      id: 'clv9sample4',
      name: 'Dal Khichdi (Bottle Gourd)', 
      description: 'Comforting one-pot meal with lentils, rice, and vegetables.',
      price: 15000, 
      category: 'Lunch & Dinner', cuisineRegion: 'North Indian', mealType: 'Khichdi', dietType: 'With Onion/Garlic', 
      isVeg: true, calories: 220, protein: 10, carbs: 32, fat: 5, fiber: 8, glycemicIndex: 'Medium',
      isHighProtein: true, isHighFiber: true, isHeartHealthy: true,
      imageUrl: 'https://via.placeholder.com/180x180/10B981/FFFFFF?text=Dal+Khichdi',
      isFeatured: false, // Not featured
      standardIngredients: 'Moong dal, Toor dal, Brown rice, Bottle gourd, Tomato, Green peas, Onion, Ginger-garlic paste, Turmeric powder, Cumin seeds, Ghee, Salt',
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    },
];
// --- End Sample Data ---

// HomePage component
const HomePage = () => {
  const navigate = useNavigate(); 
  const [activeTab, setActiveTab] = useState('home'); 
  
  // Use sample data directly for the prototype deployment
  const menuItems = sampleMenuItems; 
  const isLoading = false; 
  const error = null; 

  // Helper to get GI color class
  const getGiClass = (gi) => {
    if (!gi) return 'bg-gray-100 text-gray-800';
    const lowerGi = gi.toLowerCase();
    if (lowerGi === 'low') return 'bg-green-100 text-green-800';
    if (lowerGi === 'medium') return 'bg-yellow-100 text-yellow-800';
    if (lowerGi === 'high') return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="bg-emerald-700 text-white p-4 flex items-center justify-between sticky top-0 z-10"> <div className="flex items-center space-x-2"><div className="font-bold text-2xl">रसायन</div><div className="text-sm font-light">Rasayana</div></div><div className="flex items-center space-x-4"><button className="relative" onClick={() => navigate('/cart')}><ShoppingCart className="w-6 h-6" /> <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">?</span> </button><button onClick={() => navigate('/profile')}><User className="w-6 h-6" /></button></div> </header>
      {/* Hero Section */}
      <div className="relative h-48 bg-gradient-to-r from-emerald-800 to-emerald-600 text-white p-6 flex flex-col justify-end"> <h1 className="text-3xl font-bold mb-1">Diabetes-Friendly</h1><p className="text-lg mb-4">Authentic Indian Cuisine</p><div className="absolute bottom-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium"> 100% Vegetarian </div> </div>
      {/* Search & Filters */}
      <div className="bg-white p-4 shadow-md"> <div className="relative"><input type="text" placeholder="Search dishes, ingredients..." className="w-full p-3 pl-4 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" /><button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"><Search className="w-5 h-5" /></button></div> </div>
      <div className="px-4 pt-4 pb-2 flex gap-2 overflow-x-auto hide-scrollbar"> <button className="flex-shrink-0 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium border border-emerald-200">All Items</button><button className="flex-shrink-0 bg-white text-gray-700 px-3 py-1 rounded-full text-sm font-medium border border-gray-200">North Indian</button><button className="flex-shrink-0 bg-white text-gray-700 px-3 py-1 rounded-full text-sm font-medium border border-gray-200">South Indian</button><button className="flex-shrink-0 bg-white text-gray-700 px-3 py-1 rounded-full text-sm font-medium border border-gray-200">East Indian</button><button className="flex-shrink-0 bg-white text-gray-700 px-3 py-1 rounded-full text-sm font-medium border border-gray-200">West Indian</button> </div>
      <div className="px-4 py-2 flex gap-3"> <button className="flex-1 bg-emerald-600 text-white px-2 py-2 rounded-lg text-sm font-medium">With Onion & Garlic</button><button className="flex-1 bg-white text-gray-700 px-2 py-2 rounded-lg text-sm font-medium border border-gray-200">Without Onion & Garlic</button> </div>
      {/* Meal Categories */}
      <div className="px-4 py-4"> <h2 className="text-lg font-bold mb-3">Select Meal Type</h2><div className="grid grid-cols-2 gap-3"><div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/menu')}><Coffee className="text-emerald-600 mb-2 w-6 h-6" /><span className="text-sm font-medium">À la carte</span></div><div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/thalis')}><BookOpen className="text-emerald-600 mb-2 w-6 h-6" /><span className="text-sm font-medium">Thalis & Combos</span></div><div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/customize')}><Zap className="text-emerald-600 mb-2 w-6 h-6" /><span className="text-sm font-medium">Build Your Own</span></div><div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/desserts')}><Calendar className="text-amber-500 mb-2 w-6 h-6" /><span className="text-sm font-medium">Desserts</span></div></div> </div>
      
      {/* Featured Section - Renders Sample Data */}
      <div className="px-4 py-4">
         <div className="flex justify-between items-center mb-3"><h2 className="text-lg font-bold">Featured Meals</h2><button className="text-emerald-600 text-sm font-medium flex items-center hover:underline" onClick={() => navigate('/menu')}> View All <ArrowRight className="w-4 h-4 ml-1" /> </button></div>
         {isLoading && <div className="text-center p-4">Loading menu...</div>}
         {error && <div className="text-center p-4 text-red-600">{error}</div>}
         {!isLoading && !error && ( 
           <div className="space-y-4">
             {menuItems.filter(item => item.isFeatured).map(item => ( 
                <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden"> 
                  <div className="flex cursor-pointer" onClick={() => navigate(`/item/${item.id}`)}> 
                    <div className="w-1/3 flex-shrink-0 bg-gray-200"> 
                       <img src={item.imageUrl || `https://via.placeholder.com/180x180/10B981/FFFFFF?text=${encodeURIComponent(item.name)}`} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="w-2/3 p-3"> 
                       <div className="flex justify-between items-start mb-1"><div><h3 className="font-medium leading-tight truncate">{item.name}</h3> <p className="text-xs text-gray-500 mt-0.5">{item.cuisineRegion} • {item.category}</p> </div><div className={`flex-shrink-0 text-xs font-medium px-2 py-0.5 rounded ${getGiClass(item.glycemicIndex)}`}> GI: {item.glycemicIndex || 'N/A'} </div></div>
                       <div className="flex items-center mt-1 space-x-2 flex-wrap text-xs">{item.calories && <span className="px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded">Cal: {item.calories}</span>}{item.protein && <span className="px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded">Prot: {item.protein}g</span>}{item.fiber && <span className="px-1.5 py-0.5 bg-purple-100 text-purple-800 rounded">Fib: {item.fiber}g</span>}{item.isHighProtein && <span title="High Protein" className="inline-flex items-center text-blue-600"><ShieldCheck className="w-3.5 h-3.5" /></span>}{item.isHighFiber && <span title="High Fiber" className="inline-flex items-center text-purple-600"><Leaf className="w-3.5 h-3.5" /></span>}{item.isHeartHealthy && <span title="Heart Healthy" className="inline-flex items-center text-red-500"><Heart className="w-3.5 h-3.5" /></span>}</div>
                       <div className="flex justify-between items-center mt-2.5"><div className="font-bold text-lg">₹{item.price / 100}</div> <button className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white text-xs rounded-md px-3 py-1.5 transition-colors" onClick={(e) => { e.stopPropagation(); navigate('/cart'); /* TODO: Add actual add-to-cart logic */ }} > Add </button></div>
                    </div>
                  </div>
                </div>
             ))}
              {menuItems.filter(item => item.isFeatured).length === 0 && !isLoading && ( <div className="text-center text-gray-500 py-4">No featured items available.</div> )}
           </div>
         )}
      </div>

      {/* Bottom Navigation */}
      <div className="h-16"></div> 
      <div className="bg-white border-t border-gray-200 py-2 fixed bottom-0 left-0 right-0 z-10"> <div className="flex justify-around"> <button className={`flex flex-col items-center px-3 py-1 ${activeTab === 'home' ? 'text-emerald-600' : 'text-gray-500'}`} onClick={() => setActiveTab('home')}><Home className="w-5 h-5" /><span className="text-xs mt-1">Home</span></button> <button className={`flex flex-col items-center px-3 py-1 ${activeTab === 'explore' ? 'text-emerald-600' : 'text-gray-500'}`} onClick={() => { setActiveTab('explore'); navigate('/menu'); }}><Coffee className="w-5 h-5" /><span className="text-xs mt-1">Menu</span></button> <button className={`flex flex-col items-center px-3 py-1 ${activeTab === 'favorites' ? 'text-emerald-600' : 'text-gray-500'}`} onClick={() => { setActiveTab('favorites'); navigate('/favorites'); }}><Heart className="w-5 h-5" /><span className="text-xs mt-1">Favorites</span></button> <button className={`flex flex-col items-center px-3 py-1 ${activeTab === 'subscription' ? 'text-emerald-600' : 'text-gray-500'}`} onClick={() => { setActiveTab('subscription'); navigate('/subscription'); }}><Calendar className="w-5 h-5" /><span className="text-xs mt-1">Subscription</span></button> </div> </div>
    </div>
  );
};

export default HomePage;