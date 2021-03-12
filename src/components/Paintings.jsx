import Painting from "./Painting";

function Paintings() {
  const paintings = [
    {
      name: "Varanda",
      description:
        "The first ever frame painted by Mateus Pereira. The range of colors depicts the exact moment in which the wish of painting became reality. The shapes and colors bring about the views from the author's porch.",
      price: "500.00",
      image: "P1",
    },
  ];

  return (
    <div>
      {paintings.map(({ name, description, price, image }) => (
        <Painting
          description={description}
          price={price}
          image={image}
          key={name}
        >
          {name}
        </Painting>
      ))}
    </div>
  );
}

export default Paintings;
