const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
// const swaggerOptions = {
//   swaggerDefinition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Sample API',
//       version: '1.0.0',
//       description: 'A sample API documentation',
//     },
//   },
//   apis: ['./path/to/your/swagger/file.js'],
// };

// const swaggerSpec = swaggerJSDoc(swaggerOptions);

const userRoutes = require('./src/routes/userRoutes');
const User = require('./src/models/User');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/user', userRoutes)

// Connect to MongoDB
mongoose.connect(process.env.CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
  .catch((error) => console.error('Error connecting to MongoDB:', error));

module.exports = app;