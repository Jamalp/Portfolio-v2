import React from "react";
import App, { Container } from "next/app";
import Navigation from "../components/Navigation";
import styled from "react-emotion";
import Link from "next/link";

const Initials = styled("h4")`
  position: fixed;
  bottom: 35px;
  right: 40px;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  cursor: pointer;
  @media (max-width: 1024px) {
    display: none;
    bottom: 22px;
    right: 30px;
  }

  .i-name-rest,
  .i-contact {
    display: inline-block;
    vertical-align: bottom;
    width: 0;
    overflow: hidden;
    transition: width 1.4s cubic-bezier(0.19, 1, 0.22, 1),
      opacity 1.4s cubic-bezier(0.19, 1, 0.22, 1);
  }
  .i-contact {
    position: absolute;
    top: -25px;
    left: 0;
    opacity: 0;
    a {
      font-size: 18px;
    }
  }
  &:hover {
    .i-contact {
      width: 58px;
      opacity: 1;
    }
    .i-first-name {
      .i-name-rest {
        width: 49px;
        padding-right: 4px;
      }
    }
    .i-last-name {
      .i-name-rest {
        width: 52px;
      }
    }
  }
`;

export default class Portfolio extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Navigation />
        <Component {...pageProps} />
        <Initials className="initials">
          <span className="i-contact">
            <Link href="mailto:jamalkpowell@gmail.com?Subject=Hey%20Jamal">
              <a>Contact</a>
            </Link>
          </span>
          <Link href="mailto:jamalkpowell@gmail.com?Subject=Hey%20Jamal">
            <a>
              <span className="i-first-name">
                <span className="i-first">J</span>
                <span className="i-name-rest">amal </span>
              </span>
              <span className="i-last-name">
                <span className="i-last">P</span>
                <span className="i-name-rest">owell</span>
              </span>
              <span>.</span>
            </a>
          </Link>
        </Initials>
      </Container>
    );
  }
}
