import React, { useState, useEffect } from "react";
import "./Header.css";
import Picture1 from "../assets/picture1.png"; // User icon
import Picture2 from "../assets/picture2.png"; // Cart icon
import Picture3 from "../assets/picture3.png"; // Search icon
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { useSelector, useDispatch } from "react-redux";
import { isSignedIn, setRole } from "../actions/authAction";
import Cart from "./Cart";

const Header = ({ onSearch }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook for navigation
  const signedIn = useSelector((state) => state.auth.signedIn);
  const [cartOpen, setCartOpen] = useState(false); // State for cart modal visibility
  const [subtotal, setSubtotal] = useState(0); // State for cart subtotal
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

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

  // Handle "Sign In" click to navigate to the sign-in page
  const handleSignInClick = () => {
    if (!signedIn) {
      // when not signed in, navigate to the Sign In page
      navigate("/signin");
    } else {
      // when signed in, sign out the user
      dispatch(isSignedIn()); // Update the signed-in status in the Redux store
      dispatch(setRole(null)); // Clear the user's role in Redux store
  
      // Clear user data from localStorage
      localStorage.removeItem("authToken");
      localStorage.removeItem("userId"); // Optionally clear user ID from localStorage
      localStorage.removeItem("cart"); // Optionally clear cart data
  
      // Redirect to home page or any other page if necessary
      navigate("/"); // Optionally navigate to the homepage or another page
    }
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
          <div className="user" onClick={handleSignInClick}>
            <img src={Picture1} alt="User Icon" className="icon" />
            {signedIn ? <span>Sign Out</span> : <span>Sign In</span>}
          </div>
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