const MessagesModel = require("../model/messagesModel");
const CustomError = require("../utils/customError");
const Conversation =require("../model/conversation")
class Message {
  createMessages = async function (req, res, next) {
    try {
      const messageData = req.body;
      if (req.files) {
        const files = req.files;
        const imageUrls = files.map((file) => `${file?.filename}`);
        messageData.images = imageUrls;
      }

      messageData.ConversationId = req.body.ConversationId;
      messageData.sender = req.body.sender;

      const message = new MessagesModel({
        conversationId: messageData.ConversationId,
        sender: messageData.sender,
        images: messageData.images ? messageData?.images : undefined,
      });

      await message.save();

      res.status(201).json({ success: true, message });
    } catch (error) {
      next(new CustomError(error.message, 500));
    }
  };

  

  
}

module.exports = Message;
