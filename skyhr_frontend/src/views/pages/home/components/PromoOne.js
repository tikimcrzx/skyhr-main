import React, { Component } from 'react';
import axios from 'axios';

const BASE_URL = "https://my-json-server.typicode.com/themeland/appo-json/themeOnePromoSection";

class PromoOne extends Component {
    state = {
        data: {},
        promoData: []
    }
    componentDidMount(){
        axios.get(`${BASE_URL}`)
            .then(res => {
                this.setState({
                    data: res.data,
                    promoData: res.data.promoData
                })
            })
        .catch(err => console.log(err))
    }
    render() {
        return (
            <section id="benifits" className="section benifits-area ptb_100">
                <div className="container">
                    <div className="row">
                        {/* Benifits Item */}
                        {this.state.promoData.map((item, idx) => {
                            return(
                                <div key={`po_${idx}`} className="col-12 col-sm-6 col-md-4 col-lg-3" data-aos="fade-up">
                                    <div className="benifits-item text-center p-3">
                                        <div className="feature-icon">
                                            <img src={item.promoImage} alt="" />
                                        </div>
                                        {/* Benifits Text */}
                                        <div className="benifits-text">
                                            <h3 className="mb-2">{item.promoTitle}</h3>
                                            <p>{item.promoText}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        );
    }
}

export default PromoOne;
