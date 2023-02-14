import { Request, Response } from "express";
import { pool } from "../utils/dbConnect";

const catchError = (res: Response) => {
  res.status(500).json({ message: "Error with database communication" });
};

export const loadSummary = async (req: Request, res: Response) => {
  try {
    pool.connect(async (error, client, release) => {
      const onePlayerMissing = await client.query(
        "SELECT * FROM sports WHERE players_required - players_interested = 1"
      );
      const thisWeek = await client.query(
        "SELECT * FROM sports WHERE datetime > current_date - interval '7days'"
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
  const { author } = req.query;
  try {
    pool.connect(async (error, client, release) => {
      const data = await client.query(
        "SELECT * FROM sports WHERE user_id = $1",
        [author]
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
  const { author } = req.query;
  try {
    pool.connect(async (error, client, release) => {
      const data = await client.query(
        "SELECT * FROM sports WHERE $1 = any (checked_users)",
        [author]
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
  try {
    pool.connect(async (error, client, release) => {
      const data = await client.query("SELECT * FROM sports");

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

  try {
    const response = pool.connect(async (error, client, release) => {
      if (error) {
        res.status(400).json({ message: "Error with adding sport" });
      }

      const data = await client.query(
        "INSERT INTO sports (sport_name, players_required, location, datetime, description, user_id) VALUES ($1, $2, $3, $4, $5, $6)",
        [sportName, playerRequired, location, datetime, description, userId]
      );

      res.status(200).json(data.rows);
      release();
      return;
    });
  } catch (error) {
    console.log(error);
    catchError;
  }
};

export const joinTeam = async (req: Request, res: Response) => {
  const {
    user_id,
    sportId,
    sportName,
    playersCurrently,
    location,
    datetime,
    description,
  } = req.body;

  try {
    const response = pool.connect(async (error, client, release) => {
      const data = await client.query(
        "UPDATE sports SET sport_name=$1, players_interested=$2, location=$3, datetime=$4, description=$5, checked_users = array_append(checked_users, $7) WHERE sport_id=$6",
        [
          sportName,
          playersCurrently + 1,
          location,
          datetime,
          description,
          sportId,
          user_id,
        ]
      );

      res.status(200).json(data.rows);
      release();
    });
  } catch (error) {
    console.log(error);
    catchError;
  }
};
