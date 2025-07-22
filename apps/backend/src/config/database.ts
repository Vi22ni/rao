import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import path from 'path';
import pg from "pg";

dotenv.config({
  path: path.resolve(
    process.cwd(),
    `.env.${process.env.NODE_ENV || 'development'}`
  )
});

const sequelize = new Sequelize(
  process.env.DB_NAME || 'db',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    dialectModule: pg, // I've added this.
  }
);

export default sequelize;