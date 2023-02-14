import React, { useState } from "react";
import styles from "../styles/signuplogin.module.scss";
import Login from "./login";
import Register from "./register";

const SignupLogin = ({ setAuth }: any) => {
  const [login, setLogin] = useState<boolean>(true);
  /*   const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [firstName, setFirstName] = useState<String>("");
  const [lastName, setLastName] = useState<String>("");
  const [contact, setContact] = useState<String>("");
  const [birthday, setBirthday] = useState<String>("");
  const [gender, setGender] = useState<String>("");
  const [address, setAddress] = useState<String>("");
  const [errorMsg, setErrorMsg] = useState<String>(""); */

  /* 
  const onSubmitSignup = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        contact: contact,
        birthday: birthday,
        gender: gender,
        address: address,
      },
    };
    const res = await axios.post("http://localhost:5000/signup", {}, options);
  }; */

  /*   const onSubmitLogin = async (e: any) => {
    e.preventDefault();
    const response = await axios.get("http://localhost:5000/login", {
      params: {
        email: email,
        password: password,
      },
    });
    console.log(response);
    if (response.data.message === "Email not confirmed") {
      setErrorMsg("Potvrdi registraciju na emailu");
      return;
    }

    if (response.data.message === "Invalid login credentials") {
      setErrorMsg("Ne postoji korisnik sa tim podacima");
      return;
    }

    if (response.data) {
      setErrorMsg("");
      useStore.setState({ auth: true, user: response.data });
    }
  }; */

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
            /*         <>
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
              <div className={styles.bottomText}>
                Nemate račun?{" "}
                <span
                  className={styles.bottomLink}
                  onClick={() => {
                    setLogin((current) => !current);
                  }}
                >
                  Registriraj se
                </span>
              </div>
            </> */
            <>
              <Register />

              {/*               <form onSubmit={onSubmitSignup}>
                <input
                  type="text"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                ></input>
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                ></input>
                <input
                  type="text"
                  placeholder="Ime"
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                ></input>
                <input
                  type="text"
                  placeholder="Prezime"
                  onChange={(e) => setLastName(e.target.value)}
                  required
                ></input>
                <input
                  type="text"
                  placeholder="Kontakt"
                  onChange={(e) => setContact(e.target.value)}
                  required
                ></input>
                <input
                  type="text"
                  placeholder="Adresa"
                  onChange={(e) => setAddress(e.target.value)}
                  required
                ></input>
                <div className={styles.inline}>
                  <label className={styles.label}>Datum rođenja</label>
                  <input
                    type="date"
                    placeholder="Datum rođenja"
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                  ></input>
                </div>
                <div className={styles.inline}>
                  <label className={styles.label}>Spol</label>
                  <select
                    className={styles.dropdown}
                    name="gender"
                    id="gender"
                    onChange={(e) => setGender(e.target.value)}
                    required
                  >
                    <option value="">Odaberi spol</option>
                    <option value="muško">Muško</option>
                    <option value="žensko">Žensko</option>
                  </select>
                </div>
                <button type="submit">Registriraj se</button>
              </form> */}

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
