import React, { useEffect, useRef, useState } from "react";
import { mmGet, mmPost } from "../api/mattermostClient";
import { supabase } from "@/lib/supabaseClient";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import emoji from "emoji-dictionary";
import { MessageCircle, SmilePlus } from "lucide-react";

const DEFAULT_CHANNELS = [
  { name: "general", id: import.meta.env.VITE_MATTERMOST_CHANNEL_ID },
  { name: "strategy-feedback", id: import.meta.env.VITE_MATTERMOST_CHANNEL_ID_STRATEGY },
  { name: "onboarding-support", id: import.meta.env.VITE_MATTERMOST_CHANNEL_ID_BIGGNEER },
  { name: "wins", id: import.meta.env.VITE_MATTERMOST_CHANNEL_ID_WINS },
  { name: "alerts", id: import.meta.env.VITE_MATTERMOST_CHANNEL_ID_RISKS },
  { name: "tools", id: import.meta.env.VITE_MATTERMOST_CHANNEL_ID_TOOLS },
  { name: "lounge", id: import.meta.env.VITE_MATTERMOST_CHANNEL_ID_LOUNGE }
];

function ChatPage() {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [mmToken, setMmToken] = useState(null);
  const [mmUserId, setMmUserId] = useState(null);
  const [showPickerFor, setShowPickerFor] = useState(null);
  const [replyToPostId, setReplyToPostId] = useState(null);
  const [selectedChannel, setSelectedChannel] = useState(DEFAULT_CHANNELS[0]);
  const [showChannelMenu, setShowChannelMenu] = useState(false);

  const messagesWrapperRef = useRef(null);
  const visitedChannelsRef = useRef(new Set());

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
    if (mmToken && selectedChannel?.id) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 5000);
      return () => clearInterval(interval);
    }
  }, [mmToken, selectedChannel]);

  useEffect(() => {
    if (!selectedChannel?.id || posts.length === 0) return;

    if (!visitedChannelsRef.current.has(selectedChannel.id)) {
      scrollToBottom();
      visitedChannelsRef.current.add(selectedChannel.id);
    }
  }, [posts, selectedChannel]);

  const scrollToBottom = () => {
    if (messagesWrapperRef.current) {
      messagesWrapperRef.current.scrollTop = messagesWrapperRef.current.scrollHeight;
    }
  };

  const fetchMessages = async () => {
    try {
      const data = await mmGet(`/channels/${selectedChannel.id}/posts`, mmToken);
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
          } catch {
            reactions = [];
          }

          const groupedReactions = {};
          (reactions || []).forEach((reaction) => {
            groupedReactions[reaction.emoji_name] = (groupedReactions[reaction.emoji_name] || 0) + 1;
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
          channel_id: selectedChannel.id,
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

  const handleReact = async (postId, emojiName) => {
  if (!mmToken || !postId || !emojiName) return;

  try {
    await mmPost(
      "/reactions",
      {
        user_id: mmUserId,
        post_id: postId,
        emoji_name: emojiName,
      },
      mmToken
    );
    fetchMessages(); // Refresh messages to update reactions
  } catch (error) {
    console.error("Failed to react to post:", error);
  }
};

 // (Everything above this line remains unchanged)

return (
  <div className="h-screen flex font-sans text-sm text-white bg-[#313338]">
    {/* Sidebar */}
    <div className="w-60 bg-[#1e1f22] p-4 flex-col gap-2 hidden sm:flex">
      <h2 className="text-xs uppercase tracking-wide text-gray-400 mb-3">Text Channels</h2>
      {DEFAULT_CHANNELS.map((ch) => (
        <div
          key={ch.id}
          onClick={() => setSelectedChannel(ch)}
          className={`px-3 py-2 rounded-lg cursor-pointer transition-all duration-150 ${
            selectedChannel.id === ch.id
              ? "bg-[#404249] text-white font-medium"
              : "text-gray-300 hover:bg-[#2b2d31] hover:text-white"
          }`}
        >
          # {ch.name}
        </div>
      ))}
    </div>

    {/* Main Chat Area */}
    <div className="flex-1 flex flex-col h-screen">
      {/* Header */}
      <div className="h-14 sticky top-0 z-10 flex items-center px-4 border-b border-[#202225] bg-[#2b2d31] shadow-sm justify-between">
        <h1 className="text-lg font-semibold truncate max-w-[90%]">#{selectedChannel.name.replace(/-/g, " ")}</h1>

        {/* Optional: Mobile channel switcher */}
        {/* <div className="sm:hidden relative">
          <select
            value={selectedChannel.id}
            onChange={(e) => {
              const ch = DEFAULT_CHANNELS.find((c) => c.id === e.target.value);
              if (ch) setSelectedChannel(ch);
            }}
            className="bg-[#40444b] text-white text-xs px-2 py-1 rounded border-none"
          >
            {DEFAULT_CHANNELS.map((ch) => (
              <option key={ch.id} value={ch.id}>
                #{ch.name}
              </option>
            ))}
          </select>
        </div> */}
      </div>

      {/* Messages */}
      <div
        ref={messagesWrapperRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-6 bg-[#313338] min-h-0"
      >
        {posts.map((post) => (
          <div
            key={post.id}
            className={`relative px-4 py-3 rounded-md break-words ${
              post.isOwnMessage ? "bg-[#5865f2]/30 ml-auto max-w-full sm:max-w-xl" : "bg-[#2f3136] max-w-full sm:max-w-xl"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <img
                src={`https://ui-avatars.com/api/?name=${post.username}`}
                alt="avatar"
                className="w-8 h-8 rounded-full"
              />
              <span className="font-semibold text-white">{post.username}</span>
              <span className="text-xs text-gray-400 ml-2 truncate">
                {new Date(post.create_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>

            <p className="text-white whitespace-pre-wrap">{post.message}</p>

            <div className="mt-2 flex gap-2 flex-wrap">
              {Object.entries(post.reactions || {}).map(([emojiName, count]) => {
                const emojiChar = emoji.getUnicode(emojiName);
                if (!emojiChar) return null;
                return (
                  <span
                    key={emojiName}
                    className="text-sm px-2 py-1 bg-[#4f545c] rounded-full hover:bg-[#5a5e66] cursor-pointer"
                  >
                    {emojiChar} {count}
                  </span>
                );
              })}
            </div>

            <div className="text-xs flex justify-end gap-2 text-gray-400 mt-1">
              <button onClick={() => setReplyToPostId(post.id)} title="Reply">
                <MessageCircle size={16} />
              </button>
              <button
                onClick={() =>
                  setShowPickerFor((prev) => (prev === post.id ? null : post.id))
                }
                title="React"
              >
                <SmilePlus size={16} />
              </button>
            </div>

            {showPickerFor === post.id && (
              <div className="mt-3 z-50">
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

            {post.replies?.map((reply) => (
              <div key={reply.id} className="mt-3 ml-4 p-2 rounded bg-[#2c2f33]">
                <div className="text-xs font-semibold text-[#f2f3f5]">↳ {reply.username}</div>
                <div className="text-sm text-white">{reply.message}</div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="h-auto px-4 py-3 flex gap-2 bg-[#2b2d31] border-t border-[#202225] shrink-0">
       <div className="relative sm:hidden">
  <button
    onClick={() => setShowChannelMenu((prev) => !prev)}
    className="bg-[#40444b] text-white px-3 py-2 rounded-md mr-2"
  >
    #
  </button>

  {showChannelMenu && (
    <div className="absolute bottom-12 left-0 z-50 bg-[#2b2d31] border border-[#202225] rounded shadow-md w-48 max-h-60 overflow-y-auto">
      {DEFAULT_CHANNELS.map((ch) => (
        <div
          key={ch.id}
          onClick={() => {
            setSelectedChannel(ch);
            setShowChannelMenu(false);
          }}
          className={`px-4 py-2 cursor-pointer hover:bg-[#404249] ${
            selectedChannel.id === ch.id ? "bg-[#404249] font-semibold" : ""
          }`}
        >
          # {ch.name}
        </div>
      ))}
    </div>
  )}
</div>

{/* Chat Input */}
<input
  className="flex-1 rounded-md bg-[#40444b] px-4 py-2 text-white placeholder:text-gray-400 focus:outline-none text-sm"
  placeholder={replyToPostId ? "Replying..." : "Message #" + selectedChannel.name}
  value={message}
  onChange={(e) => setMessage(e.target.value)}
/>
        <button
          onClick={handleSend}
          className="bg-[#5865f2] hover:bg-[#4752c4] text-white px-4 py-2 rounded-md shadow text-sm"
        >
          Send
        </button>
      </div>

      {/* Scroll Button */}
      <button
        onClick={scrollToBottom}
className="hidden sm:fixed sm:bottom-16 sm:right-4 z-50 bg-[#5865f2] text-white px-3 py-2 rounded-full hover:bg-[#4752c4] shadow-lg"

      >
        ↓
      </button>
    </div>
  </div>
);
}
export default ChatPage;
