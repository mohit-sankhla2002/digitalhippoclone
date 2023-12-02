import next from "next";
import dotenv from 'dotenv';
import path from "path";

dotenv.config({
    path: path.resolve(__dirname, "../.env")
})

const PORT = Number(process.env.PORT) || 3000;

export const nextApp = next({
    dev: process.env.NODE_ENV !== 'production',
    port: PORT
});

export const nextHandler = nextApp.getRequestHandler();

