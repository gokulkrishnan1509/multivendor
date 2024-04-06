const ConversationModel = require("../model/conversation");
const CustomError = require("../utils/customError");

class Conversation {
  createConversation = async (req, res, next) => {
    try {
      const { groupTitle, userId, sellerId } = req.body;
      console.log(groupTitle)

      const isConversationExist = await ConversationModel.findOne({
        groupTitle: groupTitle,
      });

      if (isConversationExist) {
        const conversation = isConversationExist;
     return   res.status(201).json({ status: true, conversation });
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
}

module.exports = Conversation;
