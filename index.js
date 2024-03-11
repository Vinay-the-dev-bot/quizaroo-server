const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
const url =
  "https://opentdb.com/api.php?amount=10&category=21&difficulty=hard&type=multiple";
app.get("/quiz", async (req, res) => {
  let qsts = await fetch(url);
  let data = await qsts.json();
  console.log(data);
  res.send(data.results);
});

app.get("/", (req, res) => {
  res.send({ msg: "HOME" });
});

app.listen(3500, async () => {
  console.log(`Running at 3500 `);
});
