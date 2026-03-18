const express = require("express");
const router = express.Router();
const connectDB = require("../db");

let db;


// Connect to MongoDB
connectDB()
  .then((database) => {
    db = database;
    console.log("✅ Database connected in chatRoutes");
  })
  .catch((err) => console.error("DB error:", err));
  
  
// Simple chatbot reply logic
function getBotReply(message) {
  const msg = message.toLowerCase();
  
  if (msg.includes("hello") || msg.includes("hi")) {
    return "Hello! How can I help you today?";
  }
  if (msg.includes("how are you")) {
    return "I am fine. What about you?";
  }
  
  if (msg.includes("price")) {
    return "Please visit our pricing page for details.";
  } 
  
  if (msg.includes("help")) {
    return "Sure! Tell me what you need help with.";
  }
  if (msg.includes("good morning") || msg.includes("good evening")) {
    return "Good day! Hope you are doing well.";
  }
  if (msg.includes("thank you") || msg.includes("thanks")) {
    return "You're welcome! Happy to help.";
  }
  if (msg.includes("bye") || msg.includes("see you")) {
    return "Goodbye! Have a great day!";
  }
  if (msg.includes("support") || msg.includes("issue")) {
    return "Our support team is here for you. Can you tell me more about the issue?";
  }
  if (msg.includes("contact")) {
    return "You can reach us at abcd@gmail.com or call us at +123456789.";
  }
  
  return "Thank you for your message. Our team will respond soon.";
}

// POST /api/chat/message
router.post("/message", async (req, res) => {
  const { userMessage } = req.body;
  
  if (!userMessage) {
    return res.status(400).json({ error: "No message provided" });
  }
  
  if (!db) {
    return res.status(500).json({ error: "Database not connected yet" });
  }
  
  try {
    // Save user message
    await db.collection("messages").insertOne({
      text: userMessage,
      role: "user",
      createdAt: new Date(),
    });
    
    // Generate bot reply
    const botReply = getBotReply(userMessage);
    
    // Save bot reply
    await db.collection("messages").insertOne({
      text: botReply,
      role: "bot",
      createdAt: new Date(),
    });
    
    res.json({ reply: botReply });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});


// GET /api/chat/analytics
router.get("/analytics", async (req, res) => {
  if (!db) {
    return res.status(500).json({ error: "Database not connected yet" });
  }
  
  try {
    const totalChats = await db.collection("messages").countDocuments();
    const negativeCount = await db
      .collection("messages")
      .countDocuments({ text: /bad|worst|hate/i });
      
    res.json({ totalChats, negativeCount });
  } catch (error) {
    console.error("Analytics error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;