const Service = require('../models/services');

// Create a new service
const createService = async (req, res) => {
  try {
    const { title, desc } = req.body;

    // Check for an existing service with the same title
    const existingService = await Service.findOne({ title: title });
    if (existingService) {
      return res.status(400).json({ error: "A service with the same title already exists." });
    }

    // If no duplicate, proceed to create the new service
    const service = new Service({ title, desc });
    await service.save();
    res.status(201).json({ success: true, message: "Service created successfully", data: service });
  } catch (error) {
    res.status(500).json({ error: error.message || "Error creating service" });
  }
};

// Get all services
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: "Error fetching services" });
  }
};

// Get a single service by ID
const getServiceById = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ error: "Error fetching service" });
  }
};

// Update a service by ID
const updateServiceById = async (req, res) => {
  const { id } = req.params;
  const { title, desc } = req.body;

  try {
    // Check if service exists
    const service = await Service.findById(id);
    if (!service) {
      res.status(404).json({ error: "Service not found" });
      return;
    }

    // Update service
    const updatedService = await Service.findByIdAndUpdate(
      id,
      { title, desc },
      { new: true }
    );
    res.status(200).json(updatedService);
  } catch (error) {
    res.status(500).json({ error: "Error updating service" });
  }
};

// Delete a service by ID
const deleteServiceById = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const deletedService = await Service.findByIdAndDelete(serviceId);
    if (!deletedService) {
      return res.status(404).json({ error: "Service not found" });
    }
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting service" });
  }
};

module.exports = {
  createService,
  getAllServices,
  getServiceById,
  updateServiceById,
  deleteServiceById,
};
