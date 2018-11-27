import Layout from "../components/Layout.js";
import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import PageWrapper from "../components/PageWrapper.js";
import { Config } from "../config.js";
import PageTitle from "../components/PageTitle.js";
import styled from "react-emotion";
import Link from "next/link";
import { TweenMax, Power2 } from "gsap";

const WorkGrid = styled("section")`
  margin-left: 120px;
  margin-top: 78px;
  @media (max-width: 950px) {
    margin: 0 auto 30px;
  }
`;

const ProjectEl = styled("div")`
  margin-bottom: 110px;
  @media (max-width: 950px) {
    margin: 0 auto 20px;
    padding: 0 30px;
  }
  &.project-hero {
    width: calc(100% - 120px);
    @media (max-width: 950px) {
      width: 100%;
    }
  }

  &.project-row {
    display: flex;
    margin-right: 120px;
    margin-left: 10.4%;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 950px) {
      width: 100%;
      margin: 0 auto;
      display: block;
    }
    & > a {
      width: 48.6%;
      @media (max-width: 950px) {
        width: 100%;
        margin: 0 auto 20px;
      }
    }
  }

  &.project-row-3,
  &.project-row-5 {
    margin-left: 20.650529501%;
    @media (max-width: 950px) {
      margin-left: 0;
    }
  }

  &.project-row-5 {
    margin-right: 120px;
    @media (max-width: 950px) {
      margin-right: 0;
    }
  }

  .project-link {
    position: relative;
    display: block;
    &:hover {
      .project-hover {
        pointer-events: auto;
        background-color: rgba(0, 0, 0, 0.6);
        .project-name {
          opacity: 1;
          &:after {
            transform: translate3d(0, 0, 0);
          }
        }
      }
    }
  }

  .project-hover {
    background-color: rgba(0, 0, 0, 0);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: flex-end;
    pointer-events: none;
    transition: background-color 0.5s ease;
    @media (max-width: 950px) {
      pointer-events: auto;
      background-color: rgba(0, 0, 0, 0.6);
    }
    .project-name {
      opacity: 0;
      transition: opacity 0.5s ease;
      position: relative;
      margin-left: 40px;
      margin-bottom: 60px;
      display: inline-block;
      overflow: hidden;
      font-size: 36px;
      font-weight: 700;
      letter-spacing: 1px;
      @media (max-width: 950px) {
        opacity: 1;
        margin-left: 20px;
        margin-bottom: 20px;
      }
      &:after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: 3px;
        height: 1px;
        background-color: #fff;
        width: 100%;
        transform: translate3d(-100%, 0, 0);
        transition: transform 0.5s cubic-bezier(1, 0.01, 0.7, 0.93);
        will-change: transform;
        @media (max-width: 950px) {
          transform: translate3d(0, 0, 0);
        }
      }
    }
  }
`;
class Work extends Component {
  constructor() {
    super();
    this.state = {
      pageTitle: "Selected Work"
    };
  }

  static async getInitialProps(context) {
    const workRes = await fetch(
      `${Config.apiUrl}/wp-json/portfolio/v1/projects`
    );
    const projects = await workRes.json();
    return { projects };
  }

  componentDidMount() {}

