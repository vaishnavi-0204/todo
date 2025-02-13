const mongoose = require("mongoose");
const TodoScheme = new mongoose.Schema({
  task: { type: String, required: [true, "Task is required"] },
  done: {
    type: Boolean,
    default: false,
  },
});

const TodoModel = mongoose.model("todos", TodoScheme);
module.exports = TodoModel;
