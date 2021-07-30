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

      // toDoCollection
      //   .find()
      //   .toArray()
      //   .then((result) => {
      //     res.render("index.ejs", { todos: result, left: itemsLeft });
      //   })
      //   .catch((err) => console.log(err));
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
            $set: { done: true },
          },
          { sort: { _id: -1 }, upsert: false }
        );
        console.log(req.body.todoId);
        res.json("Task completed");
      } catch (err) {
        console.log(err);
      }
    });

    app.put("/markIncomplete", (req, res) => {
      toDoCollection
        .findOneAndUpdate(
          {
            todo: req.body.todoId,
          },
          {
            $set: { done: false },
          },
          { sort: { _id: -1 }, upsert: false }
        )
        .then((result) => {
          console.log(req.body.todoId);
          res.json("Task incomplete");
        })
        .catch((err) => console.log(err));
    });

    app.delete("/deletetodo", (req, res) => {
      console.log(req.body.todoId);
      toDoCollection
        .findOneAndDelete({ _id: req.body.todoId })
        .then((result) => {
          console.log("todo deleted");
          res.json("todo deleted");
        })
        .catch((err) => console.log(err));
    });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
);
