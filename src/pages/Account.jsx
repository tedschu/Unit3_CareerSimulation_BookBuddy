/* TODO - add your code to create a functional React component that renders account details for a logged in user. 
Fetch the account data from the provided API. You may consider conditionally rendering a message 
for other users that prompts them to log in or create an account.  */

// Can use localStorage.removeItem() to power a log out button (if needed)
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Checkin from "../components/Checkin";

function Account() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function getAccountInfo() {
      const response = await fetch(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((result) => {
          //console.log(result);
          setUser(result);
        })
        .catch(console.error);
    }
    getAccountInfo();
    console.log(user);
  }, []);

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  // FUNCTION TO HANDLE THE ARRAY OF BOOK OBJECTS

  const userBooks = user.books;
  console.log(user.books);

  return (
    <>
      <div className="accountWrapper">
        <div className="accountBox">
          <h1>Welcome back, {user.firstname}!</h1>;
          <h3>Here's your account information:</h3>
          <ul>
            <li>
              Name: {user.firstname} {user.lastname}
            </li>
            <li>Email: {user.email}</li>
          </ul>
          <div className="userBooks">
            <h2>Your books:</h2>
            {userBooks &&
              userBooks.map((book) => (
                <div className="userBooksWrapper" key={book.id}>
                  <h2>{book.title}</h2>
                  <h3>By {book.author}</h3>
                  <p>check back in button</p>
                </div>
              ))}
          </div>
          <button onClick={logout}>Sign out</button>
        </div>
      </div>
    </>
  );
}

export default Account;
