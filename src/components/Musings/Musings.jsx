import React, { useEffect, useRef, useState } from "react";
import Musing from "./Musing";
import axios from "axios";

function Musings() {
  const [entrances, setEntrances] = useState([])

  useEffect(() => {
    axios.get("https://mp-reactversion-default-rtdb.firebaseio.com/musing.json")
      .then((response) => {
        const entrances = Object.values(response.data);
        setEntrances(entrances);
      })
      .catch((error) => {
        console.log("error", error);
      });
  })

  const listRef = useRef();
  useEffect(() => {
    listRef.current.scrollTo(0, listRef.current.scrollHeight, "auto");
  }, []);

  return (
    <div id="musings" className="musings" ref={listRef}>
      {entrances.map(({ title, content }) => (
        <Musing content={content} key={title}>
          {title}
        </Musing>
      ))}
    </div>
  );
}

export default Musings;
