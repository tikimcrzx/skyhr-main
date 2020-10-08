import React, {Component} from "react"
import {connect} from "react-redux"

import ScrollUp from "./components/ScrollUp"
import Header from "./components/Header"
import Welcome from "./components/Welcome"
import PromoOne from "./components/PromoOne"
import About from "./components/About"
import Work from "./components/Work"
import Feature from "./components/Feature"
import Screenshot from "./components/Screenshot"
import Pricing from "./components/Pricing"
import Review from "./components/Review"
import Team from "./components/Team"
import Subscribe from "./components/Subscribe"
import Download from "./components/Download"
import Blog from "./components/Blog"
import Contact from "./components/Contact"
import Footer from "./components/Footer"

import {isAuthenticated} from "../../../services/auth"
// import '../../../scss/landing/style.css';

class Index extends Component {

  componentDidMount() {
    if (this.props.isAuthenticated)
      this.redirectToDashboard()
  }

  redirectToDashboard = () => {
    this.props.history.push('/dashboard')
  }

  render() {
    if (this.props.isAuthenticated)
      return null

    return (
      <div className="italy">
        <ScrollUp/>
        <div className="all-area">
          <Header imageData={"/img/logo-white.png"}/>
          <Welcome/>
          <PromoOne/>
          <About/>
          <Work/>
          <Feature/>
          <Screenshot/>
          <Pricing/>
          <Review/>
          <Team/>
          <Subscribe/>
          <Download/>
          <Blog/>
          <Contact/>
          <Footer/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: isAuthenticated()
})

export default connect(mapStateToProps, null)(Index)
