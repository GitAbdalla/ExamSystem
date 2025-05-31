import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { getMyNotifications, markAsRead } from "../controllers/notificationController.js";



const router  = express.Router();

router.get('/notifications', protect , getMyNotifications);
router.patch('/notifications/:id/read' ,protect , markAsRead);

export default router;