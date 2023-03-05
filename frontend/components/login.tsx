import axios from "axios";
import React, { useState } from "react";
import useStore from "../store/store";
import styles from "../styles/signuplogin.module.scss";

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
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/login`,
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
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
        <div className={styles.groupStyle}>
          <label className={styles.label}>Email</label>
          <input
            type="text"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
        </div>
        <div className={styles.groupStyle}>
          <label className={styles.label}>Password</label>
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </div>
        <button type="submit">Prijava</button>
      </form>
    </>
  );
};

export default Login;
