import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

const authenticatedOptions = (
  <Fragment>
    <NavDropdown title="Account" id="dd-auth-account">
      <NavDropdown.Item href="#sign-out">Sign Out</NavDropdown.Item>
      <NavDropdown.Item href="#change-password">Change Password</NavDropdown.Item>
    </NavDropdown>
    <NavDropdown title="Create A Spread" id="dd-spreads">
      <NavDropdown.Item href="#create-scs">Single Card</NavDropdown.Item>
      <NavDropdown.Item href="#create-3cs">Three Card</NavDropdown.Item>
      <NavDropdown.Item href="#create-ccs">Celtic Cross</NavDropdown.Item>
    </NavDropdown>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <NavDropdown title="Account" id="dd-unauth-account">
      <NavDropdown.Item href="#sign-up">Sign Up</NavDropdown.Item>
      <NavDropdown.Item href="#sign-in">Sign In</NavDropdown.Item>
    </NavDropdown>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
    <NavDropdown title="About..." id="dd-about">
      <NavDropdown.Item href="#tarot-generally">...Tarot, Generally</NavDropdown.Item>
      <NavDropdown.Item href="#major-arcana">...Reading the Major Arcana</NavDropdown.Item>
      <NavDropdown.Item href="#minor-arcana">...Reading the Minor Arcana</NavDropdown.Item>
    </NavDropdown>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar bg="primary" variant="dark" expand="md">
    <Navbar.Brand href="#">
      What&apos;s Next?
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav>
        { user && <span className="navbar-text mr-2 ml-auto">Welcome, {user.email}</span>}
        { alwaysOptions }
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
