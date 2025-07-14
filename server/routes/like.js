import express from "express";
import { handlelike, getallLikedVideo } from "../controllers/like.js";

const routes = express.Router();

routes.get("/user/:userId", getallLikedVideo);
routes.post("/video/:videoId", handlelike);

export default routes;
