import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  getContacts,
  createContact,
  deleteContact,
} from "../../services/contactApi";

export const fetchContacts =
  createAsyncThunk(
    "contacts/fetchContacts",
    async () => {
      return await getContacts();
    }
  );

export const addContact =
  createAsyncThunk(
    "contacts/addContact",
    async (
      contact
    ) => {
      await createContact(
        contact
      );

      return await getContacts();
    }
  );

export const removeContact =
  createAsyncThunk(
    "contacts/removeContact",
    async (id) => {
      await deleteContact(
        id
      );

      return id;
    }
  );

const contactSlice =
  createSlice({
    name:
      "contacts",

    initialState:
      {
        contacts: [],
        loading: false,
      },

    reducers: {},

    extraReducers: (
      builder
    ) => {
      builder

        .addCase(
          fetchContacts.pending,
          (state) => {
            state.loading =
              true;
          }
        )

        .addCase(
          fetchContacts.fulfilled,
          (
            state,
            action
          ) => {
            state.loading =
              false;

            state.contacts =
              action.payload;
          }
        )

        .addCase(
          addContact.fulfilled,
          (
            state,
            action
          ) => {
            state.contacts =
              action.payload;
          }
        )

        .addCase(
          removeContact.fulfilled,
          (
            state,
            action
          ) => {
            state.contacts =
              state.contacts.filter(
                (
                  contact
                ) =>
                  contact._id !==
                  action.payload
              );
          }
        );
    },
  });

export default
contactSlice.reducer;