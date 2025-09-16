const Route = require('../models/Route');
const routeSchema = require('../schemas/routeSchema');

exports.createRoute = async (req, res) => {
  const { error } = routeSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { routeName, stops } = req.body;

  try {
    const exists = await Route.findOne({ routeName });
    if (exists) return res.status(400).json({ message: 'Route name already exists' });

    const route = await Route.create({ routeName, stops });
    res.status(201).json(route);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRoutes = async (req, res) => {
  try {
    const routes = await Route.find();
    res.json(routes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRouteById = async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);
    if (!route) return res.status(404).json({ message: 'Route not found' });
    res.json(route);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateRoute = async (req, res) => {
  const { error } = routeSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const route = await Route.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!route) return res.status(404).json({ message: 'Route not found' });
    res.json(route);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteRoute = async (req, res) => {
  try {
    const route = await Route.findByIdAndDelete(req.params.id);
    if (!route) return res.status(404).json({ message: 'Route not found' });
    res.json({ message: 'Route removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};