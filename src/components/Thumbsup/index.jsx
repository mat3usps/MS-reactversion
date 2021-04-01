import { Component } from "react";
import Like from "../../assets/Utility/thumbsup.svg";

class Thumbsup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: 0,
    };
  }

  addLikes = (event) => {
    const current = this.state;
    current.likes += 1;
    {
      /*this.props.likes(current.likes);*/
    }
    this.setState(current);
    event.preventDefault();
  };

  render() {
    return (
      <div className="thumbs-up-div">
        <img
          src={Like}
          className="thumbs-up-button"
          alt="Liked"
          onClick={this.addLikes}
        />
      </div>
    );
  }
}

export default Thumbsup;
