import express from "express";
import {
  getallwatchlater,
  handlewatchlater,
} from "../controllers/watchlater.js";

const routes = express.Router();
routes.get("/user/:userId", getallwatchlater);
routes.post("/video/:videoId", handlewatchlater);
export default routes;
