import React, { useState } from "react";
import "./Header.css";
import Picture1 from "../assets/picture1.png"; // User icon
import Picture2 from "../assets/picture2.png"; // Cart icon
import Picture3 from "../assets/picture3.png"; // Search icon
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { useSelector, useDispatch } from "react-redux";
import { isSignedIn } from "../actions/authAction";
import Cart from "./Cart";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook for navigation
  const signedIn = useSelector((state) => state.auth.signedIn);
  const [cartOpen, setCartOpen] = useState(false); //

  // Handle "Sign In" click to navigate to the sign-in page
  const handleSignInClick = () => {
    if (!signedIn) {
      // when not sign in, click "sign in" button, navigate to the Sign In page
      navigate("/signin");
    } else {
      // when in sign-in status, click "sign out" button
      dispatch(isSignedIn()); // button change to "sign in"
      localStorage.removeItem("authToken");
    }
  };

  // Handle "Cart" click to open or close the cart
  const handleCartClick = () => {
    setCartOpen(!cartOpen);
  };

  return (
    <>
      <header className="header">
        <div className="header-left">
          <h1>
            Management <span>Chuwa</span>
          </h1>
        </div>

        <div className="header-middle">
          <input type="text" className="search-bar" placeholder="Search" />
          <button className="search-button">
            <img src={Picture3} alt="Search Icon" className="icon" />
          </button>
        </div>

        <div className="header-right">
          {/* Add the cursor style through CSS */}
          <div className="user" onClick={handleSignInClick}>
            <img src={Picture1} alt="User Icon" className="icon" />
            {signedIn ? <span>Sign Out</span> : <span>Sign In</span>}
          </div>
          <div className="cart" onClick={handleCartClick}>
            <img src={Picture2} alt="Cart Icon" className="icon" />
            <span>$0.00</span>
          </div>
        </div>
      </header>
      {/* Cart Modal */}
      {cartOpen && <Cart onClose={() => setCartOpen(false)} />}
    </>
  );
};

export default Header;
