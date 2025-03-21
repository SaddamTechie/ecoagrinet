const express = require('express');
const connectDB = require('./config/db');
const authRoute = require('./routes/auth');
const dashboardRoute = require('./routes/dashboard');
const forumRoute = require('./routes/forum');
const marketplaceRoute = require('./routes/marketplace');
const path = require('node:path');
const cors = require('cors');
require('dotenv').config();

const app = express();



// Middleware
app.use(cors()); // Allow frontend origin
app.use(express.json());

// Routes
app.use('/api/auth', authRoute);
app.use('/api/dashboard', dashboardRoute);
app.use('/api/forum',forumRoute );
app.use('/api/marketplace', marketplaceRoute);


if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname,"../frontend/dist")));
 
    app.get("*",(req,res)=>{
     res.sendFile(path.resolve(__dirname,"../frontend","dist","index.html"));
    })
 }

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    // Connect to MongoDB
    connectDB();
});