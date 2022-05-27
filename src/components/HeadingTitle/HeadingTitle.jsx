import React from "react";

import "./HeadingTitle.css";

const HeadingTitle = ({ title }) => {
  return (
    <div className="heading-title">
      <h1>{title}</h1>
      <div />
    </div>
  );
};

export default HeadingTitle;
