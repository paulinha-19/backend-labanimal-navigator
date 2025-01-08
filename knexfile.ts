require("dotenv").config();

const env = process.env.AUTHORIZATION || process.env.NODE_ENV || "development";

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.PGHOST,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      port: process.env.PGPORT || 5432,
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
