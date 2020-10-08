import React, { Component } from 'react';

const initData = {
    heading: "Start your 14 days free trial",
    content: "No Credit card required",
    btnText: "Get Started"
}

class Subscribe extends Component {
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
            <section className="start-free-area">
                <div className="container">
                    <div className="col-12">
                    {/* Start Free Content */}
                    <div className="start-free-content d-flex flex-wrap align-items-center justify-content-center justify-content-lg-between shadow-lg" data-aos="fade-up">
                        {/* Start Free Content */}
                        <div className="start-free-text">
                        <h2 className="mb-2">{this.state.initData.heading}</h2>
                        <span>{this.state.initData.content}</span>
                        </div>
                        {/* Start Free Button */}
                        <div className="start-free-btn mt-4 mt-lg-0">
                        <a href="/" className="btn btn-bordered"><span>{this.state.initData.btnText}</span></a>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Subscribe;
