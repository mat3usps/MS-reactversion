import React, { Component } from "react";

class CommentForm extends Component {
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
      <div className="comment-form">
        <div className="comment-form-image-div">
          <img className="comment-form-image" src="" alt="" />
        </div>
        <div id="comment-form">
          <label className="comment-form-enunciate" for="comment">
            Comment
          </label>
          <div className="comment-form-input-group">
            <form className="comment-form-input-group">
              <input
                type="text"
                id="comment"
                className="comment-form-input"
                name="comment"
                placeholder="Make a comment."
                value={this.state.comment}
                onChange={this.changeComment}
              />
              <label for="submit"></label>
              <button
                type="submit"
                id="submit"
                className="comment-form-submit"
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

export default CommentForm;
