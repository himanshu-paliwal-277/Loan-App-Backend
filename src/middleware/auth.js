import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const auth = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    console.log("req.user = ", req.user);
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};
 