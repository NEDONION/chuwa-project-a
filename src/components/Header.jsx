import React, { useState, useEffect } from "react";
import "./Header.css";
import Picture1 from "../assets/picture1.png"; // User icon
import Picture2 from "../assets/picture2.png"; // Cart icon
import Picture3 from "../assets/picture3.png"; // Search icon
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { useSelector, useDispatch } from "react-redux";
import { isSignedIn, setRole, setName } from "../actions/authAction";
import Cart from "./Cart";
import { Menu, MenuItem } from '@mui/material';

const Header = ({ onSearch }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook for navigation
  const signedIn = useSelector((state) => state.auth.signedIn);
  const userName = useSelector((state) => state.auth.name);
  const [cartOpen, setCartOpen] = useState(false); // State for cart modal visibility
  const [subtotal, setSubtotal] = useState(0); // State for cart subtotal
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [anchorEl, setAnchorEl] = useState(null);

  // Function to calculate the subtotal from cart
  const calculateSubtotal = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setSubtotal(total);
  };

  // Listen to "cartUpdate" custom event to update subtotal in real-time
  useEffect(() => {
    calculateSubtotal(); // Calculate subtotal on component mount

    const handleCartUpdate = () => {
      calculateSubtotal();
    };

    // Add event listener for "cartUpdate" event
    window.addEventListener("cartUpdate", handleCartUpdate);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("cartUpdate", handleCartUpdate);
    };
  }, []);

  const handleUserMenuClick = (event) => {
    if (!signedIn) {
      navigate("/signin");
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    dispatch({ type: 'TOGGLE_SIGN_IN', payload: false });
    dispatch(setRole(null));
    dispatch(setName(''));
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("cart");
    handleMenuClose();
    navigate("/");
  };

  // Handle "Cart" click to open or close the cart
  const handleCartClick = () => {
    setCartOpen(!cartOpen);
  };

  // Handle search query submission
  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery); // Pass search query to parent component
    }
  };

  return (
    <>
      <header className="header">
        <div className="header-left">
          <h1 onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            Management <span>Chuwa</span>
          </h1>
        </div>

        <div className="header-middle">
          <input
            type="text"
            className="search-bar"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query
          />
          <button className="search-button" onClick={handleSearch}>
            <img src={Picture3} alt="Search Icon" className="icon" />
          </button>
        </div>

        <div className="header-right">
          <div className="user" onClick={handleUserMenuClick}>
            <img src={Picture1} alt="User Icon" className="icon" />
            {signedIn ? <span>{userName}</span> : <span>Sign In</span>}
          </div>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem disabled>Hi, {userName}</MenuItem>
            <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
          </Menu>
          <div className="cart" onClick={handleCartClick}>
            <img src={Picture2} alt="Cart Icon" className="icon" />
            <span>${subtotal.toFixed(2)}</span> {/* Display subtotal */}
          </div>
        </div>
      </header>
      {/* Cart Modal */}
      {cartOpen && <Cart onClose={() => setCartOpen(false)} />}
    </>
  );
};

export default Header;