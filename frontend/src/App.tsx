import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import DropPage from './components/Drop Page/DropPage'
import Instructions from './components/Instructions/Instructions'
import AboutUs from './components/About Us/AboutUs'
import CatProfile from './components/Profiles/CatProfile'
import Upload from './components/Upload/Upload'
import DogDropField from './components/Drop Fields/DogDropField'
import DogProfile from './components/Profiles/DogProfile'

function App() {
  return (
    <BrowserRouter>
      <div className='min-h-screen bg-[#fff] pt-12'>
        <Header />
        <main className="mt-[3vh]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/upload/cat" element={<DropPage title="Cat" />} />
            <Route path="/upload/dog" element={<DropPage title="Dog" />} />
            <Route path="/instructions" element={<Instructions />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/cat-profile" element={<CatProfile />} />
            <Route path="/cat-profile/:id" element={<CatProfile />} />
            <Route path="/upload/dog" element={<DogDropField />} />
            <Route path="/dog-profile/:id" element={<DogProfile />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App