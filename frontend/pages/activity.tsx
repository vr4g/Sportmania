import axios from "axios";
import React, { useEffect, useState } from "react";
import SportsMapping from "../components/sports_mapping";
import useStore from "../store/store";
import styles from "../styles/add.module.scss";

const Mine = () => {
  const [data, setData] = useState<any>([]);
  const [checkedData, setCheckedData] = useState<any>([]);
  const authState = useStore<any>((state) => state.user);

  const getSports = async () => {
    const response = await axios.get("http://localhost:5000/api/sport/sport", {
      params: { author: localStorage.getItem("userId") },
    });
    console.log(response.data);
    if (response.data) {
      setData(response.data);
    }
  };

  const getCheckedSports = async () => {
    const response = await axios.get(
      "http://localhost:5000/api/sport/checked_sports",
      {
        params: { author: localStorage.getItem("userId") },
      }
    );

    console.log(response.data);

    if (response.data) {
      setCheckedData(response.data);
    }
  };

  useEffect(() => {
    getSports();
    getCheckedSports();
    console.log(data);
    console.log(checkedData);
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.groupBorderCreated}>
        <h2>Moji kreirani timovi</h2>
        {data.length !== 0 ? (
          <SportsMapping sportList={data} />
        ) : (
          <span className={styles.noDataInfo}>Nemate kreiranih timova</span>
        )}
      </div>
      <div className={styles.groupBorderChecked}>
        <h2>Sportovi na koje sam prijavljen</h2>
        {checkedData.length !== 0 ? (
          <SportsMapping sportList={checkedData} />
        ) : (
          <span className={styles.noDataInfo}>Niste prijavljeni na sport</span>
        )}
      </div>
    </div>
  );
};

export default Mine;
