/* TODO - add your code to create a functional React component that renders a login form */
import { useState } from "react";
import { Link } from "react-router-dom";
import Account from "./Account";
import { useNavigate } from "react-router-dom";

function Login() {
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    email: "ssmithhjg@example.com",
    password: "sam345",
  });

  const [loginError, setloginError] = useState(false);

  const navigate = useNavigate();

  // SUBMIT BUTTON
  const submit = (event) => {
    event.preventDefault();
    console.log(form);
    loginCheck(form);
  };

  // HANDLES FORM VALUES, UPDATES "FORM" STATE
  const setChange = (event) => {
    const newObj = { ...form };
    newObj[event.target.name] = event.target.value;
    setForm(newObj);
    console.log(form);
  };

  // PUSHES FORM DATA TO API
  async function loginCheck(form) {
    const response = await fetch(
      "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        console.log(result.token);
        if (!result.token) {
          setloginError(true);
        } else {
          localStorage.setItem("token", result.token); // SETS TOKEN TO LOCALSTORAGE IN BROWSER
          navigate("/");
          setloginError(false);
        }
      })
      .catch(console.error);
  }

  //console.log(loginError);
  return (
    <>
      {!token ? (
        <div className="formContentWrapper">
          <div className="formWrapper">
            <h1>Welcome back!</h1>
            <h3>Sign in to your account</h3>
            <form className="loginForm" onSubmit={submit}>
              <label>
                Email address: <br></br>
                <input type="text" name={"email"} onChange={setChange} />
              </label>
              <label>
                Password: <br></br>
                <input type="password" name={"password"} onChange={setChange} />
              </label>
              <input id={"submit"} type="submit" value={"Log in"} />
              {loginError && (
                <h3 className="loginError">
                  Your login or password is incorrect
                </h3>
              )}
            </form>
          </div>

          <Link to={"/register"}>
            <h3>Don't have an account? Create one now!</h3>
          </Link>
        </div>
      ) : (
        <Account />
      )}
    </>
  );
}

export default Login;
