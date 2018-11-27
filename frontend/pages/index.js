import Layout from "../components/Layout.js";
import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import PageWrapper from "../components/PageWrapper.js";
import { Config } from "../config.js";
import styled from "react-emotion";
import Link from "next/link";
import Router from "next/router";
import { TweenMax, Power2 } from "gsap";

const Introduction = styled("div")`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 9.52%;
  opacity: 0;
  width: calc(100% - 240px);
  margin: 0 auto;
  @media (max-width: 950px) {
    padding-left: 30px;
    padding-right: 30px;
    height: 100vh;
    width: 100%;
  }
  h2 {
    width: 70%;
    max-width: 790px;
    &:first-child {
      margin-bottom: 43px;
      @media (max-width: 950px) {
        margin-bottom: 20px;
      }
    }
    @media (max-width: 950px) {
      width: 100%;
      font-size: 24px;
    }
  }
  .cta-wrapper {
    margin-top: 40px;
    @media (max-width: 950px) {
      font-size: 24px;
      margin-top: 20px;
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
      `${Config.apiUrl}/wp-json/portfolio/v1/page?slug=home`
    );
    const page = await homeRes.json();
    return page;
  }

  componentDidMount() {
    TweenMax.to("#introduction_copy", 1.4, {
      opacity: 1,
      ease: Expo.easeInOut
    });
  }

  render() {
    return (
      <Layout>
        <Introduction id="introduction_copy">
          <div
            dangerouslySetInnerHTML={{ __html: this.props.content.rendered }}
          />
          <div className="cta-wrapper">
            <Link href="/work">
              <a className="link--primary">View My Work</a>
            </Link>
          </div>
        </Introduction>
      </Layout>
    );
  }
}

export default PageWrapper(Home);
