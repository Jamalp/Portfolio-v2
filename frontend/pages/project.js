import Layout from "../components/Layout.js";
import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import Error from "./_error";
import PageWrapper from "../components/PageWrapper.js";
import { Config } from "../config.js";
import Title from "../components/ProjectTitle";
import styled from "react-emotion";
import { vars } from "../emotion/variables";
import ImageSideBySide from "../components/project/ImageSideBySide";
import CopyRow from "../components/project/CopyRow";
import ImageWithSidebar from "../components/project/ImageWithSidebar";
import Quote from "../components/project/Quote";
import Carousel from "../components/project/Carousel";
import MobileImages from "../components/project/MobileImages";
import Footer from "../components/project/Footer";
import { TweenMax, Power2 } from "gsap";

const ProjectPage = styled("section")`
  /* margin-bottom: 120px; */
  @media (max-width: 950px) {
    padding-top: ${vars.header_height};
  }
`;

const HeroImage = styled("div")`
  width: calc(100% - 120px);
  margin-left: 120px;
  margin-top: 88px;
  background-color: ${vars.black};
  margin-bottom: 116px;
  max-height: 850px;
  height: 100vh;
  @media (max-width: 1549px) {
    max-height: 650px;
  }

  img {
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 950px) {
    width: 100%;
    margin: 0 0 ${vars.mobile_margin_down};
    height: auto;
  }
`;

class Project extends Component {
  static async getInitialProps(context) {
    const { slug, apiRoute } = context.query;
    const res = await fetch(
      `${Config.apiUrl}/wp-json/portfolio/v1/project?slug=${slug}`
    );
    const project = await res.json();
    return { project };
  }

  constructor(props) {
    super(props);
    this.project = this.props.project.acf;
  }

  render() {
    if (!this.project) return <Error statusCode={404} />;

    return (
      <Layout>
        <ProjectPage>
          <Title title={this.project.title} />
          <HeroImage>
            <img src={this.project.hero_image} alt={this.project.title} />
          </HeroImage>
          <CopyRow data={this.project} />
          <ImageSideBySide data={this.project.image_side_by_side} />
          <ImageWithSidebar data={this.project.image_with_sidebar} />
          <Quote data={this.project.quote[0]} />
          <Carousel data={this.project.gallery[0]} />
          <MobileImages data={this.project.mobile_images} />
          <Footer data={this.project.next_project} />
        </ProjectPage>
      </Layout>
    );
  }
}

export default PageWrapper(Project);
