import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, box, faceCountPrompt }) => {
  return (
    <div>
      <p className="f4 b  near-black">{faceCountPrompt}</p>
      <div className="center pa1">
        <div className="absolute">
          <img
            id="inputImage"
            alt=""
            //  TODO: Add state for image border
            src={imageUrl}
            width="auto"
            height="250px"
          />
          {box !== undefined &&
            box.map((box) => {
              return (
                <div
                  key={box.topRow}
                  className="bounding-box"
                  style={{
                    top: box.topRow,
                    right: box.rightCol,
                    bottom: box.bottomRow,
                    left: box.leftCol,
                  }}
                ></div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default FaceRecognition;
