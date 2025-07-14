import express from "express";
import {
  getallhistoryVideo,
  handlehistory,
  handleview,
} from "../controllers/history.js";

const routes = express.Router();
routes.get("/user/:userId", getallhistoryVideo);
routes.post("/video/:videoId/view", handleview);
routes.post("/video/:videoId", handlehistory);
export default routes;
