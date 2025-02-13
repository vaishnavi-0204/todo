const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const TodoModel = require("./Models/Todo");

app.use(express.json()); // Convert incoming requests to JSON
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

app.get("/get", async (req, res) => {
  try {
    const todos = await TodoModel.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  Update a todo (mark as done)
app.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTodo = await TodoModel.findByIdAndUpdate(
      id,
      { done: true },
      { new: true } //  Returns updated document
    );
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  Delete a todo
app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await TodoModel.findByIdAndDelete(id);
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  Add a new todo
app.post("/add", async (req, res) => {
  const { task } = req.body;
  try {
    const newTodo = await TodoModel.create({ task, done: false });
    res.json(newTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const app = express();
// const TodoModel = require("./Models/Todo");
// app.use(express.json()); // data will convert into json format

// app.use(cors());
// mongoose.connect("mongodb+srv://vaish_24:0204@clust.xempr.mongodb.net/test");

// app.get("/get", (req, res) => {
//   TodoModel.find() // find all the records
//     .then((result) => res.json(result))
//     .catch((err) => res.json(err));
// });
// app.put("/update/:id", (req, res) => {
//   const { id } = req.params; // using this params weget our id
//   TodoModel.findByIdAndUpdate({ _id: id }, { done: true })
//     .then((result) => res.json(result))
//     .catch((err) => res.json(err));
// });

// app.delete("/delete/:id", (req, res) => {
//   const { id } = req.params;
//   TodoModel.findByIdAndDelete({ _id: id })
//     .then((result) => res.json(result))
//     .catch((err) => res.json(err));
// });
// app.post("/add", (req, res) => {
//   const task = req.body.task;
//   TodoModel.create({
//     task: task,
//   })
//     .then((result) => res.json(result))
//     .catch((err) => console.log(err));
// });

// app.listen(3001, () => {
//   console.log("server is running");
// });
