const mongoose = require("mongoose");

const leaderboardSchema = new mongoose.Schema(
  {
    name: { type: String },
    score: { type: String },
  },
  {
    versionKey: false,
  }
);

const leaderboardModel = mongoose.model("quizeroo", leaderboardSchema);

module.exports = {
  leaderboardModel,
};
