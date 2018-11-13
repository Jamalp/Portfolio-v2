import Header from "./Header";
import Navigation from "./Navigation";
import Link from "next/link";
import styled from "react-emotion";

const Initials = styled("h4")`
  position: fixed;
  bottom: 35px;
  right: 40px;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  cursor: pointer;

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

const Layout = props => (
  <div>
    <Header />
    {props.children}
    <Navigation />
    <Initials className="initials">
      <span className="i-contact">
        <Link href="/contact">
          <a>Contact</a>
        </Link>
      </span>
      <Link href="/contact">
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
  </div>
);

export default Layout;
