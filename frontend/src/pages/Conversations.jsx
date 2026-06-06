import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  setConversations,
  setSelectedConversation,
  setMessages,
  addMessage,
} from "../redux/slices/conversationSlice";

import { getConversations } from "../services/conversationApi";

import { getConversationMessages, createMessage } from "../services/messageApi";

import MessageBubble from "../components/conversation/MessageBubble";

const Conversations = () => {
  const dispatch = useDispatch();

  const { conversations, selectedConversation, messages } = useSelector(
    (state) => state.conversation,
  );

  const [text, setText] = useState("");

  // Fetch conversations

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getConversations();

        dispatch(setConversations(data));

        if (data.length > 0) {
          handleSelect(data[0]);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  // Select chat

  const handleSelect = async (conversation) => {
    dispatch(setSelectedConversation(conversation));

    try {
      const msgs = await getConversationMessages(conversation._id);

      dispatch(setMessages(msgs));
    } catch (err) {
      console.log(err);
    }
  };

  // Send message

  const handleSend = async () => {
    if (!text.trim() || !selectedConversation) return;

    const payload = {
      conversation: selectedConversation._id,

      contact:
        selectedConversation?.contact?._id || selectedConversation?.contact,

      direction: "outbound",

      type: "human",

      body: text,

      status: "sent",
    };

    try {
      const newMessage = await createMessage(payload);

      dispatch(addMessage(newMessage));

      setText("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-[82vh] w-full rounded-[32px] overflow-hidden border border-slate-800 bg-slate-900 flex">
      {/* LEFT PANEL */}

      <div
        className={`
          ${selectedConversation ? "hidden md:flex" : "flex"}
          w-full
          md:w-[340px]
          border-r
          border-slate-800
          flex-col
        `}
      >
        <div className="p-5 border-b border-slate-800 bg-slate-900">
          <h1 className="text-2xl font-bold text-white">Conversations</h1>

          <p className="text-slate-400 text-sm mt-1">
            {conversations.length} chats
          </p>
        </div>

        <div className="overflow-y-auto flex-1">
          {conversations.map((chat) => (
            <button
              key={chat._id}
              onClick={() => handleSelect(chat)}
              className={`w-full p-4 border-b border-slate-800 hover:bg-slate-800 transition text-left ${
                selectedConversation?._id === chat._id ? "bg-slate-800" : ""
              }`}
            >
              <div className="flex gap-3">
                <div className="h-12 w-12 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-white shrink-0">
                  {chat?.contact?.name?.[0]?.toUpperCase() || "U"}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold truncate text-white">
                      {chat?.contact?.name || "Unknown"}
                    </h3>

                    <span className="text-xs text-slate-500">
                      {chat.lastMessageAt
                        ? new Date(chat.lastMessageAt).toLocaleDateString()
                        : ""}
                    </span>
                  </div>

                  <p className="text-sm text-slate-400 truncate">
                    {chat.lastMessage}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* CHAT WINDOW */}

      <div
        className={`
          ${selectedConversation ? "flex" : "hidden md:flex"}
          flex-1
          min-w-0
          w-full
          flex-col
          bg-slate-950
        `}
      >
        {selectedConversation ? (
          <>
            {/* HEADER */}

            <div className="p-4 border-b border-slate-800 bg-slate-900 flex items-center gap-3">
              <button
                onClick={() => dispatch(setSelectedConversation(null))}
                className="md:hidden text-slate-400 text-xl"
              >
                ←
              </button>

              <div className="h-12 w-12 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-white">
                {selectedConversation?.contact?.name?.[0]?.toUpperCase() || "U"}
              </div>

             <div>
  <h2 className="font-semibold text-white">
    {
      selectedConversation
        ?.contact
        ?.name
    }
  </h2>

  <p className="text-xs text-slate-400">
    Active now
  </p>

  {/* TAGS */}

  <div className="flex gap-2 mt-2 flex-wrap">
    {selectedConversation
      ?.contact
      ?.tags?.map(
        (
          tag,
          index
        ) => (
          <span
            key={
              index
            }
            className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-lg text-[10px]"
          >
            {tag}
          </span>
        )
      )}
  </div>
</div>
            </div>

            {/* MESSAGES */}

            <div className="flex-1 overflow-y-auto p-5 bg-[#0B141A]">
              <div className="space-y-2">
                {messages.map((msg) => (
                  <MessageBubble key={msg._id} message={msg} />
                ))}
              </div>
            </div>

            {/* INPUT */}

            <div className="p-4 border-t border-slate-800 bg-slate-900">
              <div className="flex items-center gap-3 bg-slate-800 rounded-full px-4 py-2">
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSend();
                    }
                  }}
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent outline-none text-white"
                />

                <button
                  onClick={handleSend}
                  className="bg-emerald-500 hover:bg-emerald-600 px-5 py-2 rounded-full font-medium text-black transition"
                >
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="hidden md:flex flex-1 items-center justify-center text-slate-500 text-lg">
            Select a conversation
          </div>
        )}
      </div>
    </div>
  );
};

export default Conversations;
