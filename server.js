const express = require("express");

const db = require("./database");

const app = express();

app.use(express.json());

const { check, validationResult } = require("express-validator");
const { getUserById } = require("./database");

app.get("/api/users", (req, res) => {
  try {
    const users = db.getUsers();
    res.json({ users });
  } catch (err) {
    res.status(500).send("The users information could not be retrieved.");
  }
});

app.post(
  "/api/users",
  [check("name").not().isEmpty(), check("bio").not().isEmpty()],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send("Please provide name and bio for the user.");
    }

    try {
      const newUser = db.createUser({
        name: req.body.name,
        bio: req.body.bio,
      });

      res.status(201).json(newUser);
    } catch (err) {
      res.status(500).send({
        errorMessage:
          "There was an error while saving the user to the database",
      });
    }
  }
);

app.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;

  try {
    const user = db.getUserById(id);

    if (user) {
      db.deleteUser(req.params.id);

      res.status(204).end();
    } else {
      return res.status(404).json({
        message: "The user with the specified ID does not exist.",
      });
    }
  } catch (err) {
    res.status(500).send({
      errorMessage: "The user could not be removed",
    });
  }
});

app.put(
  "/api/users/:id",
  [check("name").not().isEmpty(), check("bio").not().isEmpty()],
  (req, res) => {
    const errors = validationResult(req);

    const id = req.params.id;
    const data = {
      name: req.body.name,
      bio: req.body.bio,
    };

    if (!errors.isEmpty()) {
      return res.status(400).send("Please provide name and bio for the user.");
    }

    try {
      const user = db.getUserById(id);

      let updatedUser = db.updateUser(id, data);

      if (user) {
        res.status(200).json(updatedUser);
      } else {
        return res.status(400).json({
          message: "The user with the specified ID does not exist.",
        });
      }
      res.status(200).json(updatedUser);
    } catch (err) {
      res
        .status(500)
        .send({ errorMessage: "The user information could not be modified." });
    }
  }
);

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
