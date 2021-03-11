import Musing from "./Musing";

function Musings() {
  const entrances = [
    {
      title: "Momentum",
      content:
        "I have recently internalized the idea of momentum. A concept that seems to lose meaning when translated to Portuguese. Momentum in Portuguese is sometimes perceived as the moment, and at times  strength. The truth is that momentum brings both of the ideas together to say that there's a moment for all things and there's strength in every moment that may cooperate or decrease the chances of things happening. Momentum is about knowing the right moment to use it in your favor and for that, waiting and observing seems to be top priority abilities.",
    },
  ];

  return (
    <div className="musings">
      {entrances.map(({ title, content }) => (
        <Musing content={content} key={title}>
          {title}
        </Musing>
      ))}
    </div>
  );
}

export default Musings;
