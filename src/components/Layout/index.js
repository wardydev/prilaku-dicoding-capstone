import React from "react";
import Navbar from "../Navbar";
import PropTypes from "prop-types";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="container">{children}</div>
      <footer>
        <p className="bg-danger">Footer</p>
      </footer>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
