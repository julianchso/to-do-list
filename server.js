const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const { connect } = require("mongodb");

const PORT = process.env.PORT || 8000;

app.use(cors());

const username = "Julian";
const password = "SBrqcfq93ebTnN0M";
const connectionString = `mongodb+srv://${username}:${password}@cluster0.7k2ww.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

MongoClient.connect(connectionString, { useUnifiedTopology: true }).then(
  (client) => {
    console.log("Connected to database");
    const db = client.db("to-do-list");
    const toDoCollection = db.collection("to-dos");

    app.set("view engine", "ejs");
    
    


  }


);
