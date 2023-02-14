import axios from "axios";
import React from "react";
import { useState } from "react";
import useStore from "../store/store";
import styles from "../styles/create_team.module.scss";
import { IoArrowBackCircle } from "react-icons/io5";

const CreateTeam = ({ setCreateNew }: any) => {
  const [sport, setSport] = useState<String>("");
  const [neededPlayers, setNeededPlayers] = useState<number>();
  const [location, setLocation] = useState<String>();
  const [additionalInfo, setAdditionalInfo] = useState<String>();
  const [date, setDate] = useState<Date>();
  const [btnText, setBtnText] = useState<String>("");
  const authUser = useStore<any>((state) => state.user);

  const addTeam = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        sportName: sport,
        datetime: date,
        playerRequired: neededPlayers,
        location: location,
        checked_users: authUser.user_id,
        description: additionalInfo,
        userId: authUser.user_id,
      },
    };
    const response = await axios.post(
      "http://localhost:5000/api/sport/sport",
      {},
      options
    );
  };

  return (
    <div className={styles.main}>
      <>
        <div
          className={styles.backBtn}
          onMouseEnter={() => setBtnText("Natrag")}
          onMouseLeave={() => setBtnText("")}
          id="back"
          onClick={() => setCreateNew(false)}
        >
          <IoArrowBackCircle size="25" color="white" />
          {btnText}
        </div>
        <form onSubmit={addTeam} className={styles.form}>
          <select
            className={styles.dropdown}
            required
            onChange={(sport) => setSport(sport.target.value)}
          >
            <option value="">Odaberi sport</option>
            <option value="tenis">Tenis</option>
            <option value="nogomet">Nogomet</option>
            <option value="košarka">Košarka</option>
            <option value="stolni tenis">Stolni tenis</option>
            <option value="badminton">Badminton</option>
            <option value="squash">Squash</option>
          </select>
          <input
            type="number"
            placeholder="Potrebno igrača ( uključujući kreatora )"
            onChange={(e) => setNeededPlayers(e.target.valueAsNumber)}
            required
          ></input>
          <input
            type="text"
            placeholder="Lokacija odvijanja aktivnosti"
            required
            onChange={(e) => setLocation(e.target.value)}
          ></input>
          <label>Datum i vrijeme aktivnosti</label>
          <input
            type="datetime-local"
            placeholder="Datum aktivnosti"
            required
            onChange={(date) => setDate(new Date(date.target.value))}
          ></input>
          <input
            type="text"
            placeholder="Dodatne informacije (npr. Treba lopta, može i igrač više)"
            onChange={(info) => setAdditionalInfo(info.target.value)}
          ></input>
          <input type="submit" value="Kreiraj"></input>
        </form>
      </>
    </div>
  );
};

export default CreateTeam;
