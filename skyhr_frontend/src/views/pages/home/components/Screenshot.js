import React, { Component } from 'react';

class Screenshot extends Component {
  state = {
    data: [
      {
        image: "/img/screenshot_1.png",
        iconClass: "icofont-image"
      },
      {
        image: "/img/screenshot_2.png",
        iconClass: "icofont-image"
      },
      {
        image: "/img/screenshot_3.png",
        iconClass: "icofont-image"
      },
      {
        image: "/img/screenshot_4.png",
        iconClass: "icofont-image"
      },
      {
        image: "/img/screenshot_5.png",
        iconClass: "icofont-image"
      }
    ]
  }

  render() {
    return (
      <section id="screenshots" className="section screenshots-area ptb_100">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* App Screenshot Slider Area */}
              <div className="app-screenshots">
                {/* Single Screenshot Item */}
                {this.state.data.map((item, idx) => {
                  return(
                    <div key={`sd_${idx}`} className="single-screenshot">
                      <img src={item.image} alt="" />
                      {/* Screenshots Overlay */}
                      <div className="screenshots-overlay">
                        <a href={item.image} data-fancybox="images"><i className={item.iconClass} /></a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Screenshot;
