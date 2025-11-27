import express from "express";
import { getFactures, createFacture, updateFacture, deleteFacture } from "../controllers/factureController.js";

const router = express.Router();

router.get("/", getFactures);
router.post("/", createFacture);
router.put("/:id", updateFacture);
router.delete("/:id", deleteFacture);

export default router;






