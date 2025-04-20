// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import components (ensure paths are correct)
import HomePage from './components/HomePage.jsx';
import ItemDetail from './components/ItemDetail.jsx';
import MealCustomization from './components/MealCustomization.jsx';
import Cart from './components/Cart.jsx';
import Subscription from './components/Subscription.jsx';

const App = () => {
  // Restore the Router and main routes
  return (
    <BrowserRouter>
      <Routes>
        {/* Render HomePage directly at the root */}
        <Route path="/" element={<HomePage />} /> 
        
        {/* Your other routes */}
        <Route path="/item/:id" element={<ItemDetail />} />
        <Route path="/customize" element={<MealCustomization />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/checkout" element={<div>Checkout Page (Placeholder)</div>} />
        <Route path="/profile" element={<div>Profile Page (Placeholder)</div>} />
        <Route path="/thalis" element={<div>Thalis & Combos Page (Placeholder)</div>} />
        <Route path="/desserts" element={<div>Desserts Page (Placeholder)</div>} />
        <Route path="/menu" element={<div>Menu Page (Placeholder)</div>} />
        <Route path="/favorites" element={<div>Favorites Page (Placeholder)</div>} />
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;