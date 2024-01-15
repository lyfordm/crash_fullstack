const express = require('express');
const router = express.Router();
const { createFAQ, getAllFAQs, getFAQById, updateFAQById, deleteFAQById } = require('../controllers/faqControllers');


// Create a new FAQ
router.post("/create", createFAQ);

// Get all FAQs
router.get("/view-all", getAllFAQs);

// Get a single FAQ by ID
router.get("/view/:id", getFAQById);

// Update an FAQ by ID
router.patch("/update/:id", updateFAQById);

// Delete an FAQ by ID
router.delete("/delete/:id", deleteFAQById);

module.exports = router;
