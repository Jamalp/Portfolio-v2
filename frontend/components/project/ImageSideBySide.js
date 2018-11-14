import React, { Component } from "react";
import styled from "react-emotion";

const ImageRow = styled("div")`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-left: 17.848%;
  width: calc(100% - 17.848% - 120px);
  .wide {
    width: 61.2994%;
  }
  .tall {
    width: 35.781544256%;
  }
`;

class ImageSideBySide extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  arrangeElement() {}

  render() {
    if (this.props.data) {
      return (
        <ImageRow>
          <div
            className={`image-side-by-side-left ${
              this.props.data[0].image_left[0].image_type
            }`}
          >
            <img src={this.props.data[0].image_left[0].image} />
          </div>
          <div
            className={`image-side-by-side-right ${
              this.props.data[0].image_right[0].image_type
            }`}
          >
            <img src={this.props.data[0].image_right[0].image} />
          </div>
        </ImageRow>
      );
    } else {
      return false;
    }
  }
}

export default ImageSideBySide;
