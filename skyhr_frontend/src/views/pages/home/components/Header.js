import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <header className="section header-area">
        <div id="appo-header" className="main-header-area nav-white">
          <div className="container-fluid">
            <nav className="navbar navbar-expand-md navbar-light">
              {/* Logo */}
              <a className="navbar-brand" href="/">
                <img className="logo" src={this.props.imageData} alt="" />
              </a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#appo-menu">
                <span className="navbar-toggler-icon" />
              </button>
              {/* Appo Menu */}
              <div className="collapse navbar-collapse" id="appo-menu">
                {/* Header Items */}
                <ul className="navbar-nav header-items ml-auto">
                  {/*<li className="nav-item active dropdown">*/}
                  {/*  <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown">*/}
                  {/*    Home*/}
                  {/*  </a>*/}
                  {/*  <div className="dropdown-menu mega-menu px-3 px-md-4 py-md-4">*/}
                  {/*    /!* Shapes Container *!/*/}
                  {/*    <div className="shapes-container d-none d-lg-block">*/}
                  {/*      <div className="shape-1" />*/}
                  {/*    </div>*/}
                  {/*    <div className="row">*/}
                  {/*      /!* Dropdown Headings *!/*/}
                  {/*      <div className="col-lg-3 dropdown-headings d-none d-lg-block">*/}
                  {/*        <span className="fw-6">Appo</span>*/}
                  {/*        <h5 className="text-uppercase my-2">Creative Design</h5>*/}
                  {/*        <p className="slag fw-5">Verified by developers &amp; Truted by tons of customers</p>*/}
                  {/*        <div className="dropdown-btn mt-3">*/}
                  {/*          <a href="/" className="btn btn-bordered">Get Started</a>*/}
                  {/*        </div>*/}
                  {/*      </div>*/}
                  {/*      <div className="col-12 col-md-4 col-lg-3">*/}
                  {/*        /!* Single Menu *!/*/}
                  {/*        <ul className="single-menu">*/}
                  {/*          <li className="page-title d-inline-block text-uppercase mb-2">Home Variations</li>*/}
                  {/*          <li><a className="dropdown-item" href="/">Homepage - Miami</a></li>*/}
                  {/*          <li><a className="dropdown-item" href="/theme-two">Homepage - Riga</a></li>*/}
                  {/*          <li><a className="dropdown-item" href="/theme-three">Homepage - Tokyo</a></li>*/}
                  {/*          <li><a className="dropdown-item" href="/theme-four">Homepage - Rome</a></li>*/}
                  {/*          <li><a className="dropdown-item" href="/theme-five">Homepage - Paris</a></li>*/}
                  {/*          <li><a className="dropdown-item" href="/theme-six">Homepage - London</a></li>*/}
                  {/*          <li><a className="dropdown-item" href="/theme-seven">Homepage - Seoul</a></li>*/}
                  {/*          <li><a className="dropdown-item" href="/theme-eight">Homepage - Moscow</a></li>*/}
                  {/*        </ul>*/}
                  {/*      </div>*/}
                  {/*      <div className="col-12 col-md-4 col-lg-3">*/}
                  {/*        /!* Single Menu *!/*/}
                  {/*        <ul className="single-menu">*/}
                  {/*          <li className="page-title d-inline-block text-uppercase mb-2">Inner Pages</li>*/}
                  {/*          <li><a className="dropdown-item" href="/theme-nine">Homepage - Italy <span className="badge badge-pill badge-warning ml-1">New</span></a></li>*/}
                  {/*          <li><a className="dropdown-item" href="/about-us">About Us</a></li>*/}
                  {/*          <li><a className="dropdown-item" href="/pricing">Pricing Plans</a></li>*/}
                  {/*          <li><a className="dropdown-item" href="/reviews">Testimonials</a></li>*/}
                  {/*          <li><a className="dropdown-item" href="/faq">FAQ</a></li>*/}
                  {/*          <li><a className="dropdown-item" href="/login">Login</a></li>*/}
                  {/*          <li><a className="dropdown-item" href="/signup">Register</a></li>*/}
                  {/*          <li><a className="dropdown-item" href="/download">Download</a></li>*/}
                  {/*        </ul>*/}
                  {/*      </div>*/}
                  {/*      <div className="col-12 col-md-4 col-lg-3">*/}
                  {/*        /!* Single Menu *!/*/}
                  {/*        <ul className="single-menu">*/}
                  {/*          <li className="page-title d-inline-block text-uppercase mb-2">Inner Pages</li>*/}
                  {/*          <li><a className="dropdown-item" href="/thankyou">Thank You</a></li>*/}
                  {/*          <li><a className="dropdown-item" href="/forgot">Forget Password</a></li>*/}
                  {/*          <li><a className="dropdown-item" href="/newsletter">Newsletter</a></li>*/}
                  {/*          <li><a className="dropdown-item" href="/error-one">Error v1.0</a></li>*/}
                  {/*          <li><a className="dropdown-item" href="/error-two">Error v2.0</a></li>*/}
                  {/*          <li><a className="dropdown-item" href="/contact">Contact</a></li>*/}
                  {/*          <li><a className="dropdown-item" href="/maintenance">Maintenance</a></li>*/}
                  {/*          <li><a className="dropdown-item" href="/coming-soon">Coming Soon</a></li>*/}
                  {/*        </ul>*/}
                  {/*      </div>*/}
                  {/*    </div>*/}
                  {/*  </div>*/}
                  {/*</li>*/}
                  {/*<li className="nav-item">*/}
                  {/*  <a className="nav-link scroll" href="#features">Features</a>*/}
                  {/*</li>*/}
                  {/*<li className="nav-item">*/}
                  {/*  <a className="nav-link scroll" href="#pricing">Pricing</a>*/}
                  {/*</li>*/}
                  {/*<li className="nav-item">*/}
                  {/*  <a className="nav-link scroll" href="#team">Team</a>*/}
                  {/*</li>*/}
                  {/*<li className="nav-item dropdown">*/}
                  {/*  <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown-2" role="button" data-toggle="dropdown">*/}
                  {/*    Blog*/}
                  {/*  </a>*/}
                  {/*  /!* Blog Menu *!/*/}
                  {/*  <div className="dropdown-menu mega-menu blog-menu px-3 py-md-3">*/}
                  {/*    <div className="row">*/}
                  {/*      <div className="col-12">*/}
                  {/*        <ul className="single-menu">*/}
                  {/*          <li><a className="dropdown-item" href="/blog-two-column">Blog - 2 Column</a></li>*/}
                  {/*          <li><a className="dropdown-item" href="/blog-three-column">Blog - 3 Column</a></li>*/}
                  {/*          <li><a className="dropdown-item" href="/blog-left-sidebar">Blog - Left Sidebar</a></li>*/}
                  {/*          <li><a className="dropdown-item" href="/blog-right-sidebar">Blog - Right Sidebar</a></li>*/}
                  {/*          <li><a className="dropdown-item" href="/blog-details-left-sidebar">Blog Details - Left Sidebar</a></li>*/}
                  {/*          <li><a className="dropdown-item" href="/blog-details-right-sidebar">Blog Details - Right Sidebar</a></li>*/}
                  {/*        </ul>*/}
                  {/*      </div>*/}
                  {/*    </div>*/}
                  {/*  </div>*/}
                  {/*</li>*/}
                  {/*<li className="nav-item">*/}
                  {/*  <a className="nav-link scroll" href="#contact">Contact</a>*/}
                  {/*</li>*/}
                  <li className="nav-item">
                    <a className="nav-link" href="/login">Login</a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
