const FAQ = require("../models/faq");

// Create a new FAQ
const createFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;

    // Check for an existing FAQ with the same question
    const existingFAQ = await FAQ.findOne({ question: question });
    if (existingFAQ) {
      return res.status(400).json({ error: "An FAQ with the same question already exists." });
    }

    // If no duplicate, proceed to create the new FAQ
    const faq = new FAQ({ question, answer });
    await faq.save();
    res.status(201).json({ success: true, message: "FAQ created successfully", data: faq });
  } catch (error) {
    res.status(500).json({ error: error.message || "Error creating FAQ" });
  }
};

// Get all FAQs
const getAllFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find();
    res.status(200).json(faqs);
  } catch (error) {
    res.status(500).json({ error: "Error fetching FAQs" });
  }
};

// Get a single FAQ by ID
const getFAQById = async (req, res) => {
  try {
    const faqId = req.params.id;
    const faq = await FAQ.findById(faqId);
    if (!faq) {
      return res.status(404).json({ error: "FAQ not found" });
    }
    res.status(200).json(faq);
  } catch (error) {
    res.status(500).json({ error: "Error fetching FAQ" });
  }
};

// Update an FAQ by ID
const updateFAQById = async (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;

  try {
    // Check if FAQ exists
    const faq = await FAQ.findById(id);
    if (!faq) {
      res.status(404).json({ error: "FAQ not found" });
      return;
    }

    // Update FAQ
    const updatedFAQ = await FAQ.findByIdAndUpdate(
      id,
      { question, answer },
      { new: true }
    );
    res.status(200).json(updatedFAQ);
  } catch (error) {
    res.status(500).json({ error: "Error updating FAQ" });
  }
};

// Delete an FAQ by ID
const deleteFAQById = async (req, res) => {
  try {
    const faqId = req.params.id;
    const deletedFAQ = await FAQ.findByIdAndDelete(faqId);
    
    if (!deletedFAQ) {
      return res.status(404).json({ error: "FAQ not found" });
    }
    
    res.status(200).json({ message: "FAQ deleted successfully" });
  } catch (error) {
    console.error("Error deleting FAQ:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};


module.exports = {
  createFAQ,
  getAllFAQs,
  getFAQById,
  updateFAQById,
  deleteFAQById,
};
