import styles from "../styles/sport_card.module.css";
import {
  FaUser,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaUserSlash,
  FaInfo,
} from "react-icons/fa";
import React, { useEffect, useState } from "react";
import axios from "axios";

type SportProps = {
  sport_id: number;
  sport_name: String;
  datetime: Date;
  players_required: number;
  players_interested: number;
  checked_users: Array<any>;
  location: String;
  description: String;
  first_name: String;
  last_name: String;
  user_id: number;
};

const SportCard = ({
  sport_id,
  sport_name,
  datetime,
  checked_users,
  players_required,
  players_interested,
  location,
  description: description,
  first_name,
  last_name,
  user_id,
}: SportProps) => {
  const date = new Date(datetime).toLocaleDateString();
  const time = new Date(datetime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const [checkedUsers, setCheckedUsers] = useState<number>(players_interested);
  const [canCheckIn, setCanCheckIn] = useState<boolean>(false);
  const [mark, setMark] = useState<any>();

  let isCreator: boolean = false;

  const checkout = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/sport/checkout`,
      {
        user_id: localStorage.getItem("userId"),
        sportId: sport_id,
        playersCurrently: checkedUsers - 1,
      },
      { withCredentials: true }
    );
    setCanCheckIn(true);
    setCheckedUsers((curr) => curr - 1);
  };

  const joinTeam = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/sport/join`,
      {
        user_id: localStorage.getItem("userId"),
        sportId: sport_id,
        playersCurrently: checkedUsers + 1,
      },
      { withCredentials: true }
    );
    setCanCheckIn(false);
    setCheckedUsers((curr) => curr + 1);
  };

  let bgColor;
  switch (sport_name.toLowerCase()) {
    case "nogomet":
      bgColor = "#037317";
      break;
    case "košarka":
      bgColor = "#9B5005";
      break;
    case "tenis":
      bgColor = "#A1C104";
      break;
    case "squash":
      bgColor = "#946F04";
      break;
    case "stolni tenis":
      bgColor = "#068777";
      break;
    case "badminton":
      bgColor = "#540687";
      break;
    default:
      bgColor = "#000";
  }

  const groupInfo = `${checkedUsers} / ${players_required}`;
  const hasGroupSpace = checkedUsers < players_required;

  if (user_id === JSON.parse(localStorage.getItem("userId")!)) {
    isCreator = true;
  }

  useEffect(() => {
    if (checked_users !== null) {
      if (checked_users.includes(JSON.parse(localStorage.getItem("userId")!))) {
        setCanCheckIn(false);
      } else {
        setCanCheckIn(true);
      }
    } else {
      setCanCheckIn(true);
    }
  }, []);

  return (
    <div className={styles.card}>
      <span className={styles.sportTitle} style={{ backgroundColor: bgColor }}>
        {sport_name}
      </span>
      <div className={styles.header}>
        <h3 className={styles.title}>
          <span className={styles.icon}>
            <FaUser />
          </span>
          {first_name} {last_name}
        </h3>
        <p className={styles.group}>
          <span
            className={`${styles.icon} ${
              hasGroupSpace ? styles.green : styles.red
            }`}
          >
            {hasGroupSpace ? <FaUser /> : <FaUserSlash />}
          </span>
          {groupInfo}
        </p>
      </div>
      <div className={styles.content}>
        <div className={styles.info}>
          <p className={styles.detail}>
            <span className={styles.icon}>
              <FaCalendarAlt color="gray" />
            </span>
            {date}
          </p>
          <p className={styles.detail}>
            <span className={styles.icon}>
              <FaClock color="gray" />
            </span>
            {time}
          </p>
          <p className={styles.detail}>
            <span className={styles.icon}>
              <FaMapMarkerAlt color="gray" />
            </span>
            {location}
          </p>
        </div>
        <p className={styles.description}>
          <span className={styles.icon}>
            <FaInfo color="gray" />
          </span>
          {description === null ? (
            <span style={{ color: "gray" }}>nema dodatnih informacija</span>
          ) : (
            description
          )}
        </p>
      </div>
      {!isCreator && canCheckIn && players_required !== players_interested ? (
        <button className={styles.checkInButton} onClick={joinTeam}>
          Prijavi se
        </button>
      ) : players_required === players_interested ? (
        <button className={styles.checkInButtonFull}>Sport popunjen</button>
      ) : isCreator ? (
        <button className={styles.checkInButtonDisabled}>Moj sport</button>
      ) : (
        <button className={styles.checkOutButton} onClick={checkout}>
          Odjavi se
        </button>
      )}
    </div>
  );
};

export default SportCard;
