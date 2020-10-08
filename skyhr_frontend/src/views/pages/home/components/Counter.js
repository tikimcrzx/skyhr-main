import React, { Component } from 'react';

const counterData = [
    {
        iconClass: "icofont-repair",
        count: "2350",
        text: "Users"
    },
    {
        iconClass: "icofont-heart-alt",
        count: "1895",
        text: "Accounts"
    },
    {
        iconClass: "icofont-beard",
        count: "1580",
        text: "Developers"
    },
    {
        iconClass: "icofont-safety",
        count: "1358",
        text: "Download"
    }
]

class Counter extends Component {
    state = {
        data: []
    }
    componentDidMount(){
        this.setState({
            data: counterData
        })
    }
    render() {
        return (
            <div className="counter-list">
                <ul>
                    {this.state.data.map((item, idx) => {
                        return(
                            <li key={`cd_${idx}`}>
                                {/* Single Counter */}
                                <div className="single-counter px-4 py-3 text-center">
                                    {/* Counter Icon */}
                                    <div className="counter-icon">
                                        <i className={item.iconClass} />
                                    </div>
                                    {/* Counter Text */}
                                    <div className="counter-text">
                                        <span className="counter d-inline-block mt-3 mb-2">{item.count}</span>
                                        <h5>{item.text}</h5>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default Counter;
