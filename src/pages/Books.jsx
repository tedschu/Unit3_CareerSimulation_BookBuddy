/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. 
Fetch the book data from the provided API. 
Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */

import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Checkout from "../components/Checkout";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Books() {
  const [books, setBooks] = useState([]);
  const [value, setValue] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [noSearchResults, setNoSearchResults] = useState(false);

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
      setFilteredBooks(data.books);
    }
    getAllBooks();
  }, []);

  //const booksList = books;  //had initially used this as the array to map

  // USEEFFECT ONLY RUNS WHEN THERE ARE STATE CHANGES IN DEPENDENCY STATES (BOOKS, VALUE)
  // WHEN IT RUNS, IT UPDATES THE STATE FILTEREDBOOKS TO BE THE SEARCH-FILTERED ARRAY
  useEffect(() => {
    const searchResultArray = books.filter((book) =>
      book.title.toLowerCase().includes(value.toLowerCase())
    );
    console.log(searchResultArray);

    setFilteredBooks(searchResultArray);

    searchResultArray.length === 0 && setNoSearchResults(true); // TRIGGERS "NO RESULTS" TEXT BASED ON WHETHER RESULT ARRAY IS EMPTY OR NOT
    searchResultArray.length > 0 && setNoSearchResults(false);
  }, [value, books]);

  // SEARCH BAR RESULTS
  const setResults = (e) => {
    setValue(e.target.value);
    //console.log(value);
  };

  //console.log(books);

  console.log(noSearchResults);
  return (
    <>
      <div className="contentWrapper">
        <div className="searchWrap">
          <div className="searchBar">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              size={"1x"}
              className="searchIcon"
            />
            <input
              type="text"
              placeholder="Search for a book..."
              onChange={setResults}
            />
          </div>
        </div>
        {noSearchResults && <h2>There are no books that match your search</h2>}
        {filteredBooks.map((book) => (
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
                <button className="border_button">See details</button>
              </Link>
              {book.available && <Checkout book={book.id} />}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Books;
