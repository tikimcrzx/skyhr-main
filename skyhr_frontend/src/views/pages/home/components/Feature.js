import React, { Component } from 'react';
import CounterSection from './Counter';
import axios from 'axios';

const BASE_URL = "https://my-json-server.typicode.com/themeland/appo-json/themeOneFeaturesSection";

class Feature extends Component {
    state = {
        data: {},
        featuresData: []
    }
    componentDidMount(){
        axios.get(`${BASE_URL}`)
            .then(res => {
                this.setState({
                    data: res.data,
                    featuresData: res.data.featuresData
                })
            })
        .catch(err => console.log(err))
    }
    render() {
        return (
            <section id="features" className="section features-area ptb_100">
                <div className="shapes-container">
                    <div className="shape bg-shape" />
                </div>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-12 col-md-6 col-lg-6">
                            <div className="features-text">
                                {/* Headings */}
                                <div className="headings d-flex align-items-center mb-4">
                                    <span className="text-uppercase d-none d-sm-block">{this.state.data.headingSpan}</span>
                                    <h2 className="text-capitalize">{this.state.data.heading}</h2>
                                </div>
                                <p className="my-3">{this.state.data.headingText}</p>
                                {/* Counter List */}
                                <CounterSection />
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-5 offset-lg-1">
                            {/* Featured Items */}
                            <div className="featured-items">
                                <ul>
                                    {this.state.featuresData.map((item, idx) => {
                                        return(
                                            <li key={`fo_${idx}`}>
                                                {/* Single Features Item */}
                                                <div className="single-features media p-3">
                                                    {/* Features Title */}
                                                    <div className="features-title mr-3">
                                                        <img src={item.featureImage} alt="" />
                                                    </div>
                                                    {/* Features Text */}
                                                    <div className="features-text media-body">
                                                        <h3>{item.featuretitle}</h3>
                                                        <p>{item.featureText}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Feature;
