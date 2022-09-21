import React from "react";
import "./rpc.scss";

interface intakes {
  largeImage: string;
  smallImage: string;
  appName: string;
  fileName: string;
  dirName: string;
  resposive: string;
}

const Rpc = (props: intakes) => {
  return (
    <>
      {props.resposive === "Mobile" ? (
        <div className="rpc">
          <div className="image">
            <img src={props.largeImage} />
            <img src={props.smallImage} />
          </div>
          <h3>{props.appName}</h3>
          <span>{props.fileName}</span>
          <span>{props.dirName}</span>
        </div>
      ) : (
        <div className="rpc">
          <div className="image">
            <img src={props.largeImage} />
            <img src={props.smallImage} />
          </div>
          <h3>{props.appName}</h3>
          <span>{props.fileName}</span>
          <span>{props.dirName}</span>
        </div>
      )}
    </>
  );
};

export default Rpc;
