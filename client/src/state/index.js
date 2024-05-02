import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      const sortedPosts = action.payload.posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      state.posts = sortedPosts;
    },
    setPost: (state, action) => {
      const updatedPosts = [...state.posts]; // Create a copy of the original array
      const index = updatedPosts.findIndex(post => post._id === action.payload.post._id); // Find the index of the post to update
      if (index !== -1) {
          updatedPosts.splice(index, 1); // Remove the existing post from its current position
      }
      updatedPosts.unshift(action.payload.post);
      state.posts = updatedPosts;
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;
export default authSlice.reducer;
