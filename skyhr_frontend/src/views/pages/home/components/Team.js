import React, { Component } from 'react';

const initData = {
    heading: "Meet our Team Experts",
    headingText: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.",
    headingTextTwo: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati."
}

const teamData = [
    {
        image: "/img/avatar_1.png",
        name: "Junaid Hasan",
        position: "Co-Founder & CEO",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt, ex quibusdam aliquid dicta a explicabo.",
    },
    {
        image: "/img/avatar_2.png",
        name: "Jassica William",
        position: "Web Developer",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt, ex quibusdam aliquid dicta a explicabo.",
    },
    {
        image: "/img/avatar_3.png",
        name: "John Deo",
        position: "ISO Developer",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt, ex quibusdam aliquid dicta a explicabo.",
    },
    {
        image: "/img/avatar_4.png",
        name: "Johnson Smith",
        position: "Android Developer",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt, ex quibusdam aliquid dicta a explicabo.",
    },
    {
        image: "/img/avatar_5.png",
        name: "Md. Arham",
        position: "Graphic Designer",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt, ex quibusdam aliquid dicta a explicabo.",
    }
]

const socialData = [
    {
        iconClass: "fab fa-facebook-f"
    },
    {
        iconClass: "fab fa-twitter"
    },
    {
        iconClass: "fab fa-google-plus-g"
    },
    {
        iconClass: "fab fa-instagram"
    },
    {
        iconClass: "fab fa-linkedin-in"
    }
]

class Team extends Component {
    state = {
        initData: {},
        data: [],
        socialData: []
    }
    componentDidMount(){
        this.setState({
            initData: initData,
            data: teamData,
            socialData: socialData
        })
    }
    render() {
        return (
            <section id="team" className="section team-area ptb_100">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-10 col-lg-6">
                            {/* Section Heading */}
                            <div className="section-heading text-center">
                                <h2 className="text-capitalize">{this.state.initData.heading}</h2>
                                <p className="d-none d-sm-block mt-4">{this.state.initData.headingText}</p>
                                <p className="d-block d-sm-none mt-4">{this.state.initData.headingTextTwo}</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {/* Team Slider */}
                        <div className="team-slider owl-carousel">
                            {/* Single Team */}
                            {this.state.data.map((item, idx) => {
                                return(
                                    <div key={`to_${idx}`} className="single-team text-center px-3 py-2 m-2">
                                        {/* Team Photo */}
                                        <div className="team-photo mx-auto">
                                            <img src={item.image} alt="" />
                                        </div>
                                        {/* Team Content */}
                                        <div className="team-content mt-2 mb-1">
                                            <h3 className="team-name mt-3 mb-2">{item.name}</h3>
                                            <h5 className="team-post mb-2">{item.position}</h5>
                                            <p className="team-description">{item.text}</p>
                                            {/* Team Media */}
                                            <div className="team-media mt-3">
                                                {this.state.socialData.map((item, idx) => {
                                                    return(
                                                        <a key={`sd_${idx}`} href="/">
                                                            <i className={item.iconClass} />
                                                        </a>
                                                    );
                                                })}
                                            </div>
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

export default Team;
