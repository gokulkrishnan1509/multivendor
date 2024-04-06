const mongoose = require("mongoose");

const converSationSchema = new mongoose.Schema(
  {

    groupTitle:{
        type:String
    },
    members: {
      type: Array,
    },
    lastMessages: {
      type: String,
    },
    lastMessagesId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", converSationSchema);
