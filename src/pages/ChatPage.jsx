// import React, { useState, useEffect, useRef } from "react";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Send, MessagesSquare } from "lucide-react";
// import { useToast } from "@/components/ui/use-toast";
// import { useNavigate } from "react-router-dom";
// import { supabase } from "@/lib/supabaseClient"; // ✅ import supabase

// const ChatPage = () => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [currentUser, setCurrentUser] = useState(null);
//   const messagesEndRef = useRef(null);
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUser = async () => {
//       const { data: { session } } = await supabase.auth.getSession();
//       if (!session?.user) {
//         toast({
//           variant: "destructive",
//           title: "Authentication Required",
//           description: "Please log in to access the community chat.",
//         });
//         navigate("/login");
//         return;
//       }

//       const { data: profile } = await supabase
//         .from("profiles")
//         .select("*")
//         .eq("id", session.user.id)
//         .single();

//       setCurrentUser(profile);
//     };

//     fetchUser();

//     // Temporary fallback until you store messages in Supabase
//     const storedMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];
//     setMessages(storedMessages);
//   }, [navigate, toast]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!newMessage.trim() || !currentUser) return;

//     const messageData = {
//       id: Date.now(),
//       text: newMessage,
//       sender: currentUser.username || currentUser.email?.split('@')[0],
//       email: currentUser.email,
//       timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//     };

//     const updatedMessages = [...messages, messageData];
//     setMessages(updatedMessages);
//     localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
//     setNewMessage("");
//   };

//   const getAvatarColor = (email) => {
//     let hash = 0;
//     for (let i = 0; i < email.length; i++) {
//       hash = email.charCodeAt(i) + ((hash << 5) - hash);
//     }
//     const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
//     return "#" + "00000".substring(0, 6 - c.length) + c;
//   };

//   return (
//     <div className="container mx-auto px-4 py-8 h-[calc(100vh-160px)] flex flex-col">
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="flex items-center gap-3 mb-6"
//       >
//         <MessagesSquare className="h-8 w-8 text-primary" />
//         <h1 className="text-3xl font-bold text-gradient">Community Chat</h1>
//       </motion.div>

//       <motion.div 
//         className="flex-1 flex flex-col bg-card border rounded-xl shadow-xl overflow-hidden glass-effect"
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.3 }}
//       >
//         <div className="flex-1 p-6 space-y-4 overflow-y-auto">
//           {messages.map((msg) => (
//             <motion.div
//               key={msg.id}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.2 }}
//               className={`flex items-start gap-3 ${
//                 currentUser && msg.email === currentUser.email ? "justify-end" : ""
//               }`}
//             >
//               {currentUser && msg.email !== currentUser.email && (
//                 <Avatar className="h-10 w-10 border-2" style={{ borderColor: getAvatarColor(msg.email) }}>
//                   <AvatarFallback style={{ backgroundColor: getAvatarColor(msg.email), color: '#fff' }}>
//                     {msg.sender.charAt(0).toUpperCase()}
//                   </AvatarFallback>
//                 </Avatar>
//               )}
//               <div
//                 className={`max-w-xs md:max-w-md p-3 rounded-lg ${
//                   currentUser && msg.email === currentUser.email
//                     ? "bg-primary text-primary-foreground rounded-br-none"
//                     : "bg-muted rounded-bl-none"
//                 }`}
//               >
//                 <p className="text-sm font-semibold">{msg.sender}</p>
//                 <p>{msg.text}</p>
//                 <p className="text-xs opacity-70 mt-1 text-right">{msg.timestamp}</p>
//               </div>
//               {currentUser && msg.email === currentUser.email && (
//                 <Avatar className="h-10 w-10 border-2" style={{ borderColor: getAvatarColor(msg.email) }}>
//                   <AvatarFallback style={{ backgroundColor: getAvatarColor(msg.email), color: '#fff' }}>
//                     {msg.sender.charAt(0).toUpperCase()}
//                   </AvatarFallback>
//                 </Avatar>
//               )}
//             </motion.div>
//           ))}
//           <div ref={messagesEndRef} />
//         </div>

