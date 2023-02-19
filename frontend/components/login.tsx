import axios from "axios";
import React, { useState } from "react";
import useStore from "../store/store";

const Login = () => {
  const [errorMsg, setErrorMsg] = useState<String>("");
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");

  const onSubmitLogin = async (e: any) => {
    e.preventDefault();

    try {
      const options = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        {
          email: email,
          password: password,
        },
        options
      );
      if (response.data) {
        setErrorMsg("");

        let tokenExpire = new Date();
        useStore.setState({
          auth: true,
          user: response.data.user[0],
          token: response.data.token,
          token_expire: tokenExpire.setHours(tokenExpire.getHours() + 1),
        });

        localStorage.setItem("userId", response.data.user[0].user_id);
      }
    } catch (error: any) {
      if (error.response.data.message === "Both fields are required") {
        setErrorMsg("Oba polja obavezna");
        return;
      }
      if (error.response.data.message === "Login failed") {
        setErrorMsg("Netocni podaci za prijavu");
        return;
      }
      if ((error.message = "Network Error")) {
        setErrorMsg("Server down");
        return;
      }
      if (error.response.status === 500) {
        setErrorMsg("DB Error");
        return;
      }
    }
  };

  return (
    <>
      <span>{errorMsg}</span>
      <form onSubmit={onSubmitLogin}>
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <button type="submit">Prijavi se</button>
      </form>
    </>
  );
};

export default Login;
