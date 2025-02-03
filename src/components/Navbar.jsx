import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-lg">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-white text-xl font-bold">Notes Pro</Link>
          
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <div className="flex items-center">
                  <span className="text-gray-300 mr-2">Welcome,</span>
                  <div className="group relative inline-block">
                    <span className="text-white font-semibold cursor-pointer hover:text-blue-300 transition-colors inline-flex items-center">
                      {user?.username || 'User'}
                      <svg 
                        className="w-4 h-4 ml-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                    <div className="absolute right-0 w-48 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out">
                      <div className="bg-white rounded-md shadow-xl border border-gray-100">
                        <Link 
                          to="/dashboard" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-500 transition-colors rounded-t-md"
                        >
                          Dashboard
                        </Link>
                        <Link 
                          to="/profile" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-500 transition-colors"
                        >
                          Profile
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H3zm11 4.5a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1 0-1h7a.5.5 0 0 1 .5.5z"/>
                  </svg>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white hover:text-blue-300 transition-colors">
                  Login
                </Link>
                <Link to="/register" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden mt-4 pb-4`}>
          {isAuthenticated ? (
            <div className="flex flex-col space-y-3">
              <span className="text-gray-300">Welcome, {user?.username || 'User'}</span>
              <Link 
                to="/dashboard" 
                className="text-white hover:text-blue-300 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                to="/profile" 
                className="text-white hover:text-blue-300 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Profile
              </Link>
              <button 
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center w-full justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H3zm11 4.5a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1 0-1h7a.5.5 0 0 1 .5.5z"/>
                </svg>
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col space-y-3">
              <Link 
                to="/login" 
                className="text-white hover:text-blue-300 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
