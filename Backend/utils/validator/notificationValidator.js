import { check, param } from "express-validator";
import { validatorMiddleware } from "../../middlewares/validatorMiddlware.js";
import Notification from "../../models/notificationModel.js";

export const validateMarkAsRead = [
  param("id")
    .isMongoId()
    .withMessage("Invalid notification ID format")
    .custom(async (id, { req }) => {
      const notification = await Notification.findById(id);
      if (!notification) {
        throw new Error("Notification not found");
      }
      if (notification.recipient.toString() !== req.user._id.toString()) {
        throw new Error("You can only mark your own notifications as read");
      }
      return true;
    }),
  validatorMiddleware
];

