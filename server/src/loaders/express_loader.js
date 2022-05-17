import express from "express";
import cors from "cors";
import morgan from "morgan";

export default async (app) => {
    // app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan("dev"));

    return app;
};
