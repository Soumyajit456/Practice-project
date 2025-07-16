import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Details from './components/Details'
import Home from './components/Home'
import ThemeToggle from './components/ThemeToggle'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/:name' element={<Details/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
