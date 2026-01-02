import express from "express";
import { ping } from "./ping.js";

export const routes = () => {
  const routes = new express.Router();

  routes.get("/ping", ping);
  routes.all("*", (req, res) => res.sendStatus(404));

  return routes;
};
