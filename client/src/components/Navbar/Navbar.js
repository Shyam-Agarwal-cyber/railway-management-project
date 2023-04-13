import React from "react";
import { useSelector } from "react-redux";
import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  if (user.name && !user.is_admin) {
    return (
      <div className="parent-container">
        <div className="navbar-container">
          <nav className="navbar">
            <ul className="nav-list">
              <Link to="/">
                <h3>Home</h3>
              </Link>
              <Link to="/profile">
                <h3>Profile</h3>
              </Link>
              <Link to="/logout">
                <h3>Logout</h3>
              </Link>
            </ul>
          </nav>
        </div>
        <hr className="nav-divider" />
      </div>
    );
  } else if (user.name && user.is_admin) {
    return (
      <div className="parent-container">
        <div className="navbar-container">
          <nav className="navbar">
            <ul className="nav-list">
              <Link to="/">
                <h3>Home</h3>
              </Link>
              <Link to="/admin">
                <h3>Admin Console</h3>
              </Link>
              <Link to="/profile">
                <h3>Profile</h3>
              </Link>
              <Link to="/viewallbookings">
                <h3>View All Bookings</h3>
              </Link>
              <Link to="/logout">
                <h3>Logout</h3>
              </Link>
            </ul>
          </nav>
        </div>
        <hr className="nav-divider" />
      </div>
    );
  }
  return (
    <div className="parent-container">
      <div className="navbar-container">
        <nav className="navbar">
          <ul className="nav-list">
            <Link to="/">
              <h3>Home</h3>
            </Link>
            <Link to="/login">
              <h3>Login</h3>
            </Link>
            <Link to="/signup">
              <h3>Sign Up</h3>
            </Link>
          </ul>
        </nav>
      </div>
      <hr className="nav-divider" />
    </div>
  );
};

export default Navbar;
