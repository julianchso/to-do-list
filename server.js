const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const { request } = require("mongodb");

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
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(express.static("public"));

    app.get("/", (req, res) => {
      toDoCollection
        .find()
        .toArray()
        .then((result) => {
          res.render("index.ejs", { todos: result });
        })
        .catch((err) => console.log(err));
    });

    app.post("/addtodo", (req, res) => {
      toDoCollection
        .insertOne({ todo: req.body.todo, done: false })
        .then((result) => {
          res.redirect("/");
        })
        .catch((error) => console.error(error));
    });

    app.put("/markComplete", (req, res) => {
      toDoCollection
        .updateOne(
          {
            todo: req.body.todo,
            done: req.body.done,
          },
          {
            $set: { done: true },
          }
        )
        .then((result) => {
          console.log("Task completed");
          res.json("Task completed");
        })
        .catch((err) => console.log(err));
    });

    app.delete("/deletetodo", (req, res) => {
      toDoCollection.deleteOne({ todo: req.body.todo }).then((result) => {
        console.log("todo deleted");
        res.json("todo deleted");
      });
    });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
);
