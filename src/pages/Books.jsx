/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. 
Fetch the book data from the provided API. 
Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */

import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SingleBook from "./SingleBook";
import { Route, Routes } from "react-router-dom";

function Books() {
  const [books, setBooks] = useState([]);

  const token = localStorage.getItem("token"); // CHECK OUT BUTTON REFERENCES THIS

  // Needed useEffect to ensure fetch only rendered on component load (was getting infinite loops)
  useEffect(() => {
    async function getAllBooks() {
      const response = await fetch(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setBooks(data.books);
    }
    getAllBooks();
  }, []);

  const booksList = books;

  //console.log(books);

  return (
    <>
      <div className="contentWrapper">
        {booksList.map((book) => (
          <div className="bookWrapper" key={book.id}>
            <h1>{book.title}</h1>
            <h2>By {book.author}</h2>
            <img src={book.coverimage} alt={book.title} />
            {book.available ? (
              <h3 style={{ color: "green" }}>Available</h3>
            ) : (
              <h3 style={{ color: "red" }}>Not available</h3>
            )}
            <div className="buttonWrapper">
              <Link className="link" to={"books/" + book.id}>
                <button>See details</button>
              </Link>
              {token && <button>Check out</button>}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Books;
