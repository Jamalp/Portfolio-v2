import React, { Component } from "react";
import styled from "react-emotion";
import Link from "next/link";
import { vars } from "../emotion/variables";
import { injectGlobal } from "emotion";

injectGlobal`
  html {
  box-sizing: border-box;
  height: 100%;
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
  body {
    background-color:${vars.black};
    height: 100%;
    margin: 0;
  }
  a {
    color:white;
    text-decoration: none;
  }
`;

const ErrorPage = styled("section")`
  background-color: ${vars.black};
  height: 100vh;
  width: calc(100% - 120px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
`;

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    return (
      <ErrorPage>
        <div>
          <h1>You've reach a page that doesn't exist.</h1>
          <p>Try these:</p>
          <div>
            <Link href="/">
              <a>Home</a>
            </Link>
            <Link href="/about">
              <a>About</a>
            </Link>
            <Link href="/work">
              <a>Work</a>
            </Link>
            <Link href="/contact">
              <a>Contact</a>
            </Link>
          </div>
          {this.props.statusCode
            ? `An error ${this.props.statusCode} occurred on server`
            : "An error occurred on client"}
        </div>
      </ErrorPage>
    );
  }
}
