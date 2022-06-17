const express = require("express"),
  app = express(),
  mongoose = require("mongoose");
// Routes here:

const cors = require("cors");

// to print incoming requests from mongoose in the terminal
// mongoose.set("debug", true);
// =================== setting to use the body of a request ===================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// to use .env file
require("dotenv").config({ path: "./.env" });
// to set the port
const port = process.env.PORT || 4040;

// connecting to mongo and checking if DB is running
async function connecting() {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to the DB");
  } catch (error) {
    console.log(
      "ERROR: Seems like your DB is not running, please start it up !!!"
    );
  }
}
connecting();
// end of connecting to mongo and checking if DB is running

// ADMIN BRO
const AdminJS = require("adminjs");
const AdminJSExpress = require("@adminjs/express");
// We have to tell AdminJS that we will manage mongoose resources with it
AdminJS.registerAdapter(require("@adminjs/mongoose"));
// Import all the project's models
const Providers = require("./models/providersSchema"); // replace this for your model
const Products = require("./models/productsSchema"); // replace this for your model
const Regions = require("./models/regionsSchema"); // replace this for your model

// Pass configuration settings to AdminJS
const adminJS = new AdminJS({
  resources: [Categories, Products],
  rootPath: "/admin",
});
// Build and use a router which will handle all AdminJS routes
const router = AdminJSExpress.buildRouter(adminJS);
app.use(adminJS.options.rootPath, router);

// routes
// app.use("/product", productRoute);
// app.use("/category", categoriesRoute);

// Set the server to listen on port 3000
app.listen(port, () => console.log(`listening on port 3000`));
