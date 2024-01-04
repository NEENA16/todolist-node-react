import express from "express"; // framework to create api endpoints
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express(); //Initializes a new Express application.

const prisma = new PrismaClient();
app.use(express.json()); // parse request body from an api to json
app.use(cors());

//create an sample get endpoint to check express is working
// app.get("/api/notes", async (req, res) => {
//   res.json({ message: "Success" });
// });

app.get("/api/notes", async (req, res) => {
  const notes = await prisma.note.findMany();
  res.json(notes);
});

app.post("/api/notes", async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).send("Title or content is missing");
  }
  try {
    const note = await prisma.note.create({ data: { title, content } });
    res.json(note);
  } catch (error) {
    res.status(500).send("Oops something went wrong");
  }
});

app.put("/api/notes/:id", async (req, res) => {
  const { title, content } = req.body;
  const id = parseInt(req.params.id);
  if (!id || isNaN(id)) {
    res.status(400).send("Id is not valid");
  }
  if (!title || !content) {
    res.status(400).send("Title or content is missing");
  }
  console.log("in update");
  try {
    const updatedNote = await prisma.note.update({
      where: { id },
      data: { title, content },
    });
    console.log("body", updatedNote);

    res.json(updatedNote);
  } catch (error) {
    console.log("error");
    res.status(500).send("Something went wrong");
  }
});

app.delete("/api/notes/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (!id || isNaN(id)) {
    res.status(400).send("Id is not valid");
  }
  try {
    await prisma.note.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});

app.get("/api/notes/search", async (req, res) => {
  const { title } = req.query;
  if (title) {
    try {
      const searchedResult = await prisma.note.findMany({
        where: { title: { contains: title as string } },
      });
      res.json(searchedResult);
    } catch (error) {
      res.status(500).send("Something went wrong");
    }
  } else {
    try {
      const response = await prisma.note.findMany();
      res.json(response);
    } catch (error) {
      res.status(500).send("Something went wrong");
    }
  }
});

app.listen(5000, () => {
  console.log("server running on localhost:5000");
});
