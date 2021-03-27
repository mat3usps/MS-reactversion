import React, { Component } from "react";

class Gamecomment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
    };
  }

  changeComment = (event) => {
    this.setComment(event.target.value);
  };

  setComment = (comment) => this.setState({ comment });

  didSave = (event) => {
    const state = this.state;
    this.props.didSave(state.comment);
    event.preventDefault();
    this.setComment("");
  };

  render() {
    return (
      <div className="game-form">
        <div className="game-form-image-div">
          <img className="game-form-image" src="" alt="" />
        </div>
        <div id="game-form">
          <label className="game-form-enunciate" for="comment">
            Comment
          </label>
          <div className="game-form-input-group">
            <form className="game-form-input-group">
              <input
                type="text"
                id="comment"
                className="game-form-input"
                name="comment"
                placeholder="make a comment."
                value={this.state.comment}
                onChange={this.changeComment}
              />
              <label for="submit"></label>
              <button
                type="submit"
                id="submit"
                className="game-form-submit"
                onClick={this.didSave}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Gamecomment;
