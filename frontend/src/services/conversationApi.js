import api from "./api";

export const getConversations =
  async () => {
    const response =
      await api.get(
        "/conversations"
      );

    return response.data;
  };


  export const createConversation =
  async (data) => {
    const response =
      await api.post(
        "/conversations",
        data
      );

    return response.data;
  };