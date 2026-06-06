import {
  configureStore,
} from "@reduxjs/toolkit";

import conversationReducer
from "./slices/conversationSlice";

import contactReducer
from "./slices/contactSlice";

export const store =
  configureStore({
    reducer: {
      conversation:
        conversationReducer,

      contact:
        contactReducer,
    },
  });