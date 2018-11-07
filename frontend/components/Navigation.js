import Link from "next/link";
import React, { Component } from "react";
import { Config } from "../config.js";
import styled from "react-emotion";

const Container = styled("header")`
  background-color: #000;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 120px;
  height: 100%;
  border-right: 1px solid #ffffff;
  color: #fff;
  .navigation-inner {
    position: relative;
    padding-top: 100px;
    height: 100%;
  }
  .circle {
    background-color: #fff;
    margin: 0 auto;
    height: 45px;
    width: 45px;
    border-radius: 50%;
    display: block;
    transition: transform 0.3s ease;
    &:hover {
      transform: scale(1.1);
    }
  }
  .menu-trigger {
    font-weight: 700;
    font-size: 18px;
    letter-spacing: 6px;
    text-transform: uppercase;
    position: absolute;
    top: 50%;
    width: 100%;
    text-align: center;
    transform: translate3d(0, -50%, 0) rotate(-90deg);
    backface-visibility: hidden;
    will-change: transform;
    cursor: pointer;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

class Navigation extends Component {
  constructor() {
    super();
  }

  getSlug(url) {
    const parts = url.split("/");
    return parts.length > 2 ? parts[parts.length - 2] : "";
  }

  toggleMenu() {
    console.log(50);
  }

  render() {
    const menuItems = this.props.menu.items.map((item, index) => {
      if (item.object === "custom") {
        return (
          <Link href={item.url} key={item.ID}>
            <a>{item.title}</a>
          </Link>
        );
      }
      const slug = this.getSlug(item.url);
      const actualPage = item.object === "category" ? "category" : "post";
      return (
        <Link
          as={`/${item.object}/${slug}`}
          href={`/${actualPage}?slug=${slug}&apiRoute=${item.object}`}
          key={item.ID}
        >
          <a>{item.title}</a>
        </Link>
      );
    });

    return (
      <Container>
        <div className="navigation-inner">
          <Link href="/">
            <a className="circle" />
          </Link>
          <div className="menu-trigger" onClick={this.toggleMenu}>
            Menu
          </div>
        </div>
      </Container>
    );
  }
}

export default Navigation;
