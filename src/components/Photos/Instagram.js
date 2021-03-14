import React, { useState, useEffect } from "react";

const url = `/.netlify/functions/instagram`;

function useInstagram() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);
  return posts;
}

export default function Instagram() {
  const gramz = useInstagram();
  return (
    <div>
      {gramz.map((gram) => (
        <a href={gram.url} key={gram.id}>
          <img src={gram.thumbnail} alt={gram.caption} />
        </a>
      ))}
    </div>
  );
}
