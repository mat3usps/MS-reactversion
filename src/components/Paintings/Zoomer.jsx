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
    let { image } = this.state;
    let { largeImage } = this.state;
    console.log(image);
    console.log(largeImage);
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
