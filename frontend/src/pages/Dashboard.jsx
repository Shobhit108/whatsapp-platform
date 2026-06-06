import {
  useEffect,
  useState,
} from "react";

import {
  Users,
  MessageCircle,
  MessagesSquare,
  Bot,
} from "lucide-react";

import StatCard from "../components/dashboard/StatCard";
import RecentChats from "../components/dashboard/RecectChats";

import {
  getContacts,
} from "../services/contactApi";

import {
  getConversations,
} from "../services/conversationApi";

import {
  getMessages,
} from "../services/messageApi";

const Dashboard =
  () => {
    const [stats,
    setStats] =
      useState({
        contacts: 0,
        conversations: 0,
        messages: 0,
        aiReplies: 0,
      });

    const [
      recentConversations,
      setRecentConversations,
    ] =
      useState([]);

    useEffect(() => {
      const fetchStats =
        async () => {
          try {
            const [
              contacts,
              conversations,
              messages,
            ] =
              await Promise.all(
                [
                  getContacts(),
                  getConversations(),
                  getMessages(),
                ]
              );

            const aiCount =
              messages.filter(
                (
                  msg
                ) =>
                  msg.type ===
                  "ai"
              ).length;

            setStats({
              contacts:
                contacts.length,

              conversations:
                conversations.length,

              messages:
                messages.length,

              aiReplies:
                aiCount,
            });

            setRecentConversations(
              conversations
            );
          } catch (
            err
          ) {
            console.log(
              err
            );
          }
        };

      fetchStats();
    }, []);

    return (
      <div className="space-y-8">

        {/* HEADER */}

        <div>
          <h1 className="text-4xl font-bold text-white">
            Dashboard
          </h1>

          <p className="text-slate-400 mt-1">
            Overview of
            your CRM
          </p>
        </div>

        {/* STATS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

          <StatCard
            title="Contacts"
            value={
              stats.contacts
            }
            icon={
              Users
            }
          />

          <StatCard
            title="Conversations"
            value={
              stats.conversations
            }
            icon={
              MessageCircle
            }
          />

          <StatCard
            title="Messages"
            value={
              stats.messages
            }
            icon={
              MessagesSquare
            }
          />

          <StatCard
            title="AI Replies"
            value={
              stats.aiReplies
            }
            icon={Bot}
          />
        </div>

        {/* RECENT CHATS */}

        <RecentChats
          conversations={
            recentConversations
          }
        />
      </div>
    );
  };

export default
Dashboard;