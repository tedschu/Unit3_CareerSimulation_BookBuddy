/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Books from "./Books";
import { Link } from "react-router-dom";
import Checkout from "../components/Checkout";

function SingleBook() {
  const [book, setBook] = useState([]);

  const token = localStorage.getItem("token");

  const data = useParams();
  const id = data.id;

  useEffect(() => {
    async function getSingleBook() {
      const response = await fetch(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/" + id,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data.book);
      setBook(data.book);
    }
    getSingleBook();
  }, []);

  //  FUNCTION TO PASS ID AS PROPS / PARAMS TO "CHECKOUT" COMPONENT
  const handleCheckout = () => {
    <Checkout book={book.id} />;
    console.log(book.id);
  };

  return (
    <>
      <div className="contentWrapper">
        <div className="singleBookWrapper">
          <h1>{book.title}</h1>
          <h2>By {book.author}</h2>
          <p>{book.description}</p>
          <img src={book.coverimage} alt={book.title} />
          {book.available ? (
            <h3 style={{ color: "green" }}>Available</h3>
          ) : (
            <h3 style={{ color: "red" }}>Not available</h3>
          )}
          <div className="buttonWrapper">
            <Link className="link" to={"/"}>
              <button className="border_button">Go back</button>
            </Link>
            {book.available && <Checkout book={book.id} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleBook;
