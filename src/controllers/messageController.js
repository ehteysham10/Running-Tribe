
import Message from "../models/Message.js";
import Event from "../models/Event.js";
import User from "../models/User.js";
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import { sendPushNotification } from "../services/notificationService.js";

// Utility: stable roomId using sorted user IDs
const getRoomId = (user1, user2) => {
  const ids = [user1.toString(), user2.toString()].sort();
  return `${ids[0]}_${ids[1]}`;
};

// -----------------------------
// PRIVATE: Send message (1:1)
// -----------------------------
export const sendMessage = asyncHandler(async (req, res) => {
  const sender = req.user._id;
  const { receiver, message } = req.body;

  if (!receiver || !message) {
    return res.status(400).json({ msg: "Receiver & message are required" });
  }

  const roomId = getRoomId(sender, receiver);

  const newMessage = await Message.create({
    roomId,
    roomType: "private",
    sender,
    receiver,
    message,
  });

  // 🔔 Push notification
  try {
    const receiverUser = await User.findById(receiver);
    if (receiverUser?.fcmToken) {
      await sendPushNotification(
        receiverUser.fcmToken,
        `${req.user.name} sent you a message`,
        message,
        { type: "chat", senderId: String(sender), receiverId: String(receiver) }
      );
    }
  } catch (err) {
    console.error("❌ Failed to send chat push notification:", err);
  }

  res.status(201).json({ success: true, data: newMessage });
});

// -----------------------------
// PRIVATE: Get message history
// -----------------------------
export const getMessages = asyncHandler(async (req, res) => {
  const roomId = getRoomId(req.user._id, req.params.otherUserId);
  const messages = await Message.find({ roomId }).sort({ createdAt: 1 });
  res.status(200).json({ success: true, count: messages.length, data: messages });
});

// -----------------------------
// PRIVATE: Mark messages as read
// -----------------------------
export const markAsRead = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const roomId = getRoomId(userId, req.params.otherUserId);

  await Message.updateMany(
    { roomId, receiver: userId, isReadBy: { $ne: userId } },
    { $push: { isReadBy: userId } }
  );

  res.status(200).json({ success: true, msg: "Messages marked as read" });
});

// -----------------------------
// EVENT: Send group message
// -----------------------------
export const sendEventMessage = asyncHandler(async (req, res) => {
  const sender = req.user._id;
  const { eventId, message } = req.body;

  if (!eventId || !message) {
    return res.status(400).json({ msg: "eventId & message are required" });
  }

  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    return res.status(400).json({ msg: "Invalid eventId" });
  }

  const event = await Event.findById(eventId).select("participants created_by");
  if (!event) return res.status(404).json({ msg: "Event not found" });

  const isParticipant = event.participants.some(p => String(p) === String(sender));
  const isCreator = String(event.created_by) === String(sender);
  if (!isParticipant && !isCreator) {
    return res.status(403).json({ msg: "You are not a participant of this event" });
  }

  const roomId = `event_${eventId}`;

  const newMessage = await Message.create({
    roomId,
    roomType: "event",
    event: eventId,
    sender,
    message,
    receiver: null,
  });

  // 🔔 Push notifications
  try {
    const senderUser = await User.findById(sender);
    const participants = await User.find({
      _id: { $in: event.participants.filter(p => String(p) !== String(sender)) },
    });

    for (const user of participants) {
      if (!user.fcmToken) continue;
      await sendPushNotification(
        user.fcmToken,
        `${senderUser.name} in ${eventId}`,
        message,
        { type: "event_message", eventId: String(eventId), senderId: String(sender) }
      );
    }
  } catch (err) {
    console.error("❌ Failed to send event message notifications:", err);
  }

  res.status(201).json({ success: true, data: newMessage });
});

// -----------------------------
// EVENT: Get event message history
// -----------------------------
export const getEventMessages = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { eventId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(eventId)) return res.status(400).json({ msg: "Invalid eventId" });

  const event = await Event.findById(eventId).select("participants created_by");
  if (!event) return res.status(404).json({ msg: "Event not found" });

  const isParticipant = event.participants.some(p => String(p) === String(userId));
  const isCreator = String(event.created_by) === String(userId);
  if (!isParticipant && !isCreator) return res.status(403).json({ msg: "You are not a participant of this event" });

  const roomId = `event_${eventId}`;
  const messages = await Message.find({ roomId }).sort({ createdAt: 1 });

  res.status(200).json({ success: true, count: messages.length, data: messages });
});

// -----------------------------
// EVENT: Mark event messages as read
// -----------------------------
export const markEventMessagesRead = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { eventId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(eventId)) return res.status(400).json({ msg: "Invalid eventId" });

  const event = await Event.findById(eventId).select("participants created_by");
  if (!event) return res.status(404).json({ msg: "Event not found" });

  const isParticipant = event.participants.some(p => String(p) === String(userId));
  const isCreator = String(event.created_by) === String(userId);
  if (!isParticipant && !isCreator) return res.status(403).json({ msg: "You are not a participant of this event" });

  const roomId = `event_${eventId}`;
  await Message.updateMany({ roomId, isReadBy: { $ne: userId } }, { $push: { isReadBy: userId } });

  res.status(200).json({ success: true, msg: "Event messages marked as read" });
});

// Export utility for socket usage
export { getRoomId };
