import Gamecomment from "./Gamecomment";
import Gameform from "./Gameform";
import Instaimage from "./insta-placeholder.png";
import React, { useState, useEffect } from "react";

function Gamecomments() {
  const [commentStorage, setComments] = useLocalStorage("commentStorage", [
    {
      image: Instaimage,
      name: "Mateus Pereira",
      profile: "mateusp.s",
      comment:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      id: 1,
    },
    {
      image: Instaimage,
      name: "Mateus Pereira",
      profile: "mateusp.s",
      comment: "Já zerei, mas jogaria de novo.",
      id: 2,
    },
  ]);

  function useLocalStorage(key, defaultValue) {
    const stored = localStorage.getItem(key);
    const initial = stored ? JSON.parse(stored) : defaultValue;
    const [value, setValue] = useState(initial);
    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);
    return [value, setValue];
  }

  const addComment = (newComment) => {
    setComments((prevState) => {
      let comment = {
        image: "",
        name: "",
        profile: "",
        comment: newComment,
        id: prevState.length + 1,
      };
      return [...prevState, comment];
    });
  };

  return (
    <div>
      <div className="game-fixed-comments">
        {commentStorage.map(({ image, name, profile, comment, id }) => (
          <Gamecomment image={image} name={name} profile={profile} key={id}>
            {comment}
          </Gamecomment>
        ))}
      </div>
      <Gameform didSave={addComment} />
    </div>
  );
}

export default Gamecomments;
