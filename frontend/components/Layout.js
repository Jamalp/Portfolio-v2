import Header from "./Header";
import Navigation from "./Navigation";
import styled from "react-emotion";

const Layout = props => (
  <div>
    <Header />
    {props.children}
  </div>
);

export default Layout;
