import { useState } from "react";
import bookLogo from "./assets/books.png";
import { Route, Router, Routes } from "react-router-dom";
import React from "react";
import Nav from "./components/Nav";
import Books from "./pages/Books";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SingleBook from "./pages/SingleBook";
import Checkout from "./components/Checkout";

function App() {
  //const [token, setToken] = useState(null);

  return (
    <>
      <Nav />

      <Routes>
        <Route index element={<Books />} />
        <Route path="/myaccount" element={<Account />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="books/:id" element={<SingleBook />} />
      </Routes>
    </>
  );
}

export default App;
