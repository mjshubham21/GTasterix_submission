import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom"
import { Container, Nav, Navbar } from "react-bootstrap";

const NavBar = () => {
  const navigate = useNavigate();
  const linkStyle = {
    color: 'white',
    marginRight: '15px',
    textDecoration: 'none',
  };

  // Check if the user is logged using jwt
  const isLoggedIn = localStorage.getItem('token');

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');  // Remove the token from localStorage
    navigate('/login');
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className='sticky-top shadow'>
        <Container>
          <Link to="/" style={linkStyle} className='navbar-brand'>GTasteriX</Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/" style={linkStyle}>Home</Link>

              {/* Conditional rendering based on whether the user is logged in */}
              {isLoggedIn ? (
                // If logged in, show Logout
                <Link to="#" style={linkStyle} onClick={handleLogout}>Logout</Link>
              ) : (
                // If not logged in, show Login and Register
                <>
                  <Link to="/login" style={linkStyle}>Login</Link>
                  <Link to="/register" style={linkStyle}>Register</Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default NavBar;