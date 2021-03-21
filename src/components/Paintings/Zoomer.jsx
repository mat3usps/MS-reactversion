import { SideBySideMagnifier } from "react-image-magnifiers";
import React, { Component } from "react";

class Zoomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: this.props.image,
      alt: this.props.children,
      largeImage: this.props.largeImage,
    };
  }

  render() {
    const { image } = this.state;
    const { largeImage } = this.state;
    return (
      <div>
        <SideBySideMagnifier
          imageSrc={image}
          imageAlt="Example"
          largeImageSrc={largeImage}
        />
      </div>
    );
  }
}

export default Zoomer;
