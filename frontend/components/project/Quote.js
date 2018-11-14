import React, { Component } from "react";
import styled from "react-emotion";

const QuoteEl = styled("div")`
  margin-left: 17.848%;
  margin-top: 92px;
  blockquote {
    font-size: 48px;
    margin: 0;
    width: 66.807432432%;
    margin-bottom: 15px;
  }
  blockquote,
  span {
    font-style: italic;
    color: #fff;
  }
`;

class Quote extends Component {
  constructor() {
    super();
  }

  render() {
    if (this.props.data) {
      return (
        <QuoteEl>
          <blockquote>{this.props.data.quote}</blockquote>
          <span>- {this.props.data.quote_attribution}</span>
        </QuoteEl>
      );
    } else {
      return false;
    }
  }
}

export default Quote;
