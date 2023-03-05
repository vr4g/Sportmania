import { Request, Response } from "express";
import { pool } from "../utils/dbConnect";

const catchError = (res: Response) => {
  res.status(500).json({ message: "Error with database communication" });
};

export const loadSummary = async (req: Request, res: Response) => {
  try {
    pool.connect(async (error, client, release) => {
      const onePlayerMissing = await client.query(
        "SELECT * FROM sports LEFT JOIN users ON sports.user_id = users.user_id WHERE players_required - players_interested = 1"
      );
      const thisWeek = await client.query(
        "SELECT * FROM sports LEFT JOIN users ON sports.user_id = users.user_id WHERE datetime BETWEEN current_date AND current_date + INTERVAL '1 WEEK'"
      );
      res
        .status(200)
        .json({ onePlayer: onePlayerMissing.rows, thisWeek: thisWeek.rows });
      release();
    });
  } catch (error) {
    console.log(error);
    catchError;
  }
};

export const getSport = async (req: Request, res: Response) => {
  const { user_id } = req.query;
  console.log("get Sport");
  try {
    pool.connect(async (error, client, release) => {
      const data = await client.query(
        "SELECT * FROM sports LEFT JOIN users ON sports.user_id = users.user_id WHERE sports.user_id = $1",
        [user_id]
      );
      res.status(200).json(data.rows);
      release();
    });
  } catch (error) {
    console.log(error);
    catchError;
  }
};

export const getCheckedSports = async (req: Request, res: Response) => {
  const { user_id } = req.query;
  console.log("get checked Sports");
  try {
    pool.connect(async (error, client, release) => {
      const data = await client.query(
        "SELECT * FROM sports LEFT JOIN users ON sports.user_id = users.user_id WHERE $1 = any (checked_users)",
        [user_id]
      );
      res.status(200).json(data.rows);
      release();
    });
  } catch (error) {
    console.log(error);
    catchError;
  }
};

export const getAllTeams = async (req: Request, res: Response) => {
  console.log("get all teams");
  try {
    pool.connect(async (error, client, release) => {
      const data = await client.query(
        "SELECT * FROM sports LEFT JOIN users ON sports.user_id = users.user_id"
      );

      res.status(200).json(data.rows);
      release();
    });
  } catch (error) {
    console.log(error);
    catchError;
  }
};

export const addSport = async (req: Request, res: Response) => {
  const { userId, sportName, playerRequired, location, datetime, description } =
    req.query;
  console.log("add Sport");
  try {
    const response = pool.connect(async (error, client, release) => {
      if (error) {
        res.status(400).json({ message: "Error with adding sport" });
      }

      const data = await client.query(
        "INSERT INTO sports (sport_name, players_required, location, datetime, description, user_id) VALUES ($1, $2, $3, $4, $5, $6)",
        [sportName, playerRequired, location, datetime, description, userId]
      );

      res.status(200).json({ message: "Success" });
      release();
    });
  } catch (error) {
    console.log(error);
    catchError;
  }
};

export const joinTeam = async (req: Request, res: Response) => {
  const { user_id, sportId, playersCurrently } = req.body;

  console.log("join Team");
  try {
    const response = pool.connect(async (error, client, release) => {
      const data = await client.query(
        "UPDATE sports SET players_interested=$1, checked_users = array_append(checked_users, $2) WHERE sport_id=$3",
        [playersCurrently /* + 1 */, user_id, sportId]
      );

      res.status(200).json(data.rows);
      release();
    });
  } catch (error) {
    console.log(error);
    catchError;
  }
};
export const checkout = async (req: Request, res: Response) => {
  const { user_id, sportId, playersCurrently } = req.body;

  console.log("checkout");
  try {
    const response = pool.connect(async (error, client, release) => {
      const data = await client.query(
        "UPDATE sports SET players_interested=$1, checked_users = array_remove(checked_users, $2) WHERE sport_id=$3",
        [playersCurrently, user_id, sportId]
      );

      res.status(200).json(data.rows);
      release();
    });
  } catch (error) {
    console.log(error);
    catchError;
  }
};

export const filterSport = async (req: Request, res: Response) => {
  const { filter } = req.query;

  try {
    const response = pool.connect(async (error, client, release) => {
      const data = await client.query(
        "SELECT * FROM sports WHERE sport_name=$1",
        [filter]
      );

      res.status(200).json(data.rows);
      release();
    });
  } catch (error) {
    console.log(error);
    catchError;
  }
};
