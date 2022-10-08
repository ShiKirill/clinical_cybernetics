import React from "react";
import block from "bem-cn";

import "./MainContent.scss";

const cnMainComponent = block("appMainContent");

type MainComponentProps = {
  children: JSX.Element;
};

const MainComponent = (props: MainComponentProps) => {
  const { children } = props;

  return <div className={cnMainComponent()}> {children} </div>;
};

export default MainComponent;
