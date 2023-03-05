import React, { useState } from "react";
import styles from "../styles/nav.module.scss";
import Link from "next/link";
import axios from "axios";
import useStore from "../store/store";
import SignupLogin from "./signup_login";
import {
  FaHome,
  FaRunning,
  FaUser,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";

const Navigation = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  const logout = async () => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/signout`
    );
    if (res.data.message === "Signed out") {
      localStorage.removeItem("userId");
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
      <div className={styles.navLogo}>Sportmania</div>
      <ul
        className={`${styles.navLinks} ${
          showMenu ? styles.showMenu : styles.hideMenu
        }`}
      >
        <li>
          <Link className={styles.navLink} href="/">
            <FaHome />
            <span>Početna</span>
          </Link>
        </li>
        <li>
          <Link className={styles.navLink} href="/activity">
            <FaRunning />
            <span>Moje aktivnosti</span>
          </Link>
        </li>
        <li>
          <Link className={styles.navLink} href="/profile">
            <FaUser />
            <span>Moj profil</span>
          </Link>
        </li>
        <li>
          <Link className={styles.navLink} href="" onClick={logout}>
            <FaSignOutAlt />
            <span>Odjavi se</span>
          </Link>
        </li>
      </ul>
      <div
        className={`${styles.hamburger} ${
          showMenu ? styles.active : styles.inactive
        }`}
        onClick={handleMenuClick}
      >
        <FaBars />
      </div>
    </nav>
  );
};

export default Navigation;
