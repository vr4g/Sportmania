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
  const [errorMsg, setErrorMsg] = useState<String>("");
  const [isFormValid, setIsFormValid] = useState<boolean>(true);

  function calcAge(dateString: Date) {
    var birthday = +new Date(dateString);
    return ~~((Date.now() - birthday) / 31557600000);
  }

  /*   const checkForm = () => {
    calcAge(birthday);
    if (calcAge(birthday) < 15) {
      setErrorMsg("Osobe mlađe od 15 godina ne mogu se registirati");
      setIsFormValid(false);
      return;
    }
    setIsFormValid(true);
  }; */

  const onSubmitSignup = async () => {
    if (!isFormValid) {
      return;
    }
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/register`,
      {
        email: email,
        password: password,
        firstname: firstName,
        lastname: lastName,
        contact: contact,
        birthday: birthday,
        gender: gender,
      },
      { withCredentials: true }
    );
    console.log(res);
  };

  return (
    <>
      <span className={styles.formError}>{errorMsg}</span>
      <form onSubmit={onSubmitSignup}>
        <div className={styles.groupStyle}>
          <label className={styles.label}>Email</label>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
        </div>
        <div className={styles.groupStyle}>
          <label className={styles.label}>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
        </div>
        <div className={styles.groupStyle}>
          <label className={styles.label}>Ime</label>
          <input
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
            required
          ></input>
        </div>
        <div className={styles.groupStyle}>
          <label className={styles.label}>Prezime</label>
          <input
            type="text"
            onChange={(e) => setLastName(e.target.value)}
            required
          ></input>
        </div>
        <div className={styles.groupStyle}>
          <label className={styles.label}>Kontakt broj</label>
          <input
            type="text"
            onChange={(e) => setContact(e.target.value)}
            required
          ></input>
        </div>
        <div className={styles.groupStyle}>
          <label className={styles.label}>Adresa</label>
          <input
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            required
          ></input>
        </div>
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
        <button type="submit">Završi registraciju</button>
      </form>
    </>
  );
};

export default Register;
