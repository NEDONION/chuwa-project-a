import React from 'react';
import './Header.css';
import Picture1 from '../assets/picture1.png'; // User icon
import Picture2 from '../assets/picture2.png'; // Cart icon
import Picture3 from '../assets/picture3.png'; // Search icon
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Header = () => {
  const navigate = useNavigate(); // Hook for navigation

  // Handle "Sign In" click to navigate to the sign-in page
  const handleSignInClick = () => {
    navigate('/signin'); // Navigate to the Sign In page
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1>
          Management <span>Chuwa</span>
        </h1>
      </div>

      <div className="header-middle">
        <input
          type="text"
          className="search-bar"
          placeholder="Search"
        />
        <button className="search-button">
          <img src={Picture3} alt="Search Icon" className="icon" />
        </button>
      </div>

      <div className="header-right">
        {/* Add the cursor style through CSS */}
        <div className="user" onClick={handleSignInClick}>
          <img src={Picture1} alt="User Icon" className="icon" />
          <span>Sign In</span>
        </div>
        <div className="cart">
          <img src={Picture2} alt="Cart Icon" className="icon" />
          <span>$0.00</span>
        </div>
      </div>
    </header>
  );
};

export default Header;