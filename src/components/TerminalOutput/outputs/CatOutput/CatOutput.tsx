import React from "react";
import "./CatOutput.css";

interface CatOutputProps {
  url?: string;
}

const CatOutput: React.FC<CatOutputProps> = ({ url }) => {
  if (!url) return "Couldn't find a cat image :(";
  return <img src={url} alt="A cute cat" />;
};

export default CatOutput;
