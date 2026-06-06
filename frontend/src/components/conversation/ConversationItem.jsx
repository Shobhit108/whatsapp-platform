const ConversationItem = ({
  conversation,
  active,
  onClick,
}) => {

  const contact =
    conversation?.contact;

  return (
    <button
      onClick={
        onClick
      }
      className={`w-full px-4 py-4 border-b border-slate-800 transition text-left ${
        active
          ? "bg-slate-800"
          : "hover:bg-slate-900"
      }`}
    >
      <div className="flex items-center gap-3">

        <div className="h-12 w-12 rounded-full bg-emerald-500 flex items-center justify-center font-bold shrink-0">
          {contact?.name
            ?.charAt(0)
            ?.toUpperCase() ||
            "U"}
        </div>

        <div className="min-w-0 flex-1">

          <div className="flex justify-between items-center">

            <h3 className="font-semibold truncate">
              {contact?.name ||
                "Unknown"}
            </h3>

            <span className="text-xs text-slate-500">
              {conversation
                ?.lastMessageAt
                ? new Date(
                    conversation.lastMessageAt
                  ).toLocaleDateString()
                : ""}
            </span>
          </div>

          <p className="text-sm text-slate-400 truncate">
            {
              conversation?.lastMessage ||
              "No messages"
            }
          </p>
        </div>
      </div>
    </button>
  );
};

export default ConversationItem;