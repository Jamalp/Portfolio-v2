import React, { Component } from "react";
import styled from "react-emotion";
import { vars } from "../../emotion/variables";

const QuoteEl = styled("div")`
  margin-left: calc(120px + 9.5%);
  margin-top: 92px;
  @media (max-width: 950px) {
    margin-left: 0;
    padding: 0 30px;
    margin-top: ${vars.mobile_margin_down};
  }
  blockquote {
    font-size: 48px;
    margin: 0;
    width: 66.807432432%;
    margin-bottom: 15px;
    @media (max-width: 950px) {
      width: 100%;
      font-size: 36px;
    }
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
