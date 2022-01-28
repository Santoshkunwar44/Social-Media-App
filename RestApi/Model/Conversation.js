const mongoose = require("mongoose")

const conversation = new mongoose.Schema(
  {
    members: {
      type:Array
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("conversation", conversation);
