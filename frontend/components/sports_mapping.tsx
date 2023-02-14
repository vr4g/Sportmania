import React from "react";
import Sports from "./sports";
import styles from "../styles/show_teams.module.scss";

type SportProps = {
  sportList: [
    {
      sport_id: number;
      sport_name: String;
      datetime: Date;
      players_required: number;
      players_interested: number;
      checked_users: Array<string>;
      location: String;
      additional_info: String;
      first_name: String;
      last_name: String;
    }
  ];
};

const SportsMapping = ({ sportList }: SportProps) => {
  return (
    <div className={styles.cardsView}>
      {sportList.map((sport) => (
        <>
          <div>
            <Sports
              sport_name={sport.sport_name}
              sport_id={sport.sport_id}
              datetime={sport.datetime}
              location={sport.location}
              additional_info={sport.additional_info}
              players_required={sport.players_required}
              checked_users={sport.checked_users}
              players_interested={sport.players_interested}
              author_name={sport.first_name}
            />
          </div>
        </>
      ))}
    </div>
  );
};

export default SportsMapping;
