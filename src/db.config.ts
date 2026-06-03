import dotenv from "dotenv";
import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

dotenv.config();

const adapter = new PrismaMariaDb({
    socketPath: "/var/run/mysqld/mysqld.sock",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 20,
});

export const prisma = new PrismaClient({
    adapter,
    log: ["query", "info", "error", "warn"],
});