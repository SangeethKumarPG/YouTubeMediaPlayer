import React from "react";
import { Nav } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <div>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            {/* <img
                  alt=""
                  src="/img/logo.svg"
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                />{' '} */}
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              <i className="fa-solid fa-video text-warning"></i>
              &nbsp;Media Player
            </Link>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link>
              <NavLink
                to="/home"
                style={{ textDecoration: "none", color: "black" }}
              >
                home
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink
                to="/watch"
                style={{ textDecoration: "none", color: "black" }}
              >
                history
              </NavLink>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
