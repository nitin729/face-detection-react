import React, { Component } from "react";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import "./App.css";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import particlesOptions from "./particles";

const app = new Clarifai.App({
  apiKey: "c55472eba2ae43929396ae257aa5881b",
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: [],
      faceCountPrompt: "",
    };
  }

  calculateFaceLocation = (data) => {
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    if (data.outputs[0].data.regions !== undefined) {
      return data.outputs[0].data.regions.map((face) => {
        const clarifaiFace = face.region_info.bounding_box;
        return {
          leftCol: clarifaiFace.left_col * width,
          topRow: clarifaiFace.top_row * height,
          rightCol: width - clarifaiFace.right_col * width,
          bottomRow: height - clarifaiFace.bottom_row * height,
        };
      });
    }
  };

  getNumOfFaces = (data) => {
    if (data.outputs[0].data.regions !== undefined) {
      const faceCount = Object.keys(data.outputs[0].data.regions).length;
      this.setState({ faceCountPrompt: faceCount + " faces found!" });
    } else {
      this.setState({ faceCountPrompt: "0 faces found!" });
    }
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    event.preventDefault();
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((response) => {
        this.displayFaceBox(this.calculateFaceLocation(response));
        return response;
      })
      .then((response) => {
        this.getNumOfFaces(response);
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Logo />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition
          imageUrl={this.state.imageUrl}
          box={this.state.box}
          faceCountPrompt={this.state.faceCountPrompt}
        />
      </div>
    );
  }
}

export default App;
