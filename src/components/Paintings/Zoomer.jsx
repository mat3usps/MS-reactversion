import { SideBySideMagnifier } from "react-image-magnifiers";
import React, { Component } from "react";

class Zoomer extends Component {
  render() {
    const { image, largeImage, children } = this.props;
    console.log(image);
    console.log(largeImage);
    return (
      <div>
        <SideBySideMagnifier
          imageSrc={image}
          imageAlt={children}
          largeImageSrc={largeImage}
        />
      </div>
    );
  }
}

export default Zoomer;
