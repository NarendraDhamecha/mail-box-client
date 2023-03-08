import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem('token');

const initialState = {
    token: initialToken,
    isLoggedIn: !!initialToken,
}

const AuthSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        setToken(state, action){
            state.token = action.payload;
            state.isLoggedIn = true;
            localStorage.setItem('token', action.payload);
        }
    }
})

export const AuthActions = AuthSlice.actions;
export default AuthSlice.reducer;