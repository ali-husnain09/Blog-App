// Creation and configuration of the Express APP
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/database");
const app = express();
// Middleware to parse JSON and enable CORS
app.use(express.json());
app.use(cors());

require("dotenv").config();

const PORT = process.env.PORT || 5000;
// Connect to MongoDB
connectDB();

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

// Import routes
const blogRoutes = require("./src/routes/blogRoutes");

// Use routes and mount them  
app.use("/api/v1", blogRoutes);

app.get('/',(req,res) =>{
  res.send(`<h1>Welcome To The Blog App</h1>`);
})

