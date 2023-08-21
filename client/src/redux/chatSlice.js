import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

// env
const CONVERSATION_ENDPOINT = `${import.meta.env.VITE_APP_API_ENDPOINT}/conversation`;
const MESSAGE_ENDPOINT = `${import.meta.env.VITE_APP_API_ENDPOINT}/message`;

const initialState = {
  status: "",
  error: "",
  conversations: [],
  activeConversation: {},
  messages: [],
  notification: [],
  files: [],
};

// Functions
export const getConversations = createAsyncThunk(
  "conversation/all",
  async (token, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(CONVERSATION_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(err.response.data.error);
    }
  }
);

export const open_create_conversation = createAsyncThunk(
  "conversation/open_create",
  async (values, { rejectWithValue }) => {
    const { token, recieverId } = values;
    try {
      const { data } = await axios.post(
        CONVERSATION_ENDPOINT,
        { recieverId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(err.response.data.error);
    }
  }
);

export const getConversationMessages = createAsyncThunk(
  "conversation/messages",
  async (values, { rejectWithValue }) => {
    const { token, convoId } = values;
    try {
      const { data } = await axios.get(`${MESSAGE_ENDPOINT}/${convoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(err.response.data.error);
    }
  }
);

export const sendMessage = createAsyncThunk("message/send", async (values, { rejectWithValue }) => {
  const { token, message, convoId, files } = values;
  try {
    const { data } = await axios.post(
      MESSAGE_ENDPOINT,
      {
        message,
        convoId,
        files,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return rejectWithValue(err.response.data.error);
  }
});

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveConversation: (state, action) => {
      state.activeConversation = action.payload;
    },
    updateMessageAndConvo: (state, action) => {
      // update messages
      let convo = state.activeConversation;
      if (convo._id === action.payload.conversation._id) {
        state.messages = [...state.messages, action.payload];
      }
      // update conversation
      let conversation = { ...action.payload.conversation, latestMessage: action.payload };
      let newConvo = [...state.conversations].filter((convo) => convo._id !== conversation._id);
      newConvo.unshift(conversation);
      state.conversations = newConvo;
    },
    addFiles: (state, action) => {
      state.files = [...state.files, action.payload];
    },
    clearFiles: (state) => {
      state.files = [];
    },
    removeSelectedFile: (state, action) => {
      let index = action.payload;
      let newFiles = [...state.files];
      newFiles.splice(index, 1);
      state.files = newFiles;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getConversations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getConversations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.conversations = action.payload;
      })
      .addCase(getConversations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(open_create_conversation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(open_create_conversation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.activeConversation = action.payload;
        //Empty files
        state.files = [];
      })
      .addCase(open_create_conversation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getConversationMessages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getConversationMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = action.payload;
      })
      .addCase(getConversationMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(sendMessage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = [...state.messages, action.payload];
        let conversation = { ...action.payload.conversation, latestMessage: action.payload };
        let newConvo = [...state.conversations].filter((convo) => convo._id !== conversation._id);
        newConvo.unshift(conversation);
        state.conversations = newConvo;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  setActiveConversation,
  updateMessageAndConvo,
  addFiles,
  clearFiles,
  removeSelectedFile,
} = chatSlice.actions;

export default chatSlice.reducer;
