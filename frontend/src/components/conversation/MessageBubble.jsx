const MessageBubble = ({
  message,
}) => {
  const isOutgoing =
    message.direction ===
    "outbound";

  return (
    <div
      className={`flex mb-3 ${
        isOutgoing
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`
        px-4 py-2
        rounded-2xl
        max-w-[75%]
        shadow-sm
        ${
          isOutgoing
            ? "bg-emerald-500 text-black rounded-br-sm"
            : "bg-slate-800 text-white rounded-bl-sm"
        }
      `}
      >
        <p className="text-sm break-words">
          {message.body}
        </p>

        <p
          className={`text-[11px] mt-1 text-right ${
            isOutgoing
              ? "text-black/60"
              : "text-slate-400"
          }`}
        >
          {new Date(
            message.createdAt
          ).toLocaleTimeString(
            [],
            {
              hour:
                "2-digit",
              minute:
                "2-digit",
            }
          )}
        </p>
      </div>
    </div>
  );
};

export default
MessageBubble;