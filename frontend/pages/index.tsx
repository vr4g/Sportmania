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
  const [auth, setAuth] = useState<any>(useStore.getState().auth);
  const [createNew, setCreateNew] = useState<Boolean>(false);

  useEffect(() => {
    getSports();
  }, []);

  const getSports = async () => {
    const response = await axios.get(
      "http://localhost:5000/api/sport/loadSummary"
    );
    const res = await response.data;
    const response2 = await axios.get(
      "http://localhost:5000/api/sport/allteams"
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
          <button
            className={styles.btn}
            onClick={() => setCreateNew((curr) => !curr)}
          >
            Kreiraj svoj tim
          </button>
          <ShowTeams data={thisWeek} textInfo={"Događaji sljedećih 7 dana"} />
          <ShowTeams data={onePlayer} textInfo={"Fali još 1 igrač"} />
          <ShowTeams data={showAll} textInfo={"Svi sportovi"} />
        </>
      )}
    </div>
  ) : (
    <SignupLogin setAuth={setAuth} />
  );
}
{
}
