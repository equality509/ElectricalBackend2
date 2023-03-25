require("dotenv").config();
// pull PORT from .env, give default value of 3000
const { PORT = 3000, DATABASE_URL } = process.env;
const mongoose = require("mongoose");
// import express
const express = require("express");
// create application object
const app = express();
const cors = require("cors");
const morgan = require("morgan");
///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////
// Establish Connection
mongoose.connect(DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  // Connection Events
  mongoose.connection
    .on("open", () => console.log("Your are connected to mongoose"))
    .on("close", () => console.log("Your are disconnected from mongoose"))
    .on("error", (error) => console.log(error));

///////////////////////////////
// MODELS
////////////////////////////////
const ProjectSchema = new mongoose.Schema({
  projectName: String,
  location: String,
  numberOfWorkers: Number,
  manager: String,
  });

  const Project = mongoose.model("Project", ProjectSchema);

  ///////////////////////////////
  // MiddleWare
  ////////////////////////////////
  app.use(cors()); // to prevent cors errors, open access to all origins
  app.use(morgan("dev")); // logging
  app.use(express.json()); // parse json bodies


///////////////////////////////
// ROUTES
////////////////////////////////
// create a test route
app.get("/", (req, res) => {
  res.send("hello world");
});



//PEOPLE INDEX ROUTE

app.get("/project", async (req, res) => {
    try {
        //send all people
        res.json(await Project.find({}));
    } catch (error) {
        //send error
        res.status(400).json(error);
      }
    });

// PEOPLE CREATE ROUTE
app.post("/project", async (req, res) => {
    try {
      // send all people
      res.json(await Project.create(req.body));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });

// PEOPLE Update ROUTE
app.put("/project/:id", async (req, res) => {
    try {
      // send all people
      res.json(
        await Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
      );
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });

  // PEOPLE Delete ROUTE
  app.delete("/project/:id", async (req, res) => {
    try {
      // send all people
      res.json(await Project.findByIdAndRemove(req.params.id));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });

  // PEOPLE INDEX ROUTE
app.get("/project/:id", async (req, res) => {
    try {
      // send all people
      res.json(await Project.findById(req.params.id));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });


///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));