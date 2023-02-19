import "../styles/globals.css";
import type { AppProps } from "next/app";
import styles from "../styles/nav.module.scss";
import useStore from "../store/store";
import axios from "axios";
import { useEffect, useState } from "react";
import Navigation from "../components/navigation";
import SignupLogin from "../components/signup_login";

export default function App({ Component, pageProps }: AppProps) {
  let authenticated = useStore<any>((state) => state);
  const [userData, setUserData] = useState(authenticated.user);
  axios.defaults.withCredentials = true;

  useEffect(() => {
    if (!authenticated.auth) {
      refreshToken();
    }
  }, [authenticated]);

  const refreshToken = async () => {
    const userId = localStorage.getItem("userId");
    const accessToken = await axios.post(
      "http://localhost:5000/api/user/refresh_token",
      {
        user_id: userId,
      }
    );

    if (accessToken.data.message === "Unathorized") {
      return;
    }

    if (accessToken.data) {
      let tokenExpire = new Date();
      useStore.setState({
        auth: true,
        user: userData,
        token: accessToken.data,
        token_expire: tokenExpire.setHours(tokenExpire.getHours() + 1),
      });
      return;
    }
    <SignupLogin />;
  };

  if (!authenticated.auth) {
    return <SignupLogin />;
  }

  return (
    <div className={styles.main}>
      <Navigation />
      <div className={styles.componentContainer}>
        <Component {...pageProps} />
      </div>
    </div>
  );
}
