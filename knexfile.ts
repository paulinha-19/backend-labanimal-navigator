require("dotenv").config();

const env = process.env.AUTHORIZATION || process.env.NODE_ENV || "production";

module.exports = {
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
}[env];
