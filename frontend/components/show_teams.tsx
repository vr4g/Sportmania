import React from "react";
import styles from "../styles/show_teams.module.scss";
import SportsMapping from "./sports_mapping";

type Props = {
  data: any;
  textInfo: String;
};

const ShowTeams = ({ data, textInfo }: Props) => {
  return (
    <div className={styles.main}>
      <span className={styles.mostPopularText}>{textInfo}</span>
      <div className={styles.cardsView}>
        <SportsMapping sportList={data} />
      </div>
    </div>
  );
};

export default ShowTeams;
