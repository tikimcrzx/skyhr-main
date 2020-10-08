import React, { Component } from 'react';
import axios from 'axios';

const BASE_URL = "https://my-json-server.typicode.com/themeland/appo-json-2/themeOneContactSection";

class Contact extends Component {
    state = {
        data: {}
    }
    componentDidMount(){
        axios.get(`${BASE_URL}`)
            .then(res => {
                this.setState({
                    data: res.data
                })
            })
        .catch(err => console.log(err))
    }
    render() {
        return (
            <section id="contact" className="contact-area bg-gray ptb_100">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-10 col-lg-6">
                            {/* Section Heading */}
                            <div className="section-heading text-center">
                                <h2 className="text-capitalize">{this.state.data.heading}</h2>
                                <p className="d-none d-sm-block mt-4">{this.state.data.headingText}</p>
                                <p className="d-block d-sm-none mt-4">{this.state.data.headingTextTwo}</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            {/* Contact Box */}
                            <div className="contact-box text-center">
                            {/* Contact Form */}
                            <form id="contact-form" method="POST" action="">
                                <div className="row">
                                    <div className="col-12 col-md-6">
                                        <div className="form-group">
                                        <input type="text" className="form-control" name="name" placeholder="Name" required="required" />
                                        </div>
                                        <div className="form-group">
                                        <input type="email" className="form-control" name="email" placeholder="Email" required="required" />
                                        </div>
                                        <div className="form-group">
                                        <input type="text" className="form-control" name="subject" placeholder="Subject" required="required" />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="form-group">
                                        <textarea className="form-control" name="message" placeholder="Message" required="required" defaultValue={""} />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button className="btn btn-bordered mt-3 mt-sm-4" type="submit">Send Message</button>
                                    </div>
                                </div>
                            </form>
                            <p className="form-message" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Contact;
