import React, { lazy,Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Lazy-loaded components
const HomePage = lazy(() => import('./pages/HomePage'));
const MyBook = lazy(() => import('./pages/MyBook'));

function App() {
  return (
    <>
    <ToastContainer />
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/my-flights" element={<MyBook />} />
        </Routes>
      </Suspense>
    </Router>
  </>
  );
}

export default App;
