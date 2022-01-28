import React from 'react'
import SiteNavbar from './components/SiteNavbar'
import Home from './components/Home'
import ChooseFood from './components/ChooseFood'
import Footer from './components/Footer'
import './styles/main.scss'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <div className='site-wrapper'>
      <BrowserRouter>
        <SiteNavbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:idMeal' element={<ChooseFood />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
