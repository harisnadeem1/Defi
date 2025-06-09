import React, { 
  useEffect, 
  useRef, 
  useState, 
  useCallback, 
  useMemo,
  memo,
  startTransition
} from "react";
import { mmGet, mmPost } from "../api/mattermostClient";
import { supabase } from "@/lib/supabaseClient";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import emoji from "emoji-dictionary";
import { 
  MessageCircle, 
  SmilePlus, 
  Hash, 
  Menu, 
  X, 
  Send, 
  ArrowDown,
  Users,
  Settings,
  Phone,
  Video,
  Pin,
  Search,
  Paperclip,
  Gift,
  Gif,
  Sticker
} from "lucide-react";
import SubscriptionModal from "../components/SubscriptionChat";
import { useNavigate } from "react-router-dom";

const DEFAULT_CHANNELS = [
  { name: "general", id: import.meta.env.VITE_MATTERMOST_CHANNEL_ID, description: "General discussion" },
  { name: "strategy-feedback", id: import.meta.env.VITE_MATTERMOST_CHANNEL_ID_STRATEGY, description: "Share your trading strategies" },
  { name: "onboarding-support", id: import.meta.env.VITE_MATTERMOST_CHANNEL_ID_BIGGNEER, description: "Help for new members" },
  { name: "wins", id: import.meta.env.VITE_MATTERMOST_CHANNEL_ID_WINS, description: "Celebrate your wins!" },
  { name: "alerts", id: import.meta.env.VITE_MATTERMOST_CHANNEL_ID_RISKS, description: "Market alerts and risks" },
  { name: "tools", id: import.meta.env.VITE_MATTERMOST_CHANNEL_ID_TOOLS, description: "Trading tools discussion" },
  { name: "lounge", id: import.meta.env.VITE_MATTERMOST_CHANNEL_ID_LOUNGE, description: "Casual conversations" },
];

