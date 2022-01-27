import React from 'react'
import SiteNavbar from './components/SiteNavbar'
import Home from './components/Home'
import Recipes from './components/Recipes'
import ChooseFood from './components/ChooseFood'
import './styles/main.scss'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <div className='site-wrapper'>
      <BrowserRouter>
        <SiteNavbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='recipes' element={<Recipes />} />
          <Route path='recipes/:idMeal' element={<ChooseFood />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
