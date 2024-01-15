const express = require('express');
const router = express.Router();
const { createService, getAllServices, getServiceById, updateServiceById, deleteServiceById } = require("../controllers/servicesControllers");

// Create a new service
router.post("/create", createService);

// Get all services
router.get("/view-all", getAllServices);

// Get a single service by ID
router.get("/view/:id", getServiceById);

// Update a service by ID
router.patch("/update/:id",updateServiceById);

// Delete a service by ID
router.delete("/delete/:id",deleteServiceById);

module.exports = router;
