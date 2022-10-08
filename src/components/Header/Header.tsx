import React from "react";
import block from "bem-cn";
import "./Header.scss";

const cnHeader = block("appHeader");

const Header = () => {
  return <div className={cnHeader()}></div>;
};

export default Header;
