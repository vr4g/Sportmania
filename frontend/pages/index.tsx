import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/index.module.scss";
import SignupLogin from "../components/signup_login";
import useStore from "../store/store";
import CreateTeam from "../components/create_team";
import ShowTeams from "../components/show_teams";

export default function Home() {
  const [onePlayer, setOnePlayer] = useState<any>([]);
  const [thisWeek, setThisWeek] = useState<any>([]);
  const [showAll, setShowAll] = useState<any>([]);
  const [filteredSports, setFilteredSports] = useState<any>([]);
  const [auth, setAuth] = useState<any>(useStore.getState().auth);
  const [createNew, setCreateNew] = useState<Boolean>(false);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    getSports();
  }, []);

  useEffect(() => {
    getFilteredSport();
  }, [filter]);

  const getFilteredSport = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/sport/filter`,
      { params: { filter: filter }, withCredentials: true }
    );
    const res = await response.data;
    setFilteredSports(res);
  };

  const getSports = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/sport/loadSummary`,
      { withCredentials: true }
    );
    const res = await response.data;
    const response2 = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/sport/allteams`,
      { withCredentials: true }
    );
    const resp = await response2.data;
    setOnePlayer(res.onePlayer);
    setThisWeek(res.thisWeek);
    setShowAll(resp);
    console.log(showAll);
  };

  return useStore.getState().auth ? (
    <div className={styles.main}>
      {createNew ? ( // create new team
        <>
          <CreateTeam setCreateNew={setCreateNew} />
        </>
      ) : (
        <>
          <div className={styles.topButtons}>
            <button
              className={styles.btn}
              onClick={() => setCreateNew((curr) => !curr)}
            >
              Kreiraj svoj tim
            </button>
            <select
              className={styles.dropdown}
              onChange={(sport) => setFilter(sport.target.value)}
            >
              <option value="">Prikaži sport</option>
              <option value="tenis">Tenis</option>
              <option value="nogomet">Nogomet</option>
              <option value="košarka">Košarka</option>
              <option value="stolni tenis">Stolni tenis</option>
              <option value="badminton">Badminton</option>
              <option value="squash">Squash</option>
            </select>
          </div>
          {filter === "" ? (
            <>
              <ShowTeams
                data={thisWeek}
                textInfo={"Događaji sljedećih 7 dana"}
              />
              <ShowTeams data={onePlayer} textInfo={"Fali još 1 igrač"} />
              <ShowTeams data={showAll} textInfo={"Svi sportovi"} />
            </>
          ) : (
            <ShowTeams data={filteredSports} textInfo={filter} />
          )}
        </>
      )}
    </div>
  ) : (
    <SignupLogin setAuth={setAuth} />
  );
}
{
}
