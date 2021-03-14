import Musing from "./Musing";

function Musings() {
  const entrances = [
    {
      title: "Momentum",
      content:
        "A Latin concept that seems to lose meaning when translated. Momentum is sometimes perceived as the moment and at times strength/energy. The truth is that momentum brings both of the ideas together to say that there is energy in every moment, an energy that may cooperate or decrease the chances of something happening. Momentum is about observing the state of things and knowing the right moment to use the conditions in one favor.",
    },
  ];

  return (
    <div id="musings" className="musings">
      {entrances.map(({ title, content }) => (
        <Musing content={content} key={title}>
          {title}
        </Musing>
      ))}
    </div>
  );
}

export default Musings;
