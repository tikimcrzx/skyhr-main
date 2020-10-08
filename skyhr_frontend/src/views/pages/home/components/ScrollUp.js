import React, { Component } from 'react';

const initData = {
    iconClass: "icofont-bubble-up"
}

class ScrollUp extends Component {
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
            <div id="scrollUp" title="Scroll To Top">
                <i className={this.state.initData.iconClass} />
            </div>
        );
    }
}

export default ScrollUp;
