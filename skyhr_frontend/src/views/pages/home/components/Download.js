import React, { Component } from 'react';
import axios from 'axios';

const BASE_URL = "https://my-json-server.typicode.com/themeland/appo-json-1/themeOneDownloadSection";

class Download extends Component {
    state = {
        data: {},
        downloadData: []
    }
    componentDidMount(){
        axios.get(`${BASE_URL}`)
            .then(res => {
                this.setState({
                    data: res.data,
                    downloadData: res.data.downloadData
                })
            })
        .catch(err => console.log(err))
    }
    render() {
        return (
            <section className="section download-area ptb_100">
                {/* Shapes Container */}
                <div className="shapes-container d-none d-sm-block">
                    <div className="shape-2" />
                    <div className="shape-3" />
                </div>
                <div className="container">
                    <div className="row justify-content-center">
                    <div className="col-12 col-md-10 col-lg-8">
                        {/* Download Text */}
                        <div className="download-text text-center">
                            <h2>{this.state.data.heading}</h2>
                            <p className="my-3">{this.state.data.headingText}</p>
                            <p className="d-none d-sm-block my-3">{this.state.data.headingTextTwo}</p>
                            {/* Store Buttons */}
                            <div className="button-group store-buttons">
                                {this.state.downloadData.map((item, idx) => {
                                    return(
                                        <a key={`do_${idx}`} href="/" className={item.linkClass}>
                                            <i className={item.iconClass} />
                                            <p className="dsp-tc">{item.iconText}
                                                <br /> <span>{item.iconSpan}</span></p>
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Download;
