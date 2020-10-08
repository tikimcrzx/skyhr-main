import React, { Component } from 'react';

const initData = {
    thumb_1: "img/avatar_3.png",
    thumb_2: "img/avatar_2.png"
}

const reviewData = [
    {
        image: "/img/avatar_1.png",
        name: "John Doe",
        address: "Los Angeles, California",
        icon_1: "fas fa-star",
        icon_2: "fas fa-star",
        icon_3: "fas fa-star",
        icon_4: "fas fa-star",
        icon_5: "far fa-star",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam rem sunt nulla ducimus expedita, incidunt laborum assumenda. Deleniti iste placeat nostrum incidunt rem laudantium, sapiente, cum, molestias unde, quidem labore."
    },
    {
        image: "/img/avatar_2.png",
        name: "Jassica William",
        address: "Los Angeles, California",
        icon_1: "fas fa-star",
        icon_2: "fas fa-star",
        icon_3: "fas fa-star",
        icon_4: "fas fa-star",
        icon_5: "fas fa-star",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam rem sunt nulla ducimus expedita, incidunt laborum assumenda. Deleniti iste placeat nostrum incidunt rem laudantium, sapiente, cum, molestias unde, quidem labore."
    },
    {
        image: "/img/avatar_3.png",
        name: "Johnson Smith",
        address: "Los Angeles, California",
        icon_1: "fas fa-star",
        icon_2: "fas fa-star",
        icon_3: "fas fa-star",
        icon_4: "fas fa-star",
        icon_5: "far fa-star",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam rem sunt nulla ducimus expedita, incidunt laborum assumenda. Deleniti iste placeat nostrum incidunt rem laudantium, sapiente, cum, molestias unde, quidem labore."
    }
]

class Review extends Component {
    state = {
        initData: {},
        data: [],
    }
    componentDidMount(){
        this.setState({
            initData: initData,
            data: reviewData
        })
    }
    render() {
        return (
            <section className="section testimonial-area ptb_100">
                <div className="shapes-container">
                    <div className="shape bg-shape" />
                </div>
                <div className="container text-center">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-12 col-md-8">
                            <div className="testimonials owl-carousel">
                                {/* Single Testimonial */}
                                {this.state.data.map((item, idx) => {
                                    return(
                                        <div key={`ro_${idx}`} className="single-testimonial p-3 p-md-5">
                                            <img src={item.image} className="mx-auto d-block" alt="" />
                                            {/* Client Name */}
                                            <h3 className="client-name mt-4 mb-2">{item.name}</h3>
                                            {/* Client Address */}
                                            <h5 className="client-address fw-4">{item.address}</h5>
                                            {/* Client Rating */}
                                            <div className="client-rating mt-2 mb-3">
                                                <i className={item.icon_1} />
                                                <i className={item.icon_2} />
                                                <i className={item.icon_3} />
                                                <i className={item.icon_4} />
                                                <i className={item.icon_5} />
                                            </div>
                                            {/* Client Description */}
                                            <div className="client-description">
                                                {/* Client Text */}
                                                <div className="client-text">
                                                    <p>{item.text}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            {/* Single Testimonial Thumb */}
                            <div className="single-testimonial-thumb d-none d-md-block">
                                {/* Thumb Prev */}
                                <div className="thumb-prev">
                                    <span>
                                        <img src={this.state.initData.thumb_1} alt="" />
                                    </span>
                                </div>
                                {/* Thumb Next */}
                                <div className="thumb-next">
                                    <span>
                                        <img src={this.state.initData.thumb_2} alt="" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Review;
