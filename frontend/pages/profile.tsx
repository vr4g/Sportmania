import React, { useEffect, useState } from "react";
import styles from "../styles/profile.module.scss";
import useStore from "../store/store";
import { BsGenderMale, BsGenderFemale } from "react-icons/bs";
import axios from "axios";

const Profile = () => {
  const authState = useStore<any>((state) => state.user);
  const [userInfo, setUserInfo] = useState<any>([]);

  const getUser = async () => {
    const userData = await axios.get(
      "http://localhost:5000/api/user/get_user",
      {
        params: {
          user_id: localStorage.getItem("userId"),
        },
      }
    );

    setUserInfo(userData.data);
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.favoriteSports}>
        <img className={styles.profilePicture}></img>
        <h2>Omiljeni sportovi</h2>
        <ul>
          <li>Nogomet</li>
          <li>Košarka</li>
        </ul>
      </div>
      <div className={styles.userData}>
        <h1 className={styles.name}>
          <span>{`${userInfo.first_name} ${userInfo.last_name}`}</span>
        </h1>
        <div className={styles.info}>
          <span>Email: {userInfo.email}</span>
          <span>Kontakt: {userInfo.contact}</span>
          <span>Adresa:</span>
          <span>
            Spol:{" "}
            {userInfo.gender === 1 ? (
              <BsGenderMale size="25" color="blue" />
            ) : (
              <BsGenderFemale size="25" color="red" />
            )}
          </span>
          <span>Datum rođenja: {userInfo.birthday}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
