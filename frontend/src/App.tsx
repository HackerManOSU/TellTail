import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import DropPage from './components/Drop Page/DropPage'
import Instructions from './components/Instructions/Instructions'
import AboutUs from './components/About Us/AboutUs'

function App() {
  return (
    <BrowserRouter>
      <div className='min-h-screen bg-[#fff]'>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<DropPage />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
