import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
import Reservations from "./Reservations";
import { useNavigate } from "react-router-dom";

function Checkin({ resId }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  //   const handleCheckout = () => {
  //     console.log(book);
  //   };

  console.log(resId);

  async function runCheckin() {
    const response = await fetch(
      "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/" +
        resId,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch(console.error);
  }

  return (
    <>
      <button onClick={runCheckin}>Check back in</button>
    </>
  );
}

export default Checkin;
