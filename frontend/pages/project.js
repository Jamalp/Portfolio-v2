import Layout from "../components/Layout.js";
import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import Error from "next/error";
import PageWrapper from "../components/PageWrapper.js";
import { Config } from "../config.js";
import Title from "../components/ProjectTitle";
import styled from "react-emotion";
import { vars } from "../emotion/variables";
import ImageSideBySide from "../components/project/ImageSideBySide";
import CopyRow from "../components/project/CopyRow";
import ImageWithSidebar from "../components/project/ImageWithSidebar";
import Quote from "../components/project/Quote";
import { TweenMax, Power2 } from "gsap";

const HeroImage = styled("section")`
  width: calc(100% - 120px);
  margin-left: 120px;
  margin-top: 88px;
  background-color: ${vars.black};
  margin-bottom: 116px;
  max-height: 650px;
  height: 100vh;

  img {
    height: 100%;
    object-fit: cover;
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
    if (!this.project.title) return <Error statusCode={404} />;

    return (
      <Layout>
        <Title title={this.project.title} />
        <HeroImage>
          <img src={this.project.hero_image} alt={this.project.title} />
        </HeroImage>
        <CopyRow data={this.project} />
        <ImageSideBySide data={this.project.image_side_by_side} />
        <ImageWithSidebar data={this.project.image_with_sidebar} />
        <Quote data={this.project.quote[0]} />
      </Layout>
    );
  }
}

export default PageWrapper(Project);
