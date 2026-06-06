import api from "./api";

export const getConversationMessages =
  async (
    conversationId
  ) => {
    const response =
      await api.get(
        `/messages/conversation/${conversationId}`
      );

    return response.data;
  };



  export const getMessages =
  async () => {
    const response =
      await api.get(
        "/messages"
      );

    return response.data;
  };



  export const createMessage =
  async (data) => {
    const response =
      await api.post(
        "/messages",
        data
      );

    return response.data;
  };