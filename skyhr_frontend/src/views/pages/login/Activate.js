import React, { Component } from 'react';
import ScrollUp from './components/ScrollUp';
// import Footer from './components/Footer';
import ActivateSection from "./components/ActivateSection";

class Activate extends Component {
  render() {
    let token = this.props.match.params.token;
    return (
      <div>
        <ScrollUp />
        <div className="all-area">
          <ActivateSection token={token} history={this.props.history} />
          {/*<Footer />*/}
        </div>
      </div>
    );
  }
}

export default Activate;
