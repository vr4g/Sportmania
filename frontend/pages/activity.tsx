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
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/sport/sport`,
      {
        params: { user_id: localStorage.getItem("userId") },
      }
    );
    if (response.data) {
      setData(response.data);
    }
  };

  const getCheckedSports = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/sport/checked_sports`,
      {
        params: { user_id: localStorage.getItem("userId") },
      }
    );

    if (response.data) {
      setCheckedData(response.data);
    }
  };

  useEffect(() => {
    getSports();
    getCheckedSports();
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
