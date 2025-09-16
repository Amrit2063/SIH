require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// const connectDB = require('./config/db');
// const errorHandler = require('./middleware/errorMiddleware');

// const authRoutes = require('./routes/authRoutes');
// const routeRoutes = require('./routes/routeRoutes');
// const busRoutes = require('./routes/busRoutes');
// const trackingRoutes = require('./routes/trackingRoutes');

const app = express();
connectDB();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
})); 
app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Real-Time Public Transport Tracking API');
});

app.use('/api/auth', authRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/buses', busRoutes);
app.use('/api/tracking', trackingRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});