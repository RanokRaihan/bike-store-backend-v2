import dotenv from "dotenv";

// congigure dotenv
dotenv.config();

// export environment variables
export const {
  MONGODB_URI: mongodb_uri,
  PORT: port,
  DB_NAME: db_name,
  NODE_ENV: node_env,
  JWT_SECRET: jwt_secret,
  JWT_EXPIRES_IN: jwt_expires_in,
} = process.env;
