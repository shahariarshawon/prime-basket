import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV,
  jwt_secret: process.env.JWT_SECRET_KEY as string,
  dbURL: (process.env.DATABASE_URL as string) || null,
};
