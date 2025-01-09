import Knex from "knex";
import knexConfig from "../knexfile";
require("dotenv").config();

export const knex = Knex(knexConfig)

