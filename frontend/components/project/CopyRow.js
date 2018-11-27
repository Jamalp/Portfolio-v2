import React, { Component } from "react";
import styled from "react-emotion";
import { vars } from "../../emotion/variables";

const CopyRowWrapper = styled("div")`
  display: flex;
  justify-content: space-between;
  margin-bottom: 94px;
  margin-left: calc(120px + 9.5%);
  width: calc(100% - 9.5% - 240px);
  @media (max-width: 950px) {
    width: 100%;
    padding: 0 30px;
    margin-bottom: ${vars.mobile_margin_down};
    margin-left: 0;
    flex-direction: column-reverse;
  }
`;

const CopyRowEl = styled("div")`
  display: flex;
  justify-content: space-between;
  width: 74.3879%;
  @media (max-width: 950px) {
    display: block;
    width: 100%;
  }
  & > div {
    width: 48%;
    @media (max-width: 950px) {
      width: 100%;
      margin-bottom: 20px;
    }
    h2 {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 28px;
    }
  }
  p {
    font-size: 24px;
    line-height: 32px;
  }
`;

const ProjectMeta = styled("div")`
  text-align: right;
  color: #fff;
  @media (max-width: 950px) {
    margin-bottom: ${vars.mobile_margin_down};
  }
  @media (max-width: 950px) {
    text-align: left;
  }
  & > div:first-child {
    margin-bottom: ${vars.mobile_margin_down};
    @media (max-width: 950px) {
      margin-bottom: 14px;
    }
  }
  h4 {
    font-size: 20px;
    letter-spacing: 1px;
    font-weight: 700;
    margin-bottom: 8px;
    @media (max-width: 950px) {
      font-size: 16px;
    }
  }
  p,
  a.link--primary {
    font-size: 24px;
    color: #fff;
    @media (max-width: 950px) {
      font-size: 20px;
    }
  }
`;

class CopyRow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.data.copy_row) {
      return (
        <CopyRowWrapper>
          <CopyRowEl>
            <div
              dangerouslySetInnerHTML={{
                __html: this.props.data.copy_row[0].copy_left
              }}
            />
            <div
              dangerouslySetInnerHTML={{
                __html: this.props.data.copy_row[0].copy_right
              }}
            />
          </CopyRowEl>
          <ProjectMeta className="project-meta">
            <div>
              <h4>Visit</h4>
              <a
                className="link--primary"
                href={this.props.data.project_link[0].url}
                target="_blank"
              >
                {this.props.data.project_link[0].url_display}
              </a>
            </div>
            <div>
              <h4>Agency</h4>
              <p>{this.props.data.agency}</p>
            </div>
          </ProjectMeta>
        </CopyRowWrapper>
      );
    } else {
      return false;
    }
  }
}

export default CopyRow;
