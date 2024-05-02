const MessagesModel = require("../model/messagesModel");
const CustomError = require("../utils/customError");
class Message {
  createMessages = async function (req, res, next) {
    try {
      const messageData = req.body;
      if (req.files) {
        const files = req.files;
        const imageUrls = files.map((file) => `${file?.filename}`);
        messageData.images = imageUrls;
      }

      messageData.ConversationId = req.body.conversationId;
      messageData.sender = req.body.sender;
      messageData.text = req.body.text;
      const message = new MessagesModel({
        conversationId: messageData.ConversationId,
        sender: messageData.sender,
        text: messageData?.text,
        images: messageData.images ? messageData?.images : undefined,
      });

      await message.save();

      res.status(201).json({ success: true, message });
    } catch (error) {
      next(new CustomError(error.message, 500));
    }
  };

  getAllMessageWithConversationId = async (req, res, next) => {
    try {
      const messages = await MessagesModel.find({
        conversationId: req.params.id,
      });

      res.status(200).json({ success: true, messages });
    } catch (error) {
      return next(new CustomError(error.message, 500));
    }
  };
}

module.exports = Message;
