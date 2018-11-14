import React, { Component } from "react";
import Link from "next/link";
import styled from "react-emotion";
import { vars } from "../emotion/variables";

const CircleEl = styled("div")`
  .circle {
    background-color: ${vars.white};
    margin: 0 auto;
    height: 45px;
    width: 45px;
    border-radius: 50%;
    display: block;
    opacity: 0;
    transform: translate3d(0, -10px, 0);
    backface-visibility: hidden;
    will-change: transform;
    transition: transform 0.3s ease, background-color 0.3s ease;
    border: 1px solid #fff;
    &:hover {
      background-color: ${vars.black};
      transform: scale(1.2) !important;
    }
  }
`;

class Circle extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.circleEl = document.querySelectorAll("#navigation_circle_wrapper");
    this.addEvent();
    // this.resize();
  }

  addEvent() {
    document.addEventListener("mousemove", e => {
      this.magnetize(e);
    });
  }

  magnetize(e) {
    let mX = e.pageX;
    let mY = e.pageY;

    [].forEach.call(this.circleEl, item => {
      const customDist = 100;
      const centerX = item.offsetLeft + item.clientWidth / 2;
      const centerY = item.offsetTop + item.clientHeight / 2;

      let deltaX = Math.floor(centerX - mX) * -0.3;
      let deltaY = Math.floor(centerY - mY) * -0.3;

      let distance = this.calculateDistance(item, mX, mY);

      if (distance < customDist) {
        TweenMax.to(item, 0.3, { y: deltaY, x: deltaX, scale: 1.1 });
        item.classList.add("magnet");
      } else {
        TweenMax.to(item, 0.45, { y: 0, x: 0, scale: 1 });
        item.classList.remove("magnet");
      }
    });
  }

  calculateDistance(elem, mouseX, mouseY) {
    return Math.floor(
      Math.sqrt(
        Math.pow(mouseX - (elem.offsetLeft + elem.clientWidth / 2), 2) +
          Math.pow(mouseY - (elem.offsetTop + elem.clientHeight / 2), 2)
      )
    );
  }

  events() {
    window.addEventListener("resize", this.resize);
    document.addEventListener("mousemove", this.mouseMove);
  }

  render() {
    return (
      <CircleEl id="navigation_circle_wrapper">
        <Link href="/">
          <a id="navigation_cirle" className="circle" />
        </Link>
      </CircleEl>
    );
  }
}

export default Circle;
