import React, { Component } from 'react';
import axios from 'axios';

const BASE_URL = "https://my-json-server.typicode.com/themeland/appo-json/themeOnePricingSection";

class Pricing extends Component {
    state = {
        data: {},
        priceData: []
    }
    componentDidMount(){
        axios.get(`${BASE_URL}`)
            .then(res => {
                this.setState({
                    data: res.data,
                    priceData: res.data.priceData
                })
            })
        .catch(err => console.log(err))
    }
    render() {
        return (
            <section id="pricing" className="section price-plan-area ptb_100">
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
                    <div className="row justify-content-center">
                        <div className="price-plan-wrapper">
                            {this.state.priceData.map((item, idx) => {
                                return(
                                    <div key={`pd_${idx}`} className={item.planClass}>
                                        <div className="price-header d-flex align-items-center justify-content-between my-4 px-3">
                                            <h4 className="plan-title text-uppercase">
                                            {item.planTitle}
                                            </h4>
                                            <div className="plan-cost">
                                                <span className="plan-price">{item.planPrice}</span>
                                                <span className="plan-type text-uppercase">{item.planPackage}</span>
                                            </div>
                                        </div>
                                        <ul className="plan-features pb-3">
                                            <li><i className="icofont-check" />{item.plan_li_1}</li>
                                            <li><i className="icofont-check" />{item.plan_li_2}</li>
                                            <li><i className="icofont-check" />{item.plan_li_2}</li>
                                            <li><i className="icofont-check" />{item.plan_li_4}</li>
                                            <li><i className="icofont-close" />{item.plan_li_5}</li>
                                            <li><i className="icofont-close" />{item.plan_li_6}</li>
                                        </ul>
                                        <div className="plan-select">
                                            <a className="btn btn-bordered text-uppercase" href="/">{item.btnText}</a>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Pricing;
