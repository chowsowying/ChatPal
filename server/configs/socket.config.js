const socketIO = require("socket.io");
const logger = require("./logger.config");

function setupSocket(server) {
  const io = new socketIO.Server(server, {
    pingTimeout: 60000,
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    logger.info("New client connected");
    userConnection(socket, io);
  });
}

let onlineUsers = [];

function userConnection(socket, io) {
  // User joins or open the app
  socket.on("join", (user) => {
    socket.join(user);
    // Add joined user to onlineUsers
    if (!onlineUsers.some((u) => u.userId === user)) {
      console.log("User online", user);
      onlineUsers.push({ userId: user, socketId: socket.id });
    }
    // Send onlineUsers to frontend
    socket.emit("onlineUsers", onlineUsers);
  });

  // User disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit("onlineUsers", onlineUsers);
  });

  // User join a conversation room
  socket.on("joinConversation", (conversationId) => {
    socket.join(conversationId);
    console.log("User joined conversation room", conversationId);
  });

  // User send and receieve message
  socket.on("sendMessage", (message) => {
    let conversation = message.conversation;
    if (!conversation.users) return;
    conversation.users.forEach((user) => {
      if (user._id === message.sender._id) return;
      socket.in(user._id).emit("receiveMessage", message);
    });
  });

  // User typing
  socket.on("typing", (conversation) => {
    console.log("User typing", conversation);
    socket.in(conversation).emit("typing");
  });
  // User stop typing
  socket.on("stopTyping", (conversation) => {
    console.log("User stop typing", conversation);
    socket.in(conversation).emit("stopTyping");
  });
}

module.exports = setupSocket;
