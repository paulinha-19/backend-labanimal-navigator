require("dotenv").config();

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
      database: process.env.DATABASE_URL, // para produção
      ssl: {
        rejectUnauthorized: false, // Permite conexão segura com certificados padrão
      },
    },
    migrations: {
      extension: "ts",
      tableName: "knex_migrations",
      directory: "./migrations",
    },
  },
};
