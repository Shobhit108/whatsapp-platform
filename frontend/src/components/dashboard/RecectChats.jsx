const RecentChats = ({
  conversations,
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-semibold text-white">
          Recent
          Conversations
        </h2>

        <span className="text-sm text-slate-400">
          Latest 5
        </span>
      </div>

      <div className="space-y-4">

        {conversations
          .slice(0, 5)
          .map(
            (
              chat
            ) => (
              <div
                key={
                  chat._id
                }
                className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/20 transition"
              >

                <div className="flex items-center gap-4">

                  <div className="h-12 w-12 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-white">
                    {chat
                      ?.contact
                      ?.name?.[0]
                      ?.toUpperCase() ||
                      "U"}
                  </div>

                  <div>
                    <h3 className="font-semibold text-white">
                      {chat
                        ?.contact
                        ?.name ||
                        "Unknown"}
                    </h3>

                    <p className="text-sm text-slate-400 truncate max-w-[220px]">
                      {chat.lastMessage ||
                        "No messages"}
                    </p>
                  </div>
                </div>

                <div className="text-right">

                  <p className="text-xs text-slate-500">
                    {chat.lastMessageAt
                      ? new Date(
                          chat.lastMessageAt
                        ).toLocaleDateString()
                      : "--"}
                  </p>

                  <span className="text-xs text-emerald-400">
                    Active
                  </span>
                </div>
              </div>
            )
          )}

        {conversations
          .length ===
          0 && (
          <div className="text-center py-10 text-slate-500">
            No recent
            conversations
          </div>
        )}
      </div>
    </div>
  );
};

export default
RecentChats;