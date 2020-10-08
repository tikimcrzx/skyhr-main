import React, { Component } from 'react';

const initData = {
    heading: "Few steps to Setup",
    headingText: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.",
    headingTextTwo: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati."
}

const imgData = [
    {
        image: "/img/screenshot_1.png"
    },
    {
        image: "/img/screenshot_2.png"
    },
    {
        image: "/img/screenshot_3.png"
    },
    {
        image: "/img/screenshot_4.png"
    }
]

const workData = [
    {
        linkClass: "pager-item active",
        title: "Install",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae fugit labore delectus odio nisi eaque?"
    },
    {
        linkClass: "pager-item",
        title: "Register",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae fugit labore delectus odio nisi eaque?"
    },
    {
        linkClass: "pager-item",
        title: "Setup profile",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae fugit labore delectus odio nisi eaque?"
    },
    {
        linkClass: "pager-item",
        title: "Done",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae fugit labore delectus odio nisi eaque?"
    }
]

class Work extends Component {
    state = {
        initData: {},
        data: [],
        workData: []
    }
    componentDidMount(){
        this.setState({
            initData: initData,
            data: imgData,
            workData: workData
        })
    }
    render() {
        return (
            <section className="section work-area ptb_100">
                {/* Work Slider Wrapper */}
                <div className="work-wrapper d-none d-md-block">
                    <div className="work-slider-wrapper" data-aos="zoom-in">
                        {/* Work Slider */}
                        <ul className="work-slider owl-carousel">
                            {this.state.data.map((item, idx) => {
                                return(
                                    <li key={`wd_${idx}`} className="slide-item">
                                        <img src={item.image} alt="" />
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
                <div className="container">
                    <div className="row justify-content-center d-md-none">
                        {/* Section Heading */}
                        <div className="col-12 col-md-10 col-lg-6">
                            {/* Section Heading */}
                            <div className="section-heading text-center">
                                <h2 className="text-capitalize">{this.state.initData.heading}</h2>
                                <p className="d-none d-sm-block mt-4">{this.state.initData.headingText}</p>
                                <p className="d-block d-sm-none mt-4">{this.state.initData.headingTextTwo}</p>
                            </div>
                        </div>
                    </div>
                    {/* Work Content */}
                    <div className="row justify-content-end justify-content-lg-between work-content" id="work-slider-pager">
                        {this.state.workData.map((item, idx) => {
                            return(
                                <div key={`wdo_${idx}`} className="col-12 col-sm-6">
                                    <a href="/" className={item.linkClass}>
                                    {/* Single Work */}
                                    <div className="single-work d-inline-block text-center p-4">
                                        <h3 className="mb-2">{item.title}</h3>
                                        <p>{item.text}</p>
                                    </div>
                                    </a>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        );
    }
}

export default Work;
