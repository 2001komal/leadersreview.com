const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const connectDB = require('./config/db');
const adminRoutes = require('./routes/adminRoutes');
const contentRoutes = require('./routes/contentRoutes.js');
const path = require('path');
require('dotenv').config();

connectDB();

const app = express();
app.use(express.json());

// ✅ Set correct path for EJS views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// ✅ Serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.ADMIN_KEY,
    resave: false,
    saveUninitialized: true,
}));

app.use("/admin", adminRoutes);
app.use("/", contentRoutes);

// ✅ Export app for Vercel
module.exports = app;
