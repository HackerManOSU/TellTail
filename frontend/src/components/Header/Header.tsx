import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="bg-primary p-4 text-white">
      <nav className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-[#f0f9f9]">
          TellTail
        </Link>
        <div className="flex gap-6">
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
  )
}

export default Header