import React, { useState } from "react";
import styles from "../styles/signuplogin.module.scss";
import Login from "./login";
import Register from "./register";

const SignupLogin = ({ setAuth }: any) => {
  const [login, setLogin] = useState<boolean>(true);

  return (
    <div className={styles.main}>
      <h1 className={styles.heading}>Sport buddy</h1>
      <div className={styles.container}>
        <h2 className={styles.info}>{login ? "Prijava" : "Registracija"}</h2>
        <div className={styles.form}>
          {login ? (
            <>
              <Login />
              <div className={styles.bottomText}>
                Nemate račun?
                <span
                  className={styles.bottomLink}
                  onClick={() => {
                    setLogin((current) => !current);
                  }}
                >
                  Registriraj se
                </span>
              </div>
            </>
          ) : (
            <>
              <Register />

              <div className={styles.bottomText}>
                Imate račun?{" "}
                <span
                  className={styles.bottomLink}
                  onClick={() => {
                    setLogin((current) => !current);
                  }}
                >
                  Prijavi se
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupLogin;
