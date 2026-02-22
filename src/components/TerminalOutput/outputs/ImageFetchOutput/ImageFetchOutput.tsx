import React from "react";
import "./ImageFetchOutput.css";

interface ImageFetchProps {
  url?: string;
  topic?: string;
}

const ImageFetchOutput: React.FC<ImageFetchProps> = ({ url, topic }) => {
  if (!url) return `Couldn't find a${topic ? ` ${topic}` : "n"} image :(`;
  return <img src={url} alt={`A cute ${topic || "image"}`} />;
};

export default ImageFetchOutput;
