import React, { useState } from "react";
import { FaArrowCircleDown } from "react-icons/fa";
import styles from "../styles/show_teams.module.scss";
import SportsMapping from "./sports_mapping";

type Props = {
  data: any;
  textInfo: String;
};

const ShowTeams = ({ data, textInfo }: Props) => {
  const [showData, setShowData] = useState<boolean>(true);

  const handleToggle = () => {
    setShowData(!showData);
  };

  return (
    <div className={styles.main}>
      <span onClick={handleToggle} className={styles.mostPopularText}>
        {textInfo}{" "}
        <div className={styles.arrowStyle}>
          <FaArrowCircleDown
            className={showData ? styles.showDataArrow : styles.hideDataArrow}
            color="#fff"
            size={25}
          />
        </div>
      </span>

      <div
        className={`${styles.cardsViewRow} ${
          showData ? styles.showData : styles.hideData
        }`}
      >
        {data.length !== 0 ? (
          <SportsMapping sportList={data} />
        ) : (
          <span className={styles.noData}>nema sportova u ovoj kategoriji</span>
        )}
      </div>
    </div>
  );
};

export default ShowTeams;
