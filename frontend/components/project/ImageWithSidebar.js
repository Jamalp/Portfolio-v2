import React, { Component } from "react";
import styled from "react-emotion";

const ImageWithSidebarWrapper = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 100px;
  margin-left: 120px;
  margin-right: 120px;
  .image {
    width: 77.25%;
  }
  .sidebar {
    width: 20.25%;
    margin-top: 40px;
    .sidebar-content {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 40px;
      .line {
        height: 2px;
        width: 20px;
        background-color: #fff;
        margin-top: 7px;
      }
      p {
        font-size: 18px;
        font-weight: 700;
        width: 78%;
      }
    }
  }
`;

class ImageWithSidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.data) {
      const sidebarContent = this.props.data[0].sidebar_info.map((el, i) => {
        return (
          <div className="sidebar-content" key={`sidebar_content_${i}`}>
            <div className="line" />
            <p>{el.text}</p>
          </div>
        );
      });
      return (
        <ImageWithSidebarWrapper>
          <div className="image">
            <img src={this.props.data[0].image} />
          </div>
          <div className="sidebar">{sidebarContent}</div>
        </ImageWithSidebarWrapper>
      );
    } else {
      return false;
    }
  }
}

export default ImageWithSidebar;
