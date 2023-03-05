import bodyParser from "body-parser";
import { Router } from "express";
import * as sportController from "../controllers/sport.controller";

const router = Router();

router.get("/loadSummary", sportController.loadSummary);
router.get("/sport", bodyParser.json(), sportController.getSport);
router.get(
  "/checked_sports",
  bodyParser.json(),
  sportController.getCheckedSports
);
router.post("/sport", bodyParser.json(), sportController.addSport);
router.post("/join", bodyParser.json(), sportController.joinTeam);
router.post("/checkout", bodyParser.json(), sportController.checkout);
router.get("/allteams", bodyParser.json(), sportController.getAllTeams);
router.get("/filter", bodyParser.json(), sportController.filterSport);

export default router;
