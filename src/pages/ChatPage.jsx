import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { mmGet, mmPost } from "../api/mattermostClient";
import { supabase } from "@/lib/supabaseClient";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import emoji from "emoji-dictionary";
import { MessageCircle, SmilePlus } from "lucide-react";
import SubscriptionModal from "../components/SubscriptionChat";
import { useNavigate } from "react-router-dom";

const DEFAULT_CHANNELS = [
  { name: "general", id: import.meta.env.VITE_MATTERMOST_CHANNEL_ID },
  { name: "strategy-feedback", id: import.meta.env.VITE_MATTERMOST_CHANNEL_ID_STRATEGY },
  { name: "onboarding-support", id: import.meta.env.VITE_MATTERMOST_CHANNEL_ID_BIGGNEER },
  { name: "wins", id: import.meta.env.VITE_MATTERMOST_CHANNEL_ID_WINS },
  { name: "alerts", id: import.meta.env.VITE_MATTERMOST_CHANNEL_ID_RISKS },
  { name: "tools", id: import.meta.env.VITE_MATTERMOST_CHANNEL_ID_TOOLS },
  { name: "lounge", id: import.meta.env.VITE_MATTERMOST_CHANNEL_ID_LOUNGE },
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
  const [isSubscribed, setIsSubscribed] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastPostTime, setLastPostTime] = useState(0);
  
  const navigate = useNavigate();
  const messagesWrapperRef = useRef(null);
  const visitedChannelsRef = useRef(new Set());
  const userCacheRef = useRef(new Map());
  const intervalRef = useRef(null);
  const reactionCacheRef = useRef(new Map());

  // Memoize formatted time to avoid recalculation
  const formatTime = useCallback((timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }, []);

  // Debounced scroll to bottom
  const scrollToBottom = useCallback(() => {
    if (messagesWrapperRef.current) {
      messagesWrapperRef.current.scrollTop = messagesWrapperRef.current.scrollHeight;
    }
  }, []);

  // Optimized user fetching with caching
  const fetchUsers = useCallback(async (userIds, token) => {
    const uncachedUserIds = userIds.filter(id => !userCacheRef.current.has(id));
    
    if (uncachedUserIds.length === 0) {
      return Object.fromEntries(
        userIds.map(id => [id, userCacheRef.current.get(id)])
      );
    }

    try {
      const userBulkRes = await mmPost("/users/ids", uncachedUserIds, token);
      
      // Cache the new users
      userBulkRes.forEach(user => {
        userCacheRef.current.set(user.id, user.username);
      });

      // Return all requested users
      return Object.fromEntries(
        userIds.map(id => [id, userCacheRef.current.get(id) || "Unknown"])
      );
    } catch (err) {
      console.error("Bulk user fetch failed", err);
      return Object.fromEntries(userIds.map(id => [id, "Unknown"]));
    }
  }, []);

  // Optimized reaction fetching with caching
  const fetchReactions = useCallback(async (postIds, token) => {
    const reactionPromises = postIds.map(async (postId) => {
      // Check cache first
      const cacheKey = `${postId}_${Date.now() - (Date.now() % 30000)}`; // 30 second cache
      if (reactionCacheRef.current.has(cacheKey)) {
        return [postId, reactionCacheRef.current.get(cacheKey)];
      }

      try {
        const reactions = await mmGet(`/posts/${postId}/reactions`, token);
        const groupedReactions = {};
        (reactions || []).forEach((reaction) => {
          groupedReactions[reaction.emoji_name] = (groupedReactions[reaction.emoji_name] || 0) + 1;
        });
        
        // Cache the result
        reactionCacheRef.current.set(cacheKey, groupedReactions);
        return [postId, groupedReactions];
      } catch {
        const emptyReactions = {};
        reactionCacheRef.current.set(cacheKey, emptyReactions);
        return [postId, emptyReactions];
      }
    });

    const results = await Promise.all(reactionPromises);
    return Object.fromEntries(results);
  }, []);

  // Optimized message fetching
  const fetchMessages = useCallback(async () => {
    if (!mmToken || !selectedChannel?.id || loading) return;
    
    setLoading(true);
    try {
      const data = await mmGet(`/channels/${selectedChannel.id}/posts`, mmToken);
      const messages = Object.values(data.posts);
      
      // Early return if no new messages
      if (messages.length === 0) {
        setLoading(false);
        return;
      }

      const latestPostTime = Math.max(...messages.map(msg => msg.create_at));
      
      // Skip processing if no new messages since last fetch
      if (latestPostTime <= lastPostTime && posts.length > 0) {
        setLoading(false);
        return;
      }
      
      setLastPostTime(latestPostTime);

      const rootPosts = messages.filter((msg) => !msg.root_id);
      const replies = messages.filter((msg) => msg.root_id);
      const userIds = [...new Set(messages.map((msg) => msg.user_id))];

      // Batch fetch users and reactions
      const [userMap, reactionsMap] = await Promise.all([
        fetchUsers(userIds, mmToken),
        fetchReactions(rootPosts.map(p => p.id), mmToken)
      ]);

      // Process messages efficiently
      const messagesWithReactions = rootPosts.map((msg) => {
        const msgReplies = replies
          .filter((reply) => reply.root_id === msg.id)
          .map((reply) => ({
            ...reply,
            username: userMap[reply.user_id] || "Unknown",
            isOwnMessage: reply.user_id === mmUserId,
            formattedTime: formatTime(reply.create_at)
          }));

        return {
          ...msg,
          username: userMap[msg.user_id] || "Unknown",
          isOwnMessage: msg.user_id === mmUserId,
          reactions: reactionsMap[msg.id] || {},
          replies: msgReplies,
          formattedTime: formatTime(msg.create_at)
        };
      });

      setPosts(messagesWithReactions.sort((a, b) => a.create_at - b.create_at));
    } catch (err) {
      console.error("Error fetching messages:", err);
    } finally {
      setLoading(false);
    }
  }, [mmToken, selectedChannel, loading, lastPostTime, posts.length, fetchUsers, fetchReactions, mmUserId, formatTime]);

  // Optimized credentials fetching
  useEffect(() => {
    const fetchMattermostCredentials = async () => {
      try {
        const { data: sessionData } = await supabase.auth.getUser();
        if (!sessionData?.user?.id) return;

        const { data, error } = await supabase
          .from("profiles")
          .select("mattermost_token, mattermost_user_id, is_subscribed")
          .eq("id", sessionData.user.id)
          .single();

        if (error) {
          console.error("Error fetching Mattermost token:", error);
          return;
        }

        if (!data.is_subscribed) {
          setIsSubscribed(false);
          return;
        }

        setIsSubscribed(true);
        setMmToken(data.mattermost_token);
        setMmUserId(data.mattermost_user_id);
      } catch (err) {
        console.error("Error in fetchMattermostCredentials:", err);
      }
    };

    fetchMattermostCredentials();
  }, []);

  // Optimized polling with dynamic intervals
  useEffect(() => {
    if (!mmToken || !selectedChannel?.id) return;

    // Initial fetch
    fetchMessages();
    
    // Clear existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Dynamic polling - faster when active, slower when idle
    let pollInterval = 5000; // Start with 5 seconds
    
    const setupPolling = () => {
      intervalRef.current = setInterval(() => {
        fetchMessages();
        // Gradually increase interval up to 30 seconds for less active channels
        pollInterval = Math.min(pollInterval + 2000, 30000);
      }, pollInterval);
    };

    setupPolling();

    // Reset to fast polling on user activity
    const resetPolling = () => {
      pollInterval = 5000;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        setupPolling();
      }
    };

    // Listen for user activity
    window.addEventListener('focus', resetPolling);
    window.addEventListener('click', resetPolling);
    window.addEventListener('keydown', resetPolling);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      window.removeEventListener('focus', resetPolling);
      window.removeEventListener('click', resetPolling);
      window.removeEventListener('keydown', resetPolling);
    };
  }, [mmToken, selectedChannel, fetchMessages]);

  // Auto-scroll optimization
  useEffect(() => {
    if (!selectedChannel?.id || posts.length === 0) return;

    if (!visitedChannelsRef.current.has(selectedChannel.id)) {
      // Use setTimeout to ensure DOM is updated
      setTimeout(scrollToBottom, 100);
      visitedChannelsRef.current.add(selectedChannel.id);
    }
  }, [posts.length, selectedChannel, scrollToBottom]);

  // Optimized send handler with optimistic updates
  const handleSend = useCallback(async () => {
    if (!message.trim() || !mmToken) return;

    const messageContent = message;
    const tempId = `temp_${Date.now()}`;
    
    // Optimistic update
    const optimisticPost = {
      id: tempId,
      message: messageContent,
      user_id: mmUserId,
      username: userCacheRef.current.get(mmUserId) || "You",
      create_at: Date.now(),
      isOwnMessage: true,
      reactions: {},
      replies: [],
      formattedTime: formatTime(Date.now()),
      pending: true
    };

    setPosts(prev => [...prev, optimisticPost]);
    setMessage("");
    setReplyToPostId(null);
    
    // Scroll to bottom immediately
    setTimeout(scrollToBottom, 50);

    try {
      await mmPost(
        "/posts",
        {
          channel_id: selectedChannel.id,
          message: messageContent,
          root_id: replyToPostId || null,
        },
        mmToken
      );
      
      // Remove optimistic post and fetch real data
      setPosts(prev => prev.filter(p => p.id !== tempId));
      fetchMessages();
    } catch (err) {
      console.error("Failed to send message:", err);
      // Remove failed optimistic update
      setPosts(prev => prev.filter(p => p.id !== tempId));
      setMessage(messageContent); // Restore message
    }
  }, [message, mmToken, mmUserId, selectedChannel.id, replyToPostId, formatTime, scrollToBottom, fetchMessages]);

  // Optimized reaction handler
  const handleReact = useCallback(async (postId, emojiName) => {
    if (!mmToken || !postId || !emojiName) return;

    // Clear reaction cache for this post
    Array.from(reactionCacheRef.current.keys())
      .filter(key => key.startsWith(postId))
      .forEach(key => reactionCacheRef.current.delete(key));

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
      
      // Fetch only reactions for this specific post instead of all messages
      const reactions = await mmGet(`/posts/${postId}/reactions`, mmToken);
      const groupedReactions = {};
      (reactions || []).forEach((reaction) => {
        groupedReactions[reaction.emoji_name] = (groupedReactions[reaction.emoji_name] || 0) + 1;
      });

      // Update only the specific post's reactions
      setPosts(prev => prev.map(post => 
        post.id === postId 
          ? { ...post, reactions: groupedReactions }
          : post
      ));
    } catch (error) {
      console.error("Failed to react to post:", error);
    }
  }, [mmToken, mmUserId]);

  // Memoize processed posts to avoid unnecessary re-renders
  const memoizedPosts = useMemo(() => posts, [posts]);

  // Keyboard shortcut for sending messages
  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  if (isSubscribed === false) {
    return (
      <SubscriptionModal
        isOpen={true}
        onClose={() => navigate("/")}
        stripePublishableKey={import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY}
        stripePriceId={import.meta.env.VITE_STRIPE_PRICE_ID}
      />
    );
  }

  return (
    <div className="h-screen flex font-sans text-sm text-white bg-[#313338] overflow-x-hidden">
      {/* Sidebar */}
      <div className="w-60 bg-[#1e1f22] p-4 flex-col gap-2 hidden sm:flex">
        <h2 className="text-xs uppercase tracking-wide text-gray-400 mb-3">Text Channels</h2>
        {DEFAULT_CHANNELS.map((ch) => (
          <div
            key={ch.id}
            onClick={() => {
              setSelectedChannel(ch);
              setLastPostTime(0); // Reset to fetch all messages for new channel
            }}
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
      <div className="flex-1 flex flex-col h-screen w-full">
        {/* Header */}
        <div className="h-14 sticky top-0 z-10 flex items-center px-4 border-b border-[#202225] bg-[#2b2d31] shadow-sm justify-between w-full">
          <h1 className="text-lg font-semibold truncate max-w-[90%]">
            #{selectedChannel.name.replace(/-/g, " ")}
          </h1>
          {loading && (
            <div className="text-xs text-gray-400">Loading...</div>
          )}
        </div>

        {/* Messages */}
        <div
          ref={messagesWrapperRef}
          className="flex-1 overflow-y-auto px-4 py-4 space-y-6 bg-[#313338] min-h-0 w-full"
        >
          {memoizedPosts.map((post) => (
            <div
              key={post.id}
              className={`relative px-4 py-3 rounded-md break-words w-full sm:max-w-xl ${
                post.isOwnMessage
                  ? "bg-[#5865f2]/30 ml-auto"
                  : "bg-[#2f3136]"
              } ${post.pending ? 'opacity-70' : ''}`}
            >
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <img
                  src={`https://ui-avatars.com/api/?name=${post.username}`}
                  alt="avatar"
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-semibold text-white">{post.username}</span>
                <span className="text-xs text-gray-400 ml-2 truncate">
                  {post.formattedTime}
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

              {!post.pending && (
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
              )}

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
        <div className="px-4 py-3 flex gap-2 bg-[#2b2d31] border-t border-[#202225] w-full">
          {/* Channel switch on mobile */}
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
                      setLastPostTime(0);
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
            className="flex-1 rounded-md bg-[#40444b] px-2 py-2 text-white placeholder:text-gray-400 focus:outline-none text-sm"
            placeholder={replyToPostId ? "Replying..." : "Message #" + selectedChannel.name}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            onClick={handleSend}
            
            className="bg-[#5865f2] hover:bg-[#4752c4] text-white px-4 py-2 rounded-md shadow text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>

        <button
          onClick={scrollToBottom}
          className="fixed bottom-16 right-1 sm:right-4 z-50 bg-[#5865f2] text-white px-3 py-2 rounded-full hover:bg-[#4752c4] shadow-lg"
        >
          ↓
        </button>
      </div>
    </div>
  );
}

export default ChatPage;