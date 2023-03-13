import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem('token');
const initialEmail = localStorage.getItem('email');

const initialState = {
    token: initialToken,
    email: initialEmail,
    isLoggedIn: !!initialToken,
}

const AuthSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        setToken(state, action){
            state.token = action.payload.token;
            state.email = action.payload.email;
            state.isLoggedIn = true;
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('email', action.payload.email);
        },
        
        logOut(state){
            state.token = null;
            state.email = null;
            state.isLoggedIn= false;
            localStorage.removeItem('token');
            localStorage.removeItem('email');
        }
    }
})

export const AuthActions = AuthSlice.actions;
export default AuthSlice.reducer;