import {
  createSlice,
} from "@reduxjs/toolkit";

const initialState =
  {
    conversations:
      [],

    selectedConversation:
      null,

    messages:
      [],
  };

const conversationSlice =
  createSlice({
    name:
      "conversations",

    initialState,

    reducers: {
      setConversations:
        (
          state,
          action
        ) => {
          state.conversations =
            action.payload;
        },

      setSelectedConversation:
        (
          state,
          action
        ) => {
          state.selectedConversation =
            action.payload;
        },

      setMessages:
        (
          state,
          action
        ) => {
          state.messages =
            action.payload;
        },

      addMessage:
        (
          state,
          action
        ) => {
          state.messages.push(
            action.payload
          );
        },
    },
  });

export const {
  setConversations,
  setSelectedConversation,
  setMessages,
  addMessage,
} =
  conversationSlice.actions;

export default
conversationSlice.reducer;