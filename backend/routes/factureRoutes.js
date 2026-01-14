import express from "express";
import { getFactures, createFacture, updateFacture, deleteFacture } from "../controllers/factureController.js";
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route("/")
  .get(protect, getFactures)
  .post(protect, createFacture);

router.route("/:id")
  .put(protect, updateFacture)
  .delete(protect, deleteFacture);

export default router;

