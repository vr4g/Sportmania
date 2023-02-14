import React from "react";
import styles from "../styles/nav.module.scss";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import axios from "axios";
import useStore from "../store/store";
import SignupLogin from "./signup_login";

const Navigation = () => {
  const logout = async () => {
    const res = await axios.post("http://localhost:5000/api/user/signout");
    if (res.data.message === "Signed out") {
      useStore.setState({
        auth: false,
        user: [],
        token: "",
        token_expire: 0,
      });
      <SignupLogin />;
    }
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>Sportmania</div>
      <div className={styles.links}>
        <Link href="/">
          <div className={styles.link}>Početna</div>
        </Link>
        <Link href="mine">
          <div className={styles.link}>Moje aktivnosti</div>
        </Link>
      </div>
      <Link href="profile">
        <div className={styles.linkProfile}>
          <div className={styles.profile}>Moj profil</div>
          <CgProfile size="30" className={styles.icon} />
        </div>
      </Link>
      <div className={styles.logout} onClick={() => logout()}>
        Logout
      </div>
    </nav>
  );
};

export default Navigation;
