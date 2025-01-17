const express = require('express');
const cors = require('cors');
const app = express();
require("./db/conn");
const TodoModel = require("./model/taskSchema");

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/get", async(req, res) =>{
  try {
    const result = await TodoModel.find()
    res.json(result);
  } catch (error) {
    res.json(error);
  }
})

app.post("/add", async (req, res) => {
  const { task } = req.body;

  if (!task || typeof task !== "string") {
    return res.status(400).json({ error: "Task is required and must be a string" });
  }

  try {
    const newTask = await TodoModel.create({ task : task });
    await newTask.save();
    return res.status(201).json({ message: "Task created successfully", data: newTask });
  } catch (error) {
    console.error("Error creating task:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/delete/:id", async (req, res) =>{
  try {
    // Find the todo by its id and delete it
    const result = await TodoModel.findByIdAndDelete(req.params.id);

    // If the todo doesn't exist, send a 404 error
    if (!result) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    // Send a success message
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

})


app.listen(port, () =>{
  console.log(`Server running at port ${port}`); 
});

