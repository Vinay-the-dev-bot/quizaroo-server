const express = require("express");
const cors = require("cors");
const { leaderboardModel } = require("./Model/leaderboardModel");
const { connection } = require("./db");
const app = express();
const dotenv = require("dotenv").config();

app.use(express.json());
app.use(cors());
const url = "https://opentdb.com/api.php";
app.get("/quiz", async (req, res) => {
  console.log(req.query);
  let { noOfQuestions, difficulty, category } = req.query;
  console.log(
    `${url}?amount=${noOfQuestions}&difficulty=${difficulty}&category=${category}&type=multiple`
  );
  let qsts = await fetch(
    `${url}?amount=${noOfQuestions}&difficulty=${difficulty}&category=${category}&type=multiple`
  );
  let data = await qsts.json();
  console.log(data);
  res.send(data.results);
});

app.post("/results", (req, res) => {
  console.log(req.body.score);
  const user = new leaderboardModel({
    name: req.body.name,
    score: req.body.score,
  });
  user.save();
  res.send({ msg: "Saved" });
});

app.get("/leaderboard", async (req, res) => {
  const leaderboard = await leaderboardModel.find();
  console.log(leaderboard);
  res.send({ leaderboard });
});

app.get("/", (req, res) => {
  res.send({ msg: "HOME" });
});

console.log(process.env.PORT);
// app.listen(process.env.PORT, async () => {
//   await connection;
//   console.log(`Running at ${process.env.PORT} `);
// });

app.listen(3500, async () => {
  await connection;
  console.log(`Running at 3500} `);
});
