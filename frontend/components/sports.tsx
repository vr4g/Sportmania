import React from "react";
import styles from "../styles/sport.module.scss";
import { GrLocation, GrFormClock } from "react-icons/gr";
import { CgTennis } from "react-icons/cg";
import { BiFootball, BiCalendar } from "react-icons/bi";
import axios from "axios";
import useStore from "../store/store";
import { useState, useEffect } from "react";

type SportProps = {
  sport_id: number;
  sport_name: String;
  datetime: Date;
  players_required: number;
  players_interested: number;
  checked_users: Array<any>;
  location: String;
  additional_info: String;
  author_name: String;
};

const Sports = ({
  sport_id,
  sport_name,
  datetime,
  checked_users,
  players_required,
  players_interested,
  location,
  additional_info,
  author_name,
}: SportProps) => {
  const authUser = useStore<any>((state: { user: any }) => state.user);
  const [checkedUsers, setCheckedUsers] = useState<number>(players_interested);
  const [userChecked, setUserChecked] = useState<boolean>(false);

  useEffect(() => {
    /*   if (checked_users.includes(authUser.user.id)) {
      setUserChecked(true);
    } */
  }, []);

  const joinTeam = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    setCheckedUsers((curr) => curr + 1);
    setUserChecked(true);
    const response = await axios.post(
      "http://localhost:5000/api/sport/join",
      {
        user_id: authUser.user_id,
        sportId: sport_id,
        sportName: sport_name,
        playersCurrently: players_interested,
        location: location,
        datetime: datetime,
        description: additional_info,
      },
      options
    );
  };

  return (
    <div className={styles.card}>
      <div className={styles.authorName}>{author_name}</div>
      <div className={styles.sportTitle}>{sport_name}</div>
      <div className={styles.timedate}>
        <div className={styles.date}>
          <div className={styles.icon}>
            <BiCalendar size="23" />
          </div>
          {new Date(datetime).toLocaleDateString("en-UK", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
          })}
        </div>
        <div className={styles.time}>
          <div className={styles.icon}>
            {" "}
            <GrFormClock size="30" />{" "}
          </div>
          {new Date(datetime).toLocaleTimeString("en-UK", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>

      <div>
        Potrebno igrača:{" "}
        <span className={styles.numberStyle}>
          <>{players_required}</>
        </span>
      </div>
      <div>
        <>
          Potvrđenih igrača:{" "}
          <span className={styles.currentlyPlayers}>
            <>{checkedUsers}</>
          </span>{" "}
        </>
      </div>
      {userChecked ? (
        "Prijavljeni ste ovdje"
      ) : players_interested < players_required ? (
        <button onClick={joinTeam}>Pridruži se</button>
      ) : (
        <></>
      )}
      <div className={styles.location}>
        <>
          <GrLocation />
          <span>{location}</span>
        </>
      </div>
      <div>
        <span>Dodatne informacije: {additional_info}</span>
      </div>
    </div>
  );
};

export default Sports;
