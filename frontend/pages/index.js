import Layout from "../components/Layout.js";
import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import PageWrapper from "../components/PageWrapper.js";
import Navigation from "../components/Navigation.js";
import { Config } from "../config.js";
import styled from "react-emotion";
import Link from "next/link";
import { TweenMax, Power2, TimelineLite } from "gsap";

const Introduction = styled("div")`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 11.33%;
  h2 {
    width: 70%;
    max-width: 770px;
    &:first-child {
      margin-bottom: 60px;
    }
  }
`;

class Home extends Component {
  constructor() {
    super();

    this.intro_copy = null;
    this.intro_animation = null;
  }
  static async getInitialProps(context) {
    const homeRes = await fetch(
      `${Config.apiUrl}/wp-json/postlight/v1/page?slug=home`
    );
    const page = await homeRes.json();
    return page;
  }

  componentDidMount() {
    TweenMax.to("#introduction_copy", 1, {
      backgroundColor: "#ff0000",
      width: "50%",
      top: "100px"
    });
  }

  render() {
    return (
      <Layout>
        <Navigation menu={this.props.headerMenu} />
        <Introduction
          id="introduction_copy"
          className="page-container"
          dangerouslySetInnerHTML={{ __html: this.props.content.rendered }}
        />
      </Layout>
    );
  }
}

export default PageWrapper(Home);