  render() {
    // Reorder using custom order in WP config
    this.props.projects.sort((a, b) => {
      return a.order - b.order;
    });

    return (
      <Layout>
        <PageTitle title={this.state.pageTitle} />
        <WorkGrid className="work-grid">
          <ProjectEl className="project-hero">
            <Link
              prefetch
              href={`/project?slug=${
                this.props.projects[0].slug
              }&apiRoute=page`}
              as={`/work/${this.props.projects[0].slug}`}
            >
              <a className="project-link">
                <div className="project-hover">
                  <h3 className="project-name">
                    {this.props.projects[0].title}
                  </h3>
                </div>
                <img
                  src={this.props.projects[0].field_data.data.acf.grid_image}
                  alt={
                    "Visit the " +
                    this.props.projects[0].title +
                    " project page."
                  }
                />
              </a>
            </Link>
          </ProjectEl>
          <ProjectEl className="project-row project-row-2">
            <Link
              prefetch
              href={`/project?slug=${
                this.props.projects[1].slug
              }&apiRoute=page`}
              as={`/work/${this.props.projects[1].slug}`}
            >
              <a className="project-link">
                <div className="project-hover">
                  <h3 className="project-name">
                    {this.props.projects[1].title}
                  </h3>
                </div>
                <img
                  src={this.props.projects[1].field_data.data.acf.grid_image}
                  alt={
                    "Visit the " +
                    this.props.projects[1].title +
                    " project page."
                  }
                />
              </a>
            </Link>
            <Link
              prefetch
              href={`/project?slug=${
                this.props.projects[2].slug
              }&apiRoute=page`}
              as={`/work/${this.props.projects[2].slug}`}
            >
              <a className="project-link">
                <div className="project-hover">
                  <h3 className="project-name">
                    {this.props.projects[2].title}
                  </h3>
                </div>
                <div className="cover-image">
                  <img
                    src={this.props.projects[2].field_data.data.acf.grid_image}
                    alt={
                      "Visit the " +
                      this.props.projects[2].title +
                      " project page."
                    }
                  />
                </div>
              </a>
            </Link>
          </ProjectEl>
          <ProjectEl className="project-single project-row-3">
            <Link
              prefetch
              href={`/project?slug=${
                this.props.projects[3].slug
              }&apiRoute=page`}
              as={`/work/${this.props.projects[3].slug}`}
            >
              <a className="project-link">
                <div className="project-hover">
                  <h3 className="project-name">
                    {this.props.projects[3].title}
                  </h3>
                </div>
                <img
                  src={this.props.projects[3].field_data.data.acf.grid_image}
                  alt={
                    "Visit the " +
                    this.props.projects[3].title +
                    " project page."
                  }
                />
              </a>
            </Link>
          </ProjectEl>
          <ProjectEl className="project-row project-row-4">
            <Link
              prefetch
              href={`/project?slug=${
                this.props.projects[4].slug
              }&apiRoute=page`}
              as={`/work/${this.props.projects[4].slug}`}
            >
              <a className="project-link">
                <div className="project-hover">
                  <h3 className="project-name">
                    {this.props.projects[4].title}
                  </h3>
                </div>
                <img
                  src={this.props.projects[4].field_data.data.acf.grid_image}
                  alt={
                    "Visit the " +
                    this.props.projects[4].title +
                    " project page."
                  }
                />
              </a>
            </Link>
            <Link
              prefetch
              href={`/project?slug=${
                this.props.projects[5].slug
              }&apiRoute=page`}
              as={`/work/${this.props.projects[5].slug}`}
            >
              <a className="project-link">
                <div className="project-hover">
                  <h3 className="project-name">
                    {this.props.projects[5].title}
                  </h3>
                </div>
                <img
                  src={this.props.projects[5].field_data.data.acf.grid_image}
                  alt={
                    "Visit the " +
                    this.props.projects[5].title +
                    " project page."
                  }
                />
              </a>
            </Link>
          </ProjectEl>
          <ProjectEl className="project-single project-row-5">
            <Link
              prefetch
              href={`/project?slug=${
                this.props.projects[6].slug
              }&apiRoute=page`}
              as={`/work/${this.props.projects[6].slug}`}
            >
              <a className="project-link">
                <div className="project-hover">
                  <h3 className="project-name">
                    {this.props.projects[6].title}
                  </h3>
                </div>
                <img
                  src={this.props.projects[6].field_data.data.acf.grid_image}
                  alt={
                    "Visit the " +
                    this.props.projects[6].title +
                    " project page."
                  }
                />
              </a>
            </Link>
          </ProjectEl>
          <ProjectEl className="project-single project-row-6">
            <Link
              prefetch
              href={`/project?slug=${
                this.props.projects[7].slug
              }&apiRoute=page`}
              as={`/work/${this.props.projects[7].slug}`}
            >
              <a className="project-link">
                <div className="project-hover">
                  <h3 className="project-name">
                    {this.props.projects[7].title}
                  </h3>
                </div>
                <img
                  src={this.props.projects[7].field_data.data.acf.grid_image}
                  alt={
                    "Visit the " +
                    this.props.projects[7].title +
                    " project page."
                  }
                />
              </a>
            </Link>
          </ProjectEl>
        </WorkGrid>
      </Layout>
    );
  }
}

export default PageWrapper(Work);
