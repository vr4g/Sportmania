import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import useStore from "../store/store";
import styles from "../styles/create_team.module.scss";
import { IoArrowBackCircle } from "react-icons/io5";
import { useRouter } from "next/router";

const CreateTeam = ({ setCreateNew }: any) => {
  const [sport, setSport] = useState<String>("");
  const [neededPlayers, setNeededPlayers] = useState<number>();
  const [location, setLocation] = useState<String>();
  const [additionalInfo, setAdditionalInfo] = useState<String>();
  const [date, setDate] = useState<Date>();
  const [showError, setShowError] = useState<boolean>(false);
  const [btnText, setBtnText] = useState<String>("");
  const authUser = useStore<any>((state) => state.user);
  const [errorMsg, setErrorMsg] = useState<String>("");

  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!sport || !neededPlayers || !location || !date) {
      setErrorMsg("Unesite sva obavezna polja!");
      setShowError(true);
      return;
    }

    const today = new Date();
    if (date < today) {
      setErrorMsg("Krivi datum");
      setShowError(true);
      return;
    }
    setShowError(false);

    addTeam();
  };

  useEffect(() => {
    let timeout: any;
    if (showPopup) {
      timeout = setTimeout(() => {
        setShowPopup(false);
        router.push("/activity");
      }, 1500);
    }
    return () => clearTimeout(timeout);
  }, [showPopup]);

  const addTeam = async () => {
    const options = {
      withCredentials: true,
      params: {
        sportName: sport,
        datetime: date,
        playerRequired: neededPlayers,
        location: location,
        checked_users: localStorage.getItem("userId"),
        description: additionalInfo,
        userId: localStorage.getItem("userId"),
      },
    };
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/sport/sport`,
      {},
      options
    );
    if (response.data.message === "Success") {
      setShowPopup(true);
    }
  };

  return (
    <div className={styles.main}>
      <>
        <div
          className={styles.backBtn}
          id="back"
          onClick={() => setCreateNew(false)}
        >
          <IoArrowBackCircle size="25" color="white" />
          {btnText}
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <select
            className={styles.dropdown}
            onChange={(sport) => setSport(sport.target.value)}
          >
            <option value="">Odaberi sport (obavezno)</option>
            <option value="tenis">Tenis</option>
            <option value="nogomet">Nogomet</option>
            <option value="košarka">Košarka</option>
            <option value="stolni tenis">Stolni tenis</option>
            <option value="badminton">Badminton</option>
            <option value="squash">Squash</option>
          </select>
          <input
            value={neededPlayers}
            className={styles.inputField}
            type="number"
            placeholder="Koliko igrača trebate (obavezno)"
            onChange={(e) => setNeededPlayers(e.target.valueAsNumber)}
          ></input>
          <input
            className={styles.inputField}
            type="text"
            placeholder="Lokacija odvijanja aktivnosti (obavezno)"
            onChange={(e) => setLocation(e.target.value)}
          ></input>

          <label>Datum i vrijeme aktivnosti (obavezno)</label>
          <input
            className={styles.dateTimeField}
            type="datetime-local"
            placeholder="Datum aktivnosti "
            onChange={(date) => setDate(new Date(date.target.value))}
          ></input>
          <input
            className={styles.inputField}
            type="text"
            placeholder="Dodatne informacije"
            onChange={(info) => setAdditionalInfo(info.target.value)}
          ></input>
          {showError && <span className={styles.errorMsg}>{errorMsg}</span>}
          {showPopup && (
            <div className={styles.successMessage}>
              Uspješno ste kreirali svoj tim
            </div>
          )}
          <input
            className={styles.submitBtn}
            type="submit"
            value="Kreiraj"
          ></input>
        </form>
      </>
    </div>
  );
};
export default CreateTeam;
