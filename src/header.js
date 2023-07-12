import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './header.css';
import Home from './components/home';
import User from './components/user'
import LogAdmin from './login/logadmin';
import AddProduct from './CRUD/addProduct';
import { useNavigate } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const [showLogin, setShowLogin] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const navigate = useNavigate();

  useEffect(() => {
    setShowLogin(location.pathname === '/login');
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
      sidebarToggle.addEventListener('click', (event) => {
        event.preventDefault();
        document.body.classList.toggle('sb-sidenav-toggled');
        localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
      });
    }
  }, []); // Empty dependency array to ensure the effect runs only once

  const handleAddProduct = () => {
    setCurrentPage('add-product');
  };
  const handleUser = () => {
    setCurrentPage('user');
  }
  return (
    <header className="sb-nav-fixed">
      {showLogin ? (
        <LogAdmin />
      ) : (
        <>
          <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <a className="navbar-brand ps-3" href="/">
              Electro Mart
            </a>
            <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!">
              <i className="fas fa-bars"></i>
            </button>
            <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
              <div className="input-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Search for..."
                  aria-label="Search for..."
                  aria-describedby="btnNavbarSearch"
                />
                <button className="btn btn-primary" id="btnNavbarSearch" type="button">
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </form>
          </nav>
          <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
              <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div className="sb-sidenav-menu">
                  <div className="nav">
                    <div className="sb-sidenav-menu-heading">Core</div>
                    <a className="nav-link" href="/">
                      <div className="sb-nav-link-icon">
                        <i className="fas fa-tachometer-alt"></i>
                      </div>
                      Dashboard
                    </a>
                    <a
                      className="nav-link collapsed"
                      href="/"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapsePages"
                      aria-expanded="false"
                      aria-controls="collapsePages"
                    >
                      <div className="sb-nav-link-icon">
                        <i className="fas fa-book-open"></i>
                      </div>
                      Pages
                      <div className="sb-sidenav-collapse-arrow">
                        <i className="fas fa-angle-down"></i>
                      </div>
                    </a>
                    <div className="collapse" id="collapsePages" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                      <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                        <a
                          className="nav-link collapsed"
                          href="#"
                          data-bs-toggle="collapse"
                          data-bs-target="#pagesCollapseAuth"
                          aria-expanded="false"
                          aria-controls="pagesCollapseAuth"
                        >
                          Authentication
                          <div className="sb-sidenav-collapse-arrow">
                            <i className="fas fa-angle-down"></i>
                          </div>
                        </a>
                        <div className="collapse" id="pagesCollapseAuth" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                          <nav className="sb-sidenav-menu-nested nav">
                              <a className="nav-link" type='submit' onClick={handleLogout} >
                                Logout
                              </a>
                          </nav>
                        </div>
                        <a
                          className="nav-link collapsed"
                          href="#"
                          data-bs-toggle="collapse"
                          data-bs-target="#pagesCollapseError"
                          aria-expanded="false"
                          aria-controls="pagesCollapseError"
                        >
                          CRUD
                          <div className="sb-sidenav-collapse-arrow">
                            <i className="fas fa-angle-down"></i>
                          </div>
                        </a>
                        <div className="collapse" id="pagesCollapseError" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                          <nav className="sb-sidenav-menu-nested nav">
                            <a className="nav-link" type='submit' onClick={handleAddProduct}>
                              Add Product
                            </a>
                          </nav>
                          <nav className="sb-sidenav-menu-nested nav">
                            <a className="nav-link" type='submit' onClick={handleUser}>
                              User
                            </a>
                          </nav>
                        </div>
                      </nav>
                    </div>
                    <div className="sb-sidenav-menu-heading">Addons</div>
                    <a className="nav-link" href="charts.html">
                      <div className="sb-nav-link-icon">
                        <i className="fas fa-chart-area"></i>
                      </div>
                      Charts
                    </a>
                    <a className="nav-link" href="tables.html">
                      <div className="sb-nav-link-icon">
                        <i className="fas fa-table"></i>
                      </div>
                      Tables
                    </a>
                  </div>
                </div>
                <div className="sb-sidenav-footer">
                  <div className="small">Logged in as:</div>
                  Start Bootstrap
                </div>
              </nav>
            </div>
            {currentPage === 'home' ? <Home /> : null}
            {currentPage === 'add-product' ? <AddProduct /> : null}
            {currentPage === 'user' ? <User /> : null}
          </div>
        </>
      )}
    </header>
  );
}

export default Header;
