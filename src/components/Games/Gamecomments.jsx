import Gamecomment from "./Gamecomment";
import Gameform from "./Gameform";
import Instaimage from "./insta-placeholder.png";
import React, { Component } from "react";

class Gamecomments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentStorage: [
        {
          image: Instaimage,
          name: "Mateus Pereira",
          profile: "mateusp.s",
          comment:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
        {
          image: Instaimage,
          name: "Mateus Pereira",
          profile: "mateusp.s",
          comment: "Já zerei, mas jogaria de novo.",
        },
      ],
    };

    this.addComment = this.addComment.bind(this);
  }

  addComment(newComment) {
    let Comment = {
      image: "",
      name: "",
      profile: "",
      comment: newComment,
    };
    this.setState({ commentStorage: [...this.state.commentStorage, Comment] });
  }

  render() {
    return (
      <div>
        <div className="game-fixed-comments">
          {this.state.commentStorage.map(
            ({ image, name, profile, comment }) => (
              <Gamecomment
                image={image}
                name={name}
                profile={profile}
                key={name}
              >
                {comment}
              </Gamecomment>
            )
          )}
        </div>
        <Gameform parentCallback={this.addComment} />
      </div>
    );
  }
}

export default Gamecomments;
