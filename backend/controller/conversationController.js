const ConversationModel = require("../model/conversation");
const CustomError = require("../utils/customError");
const UserModel = require("../model/userModel");

class Conversation {
  createConversation = async (req, res, next) => {
    try {
      const { groupTitle, userId, sellerId } = req.body;
      console.log(groupTitle);

      const isConversationExist = await ConversationModel.findOne({
        groupTitle: groupTitle,
      });

      if (isConversationExist) {
        const conversation = isConversationExist;
        return res.status(201).json({ status: true, conversation });
      } else {
        const conversation = await ConversationModel.create({
          members: [userId, sellerId],
          groupTitle: groupTitle,
        });

        return res.status(201).json({ success: true, conversation });
      }
    } catch (error) {
      next(new CustomError(error.message, 500));
    }
  };

  getConversation = async (req, res, next) => {
    const seller = req.seller._id;

    try {
      const conversations = await ConversationModel.find({
        members: { $in: [seller.toString()] },
      }).sort({ updatedAt: -1, createdAt: -1 });

      res.status(200).json({ success: true, conversations });
    } catch (error) {
      return next(new CustomError(error.message, 500));
    }
  };

  updateMessage = async (req, res, next) => {
    try {
      const { lastMessage, lastMessageId } = req.body;

      const conversation = await ConversationModel.findByIdAndUpdate(
        req.params.id,
        {
          lastMessage,
          lastMessageId,
        }
      );

      res.status(200).json({ success: true, conversation });
    } catch (error) {
      return next(new CustomError(error.message, 500));
    }
  };

  conversationUserDetails = async (req, res, next) => {
    try {
      const user = await UserModel.findById(req.params.id);


             
      res.status(201).json({ success: true, user });
    } catch (error) {
      return next(new CustomError(error.message, 500));
    }
  };
}

module.exports = Conversation;
