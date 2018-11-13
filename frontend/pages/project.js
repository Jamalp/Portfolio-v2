import Layout from "../components/Layout.js";
import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import Error from "next/error";
import PageWrapper from "../components/PageWrapper.js";
import { Config } from "../config.js";
import { TweenMax, Power2 } from "gsap";

class Project extends Component {
  static async getInitialProps(context) {
    const { slug, apiRoute } = context.query;
    const res = await fetch(
      `${Config.apiUrl}/wp-json/portfolio/v1/project?slug=${slug}`
    );
    const project = await res.json();
    return { project };
  }

  render() {
    console.log(this.props.project);
    if (!this.props.project.acf.title) return <Error statusCode={404} />;

    return (
      <Layout>
        <h1>{this.props.project.acf.title}</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: this.props.project.content.rendered
          }}
        />
      </Layout>
    );
  }
}

export default PageWrapper(Project);
