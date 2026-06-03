import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Since they are all in the 'Dashboard' folder together:
import Dashboard from './pages/Dashboard/Dashboard';
import AddProduct from './pages/Dashboard/AddProduct';
import OfferServices from './pages/Dashboard/OfferServices';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/offer-service" element={<OfferServices />} />
      </Routes>
    </Router>
  );
}

export default App;