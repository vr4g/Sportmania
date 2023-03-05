import { Request, Response } from "express";
import { pool } from "../utils/dbConnect";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  console.log("login");
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Both fields are required" });
    return;
  }

  try {
    pool.connect(async (error, client, release) => {
      const data = await client.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);
      const user = data.rows;
      if (user.length === 0) {
        res.status(400).json({
          message: "Login failed",
        });
        return;
      }
      const userId = data.rows[0].user_id;
      bcrypt.compare(password, user[0].password, async (err, result) => {
        if (err) {
          res.status(500).json({
            message: "Server error",
          });
          return;
        }
        if (!result) {
          res.status(400).json({
            message: "Login failed",
          });
          return;
        }

        const access_token = jwt.sign(
          {
            user_id: userId,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );

        const refresh_token = jwt.sign(
          {
            user_id: userId,
          },
          process.env.JWT_REFRESH_TOKEN,
          { expiresIn: "30d" }
        );

        const refresh_token_created_at = new Date();
        const refresh_token_expire_date = new Date();
        refresh_token_expire_date.setDate(
          refresh_token_created_at.getDate() + 30
        );

        res.cookie("refresh_token", refresh_token, {
          httpOnly: true,
          secure: true,
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
          message: "User signed in",
          token: access_token,
          user: user,
        });
      });
      release();
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Database error occurred",
    });
  }
};

export const getUser = async (req: Request, res: Response) => {
  type MyToken = {
    user_id: string;
  };

  const user_id = req.query.user_id;

  try {
    const data = pool.connect(async (error, client, release) => {
      const user = await client.query("SELECT * FROM users WHERE user_id=$1", [
        user_id,
      ]);
      release();
      console.log(user.rows[0]);
      return res.json(user.rows[0]);
    });
  } catch (error) {
    console.log(error);
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const { user_id } = req.body;

  if (req.cookies?.refresh_token) {
    const refreshToken = req.cookies.refresh_token;

    jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN, (err: any) => {
      if (err) {
      } else {
        const accessToken = jwt.sign(
          {
            user_id: user_id,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        return res.json(accessToken);
      }
    });
  } else {
  }
};

export const signout = async (req: Request, res: Response) => {
  res.clearCookie("refresh_token");
  return res.status(200).json({ message: "Signed out" });
};
