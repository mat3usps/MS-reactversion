import { SideBySideMagnifier } from "react-image-magnifiers";
import React, { Component } from "react";

class Zoomer extends Component {
  render() {
    const { image, largeImage, children } = this.props;
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
