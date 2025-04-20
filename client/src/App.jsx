// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage.jsx';
import ItemDetail from './components/ItemDetail.jsx';
import MealCustomization from './components/MealCustomization.jsx';
import Cart from './components/Cart.jsx';
import Subscription from './components/Subscription.jsx';
// ... other imports if needed for placeholder routes ...

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        <Route path="/item/:id" element={<ItemDetail />} />
        <Route path="/customize" element={<MealCustomization />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/subscription" element={<Subscription />} />
        {/* ... other placeholder routes ... */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;