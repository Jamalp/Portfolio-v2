import React, { Component } from "react";
import styled from "react-emotion";

const ImageWithSidebarWrapper = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 100px;
  margin-left: 120px;
  margin-right: 120px;
  @media (max-width: 950px) {
    margin: 0;
    display: block;
    padding: 0 30px;
  }
  .image {
    width: 77.25%;
    @media (max-width: 950px) {
      width: 100%;
    }
  }
  .sidebar {
    width: 20.25%;
    margin-top: 40px;
    @media (max-width: 950px) {
      width: 100%;
      margin-top: 20px;
    }
    .sidebar-content {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 40px;
      @media (max-width: 950px) {
        margin-bottom: 10px;
        justify-content: flex-start;
      }
      .line {
        height: 1px;
        width: 20px;
        background-color: #fff;
        margin-top: 9px;
        @media (max-width: 950px) {
          margin-top: 12px;
          margin-right: 10px;
          width: 10px;
        }
      }
      p {
        font-size: 18px;
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
