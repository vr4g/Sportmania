import axios from "axios";
import React, { useState } from "react";
import styles from "../styles/signuplogin.module.scss";

const Register = () => {
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [firstName, setFirstName] = useState<String>("");
  const [lastName, setLastName] = useState<String>("");
  const [contact, setContact] = useState<String>("");
  const [birthday, setBirthday] = useState<String>("");
  const [gender, setGender] = useState<String>("");
  const [address, setAddress] = useState<String>("");

  const onSubmitSignup = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      /*       params: {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        contact: contact,
        birthday: birthday,
        gender: gender,
        address: address,
      }, */
    };

    const res = await axios.post(
      "http://localhost:5000/api/user/register",
      {
        email: email,
        password: password,
        firstname: firstName,
        lastname: lastName,
        contact: contact,
        birthday: birthday,
        gender: gender,
      },
      options
    );
    console.log(res);
  };

  return (
    <>
      <form onSubmit={onSubmitSignup}>
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
      </form>
    </>
  );
};

export default Register;
