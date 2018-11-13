import React from "react";
import { Config } from "../config.js";
const PageWrapper = Comp =>
  class extends React.Component {
    state = {
      loading: true,
      style: {
        height: "100vh",
        width: "100vw",
        backgroundColor: "#000",
        position: "fixed",
        top: 0,
        left: 0
      }
    };

    static async getInitialProps(args) {
      const headerMenuRes = await fetch(
        `${Config.apiUrl}/wp-json/menus/v1/menus/header-menu`
      );
      const headerMenu = await headerMenuRes.json();
      return {
        headerMenu,
        ...(Comp.getInitialProps ? await Comp.getInitialProps(args) : null)
      };
    }

    componentDidMount() {
      this.setState({
        loading: false
      });
    }

    render() {
      if (this.state.loading) {
        return <div style={this.state.style} />;
      }
      return <Comp {...this.props} />;
    }
  };

export default PageWrapper;
