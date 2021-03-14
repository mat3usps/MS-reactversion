import Painting from "./Painting";
import P1 from "./P-1.jpeg";
import P2 from "./P-2.jpg";

function Paintings() {
  const paintings = [
    {
      name: "Varanda",
      description:
        "The first ever frame painted by Mateus Pereira. The range of colors depicts the exact moment in which the wish of painting became reality. The shapes and colors bring about the views from the author's porch.",
      price: "$ 700.00",
      image: P1,
    },
    {
      name: "Pulo",
      description:
        "A frame to encapsulate the true insanity contained in the mind of a parachutist who gazes down the enormous solid ground from over the clouds and throws oneself to the freeing fall.",
      price: "$ 650.00",
      image: P2,
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
