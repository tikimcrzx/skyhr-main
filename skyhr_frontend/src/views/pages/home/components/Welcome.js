import React, { Component } from 'react';

const initData = {
    heading: "Skyhr",
    headingBadge: "v1.0",
    headingSpan: "Built for",
    content_1: "App Landing Page",
    content_2: "Software Landing Page",
    content_3: "Modern Web Design",
    content_4: "Product Landing",
    content_5: "Startup Business",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto beatae, asperiores tempore repudiandae saepe aspernatur unde voluptate sapiente quia ex.",
    btnText: "Buy Now",
    btnTextTwo: "Learn More"
}

class Welcome extends Component {
    state = {
        initData: {}
    }
    componentDidMount(){
        this.setState({
            initData: initData
        })
    }
    render() {
        return (
            <section id="home" className="section welcome-area d-flex align-items-center h-100vh pt-0">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        {/* Welcome Intro Start */}
                        <div className="col-12 col-md-10 col-lg-8">
                            <div className="welcome-intro text-center mt-0">
                                <h1 className="text-white">{this.state.initData.heading} <span className="badge badge-pill badge-light fw-4">{this.state.initData.headingBadge}</span></h1>
                                <h2 className="cd-headline clip fw-3 mt-2 mt-sm-3">
                                    <span className="text-white mr-2">{this.state.initData.headingSpan}</span>
                                    <span className="cd-words-wrapper">
                                        <b className="text-white is-visible">{this.state.initData.content_1}</b>
                                        <b className="text-white">{this.state.initData.content_2}</b>
                                        <b className="text-white">{this.state.initData.content_3}</b>
                                        <b className="text-white">{this.state.initData.content_4}</b>
                                        <b className="text-white">{this.state.initData.content_5}</b>
                                    </span>
                                </h2>
                                <p className="text-white my-3">{this.state.initData.text}</p>
                                <div className="button-group">
                                    <a href="/" className="btn btn-bordered-white"><span>{this.state.initData.btnText}</span></a>
                                    <a href="/" className="btn btn-bordered-white">{this.state.initData.btnTextTwo}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="shapes-container">
                    <div className="wave-animation">
                        {/* Wave Animation */}
                        <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                            <defs>
                                <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                            </defs>
                            <g className="parallax">
                                <use xlinkHref="#gentle-wave" x={48} y={0} fill="rgba(255,255,255,0.7" />
                                <use xlinkHref="#gentle-wave" x={48} y={3} fill="rgba(255,255,255,0.5)" />
                                <use xlinkHref="#gentle-wave" x={48} y={5} fill="rgba(255,255,255,0.3)" />
                                <use xlinkHref="#gentle-wave" x={48} y={7} fill="#fff" />
                            </g>
                        </svg>
                    </div>
                </div>
            </section>
        );
    }
}

export default Welcome;
