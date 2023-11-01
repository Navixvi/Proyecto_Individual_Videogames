import './App.css';
import React from 'react';
import { Routes, Route,} from 'react-router-dom';
// Rutas
import Home from './view/Home';
import Detail from './view/Detail';
import LandingPage from './view/LandingPage';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={<Home />} />
        <Route path='/detail' element={<Detail />} />
      </Routes>
    </div>
  )
}

export default App;
