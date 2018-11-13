import styled from "react-emotion";
import React, { Component } from "react";
import { vars } from "../emotion/variables";

const Title = styled("div")`
  padding-top: 102px;
  margin-left: ${vars.c_left_1};
  margin-right: auto;
  .title-multi-line {
    display: inline-block;
    span {
      text-align: right;
      display: block;
      font-weight: 700;
      font-size: 72px;
    }
  }
`;

class PageTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
  }

  componentDidMount() {
    // this.addLineBreak();

    this.handleTitle();
  }

  handleTitle() {
    const { title } = this.props;
    if (title.trim().indexOf(" ") != -1) {
      const str1 = title.substr(0, title.indexOf(" "));
      const str2 = title.substr(title.indexOf(" ") + 1);
      this.createNewLine(str1, str2);
    } else {
      this.setState({ title: <h1>{title}</h1> });
    }
  }

  createNewLine(str1, str2) {
    const newTitle = (
      <h1 className="title-multi-line">
        <span>{str1}</span>
        <span>{str2}</span>
      </h1>
    );
    this.setState({
      title: newTitle
    });
  }
  render() {
    return <Title>{this.state.title}</Title>;
  }
}

export default PageTitle;
