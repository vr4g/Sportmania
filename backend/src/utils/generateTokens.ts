import jwt from "jsonwebtoken";

export const generateTokens = async (user_id: string) => {
  try {
    const payload = { _id: user_id };

    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_PRIVATE_KEY,
      { expiresIn: "20m" }
    );
    const refreshToken = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_PRIVATE_KEY,
      { expiresIn: "30d" }
    );

    return { accessToken, refreshToken };
  } catch (err) {
    return Promise.reject(err);
  }
};
