import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import DropPage from './components/Drop Page/DropPage'
import Instructions from './components/Instructions/Instructions'
import AboutUs from './components/About Us/AboutUs'
import CatProfile from './components/Profiles/CatProfile'

function App() {
  return (
    <BrowserRouter>
      <div className='min-h-screen bg-[#fff]'>
        <Header />
        <main className="mt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<DropPage />} />
            <Route path="/instructions" element={<Instructions />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/cat-profile" element={<CatProfile />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