//         <form
//           onSubmit={handleSendMessage}
//           className="p-4 border-t bg-background/80 backdrop-blur-sm flex items-center gap-3"
//         >
//           <Input
//             type="text"
//             placeholder="Type your message..."
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             className="flex-1 bg-input/70"
//             disabled={!currentUser}
//           />
//           <Button type="submit" disabled={!newMessage.trim() || !currentUser} className="gap-2">
//             Send <Send className="h-4 w-4" />
//           </Button>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default ChatPage;




// src/pages/ChatPage.jsx
import { useEffect, useRef, useState } from "react";
import { mmGet, mmPost } from "../api/mattermostClient";
import { supabase } from "@/lib/supabaseClient";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import emoji from "emoji-dictionary";
import { MessageCircle, SmilePlus } from "lucide-react"; 

const CHANNEL_ID = import.meta.env.VITE_MATTERMOST_CHANNEL_ID;

function ChatPage() {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [mmToken, setMmToken] = useState(null);
  const [mmUserId, setMmUserId] = useState(null);
  const [showPickerFor, setShowPickerFor] = useState(null);
  const [replyToPostId, setReplyToPostId] = useState(null);
  const messagesEndRef = useRef(null);

  const handleReact = async (postId, emoji = "thumbsup") => {
    if (!mmUserId || !mmToken) return;
    try {
      await mmPost(
        "/reactions",
        {
          post_id: postId,
          user_id: mmUserId,
          emoji_name: emoji,
        },
        mmToken
      );
      fetchMessages();
    } catch (error) {
      console.error("Failed to react to message:", error.message);
    }
  };

  useEffect(() => {
    const fetchMattermostCredentials = async () => {
      const { data: sessionData } = await supabase.auth.getUser();
      if (!sessionData?.user?.id) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("mattermost_token, mattermost_user_id")
        .eq("id", sessionData.user.id)
        .single();

      if (error) {
        console.error("Error fetching Mattermost token:", error);
        return;
      }

      setMmToken(data.mattermost_token);
      setMmUserId(data.mattermost_user_id);
    };

    fetchMattermostCredentials();
  }, []);

  useEffect(() => {
    if (mmToken) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 5000);
      return () => clearInterval(interval);
    }
  }, [mmToken]);

  const fetchMessages = async () => {
    try {
      const data = await mmGet(`/channels/${CHANNEL_ID}/posts`, mmToken);
      const messages = Object.values(data.posts);
      const rootPosts = messages.filter((msg) => !msg.root_id);
      const replies = messages.filter((msg) => msg.root_id);
      const userIds = [...new Set(messages.map((msg) => msg.user_id))];
      const users = await Promise.all(userIds.map((id) => mmGet(`/users/${id}`, mmToken)));
      const userMap = Object.fromEntries(users.map((user) => [user.id, user.username]));

      const messagesWithReactions = await Promise.all(
        rootPosts.map(async (msg) => {
          let reactions = [];
          try {
            reactions = await mmGet(`/posts/${msg.id}/reactions`, mmToken);
          } catch (err) {
            reactions = [];
          }

          const groupedReactions = {};
          (reactions || []).forEach((reaction) => {
            if (!groupedReactions[reaction.emoji_name]) {
              groupedReactions[reaction.emoji_name] = 1;
            } else {
              groupedReactions[reaction.emoji_name]++;
            }
          });

          const msgReplies = replies
            .filter((reply) => reply.root_id === msg.id)
            .map((reply) => ({
              ...reply,
              username: userMap[reply.user_id] || "Unknown",
              isOwnMessage: reply.user_id === mmUserId,
            }));

          return {
            ...msg,
            username: userMap[msg.user_id] || "Unknown",
            isOwnMessage: msg.user_id === mmUserId,
            reactions: groupedReactions,
            replies: msgReplies,
          };
        })
      );

      setPosts(messagesWithReactions.sort((a, b) => a.create_at - b.create_at));
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  const handleSend = async () => {
    if (!message.trim() || !mmToken) return;

    try {
      await mmPost(
        "/posts",
        {
          channel_id: CHANNEL_ID,
          message,
          root_id: replyToPostId || null,
        },
        mmToken
      );
      setMessage("");
      setReplyToPostId(null);
      fetchMessages();
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };
 

  return (
   <div className="max-w-3xl mx-auto h-screen flex flex-col bg-[#1e1f22] text-white font-sans">
  <header className="py-6 px-4 border-b border-[#2c2f33] bg-[#2b2d31]/80 backdrop-blur-md shadow-md">
    <h1 className="text-2xl font-bold text-center text-gray-200 tracking-wide">💬 Community Chat</h1>
  </header>

  <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 bg-[#2b2d31]">
    {posts.map((post) => (
      <div
        key={post.id}
        className={`relative p-4 rounded-lg backdrop-blur-md shadow-inner ${
          post.isOwnMessage
            ? "bg-blue-600/60 ml-auto max-w-md"
            : "bg-[#313338]/60 max-w-md"
        }`}
      >
        {/* Avatar and Username */}
        <div className="flex items-center gap-2 mb-1">
          <img
            src={`https://ui-avatars.com/api/?name=${post.username}`}
            alt="avatar"
            className="w-7 h-7 rounded-full"
          />
          <span className="text-sm font-semibold text-gray-100">{post.username}</span>
          <span className="text-xs text-gray-400 ml-auto">
            {new Date(post.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        {/* Message Content */}
        <p className="text-sm text-gray-200 leading-snug">{post.message}</p>

        {/* Reactions */}
        <div className="mt-2 flex gap-2 flex-wrap">
          {Object.entries(post.reactions || {}).map(([emojiName, count]) => {
            const emojiChar = emoji.getUnicode(emojiName);
            if (!emojiChar) return null;
            return (
              <span
                key={emojiName}
                className="text-sm px-2 py-1 bg-[#444] rounded-full hover:bg-[#555] cursor-pointer"
              >
                {emojiChar} {count}
              </span>
            );
          })}
        </div>

        {/* Actions - Icons */}
        <div className="text-xs  flex justify-end gap-3 text-gray-400">
          <button
            onClick={() => setReplyToPostId(post.id)}
            className="hover:text-gray-200"
            title="Reply"
          >
            <MessageCircle size={16} />
          </button>
          <button
            onClick={() => setShowPickerFor((prev) => (prev === post.id ? null : post.id))}
            className="hover:text-gray-200"
            title="React"
          >
            <SmilePlus size={16} />
          </button>
        </div>

        {/* Emoji Picker */}
        {showPickerFor === post.id && (
          <div className="mt-3">
            <Picker
              data={data}
              onEmojiSelect={(emoji) => {
                handleReact(post.id, emoji.id);
                setShowPickerFor(null);
              }}
              theme="dark"
            />
          </div>
        )}

        {/* Replies */}
        {post.replies?.map((reply) => (
          <div key={reply.id} className="mt-3 ml-6 p-2 rounded bg-[#3a3b3e]/60 backdrop-blur-md shadow-inner">
            <div className="text-xs font-semibold text-[#f2f3f5]">↳ {reply.username}</div>
            <div className="text-sm text-[#dbdee1]">{reply.message}</div>
          </div>
        ))}
      </div>
    ))}
    <div ref={messagesEndRef}></div>
  </div>

  {/* Message Input */}
  <div className="mt-4 flex gap-2 px-4 pb-6">
    <input
      className="flex-1 bg-[#40444b] text-white rounded px-4 py-2 focus:outline-none backdrop-blur-md shadow-inner"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      placeholder={replyToPostId ? "Replying..." : "Type your message..."}
    />
    <button
      onClick={handleSend}
      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded shadow-lg"
    >
      Send
    </button>
  </div>
</div>

  );
}

export default ChatPage;
