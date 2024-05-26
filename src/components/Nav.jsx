/* TODO - add your code to create a functional React component that renders a navigation bar 
for the different views in your single page application. 
You may consider conditionally rendering some options - for example 'Login' should be available 
if someone has not logged in yet. */

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons/faBook";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Nav() {
  const [token, setToken] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  // const [value, setValue] = useState("");

  //console.log(login);

  useEffect(() => {
    const hasToken = localStorage.getItem("token");
    //console.log(hasToken);
    hasToken && setToken(true);
  }, [token]);

  return (
    <>
      <nav>
        <Link to={"/"} className="logos">
          <FontAwesomeIcon icon={faBook} size={"2x"} />
        </Link>
        <div className="siteName">BookBuddy</div>
        <div className="navLinks">
          <Link to={"/login"} className="logos">
            {!token && <h3>Log in / create account to check out books</h3>}
            <FontAwesomeIcon icon={faUser} size={"2x"} />
          </Link>
          <Link to={"/"} className="logos">
            <FontAwesomeIcon icon={faMagnifyingGlass} size={"2x"} />
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Nav;
