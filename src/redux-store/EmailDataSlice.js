import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    emails: [],
    emailMsg: null,
}

const EmailDataSlice = createSlice({
    name: 'emaildata',
    initialState,
    reducers: {
        setEmail(state, action){
            state.emails = [...action.payload];
        },

        setEmailMsg(state, action){
            state.emailMsg = action.payload;
        }
    }
})

export const EmailActions = EmailDataSlice.actions;
export default EmailDataSlice.reducer;