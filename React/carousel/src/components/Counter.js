import React from "react";
import "../css/Counter.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: this.props.gallery,
      sizeGallery: this.props.gallery.length,
      currentImage: {
        id: 0,
        srcImage: this.props.gallery[0],
      },
    };
  }

  sliderClick = (direction) => {
    this.setState((prevState) => {
      let newId = prevState.currentImage.id;
      if (direction === "back") {
        if (newId === 0) newId = this.state.sizeGallery - 1;
        else newId -= 1;
      } else {
        if (newId === this.state.sizeGallery) newId = 0;
        else newId += 1;
      }

      return {
        currentImage: {
          id: newId,
          srcImage: prevState.images[newId],
        },
      };
    });
  };

  render() {
    return (
      <>
        <div className="frame-container">
          <div
            className="frame"
            style={{
              backgroundImage: "url(" + this.state.currentImage.srcImage + ");",
            }}
          >
            <div
              className="arrows left"
              onClick={() => this.sliderClick("back")}
            >
              <FontAwesomeIcon icon={faArrowLeft} size="lg" />
            </div>
            <div
              className="arrows left"
              onClick={() => this.sliderClick("next")}
            >
              <FontAwesomeIcon icon={faArrowRight} size="lg" />
            </div>
          </div>

          <div className="container-miniature">
            {this.state.images.map((image, index) => {
              return index !== 0 && index < 4 ? (
                <div
                  className="miniature"
                  key={"miniature-" + index}
                  style={{ backgroundImage: `url(${image})` }}
                ></div>
              ) : (
                <></>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}
