import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Landing from './pages/Landing'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import WatchHistory from './pages/WatchHistory'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/watch' element={<WatchHistory/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
