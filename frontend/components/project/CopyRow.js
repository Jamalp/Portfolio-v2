import React, { Component } from "react";
import styled from "react-emotion";

const CopyRowWrapper = styled("div")`
  display: flex;
  justify-content: space-between;
  margin-bottom: 94px;
  margin-left: 17.848%;
  width: calc(100% - 17.848% - 120px);
`;

const CopyRowEl = styled("div")`
  display: flex;
  justify-content: space-between;
  width: 74.3879%;
  & > div {
    width: 48%;
    h2 {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 28px;
    }
  }
  p {
    font-size: 24px;
  }
`;

const ProjectMeta = styled("div")`
  text-align: right;
  color: #fff;
  & > div:first-child {
    margin-bottom: 34px;
  }
  h4 {
    font-size: 24px;
    letter-spacing: 1px;
    font-weight: 700;
    margin-bottom: 8px;
  }
  p,
  a.link--primary {
    font-size: 20px;
    color: #fff;
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
