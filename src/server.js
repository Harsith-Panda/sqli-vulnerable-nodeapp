const express = require("express");
const app = express();
const PORT = process.env.PORT || 4060;
const db = require("./db");

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Welcome to the new born DVWA :) Welcome !!!");
});

app.get("/sqli-vulnerable-basic", async (req, res) => {
  try {
    const data = await db.query("SELECT * FROM users;");
    res.status(200).json(data[0]);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/sqli-vulnerable-basic", async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).send("Check if you have name and email");
  }

  try {
    await db.query(`INSERT INTO users VALUES (NULL, '${name}', '${email}');`);
    return res.status(201).send("Object Created in DB");
  } catch (err) {
    return res.status(500).send("Internal Server Error ");
  }
});

app.post("/sqli-safe-path", async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    res.status(400).send("Check if you have name and email");
  }

  try {
    await db.query("INSERT INTO users VALUES (NULL, ? , ?);", [name, email]);
    res.status(201).send("Object Created in DB");
  } catch (err) {
    res.status(500).send("Internal Sever Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});
