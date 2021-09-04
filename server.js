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

    app.get("/", async (req, res) => {
      const result = await toDoCollection.find().toArray();
      const itemsLeft = await toDoCollection.countDocuments({
        done: false,
      });

      res.render("index.ejs", { todos: result, left: itemsLeft });
    });

    app.post("/addtodo", (req, res) => {
      toDoCollection
        .insertOne({ todo: req.body.todo, done: false })
        .then((result) => {
          res.redirect("/");
        })
        .catch((error) => console.error(error));
    });

    app.put("/markComplete", async (req, res) => {
      try {
        await toDoCollection.findOneAndUpdate(
          {
            _id: req.body.todoId,
          },
          {
            done: true,
          }
          // {
          //   $set: { done: false },
          // },
          // { sort: { _id: -1 }, upsert: false }
        );
        console.log(req.body.todoId);
        res.json("Task completed");
      } catch (err) {
        console.log(err);
      }
    });

    app.put("/markIncomplete", async (req, res) => {
      try {
        await toDoCollection.findOneAndUpdate(
          {
            _id: req.body.todoId,
          },
          {
            done: false,
          }
          // {
          //   $set: { done: false },
          // },
          // { sort: { _id: -1 }, upsert: false }
        );
        console.log(req.body.todoId);
        res.json("Task completed");
      } catch (err) {
        console.log(err);
      }
    });

    app.delete("/deleteToDo", async (req, res) => {
      console.log(req.body.todoId);
      try {
        await toDoCollection
          .findOneAndDelete({ _id: req.body.todoId })
          .then((result) => {
            console.log("todo deleted server");
            res.json("todo deleted main.js");
          });
      } catch {
        console.log(err);
      }
    });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
);
