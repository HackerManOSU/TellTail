// src/components/Header/Header.tsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './header.css'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    if (isOpen) {
      const dropdownMenu = document.querySelector('.dropdown-menu');
      if (dropdownMenu) {
        dropdownMenu.classList.add('dropdown-exit');
        setTimeout(() => {
          setIsOpen(false);
          const dropdownMenuAfterTimeout = document.querySelector('.dropdown-menu');
          if (dropdownMenuAfterTimeout) {
            dropdownMenuAfterTimeout.classList.remove('dropdown-exit');
          }
        }, 100);
      }
    } else {
      setIsOpen(true);
    }
  };

  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      toggleMenu();
    }
  };

  return (
    <>
      <header className={`bg-primary p-4 text-white fixed top-0 left-0 right-0 z-50 ${isOpen ? 'bg-opacity-100' : ''
        }`}>
        <nav className="max-w-6xl mx-auto h-[5vh] min-h-[35px] flex justify-between items-center">
          <Link data-testid="brand-link" to="/" className="text-2xl font-bold hover:text-[#f0f9f9]">
            TellTail
          </Link>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              aria-label="menu"
              onClick={toggleMenu}
              className={`menu-button ${isOpen ? 'is-active' : ''}`}
            >
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6">
            <Link to="/" className="hover:text-[#f0f9f9]">
              Home
            </Link>
            <Link to="/upload" className="hover:text-[#f0f9f9]">
              Upload
            </Link>
            <Link to="/instructions" className="hover:text-[#f0f9f9]">
              Instructions
            </Link>
            <Link to="/about" className="hover:text-[#f0f9f9]">
              About Us
            </Link>
          </div>
        </nav>
      </header>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden fixed top-[60px] left-0 right-0 z-40">
          <ul className="header-mobile bg-primary text-white text-center py-4 space-y-4 dropdown-enter dropdown-menu">
            <li>
              <Link
                to="/"
                className="block py-2 hover:text-[#f0f9f9]"
                onClick={handleLinkClick}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/upload"
                className="block py-2 hover:text-[#f0f9f9]"
                onClick={handleLinkClick}
              >
                Upload
              </Link>
            </li>
            <li>
              <Link
                to="/instructions"
                className="block py-2 hover:text-[#f0f9f9]"
                onClick={handleLinkClick}
              >
                Instructions
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block py-2 hover:text-[#f0f9f9]"
                onClick={handleLinkClick}
              >
                About Us
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}

export default Header
