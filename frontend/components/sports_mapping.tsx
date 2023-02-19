import React from "react";
import SportCard from "./sportCard";

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
      description: String;
      first_name: String;
      last_name: String;
      user_id: number;
    }
  ];
};

const SportsMapping = ({ sportList }: SportProps) => {
  return (
    <>
      {sportList.map((sport) => (
        <>
          <div>
            <SportCard
              sport_name={sport.sport_name}
              sport_id={sport.sport_id}
              datetime={sport.datetime}
              location={sport.location}
              description={sport.description}
              players_required={sport.players_required}
              checked_users={sport.checked_users}
              players_interested={sport.players_interested}
              user_id={sport.user_id}
              first_name={sport.first_name}
              last_name={sport.last_name}
            />
          </div>
        </>
      ))}
    </>
  );
};

export default SportsMapping;
