import express from "express";
import {
  createOrganization,
  deleteOrganization,
  getAllOrganizations,
  getOrganizationById,
  updateOrganization,
} from "../controllers/organization.controller.js";

const router = express.Router();

//GET /org
router.get("/", getAllOrganizations);

//GET /org/:id
router.get("/:id", getOrganizationById);

// POST /org
router.post("/", createOrganization);

//PATCH /org
router.patch("/:id", updateOrganization);

//DELETE /org
router.delete("/:id", deleteOrganization);
export default router;
