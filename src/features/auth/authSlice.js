import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null, roles: [] },
    reducers: {
        setCredentials: (state, action) => {
            const { username, roles, accessToken } = action.payload;
            state.user = username;
            state.roles = roles;
            state.token = accessToken;
        },
        logOut: (state) => {
            state.user = null;
            state.roles = null;
            state.token = null;
        }
    },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentRoles = (state) => state.auth.roles;