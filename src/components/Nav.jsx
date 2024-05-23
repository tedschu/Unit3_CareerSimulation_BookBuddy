/* TODO - add your code to create a functional React component that renders a navigation bar 
for the different views in your single page application. 
You may consider conditionally rendering some options - for example 'Login' should be available 
if someone has not logged in yet. */

import { Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons/faBook";
import { faUser } from "@fortawesome/free-regular-svg-icons";

function Nav() {
  const token = localStorage.getItem("token");

  return (
    <>
      <nav>
        <Link to={"/"} className="logos">
          <FontAwesomeIcon icon={faBook} size={"2x"} />
        </Link>
        <div className="navLinks">
          <Link to={"/login"} className="logos">
            {!token && <h3>Log in / create account to check out books</h3>}

            <FontAwesomeIcon icon={faUser} size={"2x"} />
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Nav;
