import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ai from '/ai.svg';

const ChatHeader = ({ sidebarOpen, onToggleSidebar }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user data from localStorage or make an API call
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      // Fallback user data if not available
      setUser({
        fullName: { firstName: 'User', lastName: '' },
        email: 'user@example.com'
      });
    }
  }, []);

  const getUserInitials = () => {
    if (!user) return 'U';
    const firstName = user.fullName?.firstName || user.firstName || '';
    const lastName = user.fullName?.lastName || user.lastName || '';
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase() || 'U';
  };
  return (
    <div
      className={`backdrop-blur-2xl bg-black/30 border-b border-[#3c6e71]/30 shadow-lg shadow-[#549295]/20 !p-4 fixed top-0 z-30 h-20 flex items-center transition-all duration-300 ${
        sidebarOpen 
          ? "left-0 w-full md:left-80 md:w-[calc(100%-320px)]" 
          : "left-0 w-full"
      }`}
    >
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-3">
          {/* Sidebar Toggle */}
          <button
            onClick={onToggleSidebar}
            className="!p-2 hover:bg-[#3c6e71]/20 rounded-lg transition-all"
          >
            <div className="w-5 h-5 flex flex-col justify-center gap-1">
              <div className="w-full h-0.5 bg-white"></div>
              <div className="w-full h-0.5 bg-white"></div>
              <div className="w-full h-0.5 bg-white"></div>
            </div>
          </button>

          <Link
            to="/"
            className="flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <h1 className="text-xl md:text-2xl uppercase font-bold bg-gradient-to-r from-[#3c6e71] via-white to-[#3c6e71] bg-clip-text text-transparent">
              Nova
            </h1>
            <img src={ai} alt="Nova" className="w-6 h-6" />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* User Profile Section */}
          <div className="flex items-center gap-3">
            {/* User Avatar with Initials */}
            <div className="w-10 h-10 bg-gradient-to-r from-[#3c6e71] to-[#549295] rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg">
              {getUserInitials()}
            </div>
            
            {/* User Info - Hidden on mobile */}
            <div className="hidden sm:flex flex-col">
              <span className="text-white text-sm font-medium">
                {user?.fullName?.firstName || user?.firstName || 'User'}
              </span>
              <span className="text-gray-400 text-xs">
                {user?.email || 'user@example.com'}
              </span>
            </div>
          </div>

          {/* AI Status Indicator
          <div className="flex items-center gap-2 text-xs text-gray-400 bg-black/20 px-3 py-2 rounded-full border border-[#3c6e71]/30">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="hidden sm:inline">AI Online</span>
            <span className="sm:hidden">Online</span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;