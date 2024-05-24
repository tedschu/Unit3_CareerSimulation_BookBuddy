/* TODO - add your code to create a functional React component that renders a registration form */
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    firstname: "Samjmmy",
    lastname: "Smithj",
    email: "ssmithhjg@example.com",
    password: "sam345",
  });

  const navigate = useNavigate();

  // SUBMIT BUTTON
  const submit = (event) => {
    event.preventDefault();
    console.log(form);
    createAccount(form);
  };

  // HANDLES FORM VALUES, UPDATES "FORM" STATE
  const setChange = (event) => {
    const newObj = { ...form };
    newObj[event.target.name] = event.target.value;
    setForm(newObj);
    console.log(form);
  };

  // PUSHES FORM DATA TO API
  async function createAccount(form) {
    const response = await fetch(
      "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: form.firstname,
          lastname: form.lastname,
          email: form.email,
          password: form.password,
        }),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        console.log(result.token);
        localStorage.setItem("token", result.token); // SETS TOKEN TO LOCALSTORAGE IN BROWSER
        navigate("/");
      })
      .catch(console.error);
  }

  return (
    <>
      <div className="formContentWrapper">
        <div className="formWrapper">
          <h1>Well, hello there!</h1>
          <h3>Create an account to check out books from our library.</h3>
          <form className="loginForm" onSubmit={submit}>
            <label>
              First name: <br></br>
              <input type="text" name={"firstname"} onChange={setChange} />
            </label>
            <label>
              Last name: <br></br>
              <input type="text" name={"lastname"} onChange={setChange} />
            </label>
            <label>
              Email address: <br></br>
              <input type="text" name={"email"} onChange={setChange} />
            </label>
            <label>
              Password: <br></br>
              <input type="password" name={"password"} onChange={setChange} />
            </label>
            <input id={"submit"} type="submit" value={"Create account"} />
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
