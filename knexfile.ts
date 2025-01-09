import { Knex } from "knex";
require("dotenv").config();

const env = process.env.AUTHORIZATION || process.env.NODE_ENV || "development";

const knexConfig: Record<string, Knex.Config> = {
  development: {
    client: "pg",
    connection: {
      host: process.env.PGHOST,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      port: Number(process.env.PGPORT),
    },
    migrations: {
      extension: "ts",
      tableName: "knex_migrations",
      directory: "./migrations",
    },
  },
  production: {
    client: "pg",
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      extension: "ts",
      tableName: "knex_migrations",
      directory: "./migrations",
    },
  },
};

export default knexConfig[env];
