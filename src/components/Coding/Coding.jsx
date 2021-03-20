import { Redirect, useLocation } from "react-router";
import Article from "./Article";
import Modal from "../Modal/Modal";
import { useHistory } from "react-router-dom";

function Coding() {
  const articles = [
    {
      title: "The Importance of SRP in React Components",
      description:
        "For the ones who are not aqcuainted to React's ins and outs, there must be a way and it surely starts with understanding SRP(the Single Responsability Principle).",
      href: "srp-in-react",
      content: "",
    },
    {
      title: "A Brief Introduction on SVG in Web Development",
      description:
        "A quick explanation on SVG, the features that make its difference and some tips on SVG manipulation.",
      href: "./intro-on-svg",
      content: (
        <div>
          <h1 id="a-brief-introduction-on-svg-in-web-development.">
            A Brief Introduction on SVG in Web Development.
          </h1>
          <h3 id="by-mateus-pereira">By Mateus Pereira</h3>
          <p>
            I have recently started my first studies in web development and
            found this amazing tool for webdesign. If you have found this
            abbreviation somewhere around the internet and want to know a bit
            more about it you came to the right place.
          </p>
          <p>
            To begin, SVG stands for Scalable Vector Graphics, and a quick
            definition for it would be an image made out of math(coordinates to
            be more specific). You might be asking what does that mean, and to
            understand that first you need to give close look at a common image
            (.jpg, .png, etc).
          </p>
          <p>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3IN_NmgPcpSuNzl7rfbhiDXBHdiIMT3OoQQ&amp;usqp=CAU"
              alt="Comparison between raster and vector images"
            />
          </p>
          <p>
            The more you zoom in, it will gradually lose quality. That happens
            because these images are made of pixels and as you zoom they will
            become observable. However, SVG is made of coordinates that will
            always hold on to its shape. You can even open the .svg file on a
            text editor and see the coordinates that control the graphic shown.
            No matter how much you manipulate the image, its resolution remains
            sharp and clear.
          </p>
          <p>
            When it comes to usage, SVG is a powerful tool in a world in which
            screens are diverse like the ones we have today. The reason for it
            is the scalable feature that makes it possible to show a single logo
            on a mobile screen as it would on an electronic billboard. It also
            works great for creating animations using all sorts of visual
            elements that can be pretty easily added to HTML/CSS code.
          </p>
          <p>
            For the ones who got more interested in it, there is a free editor
            called <a href="https://inkscape.org/">Inkscape</a> where you can
            generate your .svg files and have a go.
          </p>
          <p>
            By the way, if you are planning on using it on a react app you might
            find it difficult to insert your .svg code in the JS/JSX pages, for
            that you might want to optimize it(get rid of unimportant info that
            comes in the SVG code), for that there is always an online tool like{" "}
            <a href="https://jakearchibald.github.io/svgomg/">SVGOMG</a>.
          </p>
        </div>
      ),
    },
    {
      title: "The Descovery of HTML",
      description:
        "Once one enter the field of technology, its almost mandatory to know a little of html structure. This quick one brings the basics of the language the builts the web.",
      href: "descovery-html",
      content: (
        <div>
          <h1 id="the-discovery-of-html">The Discovery of HTML</h1>
          <h3 id="by-mateus-pereira">By Mateus Pereira</h3>
          <p>
            One of the most necessary for website development in current times,
            HTML (HyperText Markup Language) is perhaps the one requirement for
            anyone who has an interest in the area. This necessity comes from
            the importance that HTML plays in the structuralization of webpages.
            Besides its simplicity, this language is irreplaceable, independent,
            and, thanks to the constant release of new versions, up to date.
          </p>
          <p>
            To begin with, HTML is both uncomplicated and accessible. While some
            other languages work based on mathematical logic, this language is
            based on pretty easy use of tags to translate a structure to the
            computer. The system of tags works in a way that every person who
            knows how to compose correctly the tags, is a potential developer.
          </p>
          <p>
            <img
              src="https://lh3.googleusercontent.com/proxy/xMWx8a0fISZzT5Sil2Gq7NJPXUc7kDhj-SrXtnlWOQVzAx2Ndlk91J-GPgj6spuNWKjYKBUGkwnMVwcHCKjRa23ecAqikIqwvhZtgLjuEFtmkTel9dPlGAZ_fu7lQ9ZkEpkfCwO_A_EyvHtFHH2fFsE1BAsZ3Oqh5vXwkUc5"
              alt="HTML tag visual explanation"
            />
          </p>
          <p>
            Regarding the use of HTML in current days, this language has reached
            the status of irreplaceable. Due to the great support given to HTML
            by browsers, the role of the language rapidly ascended to become a
            worldwide tool. Nowadays, while the obsolescence of few tags is a
            reality, the hegemony of this language remains still.
          </p>
          <p>
            Moreover, HTML is an independent tool in website development that is
            constantly updated. The basic tools of contemporaneity for
            developing most websites are: HTML structure, CSS styles, and,
            depending on the use of the website, some Javascript might come in
            handy. However, even now days is still possible to build a website
            using only HTML. Though it may have lost few functionalities with
            deprecated tags, some recent versions bring in new tags and
            functions that end up repaying the loss.
          </p>
        </div>
      ),
    },
  ];

  const location = useLocation();
  const history = useHistory();

  const isContentShown = location.pathname !== "/coding";
  const selectedArticle = articles.find(({ href }) =>
    location.pathname.includes(href)
  );

  if (isContentShown && !selectedArticle) {
    return <Redirect to="/coding"></Redirect>;
  }

  const didCloseModal = () => {
    history.push("/coding");
  };

  return (
    <div>
      <div className="coding">
        {articles.map(({ title, description, href }) => (
          <Article description={description} href={href} key={title}>
            {title}
          </Article>
        ))}
      </div>
      {selectedArticle && (
        <Modal
          isOpen={isContentShown}
          contentRelation="scroll"
          didClose={didCloseModal}
        >
          {selectedArticle.content}
        </Modal>
      )}
    </div>
  );
}

export default Coding;
