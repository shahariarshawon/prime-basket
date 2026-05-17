import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV,
  jwt_secret: process.env.JWT_SECRET_KEY as string,
  dbURL: process.env.DATABASE_URL as string,

  smtp_host: process.env.SMTP_HOST as string,
  smtp_port: Number(process.env.SMTP_PORT),
  smtp_user: process.env.SMTP_USER as string,
  smtp_pass: process.env.SMTP_PASS as string,
};