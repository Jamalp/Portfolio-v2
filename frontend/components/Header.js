import React, { Component } from "react";
import Head from "next/head";
import stylesheet from "../src/styles/style.scss";

class Header extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Head>
          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <title>Jamal Powell - Web Developer & Photographer</title>
          <link
            href="https://fonts.googleapis.com/css?family=Cormorant:400,400i,700,700i"
            rel="stylesheet"
          />
        </Head>
      </div>
    );
  }
}

export default Header;
