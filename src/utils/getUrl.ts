import dotenv from 'dotenv';
dotenv.config();

export const ENV = process.env.NODE_ENV;

export const CLIENT_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.CLIENT_URL
    : process.env.CLIENT_URL_DEV;

export const DATABASE_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.DATABASE_URL
    : process.env.DATABASE_URL_DEV;

