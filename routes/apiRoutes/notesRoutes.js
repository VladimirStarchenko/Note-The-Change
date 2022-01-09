//The application should have a db.json file on the back end that will be used to store and retrieve notes using the fs module.

// The following API routes should be created:

// GET /api/notes should read the db.json file and return all saved notes as JSON.

// POST /api/notes should receive a new note to save on the request body,
// add it to the db.json file, and then return the new note to the client.
// You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

const express = require("express");
const router = express.Router();
const notes = require("../../db/db.json");
const fs = require("fs");

router.get("/notes", (req, res) => {
  res.json(notes);
});

router.post("/notes", (req, res) => {
  req.body.id = uuidv4();
  notes.push(req.body);
  fs.writeFileSync("./db/db.json", JSON.stringify(notes, null, "\t"));
  res.json(notes);
});

router.delete("/notes/:id", (req, res) => {
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].id === req.params.id) {
      notes.splice(i, 1);
    }
  }
  fs.writeFileSync("./db/db.json", JSON.stringify(notes, null, "\t"));
  res.json(notes);
});

module.exports = router;
