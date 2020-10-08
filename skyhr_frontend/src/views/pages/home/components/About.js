import React, { Component } from 'react';
import axios from 'axios';

const BASE_URL = "https://my-json-server.typicode.com/themeland/appo-json/themeOneAboutSection";

class About extends Component {
    state = {
        data: {},
        aboutData: []
    }
    componentDidMount(){
        axios.get(`${BASE_URL}`)
            .then(res => {
                this.setState({
                    data: res.data,
                    aboutData: res.data.aboutData
                })
            })
        .catch(err => console.log(err))
    }
    render() {
        return (
            <section className="section about-app-area ptb_100">
                <div className="shapes-container">
                    <div className="shape-1" />
                </div>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-12 col-lg-6">
                            {/* About Text */}
                            <div className="about-text">
                                {/* Headings */}
                                <div className="headings d-flex align-items-center mb-4">
                                    <span className="text-uppercase d-none d-sm-block">{this.state.data.headingSpan}</span>
                                    <h2 className="text-capitalize">{this.state.data.heading}</h2>
                                </div>
                                <p className="my-3">{this.state.data.headingText}</p>
                                <p className="d-none d-sm-block my-3">{this.state.data.headingTextTwo}</p>
                                {/* Store Buttons */}
                                <div className="button-group store-buttons">
                                    {this.state.aboutData.map((item, idx) => {
                                        return(
                                            <a key={`ao_${idx}`} href="/" className={item.linkClass}>
                                                <i className={item.iconClass} />
                                                <p className="dsp-tc">{item.iconText}
                                                    <br /> <span>{item.iconSpan}</span></p>
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6">
                            {/* About Thumb */}
                            <div className="about-thumb text-center d-none d-lg-block">
                                <img src={this.state.data.aboutThumb} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default About;