// Utility function for debouncing
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Enhanced Message Component with Discord-like styling
const MessageItem = memo(({ 
  post, 
  showPickerFor, 
  setShowPickerFor, 
  setReplyToPostId, 
  handleReact,
  previousPost
}) => {
  const isConsecutive = previousPost && 
    previousPost.user_id === post.user_id && 
    (post.create_at - previousPost.create_at) < 420000; // 7 minutes

  const getAvatarColor = (username) => {
    const colors = [
      '#7289da', '#43b581', '#faa61a', '#f04747', '#9266cc',
      '#3498db', '#2ecc71', '#e91e63', '#ff9800', '#795548'
    ];
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div className={`group relative px-4 py-1 hover:bg-[#32353b]/30 transition-colors duration-150 ${
      isConsecutive ? 'mt-0.5' : 'mt-4'
    }`}>
      <div className="flex">
        {/* Avatar */}
        <div className="flex-shrink-0 mr-4">
          {!isConsecutive ? (
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
              style={{ backgroundColor: getAvatarColor(post.username) }}
            >
              {post.username.substring(0, 2).toUpperCase()}
            </div>
          ) : (
            <div className="w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs text-[#b9bbbe]">
                {post.formattedTime}
              </span>
            </div>
          )}
        </div>

        {/* Message Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          {!isConsecutive && (
            <div className="flex items-baseline mb-1">
              <span className="font-semibold text-white hover:underline cursor-pointer mr-2">
                {post.username}
              </span>
              <span className="text-xs text-[#b9bbbe]">
                {new Date(post.create_at).toLocaleDateString()} {post.formattedTime}
              </span>
              {post.pending && (
                <span className="ml-2 text-xs text-[#b9bbbe] animate-pulse">
                  Sending...
                </span>
              )}
            </div>
          )}

          {/* Message Text */}
          <div className={`text-[#dcddde] leading-relaxed break-words ${
            post.pending ? 'opacity-60' : ''
          }`}>
            {post.message}
          </div>

          {/* Reactions */}
          {Object.keys(post.reactions || {}).length > 0 && (
            <div className="mt-2 flex gap-1 flex-wrap">
              {Object.entries(post.reactions).map(([emojiName, count]) => {
                const emojiChar = emoji.getUnicode(emojiName);
                if (!emojiChar) return null;
                return (
                  <button
                    key={emojiName}
                    className="inline-flex items-center gap-1 text-sm px-1.5 py-0.5 bg-[#2f3136] hover:bg-[#36393f] border border-[#40444b] rounded text-[#b9bbbe] hover:border-[#5865f2] transition-colors"
                    onClick={() => handleReact(post.id, emojiName)}
                  >
                    <span>{emojiChar}</span>
                    <span className="text-xs">{count}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Replies */}
          {post.replies?.map((reply) => (
            <div key={reply.id} className="mt-3 ml-6 pl-3 border-l-2 border-[#4f545c] bg-[#2f3136]/50 rounded-r p-2">
              <div className="flex items-center gap-2 mb-1">
                <div 
                  className="w-4 h-4 rounded-full flex items-center justify-center text-white text-xs"
                  style={{ backgroundColor: getAvatarColor(reply.username) }}
                >
                  {reply.username.substring(0, 1).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-white">{reply.username}</span>
                <span className="text-xs text-[#b9bbbe]">{reply.formattedTime}</span>
              </div>
              <div className="text-sm text-[#dcddde]">{reply.message}</div>
            </div>
          ))}
        </div>

        {/* Message Actions (visible on hover) */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 absolute top-1 right-4 bg-[#2f3136] border border-[#40444b] rounded shadow-lg flex">
          <button
            onClick={() => setReplyToPostId(post.id)}
            className="p-1.5 hover:bg-[#36393f] text-[#b9bbbe] hover:text-white transition-colors"
            title="Reply"
          >
            <MessageCircle size={16} />
          </button>
          <button
            onClick={() => setShowPickerFor(prev => prev === post.id ? null : post.id)}
            className="p-1.5 hover:bg-[#36393f] text-[#b9bbbe] hover:text-white transition-colors"
            title="Add Reaction"
          >
            <SmilePlus size={16} />
          </button>
        </div>

        {/* Emoji Picker */}
        {showPickerFor === post.id && (
          <div className="absolute top-8 right-4 z-50">
            <Picker
              data={data}
              onEmojiSelect={(emoji) => {
                handleReact(post.id, emoji.id);
                setShowPickerFor(null);
              }}
              theme="dark"
              previewPosition="none"
              skinTonePosition="none"
            />
          </div>
        )}
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.post.id === nextProps.post.id &&
    prevProps.post.message === nextProps.post.message &&
    JSON.stringify(prevProps.post.reactions) === JSON.stringify(nextProps.post.reactions) &&
    prevProps.showPickerFor === nextProps.showPickerFor &&
    prevProps.post.replies?.length === nextProps.post.replies?.length
  );
});

function ChatPage() {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [mmToken, setMmToken] = useState(null);
  const [mmUserId, setMmUserId] = useState(null);
  const [showPickerFor, setShowPickerFor] = useState(null);
  const [replyToPostId, setReplyToPostId] = useState(null);
  const [selectedChannel, setSelectedChannel] = useState(DEFAULT_CHANNELS[0]);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [lastPostTime, setLastPostTime] = useState(0);
  const [channelSwitching, setChannelSwitching] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  
  const navigate = useNavigate();
  const messagesWrapperRef = useRef(null);
  const visitedChannelsRef = useRef(new Set());
  const userCacheRef = useRef(new Map());
  const reactionCacheRef = useRef(new Map());
  const intervalRef = useRef(null);
  const abortControllerRef = useRef(null);

  // Optimized time formatting with caching
  const formatTime = useCallback((() => {
    const cache = new Map();
    const maxCacheSize = 1000;
    
    return (timestamp) => {
      if (cache.has(timestamp)) {
        return cache.get(timestamp);
      }
      
      const formatted = new Date(timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      
      if (cache.size >= maxCacheSize) {
        const firstKey = cache.keys().next().value;
        cache.delete(firstKey);
      }
      
      cache.set(timestamp, formatted);
      return formatted;
    };
  })(), []);

  // Enhanced scroll handling
  const handleScroll = useCallback(() => {
    if (messagesWrapperRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesWrapperRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollButton(!isNearBottom);
    }
  }, []);

  const scrollToBottom = useCallback(() => {
    if (messagesWrapperRef.current) {
      messagesWrapperRef.current.scrollTo({
        top: messagesWrapperRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, []);

  // Enhanced user fetching with caching
  const fetchUsers = useCallback(async (userIds, token) => {
    const uncachedUserIds = userIds.filter(id => !userCacheRef.current.has(id));
    
    if (uncachedUserIds.length === 0) {
      return Object.fromEntries(
        userIds.map(id => [id, userCacheRef.current.get(id)])
      );
    }

    try {
      const userBulkRes = await mmPost("/users/ids", uncachedUserIds, token);
      
      userBulkRes.forEach(user => {
        userCacheRef.current.set(user.id, user.username);
      });

      return Object.fromEntries(
        userIds.map(id => [id, userCacheRef.current.get(id) || "Unknown"])
      );
    } catch (err) {
      console.error("Bulk user fetch failed", err);
      return Object.fromEntries(userIds.map(id => [id, "Unknown"]));
    }
  }, []);

  // Fixed reaction fetching function
  const fetchReactions = useCallback(async (postIds, token) => {
    if (!postIds || postIds.length === 0) return {};

    const reactionPromises = postIds.map(async (postId) => {
      const cacheKey = `${postId}_${Math.floor(Date.now() / 30000)}`;
      if (reactionCacheRef.current.has(cacheKey)) {
        return [postId, reactionCacheRef.current.get(cacheKey)];
      }

      try {
        const reactions = await mmGet(`/posts/${postId}/reactions`, token);
        const groupedReactions = {};
        (reactions || []).forEach((reaction) => {
          groupedReactions[reaction.emoji_name] = (groupedReactions[reaction.emoji_name] || 0) + 1;
        });
        
        reactionCacheRef.current.set(cacheKey, groupedReactions);
        return [postId, groupedReactions];
      } catch (err) {
        console.error(`Failed to fetch reactions for post ${postId}:`, err);
        const emptyReactions = {};
        reactionCacheRef.current.set(cacheKey, emptyReactions);
        return [postId, emptyReactions];
      }
    });

    try {
      const results = await Promise.allSettled(reactionPromises);
      return Object.fromEntries(
        results
          .filter(result => result.status === 'fulfilled')
          .map(result => result.value)
      );
    } catch (err) {
      console.error("Error in fetchReactions:", err);
      return {};
    }
  }, []);

  // Enhanced message fetching
  const fetchMessages = useCallback(async (isChannelSwitch = false) => {
    if (!mmToken || !selectedChannel?.id) return;
    
    if (isChannelSwitch) {
      setLoading(true);
    }
    
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    abortControllerRef.current = new AbortController();
    
    try {
      const data = await mmGet(`/channels/${selectedChannel.id}/posts`, mmToken, {
        signal: abortControllerRef.current.signal
      });
      
      const messages = Object.values(data.posts);
      
      if (messages.length === 0) {
        if (isChannelSwitch) setLoading(false);
        return;
      }

      const latestPostTime = Math.max(...messages.map(msg => msg.create_at));
      
      if (!isChannelSwitch && latestPostTime <= lastPostTime && posts.length > 0) {
        return;
      }
      
      setLastPostTime(latestPostTime);

      const rootPosts = messages.filter((msg) => !msg.root_id);
      const replies = messages.filter((msg) => msg.root_id);
      const userIds = [...new Set(messages.map((msg) => msg.user_id))];

      const [userMap, reactionsMap] = await Promise.all([
        fetchUsers(userIds, mmToken),
        fetchReactions(rootPosts.map(p => p.id), mmToken)
      ]);

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

      const sortedMessages = messagesWithReactions.sort((a, b) => a.create_at - b.create_at);
      
      if (isChannelSwitch) {
        setPosts(sortedMessages);
      } else {
        setPosts(prevPosts => {
          const existingIds = new Set(prevPosts.map(p => p.id));
          const newMessages = sortedMessages.filter(msg => !existingIds.has(msg.id));
          
          if (newMessages.length === 0) return prevPosts;
          
          return [...prevPosts, ...newMessages].sort((a, b) => a.create_at - b.create_at);
        });
      }
      
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error("Error fetching messages:", err);
      }
    } finally {
      if (isChannelSwitch) {
        setLoading(false);
        setChannelSwitching(false);
      }
    }
  }, [mmToken, selectedChannel, lastPostTime, posts.length, fetchUsers, fetchReactions, mmUserId, formatTime]);

  // Enhanced send handler
  const handleSend = useCallback(async () => {
    if (!message.trim() || !mmToken || isSending) return;

    const messageContent = message;
    const tempId = `temp_${Date.now()}_${Math.random()}`;
    
    setIsSending(true);
    
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
    
    setTimeout(scrollToBottom, 50);

    try {
      const response = await mmPost(
        "/posts",
        {
          channel_id: selectedChannel.id,
          message: messageContent,
          root_id: replyToPostId || null,
        },
        mmToken
      );
      
      setPosts(prev => {
        const filteredPosts = prev.filter(p => p.id !== tempId);
        const realPost = {
          ...response,
          username: userCacheRef.current.get(response.user_id) || "You",
          isOwnMessage: response.user_id === mmUserId,
          reactions: {},
          replies: [],
          formattedTime: formatTime(response.create_at),
          pending: false
        };
        return [...filteredPosts, realPost].sort((a, b) => a.create_at - b.create_at);
      });
      
    } catch (err) {
      console.error("Failed to send message:", err);
      setPosts(prev => prev.filter(p => p.id !== tempId));
      setMessage(messageContent);
    } finally {
      setIsSending(false);
    }
  }, [message, mmToken, mmUserId, selectedChannel.id, replyToPostId, formatTime, scrollToBottom, isSending]);

  // Enhanced reaction handler
  const handleReact = useCallback(async (postId, emojiName) => {
    if (!mmToken || !postId || !emojiName) return;

    setPosts(prev => prev.map(post => {
      if (post.id !== postId) return post;
      
      const currentReactions = { ...post.reactions };
      currentReactions[emojiName] = (currentReactions[emojiName] || 0) + 1;
      
      return { ...post, reactions: currentReactions };
    }));

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
      
      const reactions = await mmGet(`/posts/${postId}/reactions`, mmToken);
      const groupedReactions = {};
      (reactions || []).forEach((reaction) => {
        groupedReactions[reaction.emoji_name] = (groupedReactions[reaction.emoji_name] || 0) + 1;
      });

      setPosts(prev => prev.map(post => 
        post.id === postId 
          ? { ...post, reactions: groupedReactions }
          : post
      ));
      
    } catch (error) {
      console.error("Failed to react to post:", error);
      setPosts(prev => prev.map(post => {
        if (post.id !== postId) return post;
        
        const currentReactions = { ...post.reactions };
        currentReactions[emojiName] = Math.max(0, (currentReactions[emojiName] || 1) - 1);
        if (currentReactions[emojiName] === 0) {
          delete currentReactions[emojiName];
        }
        
        return { ...post, reactions: currentReactions };
      }));
    }
  }, [mmToken, mmUserId]);

  // Channel switching
  const handleChannelSwitch = useCallback((channel) => {
    if (channel.id === selectedChannel.id) return;
    
    setChannelSwitching(true);
    setSelectedChannel(channel);
    setLastPostTime(0);
    setPosts([]);
    setShowMobileSidebar(false);
    setReplyToPostId(null);
    setShowPickerFor(null);
  }, [selectedChannel.id]);

  // Keyboard shortcuts
  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  // Fetch credentials
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

  // Initial fetch and polling setup
  useEffect(() => {
    if (!mmToken || !selectedChannel?.id) return;

    fetchMessages(true);
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      fetchMessages(false);
    }, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [mmToken, selectedChannel, fetchMessages]);

  // Auto-scroll setup
  useEffect(() => {
    const messagesContainer = messagesWrapperRef.current;
    if (messagesContainer) {
      messagesContainer.addEventListener('scroll', handleScroll);
      return () => messagesContainer.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  // Auto-scroll for new messages
  useEffect(() => {
    if (!selectedChannel?.id || posts.length === 0) return;

    if (!visitedChannelsRef.current.has(selectedChannel.id)) {
      setTimeout(scrollToBottom, 100);
      visitedChannelsRef.current.add(selectedChannel.id);
    } else {
      setTimeout(scrollToBottom, 100);
    }
  }, [posts.length, selectedChannel, scrollToBottom]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

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
    <div className="h-screen flex bg-[#36393f] text-white overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {showMobileSidebar && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setShowMobileSidebar(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-60 bg-[#2f3136] flex flex-col
        transform transition-transform duration-300 ease-in-out lg:transform-none
        ${showMobileSidebar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Server Header */}
        <div className="h-12 flex items-center justify-between px-4 border-b border-[#202225] bg-[#2f3136] shadow-sm">
          <h1 className="font-semibold text-white truncate">DeFi Community</h1>
          <button
            onClick={() => setShowMobileSidebar(false)}
            className="lg:hidden p-1 hover:bg-[#36393f] rounded"
          >
            <X size={20} />
          </button>
        </div>

        {/* Channels List */}
        <div className="flex-1 overflow-y-auto p-2">
          <div className="mb-4">
            <div className="flex items-center justify-between px-2 py-1 text-xs font-semibold text-[#8e9297] uppercase tracking-wide">
              <span>Text Channels</span>
            </div>
            <div className="space-y-0.5">
              {DEFAULT_CHANNELS.map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => handleChannelSwitch(channel)}
                  className={`
                    group flex items-center w-full px-2 py-1.5 rounded text-left transition-colors
                    ${selectedChannel.id === channel.id
                      ? 'bg-[#5865f2]/20 text-white'
                      : 'text-[#96989d] hover:bg-[#36393f] hover:text-[#dcddde]'
                    }
                    ${channelSwitching && selectedChannel.id === channel.id ? 'opacity-50' : ''}
                  `}
                  disabled={channelSwitching}
                >
                  <Hash size={16} className="mr-1.5 flex-shrink-0" />
                  <span className="truncate text-sm font-medium">{channel.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* User Area */}
        <div className="p-2 bg-[#292b2f] border-t border-[#202225]">
          <div className="flex items-center p-2 rounded hover:bg-[#36393f] transition-colors">
            <div className="w-8 h-8 rounded-full bg-[#5865f2] flex items-center justify-center text-white text-sm font-semibold mr-2">
              U
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate">User</div>
              <div className="text-xs text-[#b9bbbe]">Online</div>
            </div>
            <div className="flex space-x-1">
              <button className="p-1 hover:bg-[#4f545c] rounded">
                <Settings size={16} className="text-[#b9bbbe]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Channel Header */}
        <div className="h-12 flex items-center justify-between px-4 border-b border-[#202225] bg-[#36393f] shadow-sm">
          <div className="flex items-center">
            <button
              onClick={() => setShowMobileSidebar(true)}
              className="lg:hidden p-2 hover:bg-[#40444b] rounded mr-2"
            >
              <Menu size={20} />
            </button>
            <Hash size={20} className="text-[#8e9297] mr-2" />
            <h2 className="font-semibold text-white">{selectedChannel.name}</h2>
            {selectedChannel.description && (
              <>
                <div className="w-px h-6 bg-[#4f545c] mx-2" />
                <span className="text-sm text-[#b9bbbe] truncate max-w-xs">
                  {selectedChannel.description}
                </span>
              </>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {(loading || channelSwitching) && (
              <div className="flex items-center text-xs text-[#b9bbbe]">
                <div className="animate-spin w-4 h-4 border-2 border-[#b9bbbe] border-t-transparent rounded-full mr-2" />
                Loading...
              </div>
            )}
            <button className="hidden sm:block p-2 hover:bg-[#40444b] rounded text-[#b9bbbe]">
              <Search size={20} />
            </button>
            <button className="hidden sm:block p-2 hover:bg-[#40444b] rounded text-[#b9bbbe]">
              <Users size={20} />
            </button>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Messages */}
          <div
            ref={messagesWrapperRef}
            className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-[#2f3136] scrollbar-thumb-[#202225]"
            style={{ scrollbarWidth: 'thin' }}
          >
            {channelSwitching ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="animate-spin w-8 h-8 border-4 border-[#5865f2] border-t-transparent rounded-full mx-auto mb-4" />
                  <div className="text-[#b9bbbe]">Loading messages...</div>
                </div>
              </div>
            ) : posts.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-[#b9bbbe]">
                  <Hash size={48} className="mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">Welcome to #{selectedChannel.name}!</h3>
                  <p className="text-sm">{selectedChannel.description || "This is the beginning of your conversation."}</p>
                </div>
              </div>
            ) : (
              <div className="pb-4">
                {posts.map((post, index) => (
                  <MessageItem
                    key={post.id}
                    post={post}
                    previousPost={posts[index - 1]}
                    showPickerFor={showPickerFor}
                    setShowPickerFor={setShowPickerFor}
                    setReplyToPostId={setReplyToPostId}
                    handleReact={handleReact}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Message Input */}
          <div className="p-4">
            {replyToPostId && (
              <div className="mb-2 p-2 bg-[#2f3136] rounded-t border-l-4 border-[#5865f2] text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[#b9bbbe]">
                    Replying to <span className="font-medium text-white">message</span>
                  </span>
                  <button
                    onClick={() => setReplyToPostId(null)}
                    className="text-[#b9bbbe] hover:text-white"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            )}
            
            <div className="flex items-end space-x-2">
              <div className="flex-1 relative">
                <div className="flex items-center bg-[#40444b] rounded-lg">
                  <button className="p-3 hover:bg-[#36393f] rounded-l-lg transition-colors">
                    <Paperclip size={20} className="text-[#b9bbbe]" />
                  </button>
                  
                  <input
                    type="text"
                    placeholder={`Message #${selectedChannel.name}`}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={channelSwitching || isSending}
                    className="flex-1 bg-transparent px-3 py-3 text-white placeholder-[#72767d] focus:outline-none"
                  />
                  
                  <div className="flex items-center pr-2">
                    <button className="p-1.5 hover:bg-[#36393f] rounded transition-colors">
                      <Gift size={18} className="text-[#b9bbbe]" />
                    </button>
                    <button className="p-1.5 hover:bg-[#36393f] rounded transition-colors">
                      <Gif size={18} className="text-[#b9bbbe]" />
                    </button>
                    <button className="p-1.5 hover:bg-[#36393f] rounded transition-colors">
                      <Sticker size={18} className="text-[#b9bbbe]" />
                    </button>
                    <button 
                      className="p-1.5 hover:bg-[#36393f] rounded transition-colors"
                      onClick={() => setShowPickerFor(showPickerFor ? null : 'input')}
                    >
                      <SmilePlus size={18} className="text-[#b9bbbe]" />
                    </button>
                  </div>
                </div>

                {showPickerFor === 'input' && (
                  <div className="absolute bottom-full right-0 mb-2 z-50">
                    <Picker
                      data={data}
                      onEmojiSelect={(emoji) => {
                        setMessage(prev => prev + emoji.native);
                        setShowPickerFor(null);
                      }}
                      theme="dark"
                      previewPosition="none"
                      skinTonePosition="none"
                    />
                  </div>
                )}
              </div>
              
              <button
                onClick={handleSend}
                disabled={!message.trim() || isSending || channelSwitching}
                className="bg-[#5865f2] hover:bg-[#4752c4] disabled:bg-[#4f545c] disabled:cursor-not-allowed p-3 rounded-lg transition-colors"
              >
                {isSending ? (
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <Send size={20} className="text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Bottom Button */}
      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className="fixed bottom-24 right-4 z-30 bg-[#5865f2] hover:bg-[#4752c4] text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
        >
          <ArrowDown size={20} />
        </button>
      )}
    </div>
  );
}

export default ChatPage;