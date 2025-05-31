import { io } from "socket.io-client";

const userId = "6829d9e1be51df8e8d5c3bbb";

const socket = io("http://localhost:4000", {
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("🟢 Connected to server");

  // Register the student or admin ID
  socket.emit("register", userId);
});

socket.on("notification", (data) => {
  console.log("🔔 New Notification:", data.message);
});

socket.on("disconnect", () => {
  console.log("🔴 Disconnected from server");
});
