import React, { Component } from "react";
import styled from "react-emotion";

const ImageRow = styled("div")`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-left: calc(120px + 9.5%);
  width: calc(100% - 9.5% - 240px);
  @media (max-width: 950px) {
    margin-left: 0;
    flex-direction: column;
    width: 100%;
    padding: 0 30px;
  }
  .wide {
    width: 61.2994%;
  }
  .tall {
    width: 35.781544256%;
  }

  .wide,
  .tall {
    &:only-child {
      width: 100%;
    }
    @media (max-width: 950px) {
      width: 100%;
      margin-bottom: 20px;
    }
  }
`;

class ImageSideBySide extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.data) {
      let imageRight = null;
      if (this.props.data[0].image_right) {
        imageRight = (
          <div
            className={`image-side-by-side-right ${
              this.props.data[0].image_right[0].image_type
            }`}
          >
            <img src={this.props.data[0].image_right[0].image} />
          </div>
        );
      }
      return (
        <ImageRow>
          <div
            className={`image-side-by-side-left ${
              this.props.data[0].image_left[0].image_type
            }`}
          >
            <img src={this.props.data[0].image_left[0].image} />
          </div>
          {imageRight}
        </ImageRow>
      );
    } else {
      return false;
    }
  }
}

export default ImageSideBySide;
