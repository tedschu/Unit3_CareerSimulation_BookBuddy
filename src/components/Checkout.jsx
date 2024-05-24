import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

function Checkout({ book }) {
  const token = localStorage.getItem("token");

  //   const handleCheckout = () => {
  //     console.log(book);
  //   };

  async function runCheckout() {
    const response = await fetch(
      "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/" + book,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          available: false,
        }),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch(console.error);
  }

  return <>{token && <button onClick={runCheckout}>Check out</button>}</>;
}

export default Checkout;
