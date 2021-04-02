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
    event.preventDefault();
    this.setState(
      (prevState) => ({
        likes: prevState.likes + 1,
      }),
      () => {
        if (this.props.didUpdateLikes) {
          this.props.didUpdateLikes(this.state.likes);
        }
      }
    );
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
