import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, MessagesSquare } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const messagesEndRef = useRef(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please log in to access the community chat.",
      });
      navigate("/login");
      return;
    }
    setCurrentUser(user);

    const storedMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    setMessages(storedMessages);
  }, [navigate, toast]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentUser) return;

    const messageData = {
      id: Date.now(),
      text: newMessage,
      sender: currentUser.username || currentUser.email.split('@')[0],
      email: currentUser.email,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [...messages, messageData];
    setMessages(updatedMessages);
    localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
    setNewMessage("");
  };
  
  const getAvatarColor = (email) => {
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
      hash = email.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
    return "#" + "00000".substring(0, 6 - c.length) + c;
  };


  return (
    <div className="container mx-auto px-4 py-8 h-[calc(100vh-160px)] flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-6"
      >
        <MessagesSquare className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold text-gradient">Community Chat</h1>
      </motion.div>

      <motion.div 
        className="flex-1 flex flex-col bg-card border rounded-xl shadow-xl overflow-hidden glass-effect"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex-1 p-6 space-y-4 overflow-y-auto">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex items-start gap-3 ${
                currentUser && msg.email === currentUser.email ? "justify-end" : ""
              }`}
            >
              {currentUser && msg.email !== currentUser.email && (
                 <Avatar className="h-10 w-10 border-2" style={{ borderColor: getAvatarColor(msg.email) }}>
                  <AvatarFallback style={{ backgroundColor: getAvatarColor(msg.email), color: '#fff' }}>
                    {msg.sender.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-xs md:max-w-md p-3 rounded-lg ${
                  currentUser && msg.email === currentUser.email
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-muted rounded-bl-none"
                }`}
              >
                <p className="text-sm font-semibold">{msg.sender}</p>
                <p>{msg.text}</p>
                <p className="text-xs opacity-70 mt-1 text-right">{msg.timestamp}</p>
              </div>
              {currentUser && msg.email === currentUser.email && (
                <Avatar className="h-10 w-10 border-2" style={{ borderColor: getAvatarColor(msg.email) }}>
                   <AvatarFallback style={{ backgroundColor: getAvatarColor(msg.email), color: '#fff' }}>
                    {msg.sender.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              )}
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form
          onSubmit={handleSendMessage}
          className="p-4 border-t bg-background/80 backdrop-blur-sm flex items-center gap-3"
        >
          <Input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 bg-input/70"
            disabled={!currentUser}
          />
          <Button type="submit" disabled={!newMessage.trim() || !currentUser} className="gap-2">
            Send <Send className="h-4 w-4" />
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default ChatPage;