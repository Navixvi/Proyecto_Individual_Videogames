import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Cards from './components/Cards';
import Card from './components/Card';
import Detail from './components/Detail';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={<Home />} />
        <Route path='/cards' element={<Cards />} />
        <Route path='/card' element={<Card />} />
        <Route path='/detail' element={<Detail />} />
      </Routes>
    </div>
  )
}

export default App;
