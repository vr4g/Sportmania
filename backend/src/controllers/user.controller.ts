import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { pool } from "../utils/dbConnect";

export const registerUser = async (req: Request, res: Response) => {
  const { password, firstname, lastname, birthday, gender, contact } = req.body;

  const email = req.body.email.toLowerCase();
  if (!email || !password) {
    return res.status(400).send({ message: "All fields are required" });
  }

  try {
    pool.connect(async (error, client, release) => {
      const existingUser = await client.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );
      if (existingUser.rowCount > 0) {
        console.log("user exists");
        return res.send({ message: "User already exists" });
      }
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      let response = await client.query(
        `INSERT INTO users (first_name, last_name, email, password, birthday, gender, contact, date_joined ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          firstname,
          lastname,
          email,
          hashedPassword,
          birthday,
          1,
          contact,
          new Date().toISOString(),
        ]
      );
      release();
      return res.status(200).json({ message: "User registration successfull" });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Error occured" });
  }
};

export const confirmEmail = async (req: Request, res: Response) => {
  console.log("Email confirmed");
};
