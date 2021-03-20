import React, { useEffect, useRef } from "react";
import Musing from "./Musing";

function Musings() {
  const entrances = [
    {
      title: "Gods",
      content:
        "The very idea of an entity with the power of the unkown. Well, most of us, humans, have a hard time trying to surrender before the unkown. The unkown causes fear, but also curiosity. That is perfect environment to give ourselves in to any creadible explanation, and the world is full of tempting atempts. Knowledge used to survive when the situation requested it, also used to control the ones who did not share its understanding though. At the end, the true gods are the ones with the power of knowing what has been hidden from most. They rather have you simply beliving, because the thirst for truth is the one idea they want you not to have.",
    },
    {
      title: "Momentum",
      content:
        "A Latin concept that seems to lose meaning when translated. Momentum is sometimes perceived as the moment and at times strength/energy. The truth is that momentum brings both of the ideas together to say that there is energy in every moment, an energy that may cooperate or decrease the chances of something happening. Momentum is about observing the state of things and knowing the right moment to use the conditions in one favor.",
    },
    {
      title: "Death",
      content:
        "A word shared in many cultures with a great diversity of perceptions. For instance 'Death is the end of life', whoever gave birth to such a concept was not regarding the cycles and paths energy goes through before being called life by humans. Of course, this idea also does not contemplate the afterward of nature. Energy does not die. The moment in which we stop being is but a step for the energy that for long nourished us, to continue going towards forever.",
    },
  ];

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
