import React, { Component } from 'react';
import axios from 'axios';

const BASE_URL = "https://my-json-server.typicode.com/themeland/appo-json-2/themeOneFooterSection";

class Footer extends Component {
    state = {
        data: {},
        iconList: [],
        footerList_1: [],
        footerList_2: [],
        footerList_3: []
    }
    componentDidMount(){
        axios.get(`${BASE_URL}`)
            .then(res => {
                this.setState({
                    data: res.data,
                    iconList: res.data.iconList,
                    footerList_1: res.data.footerList_1,
                    footerList_2: res.data.footerList_2,
                    footerList_3: res.data.footerList_3
                })
            })
        .catch(err => console.log(err))
    }
    render() {
        return (
            <footer className="section footer-area footer-bg">
                {/* Footer Top */}
                <div className="footer-top ptb_100">
                    <div className="container">
                    <div className="row">
                        <div className="col-12 col-sm-6 col-lg-3">
                        {/* Footer Items */}
                        <div className="footer-items">
                            {/* Logo */}
                            <a className="navbar-brand" href="/">
                            <img className="logo" src={this.state.data.image} alt="" />
                            </a>
                            <p className="text-white-50 mt-2 mb-3">{this.state.data.text}</p>
                            {/* Social Icons */}
                            <div className="social-icons d-flex">
                                {this.state.iconList.map((item, idx) => {
                                    return(
                                        <a key={`sil_${idx}`} className={item.link} href="/">
                                            <i className={item.iconClass} />
                                            <i className={item.iconClass} />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3">
                        {/* Footer Items */}
                        <div className="footer-items">
                            {/* Footer Title */}
                            <h3 className="footer-title text-white mb-2">{this.state.data.linkText_1}</h3>
                            <ul>
                                {this.state.footerList_1.map((item, idx) => {
                                    return(
                                        <li key={`flo_${idx}`} className="py-2"><a className="text-white-50" href="/">{item.text}</a></li>
                                    );
                                })}
                            </ul>
                        </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3">
                        {/* Footer Items */}
                        <div className="footer-items">
                            {/* Footer Title */}
                            <h3 className="footer-title text-white mb-2">{this.state.data.linkText_2}</h3>
                            <ul>
                                {this.state.footerList_2.map((item, idx) => {
                                    return(
                                        <li key={`flo_${idx}`} className="py-2"><a className="text-white-50" href="/">{item.text}</a></li>
                                    );
                                })}
                            </ul>
                        </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3">
                        {/* Footer Items */}
                        <div className="footer-items">
                            {/* Footer Title */}
                            <h3 className="footer-title text-white mb-2">{this.state.data.linkText_3}</h3>
                            <ul>
                                {this.state.footerList_3.map((item, idx) => {
                                    return(
                                        <li key={`flo_${idx}`} className="py-2"><a className="text-white-50" href="/">{item.text}</a></li>
                                    );
                                })}
                            </ul>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                {/* Footer Bottom */}
                <div className="footer-bottom">
                    <div className="container">
                    <div className="row">
                        <div className="col-12">
                        {/* Copyright Area */}
                        <div className="copyright-area d-flex flex-wrap justify-content-center justify-content-sm-between text-center py-4">
                            {/* Copyright Left */}
                            <div className="copyright-left text-white-50">&copy; {this.state.data.copyrightText}</div>
                            {/* Copyright Right */}
                            <div className="copyright-right text-white-50">Made with <i className="icofont-heart-alt" /> By <a className="text-white-50" href="/">Theme Land</a></div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
